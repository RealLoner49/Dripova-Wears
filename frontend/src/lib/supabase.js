import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase env variables. Create a .env file from .env.example');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com').toLowerCase();
