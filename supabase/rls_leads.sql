-- Enable RLS and allow anonymous INSERT only
alter table public.leads enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='leads' and policyname='anon_insert') then
    create policy anon_insert on public.leads
      for insert to anon
      with check (true);
  end if;
end $$; 