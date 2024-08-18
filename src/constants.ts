export enum DICE_TYPE {
  YELLOW = "yellow",
  ORANGE = "orange",
  RED = "red",
}

export enum PROTECTION {
  NONE = "none",
  LIGHT = "light",
  HEAVY = "heavy",
}
export enum PROBABILITY_MODE {
  SIMULATION = "SIMULATION",
  MATHS = "MATHS",
}

export interface DICE_SET {
  yellow: number;
  orange: number;
  red: number;
  yellowLightning?: number;
  orangeLightning?: number;
  redLightning?: number;
  ignoreProtection?: boolean;
}

export const DICE_DAMAGES = {
  [DICE_TYPE.YELLOW]: [0, 0, 1, 1, 2, 2],
  [DICE_TYPE.ORANGE]: [0, 1, 1, 2, 2, 3],
  [DICE_TYPE.RED]: [1, 1, 2, 2, 3, 3],
};

export const PREVENTED_DAMAGES = {
  [PROTECTION.NONE]: 0,
  [PROTECTION.LIGHT]: 2,
  [PROTECTION.HEAVY]: 3,
};

export type Occurences = { [key: number]: number };

export type Probabilities = { [key: number]: number };
