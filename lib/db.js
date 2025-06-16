import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to execute SQL queries
export async function sql(query, params = []) {
  try {
    const { data, error } = await supabase.rpc('execute_sql', {
      query_text: query,
      query_params: params
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('SQL query error:', error);
    throw error;
  }
}

// Export the Supabase client for direct database operations
export { supabase }; 