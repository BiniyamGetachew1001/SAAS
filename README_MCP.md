# Supabase MCP Server

## Overview

The Supabase MCP (Management, Content, and Permissions) server has been added to the project to provide advanced functionality for content management, user permissions, and system administration.

## Features

### Content Management
- Advanced content filtering and pagination
- Content statistics and analytics
- Content versioning with history tracking
- Batch operations for content items

### User Permissions
- Role-based access control
- User role management
- Fine-grained permissions

### System Administration
- Audit logging of system activities
- System health monitoring
- Database statistics

## Getting Started

1. Set up the Supabase MCP server by running:
   ```
   node scripts/setup-supabase-mcp.js
   ```

2. Access the MCP Dashboard at `/admin/mcp`

3. Use the MCP services in your code:
   ```typescript
   import { mcpContentService, mcpPermissionsService, mcpAdminService } from '@/lib/supabase-mcp';
   ```

## Documentation

For detailed documentation on how to use the Supabase MCP server, please refer to the [SUPABASE_MCP_SETUP.md](./SUPABASE_MCP_SETUP.md) file.

## Implementation Details

The Supabase MCP server consists of:

1. **Database Tables**:
   - `content_versions` - For content versioning
   - `user_roles` - For permission management
   - `audit_logs` - For system administration

2. **Service Modules**:
   - `mcpContentService` - For advanced content operations
   - `mcpPermissionsService` - For user role management
   - `mcpAdminService` - For system administration

3. **UI Components**:
   - MCP Dashboard - For visualizing and managing MCP features

## Security

The Supabase MCP server uses Row Level Security (RLS) to ensure that only authorized users can access sensitive operations. All administrative functions are restricted to users with the "admin" role.