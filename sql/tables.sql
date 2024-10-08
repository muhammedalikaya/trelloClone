CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS TEXT AS $$
    SELECT NULLIF(
        current_setting('request.jwt.claims', true)::json->>'sub',
        ''
    )::text;
$$ LANGUAGE SQL STABLE;

drop table if exists user_boards;
drop table if exists cards;
drop table if exists lists;
drop table if exists boards;
drop table if exists users;

-- Create users table
create table
  users (
    id TEXT PRIMARY KEY,
    username TEXT,
    first_name TEXT,
    email TEXT,
    avatar_url TEXT,
    push_token TEXT,
  );

-- Create boards table
create table boards (
  id bigint generated by default as identity primary key,
  creator text NOT NULL REFERENCES users (id),
  title text default 'Untitled Board',
  description text default 'No description',
  background text default '#126CB3',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
  last_edit timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Many to many table for user <-> boards relationship
create table user_boards (
  id bigint generated by default as identity primary key,
  user_id text NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  board_id bigint references boards ON DELETE CASCADE
);

-- Create lists table
create table lists (
  id bigint generated by default as identity primary key,
  board_id bigint references boards ON DELETE CASCADE not null,
  title text default '',
  position int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Cards table
create table cards (
  id bigint generated by default as identity primary key,
  list_id bigint references lists ON DELETE CASCADE not null,
  board_id bigint references boards ON DELETE CASCADE not null,
  position int not null default 0,
  title text default '',
  description text check (char_length(description) > 0),
  assigned_to text REFERENCES users (id),
  done boolean default false,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Make sure deleted records are included in realtime
alter table cards replica identity full;
alter table lists replica identity full;

alter publication supabase_realtime add table cards;
alter publication supabase_realtime add table lists;


-- Function to get all user boards
create or replace function get_boards_for_authenticated_user()
returns setof bigint
language sql
security definer
set search_path = ''
stable
as $$
    select board_id
    from public.user_boards
    where user_id = public.requesting_user_id()
$$;
