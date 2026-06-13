CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  path TEXT,
  page_url TEXT,
  referrer TEXT,
  source TEXT,
  course TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  country TEXT,
  city TEXT,
  timezone TEXT,
  duration_seconds INTEGER DEFAULT 0,
  entry_page TEXT,
  exit_page TEXT,
  created_at TEXT NOT NULL,
  metadata_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events (created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON analytics_events (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events (event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_course ON analytics_events (course);
CREATE INDEX IF NOT EXISTS idx_analytics_source ON analytics_events (source);
CREATE INDEX IF NOT EXISTS idx_analytics_country ON analytics_events (country);

CREATE TABLE IF NOT EXISTS lms_learners (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  access_code TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL,
  last_login_at TEXT
);

CREATE TABLE IF NOT EXISTS lms_progress (
  learner_id TEXT PRIMARY KEY,
  progress_json TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (learner_id) REFERENCES lms_learners(id)
);

CREATE TABLE IF NOT EXISTS lms_quiz_attempts (
  id TEXT PRIMARY KEY,
  learner_id TEXT NOT NULL,
  assessment_id TEXT NOT NULL,
  assessment_type TEXT NOT NULL,
  level_id TEXT,
  unit_id TEXT,
  score INTEGER NOT NULL,
  correct INTEGER NOT NULL,
  total INTEGER NOT NULL,
  answers_json TEXT NOT NULL,
  writing_response TEXT,
  writing_grade TEXT,
  writing_feedback TEXT,
  writing_criteria_json TEXT,
  marked_by TEXT,
  marked_at TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (learner_id) REFERENCES lms_learners(id)
);

CREATE INDEX IF NOT EXISTS idx_lms_learners_username ON lms_learners (username);
CREATE INDEX IF NOT EXISTS idx_lms_attempts_learner ON lms_quiz_attempts (learner_id);
CREATE INDEX IF NOT EXISTS idx_lms_attempts_created ON lms_quiz_attempts (created_at);
