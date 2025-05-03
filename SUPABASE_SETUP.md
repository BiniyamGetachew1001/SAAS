# Supabase Setup for Content Management

This document provides instructions on how to set up Supabase for the content management system.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project
3. Note your project URL and anon key (you'll need these later)

## 2. Create the Content Table

Run the following SQL in the Supabase SQL Editor:

```sql
-- Create content table
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('book', 'summary', 'business-idea')),
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function
CREATE TRIGGER update_content_updated_at
BEFORE UPDATE ON content
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Set up Row Level Security (RLS)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read published content
CREATE POLICY "Allow anyone to read published content"
  ON content
  FOR SELECT
  USING (status = 'published');

-- Allow authenticated users to read all content
CREATE POLICY "Allow authenticated users to read all content"
  ON content
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users with admin role to manage all content
CREATE POLICY "Allow admins to manage all content"
  ON content
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
```

## 3. Set Up Environment Variables

1. Copy the `.env.local.example` file to `.env.local`
2. Update the values with your Supabase URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 4. Add Sample Content (Optional)

Run the following SQL to add some sample content:

```sql
INSERT INTO content (title, type, description, status)
VALUES
  ('The Psychology of Money', 'book', 'Timeless lessons on wealth, greed, and happiness.', 'published'),
  ('Atomic Habits', 'summary', 'An easy and proven way to build good habits and break bad ones.', 'published'),
  ('Coffee Shop Business Plan', 'business-idea', 'A complete business plan for starting a coffee shop.', 'draft');
```

## 5. Set Up Authentication

For a production application, you would need to:

1. Configure authentication providers in Supabase
2. Update the auth context to use Supabase authentication
3. Set up proper user roles and permissions

For this demo, we're using a simplified authentication system with mock users.

## 6. Testing the Content Management System

1. Start the development server: `npm run dev`
2. Navigate to `/login` and sign in with the admin credentials
3. Access the content management page at `/admin/content`
4. Try creating, editing, and deleting content items

## Troubleshooting

- If you encounter CORS issues, make sure your Supabase project has the correct URL in the API settings
- Check the browser console for any errors related to Supabase connections
- Verify that your environment variables are correctly set up
