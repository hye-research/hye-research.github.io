const corsHeaders = {
  "Access-Control-Allow-Origin": "https://hye-research.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const slideSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    kind: { type: "string", enum: ["title", "paper", "discussion"] },
    eyebrow: { type: "string" },
    title: { type: "string" },
    subtitle: { type: "string" },
    bullets: { type: "array", items: { type: "string" } },
    paper_id: { type: "string" },
    arxiv_url: { type: "string" },
    figure_url: { type: "string" },
    figure_caption: { type: "string" },
    figure_explanation: { type: "string" },
  },
  required: [
    "kind", "eyebrow", "title", "subtitle", "bullets",
    "paper_id", "arxiv_url", "figure_url", "figure_caption", "figure_explanation",
  ],
};

const deckSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    deck_title: { type: "string" },
    deck_subtitle: { type: "string" },
    slides: { type: "array", items: slideSchema },
  },
  required: ["deck_title", "deck_subtitle", "slides"],
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function outputText(response: Record<string, unknown>) {
  const output = Array.isArray(response.output) ? response.output : [];
  for (const item of output) {
    if (!item || typeof item !== "object" || !Array.isArray(item.content)) continue;
    for (const content of item.content) {
      if (
        content && typeof content === "object" &&
        content.type === "output_text" && typeof content.text === "string"
      ) return content.text;
    }
  }
  return "";
}

function refusalText(response: Record<string, unknown>) {
  const output = Array.isArray(response.output) ? response.output : [];
  for (const item of output) {
    if (!item || typeof item !== "object" || !Array.isArray(item.content)) continue;
    for (const content of item.content) {
      if (
        content && typeof content === "object" &&
        content.type === "refusal" && typeof content.refusal === "string"
      ) return content.refusal;
    }
  }
  return "";
}

