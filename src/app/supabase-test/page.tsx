"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupabaseTestPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/supabase-test');
      const data = await response.json();
      
      setTestResult(data);
    } catch (err) {
      console.error('Error testing Supabase connection:', err);
      setError('Failed to test connection. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl py-12">
        <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Test Supabase Connection</CardTitle>
            <CardDescription>
              Click the button below to test the connection to your Supabase project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testConnection} 
              disabled={isLoading}
            >
              {isLoading ? 'Testing...' : 'Test Connection'}
            </Button>
            
            {error && (
              <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
                {error}
              </div>
            )}
            
            {testResult && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Test Result:</h3>
                <div className="p-4 bg-muted rounded-md overflow-auto">
                  <pre className="text-sm">{JSON.stringify(testResult, null, 2)}</pre>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <p className="text-sm text-muted-foreground">
              If the test is successful, you should see content data from your Supabase database.
              If it fails, check your environment variables and Supabase project settings.
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
