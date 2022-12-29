import React, { PropsWithChildren } from 'react';
import cn from 'classnames';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

import '../styles/globals.css';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { BattleButton } from '../components/BattleButton';
import { BattleContextProvider } from '../components/BattleContext';
import { fontTTInterphases } from '../fonts';
import { createServerClient } from '../utils/supabase-server';
import type { Database } from '../types/database';
import Login from '../components/Login';
import SupabaseProvider from '../components/SupabaseProvider';
import SupabaseListener from '../components/SupabaseListener';

export type TypedSupabaseClient = SupabaseClient<Database>;

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createServerClient();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <head />
      <body className={cn(fontTTInterphases.className, 'mx-8 bg-bg text-white')}>
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
      </body>
    </html>
  );
}
