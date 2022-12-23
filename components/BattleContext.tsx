'use client';
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

export type BattleState = 'inactive' | 'searching' | 'active' | 'win' | 'loose';

export type HeroParams = {
  id: string;
  name: string;
  image: string;
  crystal: number;
  power: number;
  speed: number;
  health: number;
  energy: number;
};

type BattleProcess = {
  hero: number;
  rival: number;
};

type BattleContextType = {
  startBattle: () => Promise<void>;
  state: BattleState;
  step: number;
  process: BattleProcess;
  hero: HeroParams;
  rival?: HeroParams;
  setHero: Dispatch<SetStateAction<HeroParams>>;
  setRival: Dispatch<SetStateAction<HeroParams | undefined>>;
  reset: () => void;
};

const mockHero: HeroParams = {
  id: '1',
  name: 'SPIRITGREEN',
  image: '/spiritgreen.png',
  crystal: 6,
  power: 15,
  speed: 255,
  health: 30,
  energy: 3,
};

const defaultValue: BattleContextType = {
  startBattle: () => Promise.resolve(),
  state: 'inactive',
  step: 0,
  process: { hero: 0, rival: 0 },
  rival: undefined,
  hero: mockHero,
  setHero: () => {},
  setRival: () => {},
  reset: () => {},
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const BattleContext = createContext<BattleContextType>(defaultValue);

const STEP_DELAY = 1400;

export const BattleContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<BattleState>(defaultValue.state);
  const [hero, setHero] = useState<HeroParams>(defaultValue.hero);
  const [rival, setRival] = useState<HeroParams | undefined>(defaultValue.rival);
  const [step, setStep] = useState<number>(defaultValue.step);
  const [process, setProcess] = useState(defaultValue.process);
  const reset = () => {
    setState(defaultValue.state);
    // setHero(defaultValue.hero);
    setRival(defaultValue.rival);
    setStep(defaultValue.step);
    setProcess(defaultValue.process);
  };
  const getRival = async () => {
    const response = await fetch('/api/getRival');
    return response.json();
  };
  const startBattle = async () => {
    setHero((prevState) => ({ ...prevState, energy: prevState.energy - 1 }));

    reset();

    const battleProcess: BattleProcess = {
      hero: 0,
      rival: 0,
    };

    setState('searching');

    const rival = await getRival();

    setRival(rival);

    setState('active');

    await delay(STEP_DELAY);

    setStep(1);

    await delay(STEP_DELAY);

    battleProcess.hero = hero.health >= rival.health ? battleProcess.hero + 25 : battleProcess.hero;
    battleProcess.rival = hero.health >= rival.health ? battleProcess.rival : battleProcess.rival + 25;
    setProcess(battleProcess);

    setStep(2);

    await delay(STEP_DELAY);

    battleProcess.hero = hero.speed >= rival.speed ? battleProcess.hero + 25 : battleProcess.hero;
    battleProcess.rival = hero.speed >= rival.speed ? battleProcess.rival : battleProcess.rival + 25;
    setProcess(battleProcess);

    setStep(3);

    await delay(STEP_DELAY);

    battleProcess.hero = hero.power >= rival.power ? battleProcess.hero + 25 : battleProcess.hero;
    battleProcess.rival = hero.power >= rival.power ? battleProcess.rival : battleProcess.rival + 25;
    setProcess(battleProcess);

    setStep(4);

    await delay(STEP_DELAY);

    battleProcess.hero = hero.crystal >= rival.crystal ? battleProcess.hero + 25 : battleProcess.hero;
    battleProcess.rival = hero.crystal >= rival.crystal ? battleProcess.rival : battleProcess.rival + 25;
    setProcess(battleProcess);

    setStep(5);

    await delay(STEP_DELAY);

    setState(battleProcess.hero >= battleProcess.rival ? 'win' : 'loose');
  };

  const value = {
    state,
    step,
    process,
    startBattle,
    hero,
    setHero,
    rival,
    setRival,
    reset,
  };

  return <BattleContext.Provider value={value}>{children}</BattleContext.Provider>;
};

export const useBattle = () => useContext(BattleContext);
