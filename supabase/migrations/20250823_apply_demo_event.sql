create or replace function public.apply_demo_event()
returns trigger language plpgsql as $$
declare
  p jsonb := new.payload;
  s text := new.event_type;
begin
  if s = 'demo_booked' or s = 'demo_rescheduled' then
    update public.leads
       set status = 'scheduled',
           demo_datetime = coalesce((p->>'start')::timestamptz, demo_datetime),
           cal_booking_id = coalesce(p->>'booking_id', cal_booking_id),
           cal_event_url  = coalesce(p->>'event_url',  cal_event_url),
           updated_at = now()
     where id = new.lead_id;
  elsif s = 'demo_canceled' then
    update public.leads
       set status = 'canceled',
           updated_at = now()
     where id = new.lead_id;
  elsif s = 'demo_completed' then
    update public.leads
       set status = 'complete',
           updated_at = now()
     where id = new.lead_id;
  end if;
  return new;
end $$;

drop trigger if exists trg_apply_demo_event on public.lead_events;
create trigger trg_apply_demo_event
after insert on public.lead_events
for each row
when (new.event_type in ('demo_booked','demo_rescheduled','demo_canceled','demo_completed'))
execute function public.apply_demo_event();
