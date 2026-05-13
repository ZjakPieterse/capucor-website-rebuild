-- ─── Capucor Business Solutions — Database Schema ────────────────────────────
-- Migration: 001_schema.sql
-- Run via: supabase db push  (or paste into Supabase SQL Editor)

-- Services: one row per billable service category
create table public.services (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  name                text not null,
  description         text,
  base_price          numeric(10,2) not null,
  scale_per_bracket   numeric(10,2) not null,
  bracket_unit_label  text not null,
  display_order       int not null default 0,
  active              boolean not null default true,
  created_at          timestamptz not null default now()
);

-- Brackets: ordinals 0–5 regular; ordinal 6 enterprise (is_enterprise = true)
create table public.brackets (
  id              uuid primary key default gen_random_uuid(),
  service_slug    text not null references public.services(slug) on delete cascade,
  ordinal         int not null,
  label           text not null,
  is_enterprise   boolean not null default false,
  display_order   int not null default 0,
  active          boolean not null default true,
  unique (service_slug, ordinal)
);

-- Package tiers
create table public.tiers (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  name            text not null,
  tagline         text,
  multiplier      numeric(5,2) not null,
  display_order   int not null default 0,
  active          boolean not null default true
);

-- Inclusions per tier per service
create table public.tier_inclusions (
  id              uuid primary key default gen_random_uuid(),
  tier_slug       text not null references public.tiers(slug) on delete cascade,
  service_slug    text not null references public.services(slug) on delete cascade,
  inclusion       text not null,
  display_order   int not null default 0,
  unique (tier_slug, service_slug, inclusion)
);

-- Testimonials
create table public.testimonials (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  role            text,
  business        text,
  quote           text not null,
  avatar_url      text,
  display_order   int not null default 0,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

-- Leads: all form + calculator submissions
create table public.leads (
  id                  uuid primary key default gen_random_uuid(),
  source              text not null check (source in ('signup', 'quote', 'enterprise', 'contact', 'call')),
  name                text not null,
  business            text,
  email               text not null,
  phone               text,
  message             text,
  config              jsonb,
  status              text not null default 'new',
  consent_given       boolean not null default false,
  consent_timestamp   timestamptz,
  created_at          timestamptz not null default now()
);

-- ─── Row-Level Security ────────────────────────────────────────────────────────

alter table public.services        enable row level security;
alter table public.brackets        enable row level security;
alter table public.tiers           enable row level security;
alter table public.tier_inclusions enable row level security;
alter table public.testimonials    enable row level security;
alter table public.leads           enable row level security;

-- Anonymous visitors can read active pricing config
create policy "anon_select_services"
  on public.services for select to anon using (active = true);

create policy "anon_select_brackets"
  on public.brackets for select to anon using (active = true);

create policy "anon_select_tiers"
  on public.tiers for select to anon using (active = true);

create policy "anon_select_tier_inclusions"
  on public.tier_inclusions for select to anon using (true);

create policy "anon_select_testimonials"
  on public.testimonials for select to anon using (active = true);

-- Anonymous visitors can insert leads but not read them
create policy "anon_insert_leads"
  on public.leads for insert to anon with check (true);

-- ─── Indexes ──────────────────────────────────────────────────────────────────

create index on public.brackets (service_slug, ordinal);
create index on public.tier_inclusions (tier_slug, service_slug);
create index on public.leads (created_at desc);
create index on public.testimonials (display_order) where active = true;
