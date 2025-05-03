// Script to insert data into the content table
const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://xkwpocyyhwzyicutpzbd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd3BvY3l5aHd6eWljdXRwemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzkzMDksImV4cCI6MjA2MTUxNTMwOX0.bdqsJ3rJ0BwELf7FQEXMHmHdgmWqMSJ5zv5dm-RAldA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function insertData() {
  try {
    console.log('Inserting data into content table...');

    // Insert sample content
    const { data, error } = await supabase
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
      ])
      .select();

    if (error) {
      console.error('Error inserting data:', error);
      return;
    }

    console.log('Data inserted successfully!');
    console.log('Inserted data:', data);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

insertData();
