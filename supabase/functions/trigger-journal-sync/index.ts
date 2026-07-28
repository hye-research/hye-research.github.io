const githubOwner = "hye-research";
const githubRepo = "hye-research.github.io";
const workflowFile = "update-journal-club.yml";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const githubToken = Deno.env.get("GITHUB_ACTIONS_TOKEN");
  const cronSecret = Deno.env.get("JOURNAL_CRON_SECRET");
  if (!githubToken) return json({ error: "GitHub Actions token is not configured." }, 503);
  if (!cronSecret) return json({ error: "Cron authentication is not configured." }, 503);
  if (request.headers.get("x-journal-cron-secret") !== cronSecret) {
    return json({ error: "Unauthorized." }, 401);
  }

  let requestedDate = "";
  try {
    const body = await request.json();
    requestedDate = typeof body.date === "string" ? body.date : "";
  } catch {
    // An empty body means "use today's UTC date".
  }

  const date = requestedDate || new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return json({ error: "date must use YYYY-MM-DD format." }, 400);
  }

  const weekday = new Date(`${date}T07:00:00Z`).getUTCDay();
  if (weekday === 0 || weekday === 6) {
    return json({ skipped: true, reason: "weekend", date });
  }

  const githubResponse = await fetch(
    `https://api.github.com/repos/${githubOwner}/${githubRepo}/actions/workflows/${workflowFile}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "HYE-Journal-Club-Supabase-Cron",
      },
      body: JSON.stringify({ ref: "main", inputs: { date } }),
    },
  );

  if (!githubResponse.ok) {
    const detail = await githubResponse.text();
    return json(
      {
        error: "GitHub workflow dispatch failed.",
        github_status: githubResponse.status,
        detail: detail.slice(0, 1000),
      },
      502,
    );
  }

  return json(
    {
      triggered: true,
      date,
      workflow: workflowFile,
      repository: `${githubOwner}/${githubRepo}`,
    },
    202,
  );
});
