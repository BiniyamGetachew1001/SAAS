-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('book', 'summary', 'business-idea')),
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policy for public access to published content
CREATE POLICY "Allow public access to published content"
  ON content
  FOR SELECT
  USING (status = 'published');

-- Create policy for authenticated users to manage content
CREATE POLICY "Allow authenticated users to manage content"
  ON content
  FOR ALL
  TO authenticated
  USING (true);

-- Create policy for anonymous users to manage content (for testing)
CREATE POLICY "Allow anonymous users to manage content"
  ON content
  FOR ALL
  TO anon
  USING (true);

-- Insert sample content
INSERT INTO content (title, type, description, status)
VALUES
  ('The Lean Startup', 'book', 'How Today''s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses', 'published'),
  ('Zero to One', 'book', 'Notes on Startups, or How to Build the Future', 'published'),
  ('The Lean Startup Summary', 'summary', 'A concise summary of the key points from The Lean Startup', 'published'),
  ('Subscription Box for Pet Owners', 'business-idea', 'A monthly subscription box for pet owners with toys, treats, and accessories', 'draft');
