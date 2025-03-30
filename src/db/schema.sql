
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

-- Create storage bucket for images if it doesn't exist
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
