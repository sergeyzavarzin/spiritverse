import React, { PropsWithChildren } from 'react';
import cn from 'classnames';
import '../styles/globals.css';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { BattleButton } from '../components/BattleButton';
import { BattleContextProvider } from '../components/BattleContext';
import { fontTTInterphases } from '../fonts';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body className={cn(fontTTInterphases.className, 'mx-8 bg-bg text-white')}>
        <BattleContextProvider>
          <Header />
          <main className="relative grid grid-cols-2 gap-8">
            <Hero />
            {children}
            <BattleButton />
          </main>
        </BattleContextProvider>
      </body>
    </html>
  );
}
