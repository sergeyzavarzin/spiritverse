"use client";

import { Session } from "@supabase/auth-helpers-nextjs";
import { AuthChangeEvent } from "@supabase/gotrue-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSupabase } from "../contexts/SupabaseProvider";

type SupabaseListenerProps = {
  serverAccessToken?: string;
};

export default function SupabaseListener({
  serverAccessToken,
}: SupabaseListenerProps) {
  const { supabase } = useSupabase();

  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (session?.access_token !== serverAccessToken) {
          // server and client are out of sync
          // reload the page to fetch fresh server data
          // https://beta.nextjs.org/docs/data-fetching/mutating
          router.refresh();
        }
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, router, supabase]);

  return null;
}
