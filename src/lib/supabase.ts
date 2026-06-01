// Run this SQL in the Supabase SQL editor to create the waitlist table:
//
// create table waitlist (
//   id uuid default gen_random_uuid() primary key,
//   email text not null unique,
//   source text default 'waitlist-page',
//   created_at timestamptz default now()
// );
//
// Enable RLS:
// alter table waitlist enable row level security;
//
// Allow inserts from anon:
// create policy "Allow public inserts"
//   on waitlist for insert
//   to anon
//   with check (true);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
