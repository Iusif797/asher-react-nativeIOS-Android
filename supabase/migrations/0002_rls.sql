alter table companies enable row level security;
alter table profiles enable row level security;
alter table directions enable row level security;
alter table specialists enable row level security;
alter table specialist_slots enable row level security;
alter table consultations enable row level security;
alter table payments enable row level security;
alter table documents enable row level security;
alter table mood_entries enable row level security;
alter table thought_entries enable row level security;
alter table homework_templates enable row level security;
alter table homework_tasks enable row level security;
alter table programs enable row level security;
alter table program_days enable row level security;
alter table program_enrollments enable row level security;
alter table program_day_completions enable row level security;
alter table group_events enable row level security;
alter table group_registrations enable row level security;
alter table courses enable row level security;
alter table course_purchases enable row level security;
alter table subscriptions enable row level security;
alter table library_items enable row level security;
alter table chat_messages enable row level security;
alter table roadmaps enable row level security;
alter table roadmap_stages enable row level security;
alter table roadmap_items enable row level security;
alter table client_notes enable row level security;

create function current_role_of () returns app_role
language sql stable security definer set search_path = public as $$
  select role from profiles where id = auth.uid()
$$;

create function current_specialist_id () returns uuid
language sql stable security definer set search_path = public as $$
  select id from specialists where profile_id = auth.uid()
$$;

create function is_my_client (target uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from consultations
    where specialist_id = current_specialist_id() and client_id = target
  )
$$;

create function has_active_subscription () returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(
    (select is_active and current_period_end > now()
     from subscriptions where client_id = auth.uid()),
    false
  )
$$;

create policy "own profile" on profiles for select using (id = auth.uid());
create policy "update own profile" on profiles for update using (id = auth.uid());

create policy "public read" on directions for select using (true);
create policy "public read" on programs for select using (true);
create policy "public read" on program_days for select using (true);
create policy "public read" on courses for select using (true);
create policy "public read" on group_events for select using (true);
create policy "active specialists" on specialists for select using (is_active);
create policy "free slots" on specialist_slots for select using (true);

create policy "library free or subscribed" on library_items for select
  using (not is_premium or has_active_subscription());

create policy "client owns" on consultations for select
  using (client_id = auth.uid());
create policy "client books" on consultations for insert
  with check (client_id = auth.uid());
create policy "specialist reads own schedule" on consultations for select
  using (specialist_id = current_specialist_id());

create policy "client owns" on payments for select using (client_id = auth.uid());
create policy "client owns" on documents for all using (owner_id = auth.uid());

create policy "client owns" on mood_entries for all
  using (client_id = auth.uid()) with check (client_id = auth.uid());
create policy "therapist reads client mood" on mood_entries for select
  using (current_role_of() = 'therapist' and is_my_client(client_id));

create policy "client owns" on thought_entries for all
  using (client_id = auth.uid()) with check (client_id = auth.uid());
create policy "therapist reads discussed thoughts" on thought_entries for select
  using (discussed and current_role_of() = 'therapist' and is_my_client(client_id));

create policy "client reads own" on homework_tasks for select
  using (client_id = auth.uid());
create policy "client marks done" on homework_tasks for update
  using (client_id = auth.uid()) with check (client_id = auth.uid());
create policy "specialist manages" on homework_tasks for all
  using (specialist_id = current_specialist_id());

create policy "specialist owns" on homework_templates for all
  using (specialist_id = current_specialist_id());

create policy "client owns" on program_enrollments for all
  using (client_id = auth.uid()) with check (client_id = auth.uid());
create policy "client owns" on program_day_completions for all
  using (exists (
    select 1 from program_enrollments e
    where e.id = enrollment_id and e.client_id = auth.uid()
  ));

create policy "client owns" on group_registrations for all
  using (client_id = auth.uid()) with check (client_id = auth.uid());
create policy "client owns" on course_purchases for select
  using (client_id = auth.uid());
create policy "client updates progress" on course_purchases for update
  using (client_id = auth.uid());
create policy "client owns" on subscriptions for select
  using (client_id = auth.uid());

create policy "client owns" on chat_messages for select
  using (client_id = auth.uid());
create policy "client writes" on chat_messages for insert
  with check (client_id = auth.uid() and author = 'client');
create policy "admin reads all" on chat_messages for select
  using (current_role_of() = 'admin');
create policy "admin replies" on chat_messages for insert
  with check (current_role_of() = 'admin' and author = 'admin');

create policy "client owns" on roadmaps for select using (client_id = auth.uid());
create policy "client reads stages" on roadmap_stages for select
  using (exists (select 1 from roadmaps r where r.id = roadmap_id and r.client_id = auth.uid()));
create policy "client reads items" on roadmap_items for select
  using (exists (
    select 1 from roadmap_stages s
    join roadmaps r on r.id = s.roadmap_id
    where s.id = stage_id and r.client_id = auth.uid()
  ));
create policy "therapist manages client roadmap" on roadmaps for all
  using (current_role_of() = 'therapist' and is_my_client(client_id));

create policy "specialist owns notes" on client_notes for all
  using (specialist_id = current_specialist_id());

create function company_stats (target_company uuid)
returns table (
  employees_covered bigint,
  active_this_month bigint,
  sessions_this_month bigint,
  modules_completed bigint
)
language plpgsql stable security definer set search_path = public as $$
begin
  if not exists (
    select 1 from profiles
    where id = auth.uid()
      and role = 'company_admin'
      and company_id = target_company
  ) then
    raise exception 'company_stats: доступ только для администратора этой компании';
  end if;
  return query select
    (select count(*) from profiles p where p.company_id = target_company),
    (select count(distinct m.client_id) from mood_entries m
      join profiles p on p.id = m.client_id
      where p.company_id = target_company
        and m.entry_date > current_date - 30),
    (select count(*) from consultations c
      join profiles p on p.id = c.client_id
      where p.company_id = target_company
        and c.starts_at > now() - interval '30 days'),
    (select count(*) from program_day_completions d
      join program_enrollments e on e.id = d.enrollment_id
      join profiles p on p.id = e.client_id
      where p.company_id = target_company);
end;
$$;

revoke all on function company_stats (uuid) from public;
grant execute on function company_stats (uuid) to authenticated;
