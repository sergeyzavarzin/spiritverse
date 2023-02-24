import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { BattleButton } from '../components/BattleButton';
import { BattleContextProvider } from '../components/BattleContext';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import Login from '../components/Login';
import { ReactQueryProvider } from '../components/ReactQueryProvider';
import SupabaseListener from '../components/SupabaseListener';
import SupabaseProvider from '../components/SupabaseProvider';
import { fontTTInterphases } from '../fonts';
import '../styles/globals.css';
import type { Database } from '../types/supabase';
import { createServerClient } from '../utils/supabase-server';

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
    <html lang="en">
      <head />
      <body className={cn(fontTTInterphases.className, 'mx-8 bg-bg text-white')}>
        <ReactQueryProvider>
          <SupabaseProvider session={session}>
            <SupabaseListener serverAccessToken={session?.access_token} />
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
          </SupabaseProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
