create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

select cron.unschedule(jobid)
from cron.job
where jobname = 'journal-club-primary-sync';

select cron.schedule(
  'journal-club-primary-sync',
  '20,50 7 * * 1-5',
  $$
  select net.http_post(
    url := 'https://zwbyvbygswhdlpruofht.supabase.co/functions/v1/trigger-journal-sync',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-journal-cron-secret', (
        select decrypted_secret
        from vault.decrypted_secrets
        where name = 'journal_cron_secret'
        order by created_at desc
        limit 1
      )
    ),
    body := '{}'::jsonb
  );
  $$
);
