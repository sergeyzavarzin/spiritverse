"use client";

import { Character } from "@spirit/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { trpc } from "../contexts/TRPCProvider";
import { Battle, BattleScores } from "../utils/battle";

export type BattleState = "inactive" | "searching" | "active" | "win" | "loose";

type BattleContextType = {
  startBattle: () => Promise<void>;
  state: BattleState;
  step: number;
  battleScores: BattleScores;
  character?: Character;
  rival?: Character;
  setCharacter: Dispatch<SetStateAction<Character | undefined>>;
  setRival: Dispatch<SetStateAction<Character | undefined>>;
  reset: () => void;
  battle?: Battle;
};

const defaultValue: BattleContextType = {
  startBattle: () => Promise.resolve(),
  state: "inactive",
  step: 0,
  battleScores: { character: 0, rival: 0 },

  character: undefined,
  setCharacter: () => void 0,

  rival: undefined,
  setRival: () => void 0,

  reset: () => void 0,

  battle: undefined,
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const BattleContext = createContext<BattleContextType>(defaultValue);

const STEP_DELAY = 1400;

export const BattleContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<BattleState>(defaultValue.state);
  const [character, setCharacter] = useState<Character | undefined>(
    defaultValue.character,
  );
  const [rival, setRival] = useState<Character | undefined>(defaultValue.rival);
  const [step, setStep] = useState<number>(defaultValue.step);
  const [battleScores, setBattleScores] = useState(defaultValue.battleScores);
  const [_, setBattle] = useState<Battle | undefined>(defaultValue.battle);

  trpc.character.get.useQuery(undefined, {
    onSuccess: (data: Character[] | undefined) => {
      if (data && Array.isArray(data)) {
        setCharacter(data?.[0]);
      }
    },
  });

  const { refetch: refetchCrystalBalance } = trpc.balance.crystals.useQuery();
  const { refetch: refetchTokenBalance } = trpc.balance.tokens.useQuery();

  const reset = () => {
    setState(defaultValue.state);
    setRival(defaultValue.rival);
    setStep(defaultValue.step);
    setBattleScores(defaultValue.battleScores);
    setBattle(undefined);
  };

  // TODO: delete all this shit
  const getRival = async (characterId: string): Promise<Character> => {
    // const params = new URLSearchParams({ characterId });
    // const response = await fetch(`/api/getRival?${String(params)}`);
    const result = (await Promise.resolve({
      id: characterId,
    })) as unknown as Character;
    return result;
  };

  const router = useRouter();

  const startBattle = async () => {
    if (!character || !character.energy) return;

    router.push("/");

    reset();

    setState("searching");

    const rival = await getRival(character.id);

    if (!rival) {
      reset();
      return;
    }

    setRival(rival);

    const battle = new Battle(character, rival);

    setBattle(battle);

    setState("active");

    await delay(STEP_DELAY);

    setStep(1);

    await delay(STEP_DELAY);

    battle.matchSpec("health");
    setBattleScores(battle.getState());

    setStep(2);

    await delay(STEP_DELAY);

    battle.matchSpec("speed");
    setBattleScores(battle.getState());

    setStep(3);

    await delay(STEP_DELAY);

    battle.matchSpec("power");
    setBattleScores(battle.getState());

    setStep(4);

    await delay(STEP_DELAY);

    battle.matchSpec("crystals");
    setBattleScores(battle.getState());

    setStep(5);

    await delay(STEP_DELAY);

    const result = battle.getResult();

    setState(result.win ? "win" : "loose");

    setCharacter((prevState) =>
      prevState ? { ...prevState, energy: prevState.energy - 1 } : undefined,
    );

    await Promise.all([refetchCrystalBalance(), refetchTokenBalance()]);
  };

  const value = {
    state,
    step,
    battleScores,
    startBattle,
    character,
    setCharacter,
    rival,
    setRival,
    reset,
  };

  return (
    <BattleContext.Provider value={value}>{children}</BattleContext.Provider>
  );
};

export const useBattle = () => useContext(BattleContext);
