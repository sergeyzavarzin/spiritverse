"use client";

import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { trpc } from "../contexts/TRPCProvider";
import { fontTSpirit2Beta } from "../fonts";
import { Badge } from "./Badge";
import { useBattle } from "./BattleContext";
import { CrossCircle } from "./icons/CrossCircle";
import { Crystal } from "./icons/Crystal";
import { Health } from "./icons/Health";
import { Laurel } from "./icons/Laurel";
import { Power } from "./icons/Power";
import { Speed } from "./icons/Speed";

type Props = {
  isRival?: boolean;
};

export const Hero: FC<Props> = ({ isRival }) => {
  const { character, rival, step, state, reset } = useBattle();

  const { data: crystals } = trpc.balance.crystals.useQuery();

  const { data: characters, isFetching } = trpc.character.get.useQuery();

  const currentHero = isRival ? rival : character;

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center rounded-3xl bg-gradient-to-b p-5 pb-8",
        !currentHero?.name &&
          "from-backgroundEmptyStart to-backgroundEmptyStart",
        Boolean(currentHero?.name) &&
          isRival &&
          "from-backgroundEnemyStart to-backgroundEnemyStop",
        Boolean(currentHero?.name) &&
          !isRival &&
          "from-backgroundHeroStart to-backgroundHeroStop",
        state === "win" &&
          !isRival &&
          "from-backgroundWinnerStart to-backgroundWinnerStop",
        state === "win" && isRival && "opacity-70",
        state === "loose" && !isRival && "opacity-70",
      )}
    >
      {state === "inactive" && !isRival && (
        <div className="absolute top-6 left-6">
          <div className="mb-2.5 rounded-md bg-[#919eab80] py-1 text-center text-sm">
            {!isFetching && `1/${characters?.length ?? 1}`}
          </div>
          <div className="flex items-center gap-2.5">
            <div className="bg-paramYellow h-8 w-8 rounded-2xl"></div>
            <div className="text-paramYellow text-4xl font-bold">
              {character?.energy ?? ""}
            </div>
          </div>
        </div>
      )}
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
      <div
        className={cn(
          "grid grid-cols-4",
          (state === "win" || state === "loose") && "hidden",
        )}
      >
        <div
          className={cn(
            "px-6",
            isRival ? "border-gray order-4 border-l border-solid" : "order-1",
            step >= 5 && "hidden",
          )}
        >
          <div className="font-thin">Кристалы</div>
          <div className="flex items-center gap-1.5">
            <Crystal className="bg-paramGreen h-6 w-6 rounded-2xl" />
            <div className="text-2xl font-bold">
              {!isRival ? crystals : rival?.crystals ?? "0"}
            </div>
          </div>
        </div>
        <div
          className={cn(
            "border-gray border-l border-solid px-6",
            isRival ? "order-3" : "order-2",
            step >= 4 && "hidden",
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
            step >= 3 && "hidden",
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
        <div
          className={cn(
            "px-6",
            isRival ? "order-1" : "border-gray order-4 border-l border-solid",
            step >= 2 && "hidden",
          )}
        >
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
      {(state === "win" || state === "loose") && !isRival && (
        <>
          <div className="-mt-11 flex">
            {state === "win" && <Laurel className="-scale-x-100" />}
            <div
              className={cn(
                fontTSpirit2Beta.className,
                "text-[150px] uppercase italic leading-[150px]",
              )}
            >
              {state === "win" ? "Победа" : "Поражение"}
            </div>
            {state === "win" && <Laurel />}
          </div>
          <button
            onClick={reset}
            className="absolute top-1/2 left-12 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <CrossCircle />
          </button>
          <div className="absolute top-1/2 right-8 -translate-y-1/2 transform">
            {state === "win" && (
              <div className="text-4xl font-bold">+0.1 SPRT</div>
            )}
            <div className="flex items-center gap-2.5">
              <Power className="bg-paramYellow h-8 w-8 rounded-2xl" />
              <span className="text-4xl font-bold">
                {character?.energy ?? ""}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
