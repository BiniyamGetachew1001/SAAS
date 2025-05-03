// Script to set up Supabase database schema and add sample data
const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://xkwpocyyhwzyicutpzbd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd3BvY3l5aHd6eWljdXRwemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzkzMDksImV4cCI6MjA2MTUxNTMwOX0.bdqsJ3rJ0BwELf7FQEXMHmHdgmWqMSJ5zv5dm-RAldA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupDatabase() {
  try {
    console.log('Setting up Supabase database...');

    // Check if the content table exists
    const { data: tableExists, error: tableCheckError } = await supabase
      .from('content')
      .select('count(*)', { count: 'exact', head: true });

    if (tableCheckError && tableCheckError.code !== '42P01') {
      // If error is not "relation does not exist", then it's another error
      console.error('Error checking if table exists:', tableCheckError);
      return;
    }

    if (tableCheckError && tableCheckError.code === '42P01') {
      console.log('Content table does not exist. Creating it...');

      // Create the content table using the REST API
      // Note: This is a simplified approach. For complex schema setup,
      // it's better to use the SQL Editor in the Supabase dashboard.
      const { error: createTableError } = await supabase.rpc('create_content_table');

      if (createTableError) {
        console.error('Error creating content table:', createTableError);
        console.log('Please use the SQL Editor in the Supabase dashboard to create the table.');
        console.log('See the SQL commands in SUPABASE_SETUP.md');
        return;
      }
    } else {
      console.log('Content table already exists.');
    }

    // Check if there's any data in the content table
    const { data: contentCount, error: countError } = await supabase
      .from('content')
      .select('count(*)', { count: 'exact', head: true });

    if (countError) {
      console.error('Error checking content count:', countError);
      return;
    }

    if (contentCount === 0) {
      console.log('No content found. Adding sample data...');

      // Add sample content
      const { error: insertError } = await supabase
        .from('content')
        .insert([
          {
            title: 'The Psychology of Money',
            type: 'book',
            description: 'Timeless lessons on wealth, greed, and happiness.',
            status: 'published'
          },
          {
            title: 'Atomic Habits',
            type: 'summary',
            description: 'An easy and proven way to build good habits and break bad ones.',
            status: 'published'
          },
          {
            title: 'Coffee Shop Business Plan',
            type: 'business-idea',
            description: 'A complete business plan for starting a coffee shop.',
            status: 'draft'
          }
        ]);

      if (insertError) {
        console.error('Error inserting sample data:', insertError);
        return;
      }

      console.log('Sample data added successfully!');
    } else {
      console.log('Content table already has data.');
    }

    // Verify the data
    const { data: content, error: selectError } = await supabase
      .from('content')
      .select('*');

    if (selectError) {
      console.error('Error selecting content:', selectError);
      return;
    }

    console.log('Content in the database:');
    console.log(content);

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

setupDatabase();
