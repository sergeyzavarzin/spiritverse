"use client";

import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import * as process from "process";
import { useSupabase } from "../contexts/SupabaseProvider";
import { getBaseUrl } from "../utils/getBaseUrl";

export default function Login() {
  const { supabase } = useSupabase();

  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center gap-2.5">
      <Auth
        theme="dark"
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        onlyThirdPartyProviders
        providers={["google", "discord", "twitch"]}
        redirectTo={
          process.env.NODE_ENV !== "development"
            ? getBaseUrl()
            : "http://localhost:3000"
        }
      />
    </div>
  );
}
