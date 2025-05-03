# Supabase MCP Server Setup

This document provides instructions on how to set up and use the Supabase MCP (Management, Content, and Permissions) server for advanced content management functionality.

## What is Supabase MCP?

The Supabase MCP server extends the basic Supabase functionality with advanced features for:

- **Management**: System administration, audit logs, and health monitoring
- **Content**: Advanced content operations including versioning, batch operations, and statistics
- **Permissions**: User role management and fine-grained access control

## Setup Instructions

### 1. Run the MCP Setup Script

The setup script will create all necessary tables, functions, and policies in your Supabase project:

```bash
node scripts/setup-supabase-mcp.js
```

This script creates:
- `content_versions` table for content versioning
- `user_roles` table for permission management
- `audit_logs` table for system administration
- Several utility functions for statistics and system health

### 2. Update Environment Variables

No additional environment variables are needed beyond your existing Supabase configuration:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Using the MCP Services

The MCP server provides three main service modules:

### 1. Content Management Service

```typescript
import { mcpContentService } from '@/lib/supabase-mcp';

// Get paginated and filtered content
const { data, count } = await mcpContentService.getContent({
  page: 1,
  limit: 10,
  type: 'book',
  status: 'published',
  searchQuery: 'psychology'
});

// Get content statistics
const stats = await mcpContentService.getContentStats();

// Batch update content status
const { success } = await mcpContentService.batchUpdateStatus(
  ['id1', 'id2', 'id3'],
  'published'
);

// Create a content version
const { versionId } = await mcpContentService.createContentVersion('content-id');

// Get content versions
const versions = await mcpContentService.getContentVersions('content-id');

// Restore a content version
const { success } = await mcpContentService.restoreContentVersion('version-id');
```

### 2. Permissions Management Service

```typescript
import { mcpPermissionsService } from '@/lib/supabase-mcp';

// Get user roles
const roles = await mcpPermissionsService.getUserRoles('user-id');

// Assign role to user
const { success } = await mcpPermissionsService.assignRole('user-id', 'editor');

// Remove role from user
const { success } = await mcpPermissionsService.removeRole('user-id', 'editor');
```

### 3. System Administration Service

```typescript
import { mcpAdminService } from '@/lib/supabase-mcp';

// Get audit logs
const logs = await mcpAdminService.getAuditLogs(100);

// Log an action
await mcpAdminService.logAction(
  'content_published',
  { contentId: 'id', title: 'Title' },
  'user-id'
);

// Get system health
const health = await mcpAdminService.getSystemHealth();
```

## Security Considerations

The MCP server uses Supabase's Row Level Security (RLS) to ensure that:

- Only administrators can manage content versions
- Only administrators can manage user roles
- Only administrators can view audit logs
- Any authenticated user can create audit logs

## Extending the MCP Server

You can extend the MCP server by:

1. Adding new tables and functions to the setup script
2. Adding new methods to the service modules in `src/lib/supabase-mcp.ts`
3. Creating new service modules for additional functionality

## Troubleshooting

If you encounter issues with the MCP server:

1. Check the browser console for error messages
2. Verify that all tables and functions were created in the Supabase dashboard
3. Ensure you have the correct permissions to access the MCP features
4. Check the audit logs for any system errors