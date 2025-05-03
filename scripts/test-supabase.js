// Simple script to test Supabase connection
const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://xkwpocyyhwzyicutpzbd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd3BvY3l5aHd6eWljdXRwemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzkzMDksImV4cCI6MjA2MTUxNTMwOX0.bdqsJ3rJ0BwELf7FQEXMHmHdgmWqMSJ5zv5dm-RAldA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');

    // Test if we can connect to Supabase
    const { data, error } = await supabase.from('content').select('*').limit(5);

    if (error) {
      console.error('Error connecting to Supabase:', error);
      return;
    }

    console.log('Connection successful!');
    console.log('Data:', data);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testConnection();
