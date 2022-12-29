'use client';
import { FC } from 'react';
import { CrystalPoints } from './icons/CrystalPoints';
import { SPRT } from './icons/SPRT';
import { Account } from './Account';

export const AccountStats: FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <CrystalPoints />
        <span>Crystals:</span>
        <span className="font-bold text-counterGreen">55.655</span>
      </div>
      <div className="flex items-center gap-1">
        <SPRT />
        <span>SPRT:</span>
        <span className="font-bold text-counterBlue">5.87865</span>
      </div>
      <div>
        <Account />
      </div>
    </div>
  );
};