function plainText(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

async function extractFigures(arxivUrl: string) {
  const id = arxivUrl.match(/\/abs\/([^?#]+)/)?.[1];
  if (!id) return [];
  const htmlUrl = `https://arxiv.org/html/${id}`;
  try {
    const response = await fetch(htmlUrl, {
      headers: { "User-Agent": "HYE-Journal-Club/1.0" },
    });
    if (!response.ok) return [];
    const html = await response.text();
    const figures = [];
    const imageRegex = /<img\b[^>]*\bsrc="([^"]+)"[^>]*>/gi;
    let match;
    while ((match = imageRegex.exec(html)) && figures.length < 2) {
      const src = match[1];
      if (!src.includes(id) || /logo|icon|glyph/i.test(src)) continue;
      const nearby = html.slice(match.index, Math.min(html.length, match.index + 7000));
      const captionHtml = nearby.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1] || "";
      const caption = plainText(captionHtml).slice(0, 1800);
      if (!caption) continue;
      figures.push({
        url: new URL(src, htmlUrl).href,
        caption,
      });
    }
    return figures;
  } catch {
    return [];
  }
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const authorization = request.headers.get("Authorization");
  if (!authorization) return json({ error: "Please sign in first." }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  if (!supabaseUrl || !supabaseAnonKey || !openaiKey) {
    return json({ error: "The AI service has not been configured." }, 503);
  }

  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { Authorization: authorization, apikey: supabaseAnonKey },
  });
  if (!userResponse.ok) return json({ error: "Your login session is invalid." }, 401);

  const body = await request.json();
  const papers = Array.isArray(body.papers) ? body.papers.slice(0, 8) : [];
  if (!papers.length) return json({ error: "Add at least one paper to the shortlist." }, 400);

  const language = body.language === "zh" ? "Chinese" : "English";
  const audience = String(body.audience || "General astrophysics").slice(0, 100);
  const slidesPerPaper = Math.min(4, Math.max(2, Number(body.slides_per_paper) || 2));
  const expectedSlideCount = 2 + papers.length * slidesPerPaper;
  const maxOutputTokens = Math.min(
    16000,
    Math.max(6000, 2000 + papers.length * slidesPerPaper * 500),
  );
  const enrichedPapers = await Promise.all(papers.map(async (paper) => ({
    ...paper,
    figures: await extractFigures(String(paper.arxiv_url || "")),
  })));
  const content: Array<Record<string, unknown>> = [{
    type: "input_text",
    text: JSON.stringify(enrichedPapers),
  }];
  for (const paper of enrichedPapers) {
    for (const figure of paper.figures) {
      content.push({
        type: "input_text",
        text: `Candidate figure for paper_id ${paper.id}. Caption: ${figure.caption}`,
      });
      content.push({ type: "input_image", image_url: figure.url, detail: "low" });
    }
  }

  const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-5.6-luna",
      store: false,
      reasoning: { effort: "low" },
      instructions:
        `Create a figure-first astrophysics Journal Club presentation in ${language} for ${audience}. ` +
        `Create one title slide, exactly ${slidesPerPaper} slides per paper, and one final discussion slide. ` +
        `Return exactly ${expectedSlideCount} slides in total. ` +
        "Use only the supplied paper metadata and abstracts. Do not invent results or methods. " +
        "Every paper slide must retain its paper_id and exact arxiv_url. Use 2–4 concise bullets per slide; " +
        "each bullet should express one idea and normally stay under 22 words. Do not create speaker notes. " +
        "Keep slide titles under 10 words and subtitles under 20 words. Keep each figure explanation under 70 words. " +
        "Prioritize explaining the supplied figures over repeating abstract text. For a figure slide, use the exact " +
        "candidate figure URL, condense its caption to no more than 35 words without changing its meaning, then " +
        "explain how to read its axes, encodings, trend, scientific meaning, " +
        "and limitations. Never claim an axis or trend you cannot see. If a paper has no supplied figure, use empty " +
        "figure fields and create a concise text fallback. Title and final discussion slides must use empty figure fields.",
      input: [{ role: "user", content }],
      max_output_tokens: maxOutputTokens,
      text: {
        verbosity: "low",
        format: {
          type: "json_schema",
          name: "journal_club_deck",
          strict: true,
          schema: deckSchema,
        },
      },
    }),
  });

  const responseBody = await openaiResponse.json();
  if (!openaiResponse.ok) {
    return json({ error: responseBody?.error?.message || "OpenAI request failed." }, 502);
  }

  const refusal = refusalText(responseBody);
  if (refusal) {
    return json({ error: `The presentation request was refused: ${refusal}` }, 422);
  }

  if (responseBody.status !== "completed") {
    const reason = responseBody?.incomplete_details?.reason || "unknown";
    console.error("generate-deck incomplete response", JSON.stringify({
      reason,
      maxOutputTokens,
      paperCount: papers.length,
      slidesPerPaper,
      expectedSlideCount,
    }));
    if (reason === "max_output_tokens") {
      return json({
        error:
          "The presentation became too long to finish. Try fewer slides per paper or generate from a smaller shortlist.",
      }, 422);
    }
    return json({ error: `The presentation generation stopped early (${reason}). Please try again.` }, 502);
  }

  try {
    const deck = JSON.parse(outputText(responseBody));
    if (!deck || !Array.isArray(deck.slides) || deck.slides.length !== expectedSlideCount) {
      console.error("generate-deck unexpected slide count", JSON.stringify({
        expectedSlideCount,
        actualSlideCount: Array.isArray(deck?.slides) ? deck.slides.length : null,
      }));
      return json({ error: "The presentation returned an incomplete set of slides. Please try again." }, 502);
    }
    return json({ deck, model: responseBody.model });
  } catch (error) {
    console.error("generate-deck parse failure", JSON.stringify({
      status: responseBody.status,
      outputTypes: Array.isArray(responseBody.output)
        ? responseBody.output.map((item: Record<string, unknown>) => item?.type)
        : [],
      outputTextLength: outputText(responseBody).length,
      message: error instanceof Error ? error.message : String(error),
    }));
    return json({ error: "The presentation response was malformed. Please try again." }, 502);
  }
});
