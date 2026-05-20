import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.warn('Missing backend Supabase variables. Check backend/.env');
}

export const supabaseAdmin = createClient(supabaseUrl || '', serviceRoleKey || '');
