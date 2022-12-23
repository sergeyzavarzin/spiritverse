import { FC, useMemo } from 'react';
import cn from 'classnames';
import { useBattle } from './BattleContext';

export const BattleMeter: FC = () => {
  const { state, step, hero, rival } = useBattle();

  const title = useMemo(() => {
    switch (step) {
      case 1:
        return 'Здоровье';
      case 2:
        return 'Скорость';
      case 3:
        return 'Сила';
      case 4:
        return 'Кристаллы';
      default:
        return null;
    }
  }, [step]);

  const value = useMemo(() => {
    switch (step) {
      case 1:
        return [hero.health, rival?.health];
      case 2:
        return [hero.speed, rival?.speed];
      case 3:
        return [hero.power, rival?.power];
      case 4:
        return [hero.crystal, rival?.crystal];
      default:
        return [0, 0];
    }
  }, [step, rival, hero]);

  if (state !== 'active' || step < 1 || step > 4) {
    return null;
  }

  return (
    <div
      className={cn(
        'absolute top-1/2 left-1/2 z-10 -mt-20 flex h-[175px] w-[265px] -translate-x-1/2 -translate-y-1/3 transform flex-col justify-between rounded-2xl bg-white p-7 text-black'
      )}
    >
      <div className="font flex items-center justify-center text-center align-middle text-4xl font-semibold">
        {title}
      </div>
      <div className="flex items-center justify-between font-semibold">
        <span className="text-4xl">{value[0]}</span>
        <span>vs</span>
        <span className="text-4xl">{value[1] ?? 0}</span>
      </div>
    </div>
  );
};
