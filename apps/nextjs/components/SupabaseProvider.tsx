"use client";

import type { Session } from "@supabase/auth-helpers-nextjs";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import type { TypedSupabaseClient } from "../app/layout";
import { createBrowserClient } from "../utils/supabase-browser";

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
};

const defaultSupabaseContextValue: SupabaseContext = {
  supabase: {} as TypedSupabaseClient,
  session: null,
};

const SupabaseContext = createContext<SupabaseContext>(
  defaultSupabaseContextValue,
);

type SupabaseProviderProps = PropsWithChildren<{
  session: MaybeSession;
}>;

export default function SupabaseProvider({
  children,
  session,
}: SupabaseProviderProps) {
  const [supabase] = useState(() => createBrowserClient());

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      <>{children}</>
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => useContext(SupabaseContext);
