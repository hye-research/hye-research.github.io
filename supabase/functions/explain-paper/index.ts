const corsHeaders = {
  "Access-Control-Allow-Origin": "https://hye-research.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const explanationSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    scientific_question: { type: "string" },
    why_it_matters: { type: "string" },
    method: { type: "string" },
    data_instruments: { type: "string" },
    main_result: { type: "string" },
    limitations: { type: "string" },
    discussion_question: { type: "string" },
  },
  required: [
    "scientific_question",
    "why_it_matters",
    "method",
    "data_instruments",
    "main_result",
    "limitations",
    "discussion_question",
  ],
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
        content &&
        typeof content === "object" &&
        content.type === "output_text" &&
        typeof content.text === "string"
      ) {
        return content.text;
      }
    }
  }
  return "";
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
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
  const title = String(body.title || "").slice(0, 500);
  const abstract = String(body.abstract || "").slice(0, 12000);
  const language = body.language === "zh" ? "Chinese" : "English";
  if (!title || !abstract) return json({ error: "The paper title and abstract are required." }, 400);

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
        `You are an astrophysics journal-club assistant. Write in ${language}. ` +
        "Use only the supplied title and abstract. Do not invent details. " +
        "When the abstract does not support a field, say so explicitly. " +
        "Keep each field concise, scientifically accurate, and useful for discussion.",
      input: `Title: ${title}\n\nAbstract: ${abstract}`,
      max_output_tokens: 1800,
      text: {
        verbosity: "medium",
        format: {
          type: "json_schema",
          name: "paper_explanation",
          strict: true,
          schema: explanationSchema,
        },
      },
    }),
  });

  const responseBody = await openaiResponse.json();
  if (!openaiResponse.ok) {
    return json({ error: responseBody?.error?.message || "OpenAI request failed." }, 502);
  }

  try {
    return json({ explanation: JSON.parse(outputText(responseBody)), model: responseBody.model });
  } catch {
    return json({ error: "The AI response could not be parsed." }, 502);
  }
});
