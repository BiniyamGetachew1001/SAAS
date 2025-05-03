// Script to set up Supabase MCP (Management, Content, and Permissions) server
const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://xkwpocyyhwzyicutpzbd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd3BvY3l5aHd6eWljdXRwemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzkzMDksImV4cCI6MjA2MTUxNTMwOX0.bdqsJ3rJ0BwELf7FQEXMHmHdgmWqMSJ5zv5dm-RAldA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupMCPDatabase() {
  try {
    console.log('Setting up Supabase MCP database...');
    let setupSuccess = true;
    let errors = [];

    // Create content_versions table
    console.log('Creating content_versions table...');
    const { error: contentVersionsError } = await supabase.from('content_versions').select('count(*)', { count: 'exact', head: true })
      .then(async (result) => {
        if (result.error && result.error.code === '42P01') { // Table doesn't exist
          return await supabase.rest.post('/rest/v1/rpc/query', {
            body: {
              query: `
                CREATE TABLE IF NOT EXISTS content_versions (
                  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
                  version_data JSONB NOT NULL,
                  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                  created_by UUID
                );
              `
            }
          });
        }
        return { error: null };
      });

    if (contentVersionsError) {
      console.error('Error creating content_versions table:', contentVersionsError);
      setupSuccess = false;
      errors.push({ table: 'content_versions', error: contentVersionsError });
    } else {
      console.log('content_versions table created or already exists');
    }

    // Create user_roles table
    console.log('Creating user_roles table...');
    const { error: userRolesError } = await supabase.from('user_roles').select('count(*)', { count: 'exact', head: true })
      .then(async (result) => {
        if (result.error && result.error.code === '42P01') { // Table doesn't exist
          return await supabase.rest.post('/rest/v1/rpc/query', {
            body: {
              query: `
                CREATE TABLE IF NOT EXISTS user_roles (
                  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                  user_id UUID NOT NULL,
                  role TEXT NOT NULL,
                  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                  UNIQUE(user_id, role)
                );
              `
            }
          });
        }
        return { error: null };
      });

    if (userRolesError) {
      console.error('Error creating user_roles table:', userRolesError);
      setupSuccess = false;
      errors.push({ table: 'user_roles', error: userRolesError });
    } else {
      console.log('user_roles table created or already exists');
    }

    // Create audit_logs table
    console.log('Creating audit_logs table...');
    const { error: auditLogsError } = await supabase.from('audit_logs').select('count(*)', { count: 'exact', head: true })
      .then(async (result) => {
        if (result.error && result.error.code === '42P01') { // Table doesn't exist
          return await supabase.rest.post('/rest/v1/rpc/query', {
            body: {
              query: `
                CREATE TABLE IF NOT EXISTS audit_logs (
                  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                  action TEXT NOT NULL,
                  details JSONB,
                  user_id UUID,
                  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
              `
            }
          });
        }
        return { error: null };
      });

    if (auditLogsError) {
      console.error('Error creating audit_logs table:', auditLogsError);
      setupSuccess = false;
      errors.push({ table: 'audit_logs', error: auditLogsError });
    } else {
      console.log('audit_logs table created or already exists');
    }

    // If we couldn't create the tables using the REST API, we'll need to use the SQL Editor
    if (!setupSuccess) {
      console.error('Error setting up MCP database tables. Please use the SQL Editor in the Supabase dashboard to execute the SQL commands.');
      console.log('The SQL commands are printed below:');
      console.log(`
        -- Create content_versions table for versioning
        CREATE TABLE IF NOT EXISTS content_versions (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
          version_data JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          created_by UUID
        );

        -- Create user_roles table for permission management
        CREATE TABLE IF NOT EXISTS user_roles (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID NOT NULL,
          role TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(user_id, role)
        );

        -- Create audit_logs table for system administration
        CREATE TABLE IF NOT EXISTS audit_logs (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          action TEXT NOT NULL,
          details JSONB,
          user_id UUID,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      // Continue with the rest of the setup, as some tables might have been created successfully
    }

    // Create functions and policies using the SQL Editor
    console.log('The following SQL commands need to be executed in the SQL Editor:');
    console.log(`
      -- Create function to get content statistics
      CREATE OR REPLACE FUNCTION get_content_stats()
      RETURNS JSONB
      LANGUAGE SQL
      AS $$
        SELECT jsonb_build_object(
          'total', (SELECT COUNT(*) FROM content),
          'published', (SELECT COUNT(*) FROM content WHERE status = 'published'),
          'draft', (SELECT COUNT(*) FROM content WHERE status = 'draft'),
          'by_type', jsonb_build_object(
            'book', (SELECT COUNT(*) FROM content WHERE type = 'book'),
            'summary', (SELECT COUNT(*) FROM content WHERE type = 'summary'),
            'business-idea', (SELECT COUNT(*) FROM content WHERE type = 'business-idea')
          )
        );
      $$;

      -- Create function to create content version
      CREATE OR REPLACE FUNCTION create_content_version(content_id UUID)
      RETURNS UUID
      LANGUAGE plpgsql
      AS $$
      DECLARE
        version_id UUID;
      BEGIN
        INSERT INTO content_versions (content_id, version_data)
        SELECT
          content_id,
          to_jsonb(c)
        FROM content c
        WHERE c.id = content_id
        RETURNING id INTO version_id;

        RETURN version_id;
      END;
      $$;

      -- Create function to restore content version
      CREATE OR REPLACE FUNCTION restore_content_version(version_id UUID)
      RETURNS BOOLEAN
      LANGUAGE plpgsql
      AS $$
      DECLARE
        content_id UUID;
        version_data JSONB;
      BEGIN
        -- Get version data
        SELECT cv.content_id, cv.version_data INTO content_id, version_data
        FROM content_versions cv
        WHERE cv.id = version_id;

        IF content_id IS NULL THEN
          RETURN FALSE;
        END IF;

        -- Update content with version data
        UPDATE content
        SET
          title = version_data->>'title',
          type = version_data->>'type',
          description = version_data->>'description',
          status = version_data->>'status',
          updated_at = NOW()
        WHERE id = content_id;

        RETURN TRUE;
      END;
      $$;

      -- Create function for system health check
      CREATE OR REPLACE FUNCTION get_system_health()
      RETURNS JSONB
      LANGUAGE SQL
      AS $$
        SELECT jsonb_build_object(
          'database_size', pg_size_pretty(pg_database_size(current_database())),
          'content_count', (SELECT COUNT(*) FROM content),
          'version_count', (SELECT COUNT(*) FROM content_versions),
          'user_role_count', (SELECT COUNT(*) FROM user_roles),
          'audit_log_count', (SELECT COUNT(*) FROM audit_logs),
          'last_audit', (SELECT created_at FROM audit_logs ORDER BY created_at DESC LIMIT 1)
        );
      $$;

      -- Set up Row Level Security (RLS) for new tables
      ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;
      ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
      ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

      -- Create policies for content_versions
      CREATE POLICY "Allow admins to manage content versions"
        ON content_versions
        FOR ALL
        TO authenticated
        USING (auth.jwt() ->> 'role' = 'admin');

      -- Create policies for user_roles
      CREATE POLICY "Allow admins to manage user roles"
        ON user_roles
        FOR ALL
        TO authenticated
        USING (auth.jwt() ->> 'role' = 'admin');

      -- Create policies for audit_logs
      CREATE POLICY "Allow admins to view audit logs"
        ON audit_logs
        FOR SELECT
        TO authenticated
        USING (auth.jwt() ->> 'role' = 'admin');

      -- Allow anyone to create audit logs (for testing purposes)
      CREATE POLICY "Allow anyone to create audit logs"
        ON audit_logs
        FOR INSERT
        TO anon
        WITH CHECK (true);

      CREATE POLICY "Allow system to create audit logs"
        ON audit_logs
        FOR INSERT
        TO authenticated
        WITH CHECK (true);
    `);

    // Try to add a sample audit log entry if the table was created
    console.log('Attempting to add a sample audit log entry...');
    const { error: auditError } = await supabase
      .from('audit_logs')
      .insert([{
        action: 'mcp_setup',
        details: { message: 'MCP system initialized' },
      }]);

    if (auditError) {
      console.error('Error creating audit log:', auditError);
    } else {
      console.log('Created initial audit log entry');
    }

    // Try to check system health if the function was created
    console.log('Attempting to check system health...');
    const { data: health, error: healthError } = await supabase.rpc('get_system_health');

    if (healthError) {
      console.error('Error getting system health:', healthError);
      console.log('The get_system_health function may not exist yet. Please run the SQL commands in the Supabase dashboard.');
    } else {
      console.log('System health check:');
      console.log(health);
    }

    console.log('MCP setup process completed.');
    if (errors.length > 0) {
      console.log('Some errors occurred during setup. Please check the logs and run the SQL commands in the Supabase dashboard.');
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

setupMCPDatabase();