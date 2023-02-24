'use client';

import { FC } from 'react';
import Link from 'next/link';

import { Hero } from './Hero';
import { BattleMeter } from './BattleMeter';
import { useBattle } from './BattleContext';

export const Battle: FC = () => {
  const { state } = useBattle();
  return (
    <>
      <BattleMeter />
      {state === 'inactive' ? (
        <div
          className="flex h-full w-full items-center rounded-2xl border border-solid border-border bg-gradient-to-b from-backgroundGrayStart to-backgroundEmptyStop">
          <div className="flex w-full flex-col items-center gap-12">
            <div className="text-center text-2xl">
              Выбирай задания <br /> и зарабатывай кристаллы
            </div>
            <div className="text-md text-center text-gray">
              Трать кристаллы на прокачку своего <br /> персонажа выполняя задания в любой игре
            </div>
            <Link href="/tasks" className="rounded-2xl border border border-solid border-border px-12 py-4">
              Выбрать задания
            </Link>
          </div>
        </div>
      ) : (
        <Hero isRival />
      )}
    </>
  );
};
