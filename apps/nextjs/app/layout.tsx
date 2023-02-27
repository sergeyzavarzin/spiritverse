import type { Database } from "@spirit/types";
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import cn from "classnames";
// import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { BattleButton } from "../components/BattleButton";
import { BattleContextProvider } from "../components/BattleContext";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import Login from "../components/Login";
import SupabaseListener from "../components/SupabaseListener";
import SupabaseProvider from "../contexts/SupabaseProvider";
import { TRPCProvider } from "../contexts/TRPCProvider";
import { fontTTInterphases } from "../fonts";
import "../styles/globals.css";
import { createServerClient } from "../utils/supabase-server";

// Next.js 13.2 new metadata definition standard (https://beta.nextjs.org/docs/api-reference/metadata)
export const metadata = {
  // add Metadata type
  title: {
    default: "Spiritverse",
    template: "%s | Spiritverse",
  },
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/shortcut-icon.png",
    // apple: "/apple-icon.png",
    other: {
      // rel: "apple-touch-icon-precomposed",
      url: "/favicon.ico",
    },
  },
  description: "Welcome to Spiritverse",
};

export type TypedSupabaseClient = SupabaseClient<Database>;

// do not cache this layout
export const revalidate = 0;

// const getUserCharacters = async () => {
//   const response = await fetch(`${process.env.BASE_API_URL}/api/getUserCharacters`);
//   return response.json();
// }

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // const userCharacters = await getUserCharacters(); // TODO: get characters from ssr

  return (
    <TRPCProvider>
      <SupabaseProvider session={session}>
        <SupabaseListener serverAccessToken={session?.access_token} />
        <html lang="en">
          <head>
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
          </head>
          <body
            className={cn(fontTTInterphases.className, "bg-bg mx-8 text-white")}
          >
            {session ? (
              <BattleContextProvider>
                <Header />
                <main className="relative grid grid-cols-2 gap-8">
                  <Hero />
                  {children}
                  <BattleButton />
                </main>
              </BattleContextProvider>
            ) : (
              <Login />
            )}
          </body>
        </html>
      </SupabaseProvider>
    </TRPCProvider>
  );
}
