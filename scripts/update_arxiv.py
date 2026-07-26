#!/usr/bin/env python3
"""Fetch one daily arXiv window and update the Journal Club daily archive."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path


API_URL = "https://export.arxiv.org/api/query"
USER_AGENT = "HaoyangYeJournalClub/1.0 (mailto:hy297@cam.ac.uk)"
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "journal-dates.json"
DATES_DIR = ROOT / "data" / "dates"
ATOM = {"atom": "http://www.w3.org/2005/Atom"}

CATEGORY_NAMES = {
    "astro-ph.CO": "Cosmology",
    "astro-ph.EP": "Exoplanets",
    "astro-ph.GA": "Galaxies",
    "astro-ph.HE": "High Energy",
    "astro-ph.IM": "Methods",
    "astro-ph.SR": "Stars",
    "astro-ph.SO": "Solar",
}


def daily_window(issue_date: dt.date) -> tuple[dt.datetime, dt.datetime]:
    """Return the 24-hour UTC window ending at 07:00 on the issue date."""
    end = dt.datetime.combine(issue_date, dt.time(hour=7), tzinfo=dt.timezone.utc)
    return end - dt.timedelta(days=1), end


def clean_text(value: str | None) -> str:
    return " ".join((value or "").split())


def topic_labels(categories: list[str], title: str, abstract: str) -> list[str]:
    labels = []
    for category in categories:
        label = CATEGORY_NAMES.get(category)
        if label and label not in labels:
            labels.append(label)

    radio_text = f"{title} {abstract}".lower()
    radio_terms = ("radio", "interferometr", "continuum", "synchrotron", "21-cm", "21 cm")
    if any(term in radio_text for term in radio_terms):
        labels.insert(0, "Radio")
    return labels or ["Astrophysics"]


def fetch_page(search_query: str, start: int, max_results: int) -> ET.Element:
    params = urllib.parse.urlencode(
        {
            "search_query": search_query,
            "start": start,
            "max_results": max_results,
            "sortBy": "submittedDate",
            "sortOrder": "descending",
        }
    )
    request = urllib.request.Request(f"{API_URL}?{params}", headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=90) as response:
        return ET.fromstring(response.read())


def fetch_period(start: dt.datetime, end: dt.datetime) -> list[dict]:
    # arXiv date ranges are inclusive, so stop one second before the next week.
    inclusive_end = end - dt.timedelta(seconds=1)
    date_query = (
        f"submittedDate:[{start:%Y%m%d%H%M%S} TO {inclusive_end:%Y%m%d%H%M%S}]"
    )
    search_query = f"cat:astro-ph.* AND {date_query}"
    page_size = 500
    offset = 0
    papers: list[dict] = []

    while True:
        feed = fetch_page(search_query, offset, page_size)
        entries = feed.findall("atom:entry", ATOM)
        if not entries:
            break

        for entry in entries:
            entry_url = clean_text(entry.findtext("atom:id", namespaces=ATOM))
            arxiv_id = entry_url.rstrip("/").split("/")[-1]
            title = clean_text(entry.findtext("atom:title", namespaces=ATOM))
            abstract = clean_text(entry.findtext("atom:summary", namespaces=ATOM))
            categories = [
                item.attrib["term"]
                for item in entry.findall("atom:category", ATOM)
                if item.attrib.get("term", "").startswith("astro-ph")
            ]
            authors = [
                clean_text(author.findtext("atom:name", namespaces=ATOM))
                for author in entry.findall("atom:author", ATOM)
            ]
            primary = categories[0] if categories else "astro-ph"
            papers.append(
                {
                    "id": arxiv_id,
                    "arxivId": arxiv_id,
                    "title": title,
                    "authors": ", ".join(authors),
                    "category": primary,
                    "categories": categories,
                    "topics": topic_labels(categories, title, abstract),
                    "submitted": clean_text(entry.findtext("atom:published", namespaces=ATOM)),
                    "updated": clean_text(entry.findtext("atom:updated", namespaces=ATOM)),
                    "abstract": abstract,
                    "question": "",
                    "why": "",
                    "method": "",
                    "data": "",
                    "result": "",
                    "limitations": "",
                    "discuss": "",
                    "analysisStatus": "pending",
                    "link": f"https://arxiv.org/abs/{arxiv_id}",
                    "pdf": f"https://arxiv.org/pdf/{arxiv_id}",
                }
            )

        if len(entries) < page_size:
            break
        offset += page_size
        time.sleep(3)

    return papers


def make_issue(issue_date: dt.date, papers: list[dict]) -> dict:
    topic_counts = Counter(
        topic for paper in papers for topic in paper["topics"] if topic != "Astrophysics"
    )
    return {
        "id": issue_date.isoformat(),
        "label": f"{issue_date:%A, %-d %B %Y}",
        "eyebrow": "Latest date",
        "total": len(papers),
        "status": "published",
        "description": "Automatically imported from arXiv and preserved in the daily archive.",
        "topics": dict(topic_counts.most_common()),
        "papers": papers,
    }


def load_archive() -> dict:
    if not OUTPUT.exists():
        return {"generatedAt": None, "weeks": []}
    return json.loads(OUTPUT.read_text(encoding="utf-8"))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--date",
        type=dt.date.fromisoformat,
        help="Issue date YYYY-MM-DD; useful for a manual backfill.",
    )
    args = parser.parse_args()

    issue_date = args.date or dt.datetime.now(dt.timezone.utc).date()
    start, end = daily_window(issue_date)
    papers = fetch_period(start, end)
    issue = make_issue(issue_date, papers)

    archive = load_archive()
    DATES_DIR.mkdir(parents=True, exist_ok=True)
    issue_file = DATES_DIR / f"{issue['id']}.json"
    issue_file.write_text(
        json.dumps(issue, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    issue_index = {key: value for key, value in issue.items() if key != "papers"}
    issue_index["dataUrl"] = f"data/dates/{issue['id']}.json"
    previous = [
        {key: value for key, value in item.items() if key != "papers"}
        for item in archive.get("dates", [])
        if item.get("id") != issue["id"]
    ]
    dates = sorted([issue_index, *previous], key=lambda item: item["id"], reverse=True)[:730]
    for index, item in enumerate(dates):
        item["eyebrow"] = "Latest date" if index == 0 else "Past date"

    payload = {
        "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
        "source": "arXiv API",
        "dates": dates,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {issue['id']} with {len(papers)} papers")


if __name__ == "__main__":
    main()
