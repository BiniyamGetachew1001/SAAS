import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Log environment variables (without exposing sensitive data)
    const envInfo = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10) + '...',
      supabaseKeyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10) + '...',
      nodeEnv: process.env.NODE_ENV
    };

    // Create a direct Supabase client for testing
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    // Check if we have the required environment variables
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing Supabase environment variables',
        envInfo
      }, { status: 500 });
    }
    
    // Create a new Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Test a simple query that doesn't require authentication
    const { data: healthCheck, error: healthError } = await supabase.from('content').select('count(*)', { count: 'exact', head: true });
    
    if (healthError) {
      return NextResponse.json({
        success: false,
        error: 'Supabase health check failed',
        details: healthError,
        envInfo
      }, { status: 500 });
    }
    
    // Try to fetch some data
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .limit(5);
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Error fetching data',
        details: error,
        envInfo
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful!',
      data,
      envInfo
    });
  } catch (error) {
    console.error('Unexpected error in debug route:', error);
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
