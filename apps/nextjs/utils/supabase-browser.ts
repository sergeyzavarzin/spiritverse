import { Database } from "@spirit/types";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const createBrowserClient = () =>
  createBrowserSupabaseClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
