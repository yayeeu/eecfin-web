
-- Create the slides table
CREATE TABLE IF NOT EXISTS slides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  "order" INTEGER NOT NULL DEFAULT 1
);

-- Create an index on the order field for faster sorting
CREATE INDEX IF NOT EXISTS slides_order_idx ON slides ("order");

-- Create the ministries table
CREATE TABLE IF NOT EXISTS ministries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive')),
  photo TEXT
);

-- Create an index on the status field for filtering
CREATE INDEX IF NOT EXISTS ministries_status_idx ON ministries (status);

-- Create the member_under_elder table
CREATE TABLE IF NOT EXISTS member_under_elder (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  elder_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(member_id)
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS member_under_elder_member_id_idx ON member_under_elder(member_id);
CREATE INDEX IF NOT EXISTS member_under_elder_elder_id_idx ON member_under_elder(elder_id);

-- Create the contact_log table
CREATE TABLE IF NOT EXISTS contact_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_type TEXT NOT NULL CHECK (contact_type IN ('Text Message', 'In Person', 'Phone Call', 'Email', 'Other')),
  elder_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  notes TEXT,
  flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster lookups on contact_log
CREATE INDEX IF NOT EXISTS contact_log_elder_id_idx ON contact_log(elder_id);
CREATE INDEX IF NOT EXISTS contact_log_member_id_idx ON contact_log(member_id);
CREATE INDEX IF NOT EXISTS contact_log_flagged_idx ON contact_log(flagged);
CREATE INDEX IF NOT EXISTS contact_log_created_at_idx ON contact_log(created_at);

-- Storage bucket for images if it doesn't exist
-- Note: This needs to be executed separately in the Supabase dashboard SQL editor
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('images', 'images', true)
-- ON CONFLICT DO NOTHING;

-- Set up Row Level Security (RLS) policy for the slides table
ALTER TABLE slides ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to select slides
CREATE POLICY "Allow anonymous read access to slides" 
ON slides 
FOR SELECT 
TO anon
USING (true);

-- For authenticated users, allow full access
CREATE POLICY "Allow authenticated users full access to slides" 
ON slides 
FOR ALL 
TO authenticated
USING (true);

-- Set up Row Level Security (RLS) policy for the ministries table
ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to select ministries
CREATE POLICY "Allow anonymous read access to ministries" 
ON ministries 
FOR SELECT 
TO anon
USING (true);

-- For authenticated users, allow full access
CREATE POLICY "Allow authenticated users full access to ministries" 
ON ministries 
FOR ALL 
TO authenticated
USING (true);

-- Set up Row Level Security for the member_under_elder table
ALTER TABLE member_under_elder ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to view member-elder relationships
CREATE POLICY "Allow authenticated read access to member_under_elder" 
ON member_under_elder 
FOR SELECT 
TO authenticated
USING (true);

-- Create policy to allow authenticated users to modify member-elder relationships
CREATE POLICY "Allow authenticated users full access to member_under_elder" 
ON member_under_elder 
FOR ALL 
TO authenticated
USING (true);

-- Set up Row Level Security for the contact_log table
ALTER TABLE contact_log ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to view contact logs
CREATE POLICY "Allow authenticated read access to contact_log" 
ON contact_log 
FOR SELECT 
TO authenticated
USING (true);

-- Create policy to allow authenticated users to modify contact logs
CREATE POLICY "Allow authenticated users full access to contact_log" 
ON contact_log 
FOR ALL 
TO authenticated
USING (true);
