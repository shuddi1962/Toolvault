-- TOOLVAULT PRO DATABASE SCHEMA
-- Run this in Supabase SQL Editor

-- PROFILES (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free','pro','business')),
  ai_credits_used INT DEFAULT 0,
  ai_credits_limit INT DEFAULT 50,
  storage_used_bytes BIGINT DEFAULT 0,
  storage_limit_bytes BIGINT DEFAULT 104857600,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

-- FILES (cloud storage per user)
CREATE TABLE files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  original_name TEXT,
  size_bytes BIGINT,
  mime_type TEXT,
  s3_key TEXT NOT NULL,
  s3_url TEXT NOT NULL,
  tool_used TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own files" ON files
  FOR ALL USING (auth.uid() = user_id);

-- OPERATIONS LOG
CREATE TABLE operations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  module TEXT NOT NULL,
  tool TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  input_file_ids UUID[],
  output_file_ids UUID[],
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE operations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own operations" ON operations
  FOR ALL USING (auth.uid() = user_id);

-- LEGAL POLICIES
CREATE TABLE legal_policies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT,
  content TEXT,
  slug TEXT UNIQUE,
  platform TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE legal_policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own policies" ON legal_policies
  FOR ALL USING (auth.uid() = user_id);

-- SAVED MUSIC TRACKS
CREATE TABLE saved_tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  track_id TEXT, source TEXT,
  title TEXT, artist TEXT, album TEXT,
  cover_url TEXT, duration INT,
  saved_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE saved_tracks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own tracks" ON saved_tracks
  FOR ALL USING (auth.uid() = user_id);

-- VIDEO WATCH HISTORY
CREATE TABLE watch_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  video_id TEXT, source TEXT,
  title TEXT, thumbnail TEXT,
  watched_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own history" ON watch_history
  FOR ALL USING (auth.uid() = user_id);

-- TEAM MEMBERS (Business plan)
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  invited_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team access" ON team_members
  FOR ALL USING (auth.uid() = owner_id OR auth.uid() = member_id);

-- API KEYS (Business plan)
CREATE TABLE api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  key_hash TEXT UNIQUE NOT NULL,
  label TEXT, last_used TIMESTAMPTZ,
  calls_this_month INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own keys" ON api_keys
  FOR ALL USING (auth.uid() = user_id);

-- COSTS (API usage tracking)
CREATE TABLE costs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  api_name TEXT NOT NULL,
  cost_usd DECIMAL(10,6),
  operation_id UUID REFERENCES operations(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE costs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own costs" ON costs
  FOR ALL USING (auth.uid() = user_id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
