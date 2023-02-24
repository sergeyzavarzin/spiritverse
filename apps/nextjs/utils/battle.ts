import { Character } from '../types/battle';

type CharacterBattleSpecs = Pick<Character, 'power' | 'speed' | 'health' | 'crystals'>;

type BattleResult = {
  isFinished: boolean;
  win: boolean;
};

export type BattleScores = {
  character: number;
  rival: number;
};

export class Battle {
  constructor(private readonly character: Character, private readonly rival: Character) {
    this.result = {
      isFinished: false,
      win: false,
    };
    this.state = {
      character: 0,
      rival: 0,
    };
  }

  readonly result: BattleResult;
  readonly state: BattleScores;

  getResult() {
    this.result.win = this.state.character >= this.state.rival;
    return this.result;
  }

  getState() {
    return this.state;
  }

  getImmediateBattleResult() {
    const specKeys: Array<keyof CharacterBattleSpecs> = ['power', 'speed', 'health', 'crystals'];
    specKeys.forEach((specKey) => {
      this.matchSpec(specKey);
    });
    return this.getResult();
  }

  matchSpec(specKey: keyof CharacterBattleSpecs) {
    if (this.character[specKey] >= this.rival[specKey]) {
      this.state.character += 25;
    } else {
      this.state.rival += 25;
    }
  }
}
