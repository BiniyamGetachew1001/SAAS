// Script to set up the content table in Supabase
const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://xkwpocyyhwzyicutpzbd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd3BvY3l5aHd6eWljdXRwemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzkzMDksImV4cCI6MjA2MTUxNTMwOX0.bdqsJ3rJ0BwELf7FQEXMHmHdgmWqMSJ5zv5dm-RAldA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupContentTable() {
  try {
    console.log('Setting up content table...');

    // Try to create the content table using the REST API
    const { error: createError } = await supabase.rest.post('/rest/v1/rpc/query', {
      body: {
        query: `
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
          
          -- Create policy for authenticated users to manage their own content
          CREATE POLICY "Allow authenticated users to manage content"
            ON content
            FOR ALL
            TO authenticated
            USING (true);
        `
      }
    });

    if (createError) {
      console.error('Error creating content table:', createError);
      console.log('Please use the SQL Editor in the Supabase dashboard to execute the SQL commands.');
      console.log('The SQL commands are printed below:');
      console.log(`
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
      `);
    } else {
      console.log('Content table created successfully!');
    }

    // Add some sample content
    console.log('Adding sample content...');
    const sampleContent = [
      {
        title: 'The Lean Startup',
        type: 'book',
        description: 'How Today\'s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses',
        status: 'published'
      },
      {
        title: 'Zero to One',
        type: 'book',
        description: 'Notes on Startups, or How to Build the Future',
        status: 'published'
      },
      {
        title: 'The Lean Startup Summary',
        type: 'summary',
        description: 'A concise summary of the key points from The Lean Startup',
        status: 'published'
      },
      {
        title: 'Subscription Box for Pet Owners',
        type: 'business-idea',
        description: 'A monthly subscription box for pet owners with toys, treats, and accessories',
        status: 'draft'
      }
    ];

    for (const item of sampleContent) {
      const { data, error } = await supabase.from('content').insert([item]).select();
      
      if (error) {
        console.error(`Error adding sample content "${item.title}":`, error);
      } else {
        console.log(`Added sample content: ${item.title}`);
      }
    }

    // Check content count
    const { count, error: countError } = await supabase.from('content').select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking content count:', countError);
    } else {
      console.log(`Total content items: ${count}`);
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

setupContentTable();
