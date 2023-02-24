"use client";

import cn from "classnames";
import { FC, HTMLAttributes } from "react";
import { useBattle } from "./BattleContext";

type Props = HTMLAttributes<HTMLButtonElement>;

export const BattleButton: FC<Props> = () => {
  const { startBattle, state, battleScores, character } = useBattle();

  return (
    <button
      className={cn(
        "relative flex h-20 items-center rounded-2xl p-7 text-4xl font-bold uppercase transition",
        state === "searching" || state === "active"
          ? "bg-accentDark col-span-2"
          : "bg-accent",
        state !== "active" && "justify-center",
      )}
      onClick={startBattle}
      disabled={Number(character?.energy) <= 0}
    >
      {(state === "inactive" || state === "win" || state === "loose") && (
        <span>
          {Number(character?.energy) > 0
            ? "начать сражение"
            : "недостаточно энергии"}
        </span>
      )}
      {state === "searching" && "идет поиск соперника"}
      {state === "active" && (
        <div className="flex w-full justify-between ">
          <span>победа</span>
          <div
            className={cn("bg-accent absolute right-1/2 h-10 rounded-l-3xl")}
            style={{ width: `${battleScores.character / 2}%` }}
          />
          <div
            className={cn("bg-accent absolute left-1/2 h-10 rounded-r-3xl")}
            style={{ width: `${battleScores.rival / 2}%` }}
          />
          <span>поражение</span>
        </div>
      )}
    </button>
  );
};
