create type app_role as enum ('client', 'therapist', 'admin', 'company_admin');
create type session_format as enum ('online', 'inperson');
create type consultation_status as enum ('upcoming', 'done', 'canceled');
create type homework_kind as enum ('exercise', 'reflection', 'technique', 'material');
create type library_kind as enum ('text', 'video', 'audio', 'practice');
create type payment_status as enum ('pending', 'paid', 'refunded', 'failed');
create type roadmap_status as enum ('done', 'active', 'locked');

create table companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role app_role not null default 'client',
  company_id uuid references companies (id),
  created_at timestamptz not null default now()
);

create table directions (
  id text primary key,
  title text not null,
  short text not null,
  quote text not null,
  about text not null,
  symptoms text[] not null default '{}',
  outcomes text[] not null default '{}'
);

create table specialists (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references profiles (id),
  display_name text not null,
  role_title text not null,
  experience_years int not null,
  price numeric(10, 2) not null,
  formats session_format[] not null,
  direction_ids text[] not null default '{}',
  languages text[] not null default '{}',
  rating numeric(2, 1) not null default 5.0,
  reviews_count int not null default 0,
  about text not null default '',
  is_active boolean not null default true
);

create table specialist_slots (
  id uuid primary key default gen_random_uuid(),
  specialist_id uuid not null references specialists (id) on delete cascade,
  starts_at timestamptz not null,
  is_booked boolean not null default false,
  unique (specialist_id, starts_at)
);

create table consultations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id),
  specialist_id uuid not null references specialists (id),
  starts_at timestamptz not null,
  format session_format not null,
  status consultation_status not null default 'upcoming',
  price numeric(10, 2) not null,
  topic text not null default 'Консультация',
  created_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id),
  consultation_id uuid references consultations (id),
  amount numeric(10, 2) not null,
  currency text not null default 'AZN',
  provider text not null,
  provider_ref text,
  status payment_status not null default 'pending',
  receipt_path text,
  created_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles (id),
  title text not null,
  storage_path text not null,
  size_bytes bigint not null default 0,
  created_at timestamptz not null default now()
);

create table mood_entries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id),
  entry_date date not null,
  score int not null check (score between 1 and 10),
  emotions text[] not null default '{}',
  note text,
  unique (client_id, entry_date)
);

create table thought_entries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id),
  situation text not null,
  thought text not null,
  discussed boolean not null default false,
  created_at timestamptz not null default now()
);

create table homework_templates (
  id uuid primary key default gen_random_uuid(),
  specialist_id uuid not null references specialists (id),
  title text not null,
  kind homework_kind not null,
  description text not null default ''
);

create table homework_tasks (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id),
  specialist_id uuid not null references specialists (id),
  title text not null,
  kind homework_kind not null,
  description text not null,
  done boolean not null default false,
  done_at timestamptz,
  created_at timestamptz not null default now()
);

create table programs (
  id text primary key,
  title text not null,
  subtitle text not null,
  duration_days int not null
);

create table program_days (
  program_id text not null references programs (id) on delete cascade,
  day int not null,
  title text not null,
  theory text not null,
  exercise text not null,
  primary key (program_id, day)
);

create table program_enrollments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id),
  program_id text not null references programs (id),
  started_at timestamptz not null default now(),
  unique (client_id, program_id)
);

create table program_day_completions (
  enrollment_id uuid not null references program_enrollments (id) on delete cascade,
  day int not null,
  completed_at timestamptz not null default now(),
  primary key (enrollment_id, day)
);

create table group_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  leader_id uuid not null references specialists (id),
  starts_at timestamptz not null,
  seats int not null,
  format session_format not null
);

create table group_registrations (
  group_id uuid not null references group_events (id) on delete cascade,
  client_id uuid not null references profiles (id),
  registered_at timestamptz not null default now(),
  primary key (group_id, client_id)
);

create table courses (
  id text primary key,
  title text not null,
  lessons int not null,
  hours int not null,
  price numeric(10, 2) not null
);

create table course_purchases (
  course_id text not null references courses (id),
  client_id uuid not null references profiles (id),
  progress int not null default 0 check (progress between 0 and 100),
  purchased_at timestamptz not null default now(),
  primary key (course_id, client_id)
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null unique references profiles (id),
  is_active boolean not null default false,
  current_period_end timestamptz,
  provider text
);

create table library_items (
  id text primary key,
  situation text not null,
  title text not null,
  kind library_kind not null,
  minutes int not null,
  direction_id text not null references directions (id),
  excerpt text not null,
  body text,
  media_path text,
  is_premium boolean not null default false
);

create table chat_messages (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id),
  author app_role not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table roadmaps (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null unique references profiles (id),
  request text not null,
  created_at timestamptz not null default now()
);

create table roadmap_stages (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid not null references roadmaps (id) on delete cascade,
  position int not null,
  title text not null,
  description text not null,
  status roadmap_status not null default 'locked'
);

create table roadmap_items (
  id uuid primary key default gen_random_uuid(),
  stage_id uuid not null references roadmap_stages (id) on delete cascade,
  position int not null,
  label text not null,
  done boolean not null default false
);

create table client_notes (
  id uuid primary key default gen_random_uuid(),
  specialist_id uuid not null references specialists (id),
  client_id uuid not null references profiles (id),
  note text not null,
  updated_at timestamptz not null default now(),
  unique (specialist_id, client_id)
);

create index idx_consultations_client on consultations (client_id, starts_at desc);
create index idx_consultations_specialist on consultations (specialist_id, starts_at);
create index idx_mood_client_date on mood_entries (client_id, entry_date desc);
create index idx_thoughts_client on thought_entries (client_id, created_at desc);
create index idx_homework_client on homework_tasks (client_id, created_at desc);
create index idx_chat_client on chat_messages (client_id, created_at);
create index idx_slots_specialist on specialist_slots (specialist_id, starts_at) where not is_booked;
