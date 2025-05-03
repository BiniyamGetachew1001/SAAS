import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthState = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
};

export function useSupabaseAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Get the initial session
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setAuthState({
          session: data.session,
          user: data.session?.user || null,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error getting session:', error);
        setAuthState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error as Error 
        }));
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState({
          session,
          user: session?.user || null,
          isLoading: false,
          error: null,
        });
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Error signing in:', error);
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error as Error 
      }));
      return { success: false, error };
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Error signing up:', error);
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error as Error 
      }));
      return { success: false, error };
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error as Error 
      }));
      return { success: false, error };
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return {
    session: authState.session,
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    signIn,
    signUp,
    signOut,
  };
}
