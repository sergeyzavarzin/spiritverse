'use client';

import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import { useBattle } from './BattleContext';

type Props = HTMLAttributes<HTMLButtonElement> & {};

export const BattleButton: FC<Props> = () => {
  const { startBattle, state, process, hero } = useBattle();

  return (
    <button
      className={cn(
        'relative flex h-20 items-center rounded-2xl p-7 text-4xl font-bold uppercase transition',
        state === 'searching' || state === 'active' ? 'col-span-2 bg-accentDark' : 'bg-accent',
        state !== 'active' && 'justify-center'
      )}
      onClick={startBattle}
      disabled={hero?.energy <= 0}
    >
      {(state === 'inactive' || state === 'win' || state === 'loose') && (
        <span>{hero?.energy > 0 ? 'начать сражение' : 'недостаточно энергии'}</span>
      )}
      {state === 'searching' && 'идет поиск соперника'}
      {state === 'active' && (
        <div className="flex w-full justify-between ">
          <span>победа</span>
          <div
            className={cn('absolute right-[50%] h-10 rounded-l-3xl bg-accent')}
            style={{ width: `${process.hero / 2}%` }}
          />
          <div
            className={cn('absolute left-[50%] h-10 rounded-r-3xl bg-accent')}
            style={{ width: `${process.rival / 2}%` }}
          />
          <span>поражение</span>
        </div>
      )}
    </button>
  );
};
