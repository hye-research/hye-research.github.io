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
    speaker_notes: { type: "string" },
  },
  required: [
    "kind", "eyebrow", "title", "subtitle", "bullets",
    "paper_id", "arxiv_url", "speaker_notes",
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
        `Create an astrophysics Journal Club presentation in ${language} for ${audience}. ` +
        `Create one title slide, exactly ${slidesPerPaper} slides per paper, and one final discussion slide. ` +
        "Use only the supplied paper metadata and abstracts. Do not invent results or methods. " +
        "Every paper slide must retain its paper_id and exact arxiv_url. Use concise, presentation-ready bullets. " +
        "Speaker notes may add context but must state when information is not available from the abstract.",
      input: JSON.stringify(papers),
      max_output_tokens: 6000,
      text: {
        verbosity: "medium",
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

  try {
    return json({ deck: JSON.parse(outputText(responseBody)), model: responseBody.model });
  } catch {
    return json({ error: "The generated presentation could not be parsed." }, 502);
  }
});
