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
