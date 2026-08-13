/**
 * Notes By FSir - Supabase Client Configuration
 */

export const getSupabaseConfig = () => {
  const url = import.meta.env.PUBLIC_SUPABASE_URL || "";
  const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "";

  const isConfigured = Boolean(
    url &&
    anonKey &&
    !url.includes("your-supabase-project") &&
    url.trim() !== ""
  );

  return {
    url,
    anonKey,
    isConfigured,
  };
};

export interface Profile {
  id: string;
  email: string;
  role: 'admin' | 'student';
  created_at: string;
}

export interface Suggestion {
  id: string;
  user_id?: string;
  note_id: string;
  suggestion: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}
