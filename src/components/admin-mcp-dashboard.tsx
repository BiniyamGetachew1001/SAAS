"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { mcpContentService, mcpAdminService, mcpPermissionsService } from "@/lib/supabase-mcp";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export function AdminMCPDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("content");
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [contentStats, setContentStats] = useState<any>(null);
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Check if user is admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login?redirect=/admin/mcp");
    }
  }, [user, isLoading, router]);

  // Fetch data when tab changes
  useEffect(() => {
    if (user && user.role === "admin") {
      fetchData();
    }
  }, [activeTab, user]);

  const fetchData = async () => {
    setIsContentLoading(true);
    try {
      if (activeTab === "content") {
        const stats = await mcpContentService.getContentStats();
        setContentStats(stats);
      } else if (activeTab === "system") {
        const health = await mcpAdminService.getSystemHealth();
        setSystemHealth(health);
        const logs = await mcpAdminService.getAuditLogs(10);
        setAuditLogs(logs);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsContentLoading(false);
    }
  };

  const logTestAction = async () => {
    await mcpAdminService.logAction(
      "test_action",
      { message: "Test action from MCP dashboard" }
    );
    if (activeTab === "system") {
      fetchData();
    }
  };

  // Show loading state while checking auth
  if (isLoading || !user || user.role !== "admin") {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Checking authorization...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">MCP Dashboard</h1>
        <p className="text-gray-500 mb-8">
          Manage your content, permissions, and system administration with the Supabase MCP server.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="system">System Administration</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Overview</CardTitle>
                  <CardDescription>Statistics about your content</CardDescription>
                </CardHeader>
                <CardContent>
                  {isContentLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                    </div>
                  ) : contentStats ? (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Content:</span>
                        <span className="font-medium">{contentStats.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Published:</span>
                        <span className="font-medium">{contentStats.published}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Draft:</span>
                        <span className="font-medium">{contentStats.draft}</span>
                      </div>
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">By Type</h4>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Books:</span>
                          <span className="font-medium">{contentStats.by_type.book}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Summaries:</span>
                          <span className="font-medium">{contentStats.by_type.summary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Business Ideas:</span>
                          <span className="font-medium">{contentStats.by_type["business-idea"]}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No statistics available</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={fetchData} disabled={isContentLoading} variant="outline" className="w-full">
                    {isContentLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Refresh Statistics"
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Actions</CardTitle>
                  <CardDescription>Manage your content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" onClick={() => window.location.href = "/admin/content"}>
                    Go to Content Manager
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => logTestAction()}>
                    Log Test Action
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Versioning</CardTitle>
                  <CardDescription>Manage content versions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">
                    The MCP server provides content versioning capabilities. You can create versions of your content and restore them later.
                  </p>
                  <Button variant="outline" className="w-full" disabled>
                    View Versions (Coming Soon)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Current system status</CardDescription>
                </CardHeader>
                <CardContent>
                  {isContentLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                    </div>
                  ) : systemHealth ? (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Database Size:</span>
                        <span className="font-medium">{systemHealth.database_size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Content Count:</span>
                        <span className="font-medium">{systemHealth.content_count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Version Count:</span>
                        <span className="font-medium">{systemHealth.version_count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">User Role Count:</span>
                        <span className="font-medium">{systemHealth.user_role_count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Audit Log Count:</span>
                        <span className="font-medium">{systemHealth.audit_log_count}</span>
                      </div>
                      {systemHealth.last_audit && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Last Audit:</span>
                          <span className="font-medium">
                            {new Date(systemHealth.last_audit).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">No health data available</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={fetchData} disabled={isContentLoading} variant="outline" className="w-full">
                    {isContentLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Refresh Health Data"
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audit Logs</CardTitle>
                  <CardDescription>Recent system activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {isContentLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                    </div>
                  ) : auditLogs.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Action</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auditLogs.map((log) => (
                            <TableRow key={log.id}>
                              <TableCell className="font-medium">{log.action}</TableCell>
                              <TableCell>
                                {new Date(log.created_at).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No audit logs available</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button onClick={logTestAction} variant="outline">
                    Create Test Log
                  </Button>
                  <Button onClick={fetchData} disabled={isContentLoading} variant="outline">
                    Refresh Logs
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
