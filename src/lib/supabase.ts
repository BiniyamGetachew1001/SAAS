import { createClient } from '@supabase/supabase-js';

// These would typically come from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define table types for better type safety
export type ContentItem = {
  id: string;
  title: string;
  type: 'book' | 'summary' | 'business-idea';
  description: string;
  status: 'published' | 'draft';
  created_at?: string;
  updated_at?: string;
};

// Helper functions for content management
export const contentService = {
  // Get all content items
  async getAll(): Promise<ContentItem[]> {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching content:', error);
      return [];
    }
    
    return data || [];
  },

  // Get content by type
  async getByType(type: ContentItem['type']): Promise<ContentItem[]> {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching ${type} content:`, error);
      return [];
    }
    
    return data || [];
  },

  // Create a new content item
  async create(item: Omit<ContentItem, 'id'>): Promise<ContentItem | null> {
    const { data, error } = await supabase
      .from('content')
      .insert([item])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating content:', error);
      return null;
    }
    
    return data;
  },

  // Update an existing content item
  async update(id: string, updates: Partial<Omit<ContentItem, 'id'>>): Promise<ContentItem | null> {
    const { data, error } = await supabase
      .from('content')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating content:', error);
      return null;
    }
    
    return data;
  },

  // Delete a content item
  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting content:', error);
      return false;
    }
    
    return true;
  }
};
