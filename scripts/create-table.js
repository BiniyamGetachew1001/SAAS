// Script to create the content table in Supabase
const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://xkwpocyyhwzyicutpzbd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd3BvY3l5aHd6eWljdXRwemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzkzMDksImV4cCI6MjA2MTUxNTMwOX0.bdqsJ3rJ0BwELf7FQEXMHmHdgmWqMSJ5zv5dm-RAldA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createTable() {
  try {
    console.log('Creating a test table...');

    // Execute a simple query to create a test table
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS test_table (
          id SERIAL PRIMARY KEY,
          name TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (error) {
      console.error('Error creating test table:', error);
      return;
    }

    console.log('Test table created successfully!');

    // Insert some test data
    const { error: insertError } = await supabase
      .from('test_table')
      .insert([
        { name: 'Test 1' },
        { name: 'Test 2' },
        { name: 'Test 3' }
      ]);

    if (insertError) {
      console.error('Error inserting test data:', insertError);
      return;
    }

    console.log('Test data inserted successfully!');

    // Fetch the test data
    const { data: testData, error: selectError } = await supabase
      .from('test_table')
      .select('*');

    if (selectError) {
      console.error('Error selecting test data:', selectError);
      return;
    }

    console.log('Test data:');
    console.log(testData);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTable();
