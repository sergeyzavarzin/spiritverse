"use client";

import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { trpc } from "../contexts/TRPCProvider";
import { fontTSpirit2Beta } from "../fonts";
import { Badge } from "./Badge";
import { Health } from "./icons/Health";
import { Power } from "./icons/Power";
import { Speed } from "./icons/Speed";

type Props = {
  isRival?: boolean;
};

export const Hero: FC<Props> = ({ isRival }) => {
  const { data: characters } = trpc.character.get.useQuery();

  const currentHero = characters?.[0];

  return (
    <div className="from-backgroundHeroStart to-backgroundHeroStop relative flex w-full flex-col items-center rounded-3xl bg-gradient-to-b p-5 pb-8">
      <div
        className={cn(
          fontTSpirit2Beta.className,
          "text-[150px] uppercase italic leading-[150px]",
        )}
      >
        {currentHero?.name ?? "???"}
      </div>
      <Image
        src={currentHero?.image ?? "/empty.png"}
        alt={currentHero?.name ?? "???"}
        width={430}
        height={430}
        className={cn("-mt-[88px]", isRival && "-scale-x-100")}
      />
      <div className={cn("grid grid-cols-4")}>
        <div
          className={cn(
            "border-gray border-l border-solid px-6",
            isRival ? "order-3" : "order-2",
          )}
        >
          <div className="font-thin">Сила</div>
          <div className=" flex items-center gap-1.5">
            <Power className="bg-paramOrange h-6 w-6 rounded-2xl" />
            <div className="text-2xl font-bold">
              {currentHero?.power ?? "?"}
            </div>
          </div>
        </div>
        <div
          className={cn(
            "border-gray border-l border-solid px-6",
            isRival ? "order-2" : "order-3",
          )}
        >
          <div className="font-thin">Скорость</div>
          <div className="flex items-center gap-1.5">
            <Speed className="bg-paramBlue h-6 w-6 rounded-2xl" />
            <div className="text-2xl font-bold">
              {currentHero?.speed ?? "?"}
            </div>
          </div>
        </div>
        <div className={cn("px-6")}>
          <div className="font-thin">Здоровье</div>
          <div className="flex items-center gap-1.5">
            <Health className="bg-paramRed h-6 w-6 rounded-2xl" />
            <div className="text-2xl font-bold">
              {currentHero?.health ?? "?"}
            </div>
          </div>
        </div>
      </div>
      <Badge width={65} height={130} className="absolute right-5 top-0" />
    </div>
  );
};
