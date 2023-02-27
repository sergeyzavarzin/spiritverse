"use client";

import { FC } from "react";

import { trpc } from "../contexts/TRPCProvider";
import { Account } from "./Account";
import { CrystalPoints } from "./icons/CrystalPoints";
import { SPRT } from "./icons/SPRT";
import { NotificationsCenter } from "./NotificationsCenter";

export const AccountStats: FC = () => {
  const { data: crystals } = trpc.balance.crystals.useQuery();

  const { data: tokens } = trpc.balance.crystals.useQuery();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <CrystalPoints />
        <span>Crystals:</span>
        <span className="text-counterGreen font-bold">{crystals}</span>
      </div>
      <div className="flex items-center gap-1">
        <SPRT />
        <span>SPRT:</span>
        <span className="text-counterBlue font-bold">{tokens}</span>
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
