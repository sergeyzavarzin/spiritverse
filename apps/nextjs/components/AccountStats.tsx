'use client';

import { FC } from 'react';

import { CrystalPoints } from './icons/CrystalPoints';
import { SPRT } from './icons/SPRT';
import { Account } from './Account';
import { useCrystalBalance } from '../hooks/useCrystalBalance';
import { useTokenBalance } from '../hooks/useTokenBalance';
import { NotificationsCenter } from './NotificationsCenter';

export const AccountStats: FC = () => {
  const { data: crystals } = useCrystalBalance();

  const { data: tokens } = useTokenBalance();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <CrystalPoints />
        <span>Crystals:</span>
        <span className="font-bold text-counterGreen">{crystals}</span>
      </div>
      <div className="flex items-center gap-1">
        <SPRT />
        <span>SPRT:</span>
        <span className="font-bold text-counterBlue">{tokens}</span>
      </div>
      <div>
        <NotificationsCenter />
      </div>
      <div>
        <Account />
      </div>
    </div>
  );
};
