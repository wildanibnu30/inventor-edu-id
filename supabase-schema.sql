-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  completed_lessons INTEGER DEFAULT 0,
  completed_lesson_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- User Badges Table
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Forum Posts Table
CREATE TABLE IF NOT EXISTS forum_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum Replies Table
CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercise Files Table (Optional - if storing in database)
CREATE TABLE IF NOT EXISTS exercise_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL,
  category TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size TEXT,
  download_link TEXT NOT NULL,
  video_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_module_id ON user_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_user_id ON forum_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_category ON forum_posts(category);
CREATE INDEX IF NOT EXISTS idx_forum_replies_post_id ON forum_replies(post_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_progress
CREATE POLICY "Users can view their own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_badges
CREATE POLICY "Users can view their own badges"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own badges"
  ON user_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for forum_posts
CREATE POLICY "Anyone can view forum posts"
  ON forum_posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON forum_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own posts"
  ON forum_posts FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for forum_replies
CREATE POLICY "Anyone can view forum replies"
  ON forum_replies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create replies"
  ON forum_replies FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own replies"
  ON forum_replies FOR UPDATE
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- Expert checklist & access control schema
-- -----------------------------------------------------------------------------

-- Expert skills table
CREATE TABLE IF NOT EXISTS expert_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User skills progress
CREATE TABLE IF NOT EXISTS user_skills_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES expert_skills(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

-- Access permissions & status enum
CREATE TYPE IF NOT EXISTS access_status AS ENUM ('pending','approved','rejected');

CREATE TABLE IF NOT EXISTS access_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status access_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(requester_id, target_user_id)
);

-- Indexes and RLS enabling
CREATE INDEX IF NOT EXISTS idx_user_skills_progress_user_id ON user_skills_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_progress_skill_id ON user_skills_progress(skill_id);
CREATE INDEX IF NOT EXISTS idx_access_permissions_requester_id ON access_permissions(requester_id);
CREATE INDEX IF NOT EXISTS idx_access_permissions_target_user_id ON access_permissions(target_user_id);

ALTER TABLE expert_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_skills_progress
-- Users can view their own skills progress
CREATE POLICY "Users can view their own skills progress"
  ON user_skills_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Admins (identified by specific email) can view all user skills progress
CREATE POLICY "Admins can view all skills progress"
  ON user_skills_progress FOR SELECT
  USING (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'wildanibnujamil30@gmail.com'));

-- Users can insert their own skills progress
CREATE POLICY "Users can insert their own skills progress"
  ON user_skills_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own skills progress
CREATE POLICY "Users can update their own skills progress"
  ON user_skills_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for access_permissions
-- Authenticated users can create access requests (requester must be the auth user)
CREATE POLICY "Authenticated users can create access requests"
  ON access_permissions FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

-- Admin can update status on access_permissions
CREATE POLICY "Only admin can update status"
  ON access_permissions FOR UPDATE
  USING (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'wildanibnujamil30@gmail.com'))
  WITH CHECK (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'wildanibnujamil30@gmail.com'));

-- Select policy: requester or target or admin can view access permissions
CREATE POLICY "Requester or target or admin can view access permissions"
  ON access_permissions FOR SELECT
  USING (
    auth.uid() = requester_id OR auth.uid() = target_user_id OR
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'wildanibnujamil30@gmail.com')
  );



