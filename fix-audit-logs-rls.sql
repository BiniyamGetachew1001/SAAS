-- Drop existing policies on audit_logs
DROP POLICY IF EXISTS "Allow admins to view audit logs" ON audit_logs;
DROP POLICY IF EXISTS "Allow system to create audit logs" ON audit_logs;
DROP POLICY IF EXISTS "Allow anyone to create audit logs" ON audit_logs;

-- Create a more permissive policy for testing
CREATE POLICY "Allow anyone to access audit logs"
  ON audit_logs
  FOR ALL
  USING (true);
