// Script to set up an admin user in Supabase
const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://xkwpocyyhwzyicutpzbd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd3BvY3l5aHd6eWljdXRwemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzkzMDksImV4cCI6MjA2MTUxNTMwOX0.bdqsJ3rJ0BwELf7FQEXMHmHdgmWqMSJ5zv5dm-RAldA';

// Admin user details
const adminEmail = 'admin@saas-project.com';
const adminPassword = 'admin123';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupAdminUser() {
  try {
    console.log('Setting up admin user...');

    // Check if user already exists
    const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers();

    if (getUserError) {
      console.error('Error checking existing users:', getUserError);
      console.log('You may need to use the Supabase dashboard to create the admin user manually.');

      // Try to create the user anyway
      console.log('Attempting to create admin user via signup...');
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
      });

      if (signupError) {
        console.error('Error creating admin user:', signupError);
        return;
      }

      if (signupData.user) {
        console.log('Admin user created successfully!');
        console.log('User ID:', signupData.user.id);

        // Add admin role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{ user_id: signupData.user.id, role: 'admin' }]);

        if (roleError) {
          console.error('Error setting admin role:', roleError);
        } else {
          console.log('Admin role assigned successfully!');
        }
      }

      return;
    }

    // Check if admin user already exists
    const existingAdmin = users.find(user => user.email === adminEmail);

    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('User ID:', existingAdmin.id);

      // Check if admin role is assigned
      const { data: roleData, error: roleCheckError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', existingAdmin.id)
        .eq('role', 'admin')
        .single();

      if (roleCheckError && roleCheckError.code !== 'PGRST116') {
        console.error('Error checking admin role:', roleCheckError);
      }

      if (!roleData) {
        // Assign admin role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{ user_id: existingAdmin.id, role: 'admin' }]);

        if (roleError) {
          console.error('Error setting admin role:', roleError);
        } else {
          console.log('Admin role assigned successfully!');
        }
      } else {
        console.log('Admin role already assigned!');
      }

      return;
    }

    // Create admin user
    console.log('Creating admin user...');
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    });

    if (createError) {
      console.error('Error creating admin user:', createError);

      // Try to create the user via signup
      console.log('Attempting to create admin user via signup...');
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
      });

      if (signupError) {
        console.error('Error creating admin user:', signupError);
        return;
      }

      if (signupData.user) {
        console.log('Admin user created successfully!');
        console.log('User ID:', signupData.user.id);

        // Add admin role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{ user_id: signupData.user.id, role: 'admin' }]);

        if (roleError) {
          console.error('Error setting admin role:', roleError);
        } else {
          console.log('Admin role assigned successfully!');
        }
      }

      return;
    }

    if (userData.user) {
      console.log('Admin user created successfully!');
      console.log('User ID:', userData.user.id);

      // Add admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{ user_id: userData.user.id, role: 'admin' }]);

      if (roleError) {
        console.error('Error setting admin role:', roleError);
      } else {
        console.log('Admin role assigned successfully!');
      }
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

setupAdminUser();
