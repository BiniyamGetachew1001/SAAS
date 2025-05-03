// Script to create the exec_sql function in Supabase
const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://xkwpocyyhwzyicutpzbd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd3BvY3l5aHd6eWljdXRwemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzkzMDksImV4cCI6MjA2MTUxNTMwOX0.bdqsJ3rJ0BwELf7FQEXMHmHdgmWqMSJ5zv5dm-RAldA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createExecSqlFunction() {
  try {
    console.log('Creating exec_sql function in Supabase...');

    // SQL to create the exec_sql function
    const sql = `
      -- Create a function to execute SQL commands
      -- This function should only be callable by authenticated users with admin role
      CREATE OR REPLACE FUNCTION exec_sql(sql text)
      RETURNS void
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      BEGIN
        -- Check if the user has admin role
        IF auth.jwt() ->> 'role' != 'admin' THEN
          RAISE EXCEPTION 'Only admins can execute SQL commands';
        END IF;
        
        -- Execute the SQL
        EXECUTE sql;
      END;
      $$;

      -- Set permissions for the function
      REVOKE ALL ON FUNCTION exec_sql(text) FROM PUBLIC;
      GRANT EXECUTE ON FUNCTION exec_sql(text) TO authenticated;
    `;

    // Execute the SQL directly using the REST API
    const { error } = await supabase.rpc('exec_sql', { sql });

    if (error) {
      // If the exec_sql function doesn't exist yet, we need to create it using the SQL editor
      console.error('Error creating exec_sql function:', error);
      console.log('Please execute the following SQL in the Supabase SQL Editor:');
      console.log(sql);
      return;
    }

    console.log('exec_sql function created successfully!');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createExecSqlFunction();