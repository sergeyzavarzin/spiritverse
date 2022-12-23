'use client';

import { FC } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { Badge } from './Badge';
import { useBattle } from './BattleContext';
import { Laurel } from './icons/Laurel';
import { fontTSpirit2Beta } from '../fonts';
import { Crystal } from './icons/Crystal';
import { Power } from './icons/Power';
import { Speed } from './icons/Speed';
import { Health } from './icons/Health';
import { CrossCircle } from './icons/CrossCircle';

type Props = {
  isRival?: boolean;
};

export const Hero: FC<Props> = (props) => {
  const { isRival } = props;

  const { hero, rival, step, state, reset } = useBattle();

  const currentHero = isRival ? rival : hero;

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center rounded-3xl bg-gradient-to-b p-5 pb-8',
        !currentHero?.name && 'from-backgroundEmptyStart to-backgroundEmptyStart',
        Boolean(currentHero?.name) && isRival && 'from-backgroundEnemyStart to-backgroundEnemyStop',
        Boolean(currentHero?.name) && !isRival && 'from-backgroundHeroStart to-backgroundHeroStop',
        state === 'win' && !isRival && 'from-backgroundWinnerStart to-backgroundWinnerStop',
        state === 'win' && isRival && 'opacity-70',
        state === 'loose' && !isRival && 'opacity-70'
      )}
    >
      {state === 'inactive' && !isRival && (
        <div className="absolute top-6 left-6">
          <div className="mb-2.5 rounded-md bg-[#919eab80] py-1 text-center text-sm">01/20</div>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-2xl bg-paramYellow"></div>
            <div className="text-4xl font-bold text-paramYellow">{hero.energy}</div>
          </div>
        </div>
      )}
      <div className={cn(fontTSpirit2Beta.className, 'text-[150px] uppercase italic leading-[150px]')}>
        {currentHero?.name ?? '???'}
      </div>
      <Image
        src={currentHero?.image ?? '/empty.png'}
        alt={currentHero?.name ?? '???'}
        width={430}
        height={430}
        className={cn('-mt-[88px]', isRival && '-scale-x-100')}
      />
      <div className={cn('grid grid-cols-4', (state === 'win' || state === 'loose') && 'hidden')}>
        <div
          className={cn(
            'px-6',
            isRival ? 'order-4 border-l-[1px] border-solid border-gray' : 'order-1',
            step >= 5 && 'hidden'
          )}
        >
          <div className="font-thin">Кристалы</div>
          <div className="flex items-center gap-1.5">
            <Crystal className="h-6 w-6 rounded-2xl bg-paramGreen" />
            <div className="text-2xl font-bold">{currentHero?.crystal ?? '?'}</div>
          </div>
        </div>
        <div
          className={cn(
            'border-l-[1px] border-solid border-gray px-6',
            isRival ? 'order-3' : 'order-2',
            step >= 4 && 'hidden'
          )}
        >
          <div className="font-thin">Сила</div>
          <div className=" flex items-center gap-1.5">
            <Power className="h-6 w-6 rounded-2xl bg-paramOrange" />
            <div className="text-2xl font-bold">{currentHero?.power ?? '?'}</div>
          </div>
        </div>
        <div
          className={cn(
            'border-l-[1px] border-solid border-gray px-6',
            isRival ? 'order-2' : 'order-3',
            step >= 3 && 'hidden'
          )}
        >
          <div className="font-thin">Скорость</div>
          <div className="flex items-center gap-1.5">
            <Speed className="h-6 w-6 rounded-2xl bg-paramBlue" />
            <div className="text-2xl font-bold">{currentHero?.speed ?? '?'}</div>
          </div>
        </div>
        <div
          className={cn(
            'px-6',
            isRival ? 'order-1' : 'order-4 border-l-[1px] border-solid border-gray',
            step >= 2 && 'hidden'
          )}
        >
          <div className="font-thin">Здоровье</div>
          <div className="flex items-center gap-1.5">
            <Health className="h-6 w-6 rounded-2xl bg-paramRed" />
            <div className="text-2xl font-bold">{currentHero?.health ?? '?'}</div>
          </div>
        </div>
      </div>
      <Badge width={65} height={130} className="absolute right-5 top-0" />
      {(state === 'win' || state === 'loose') && !isRival && (
        <>
          <div className="-mt-11 flex">
            {state === 'win' && <Laurel className="-scale-x-100" />}
            <div className={cn(fontTSpirit2Beta.className, 'text-[150px] uppercase italic leading-[150px]')}>
              {state === 'win' ? 'Победа' : 'Поражение'}
            </div>
            {state === 'win' && <Laurel />}
          </div>
          <button onClick={reset} className="absolute top-1/2 left-12 -translate-x-1/2 -translate-y-1/2 transform">
            <CrossCircle />
          </button>
          <div className="absolute top-1/2 right-8 -translate-y-1/2 transform">
            {state === 'win' && <div className="text-4xl font-bold">+0.1 SPRT</div>}
            <div className="flex items-center gap-2.5">
              <Power className="h-8 w-8 rounded-2xl bg-paramYellow" />
              <span className="text-4xl font-bold">{hero.energy}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
