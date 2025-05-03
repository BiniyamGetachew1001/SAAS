import { createClient } from '@supabase/supabase-js';

// Supabase MCP (Management, Content, and Permissions) server configuration
// This extends the basic Supabase client with additional functionality for
// content management, user permissions, and administrative operations

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xkwpocyyhwzyicutpzbd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd3BvY3l5aHd6eWljdXRwemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzkzMDksImV4cCI6MjA2MTUxNTMwOX0.bdqsJ3rJ0BwELf7FQEXMHmHdgmWqMSJ5zv5dm-RAldA';

// Create the MCP client with additional options
export const supabaseMCP = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Enhanced content management service with additional MCP capabilities
export const mcpContentService = {
  // Get all content with pagination and filtering
  async getContent({
    page = 1,
    limit = 10,
    type = null,
    status = null,
    searchQuery = '',
  }: {
    page?: number;
    limit?: number;
    type?: string | null;
    status?: string | null;
    searchQuery?: string;
  }) {
    let query = supabaseMCP.from('content').select('*', { count: 'exact' });

    // Apply filters if provided
    if (type) query = query.eq('type', type);
    if (status) query = query.eq('status', status);
    if (searchQuery) query = query.ilike('title', `%${searchQuery}%`);

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching content:', error);
      return { data: [], count: 0, error };
    }

    return { data: data || [], count: count || 0, error: null };
  },

  // Get content statistics
  async getContentStats() {
    const { data, error } = await supabaseMCP.rpc('get_content_stats');

    if (error) {
      console.error('Error fetching content stats:', error);
      return null;
    }

    return data;
  },

  // Batch operations
  async batchUpdateStatus(ids: string[], status: 'published' | 'draft') {
    const { data, error } = await supabaseMCP
      .from('content')
      .update({ status })
      .in('id', ids)
      .select();

    if (error) {
      console.error('Error batch updating content:', error);
      return { success: false, error };
    }

    return { success: true, data };
  },

  // Content versioning
  async createContentVersion(contentId: string) {
    const { data, error } = await supabaseMCP.rpc('create_content_version', {
      content_id: contentId,
    });

    if (error) {
      console.error('Error creating content version:', error);
      return { success: false, error };
    }

    return { success: true, versionId: data };
  },

  // Get content versions
  async getContentVersions(contentId: string) {
    const { data, error } = await supabaseMCP
      .from('content_versions')
      .select('*')
      .eq('content_id', contentId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching content versions:', error);
      return [];
    }

    return data || [];
  },

  // Restore content version
  async restoreContentVersion(versionId: string) {
    const { data, error } = await supabaseMCP.rpc('restore_content_version', {
      version_id: versionId,
    });

    if (error) {
      console.error('Error restoring content version:', error);
      return { success: false, error };
    }

    return { success: true, data };
  },
};

// User permissions management
export const mcpPermissionsService = {
  // Get user roles
  async getUserRoles(userId: string) {
    const { data, error } = await supabaseMCP
      .from('user_roles')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user roles:', error);
      return [];
    }

    return data || [];
  },

  // Assign role to user
  async assignRole(userId: string, role: string) {
    const { data, error } = await supabaseMCP
      .from('user_roles')
      .insert([{ user_id: userId, role }])
      .select();

    if (error) {
      console.error('Error assigning role:', error);
      return { success: false, error };
    }

    return { success: true, data };
  },

  // Remove role from user
  async removeRole(userId: string, role: string) {
    const { error } = await supabaseMCP
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', role);

    if (error) {
      console.error('Error removing role:', error);
      return { success: false, error };
    }

    return { success: true };
  },
};

// System administration
export const mcpAdminService = {
  // Get system audit logs
  async getAuditLogs(limit = 100) {
    const { data, error } = await supabaseMCP
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }

    return data || [];
  },

  // Create audit log entry
  async logAction(action: string, details: any, userId?: string) {
    const { error } = await supabaseMCP
      .from('audit_logs')
      .insert([{
        action,
        details,
        user_id: userId,
      }]);

    if (error) {
      console.error('Error creating audit log:', error);
      return false;
    }

    return true;
  },

  // Get system health
  async getSystemHealth() {
    const { data, error } = await supabaseMCP.rpc('get_system_health');

    if (error) {
      console.error('Error fetching system health:', error);
      return null;
    }

    return data;
  },
};