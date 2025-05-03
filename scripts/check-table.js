// Script to check if the content table exists
const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://xkwpocyyhwzyicutpzbd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd3BvY3l5aHd6eWljdXRwemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzkzMDksImV4cCI6MjA2MTUxNTMwOX0.bdqsJ3rJ0BwELf7FQEXMHmHdgmWqMSJ5zv5dm-RAldA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTable() {
  try {
    console.log('Checking if content table exists...');

    // Try to select from the content table
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error checking table:', error);
      return;
    }

    console.log('Content table exists!');
    console.log('Data:', data);

    // Try to select published content
    console.log('Checking if we can select published content...');
    const { data: publishedData, error: publishedError } = await supabase
      .from('content')
      .select('*')
      .eq('status', 'published')
      .limit(5);

    if (publishedError) {
      console.error('Error selecting published content:', publishedError);
      return;
    }

    console.log('Published content:', publishedData);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkTable();
