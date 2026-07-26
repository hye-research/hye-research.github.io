# Journal Club AI test

The `explain-paper` Edge Function keeps the OpenAI API key out of the public
GitHub Pages code. It accepts requests only with a valid Supabase login session.

## One-time setup

1. Create an OpenAI Platform API key at <https://platform.openai.com/api-keys>.
2. Add it to the Supabase project as the secret `OPENAI_API_KEY`.
3. Deploy the function:

   ```sh
   supabase functions deploy explain-paper --project-ref zwbyvbygswhdlpruofht
   ```

Do not put the OpenAI API key in this repository or in `journal-club.js`.
