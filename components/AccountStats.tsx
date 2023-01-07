'use client';

import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';

import { CrystalPoints } from './icons/CrystalPoints';
import { SPRT } from './icons/SPRT';
import { Account } from './Account';

export const AccountStats: FC = () => {
  const { data: crystals } = useQuery(['crystals'], async () => {
    const response = await fetch('/api/getCrystals');
    return response.json();
  })

  const { data: tokens } = useQuery(['tokens'], async () => {
    const response = await fetch('/api/getTokens');
    return response.json();
  })

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
        <Account />
      </div>
    </div>
  );
};
