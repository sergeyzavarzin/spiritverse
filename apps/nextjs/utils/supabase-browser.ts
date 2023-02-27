import { Database } from "@spirit/types";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const createBrowserClient = () =>
  createBrowserSupabaseClient<Database>();
