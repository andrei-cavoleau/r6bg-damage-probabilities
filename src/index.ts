import {
  DICE_SET,
  PROTECTION,
  PROBABILITY_MODE,
  Probabilities,
} from "./constants";

import {
  getPossibleDamage,
  countDices,
  getMathematicalProbabilitiesFromDiceSet,
  getSimulatedProbabilitiesFromDiceSet,
} from "./probabilities";

const getProbabilitiesFromDiceSet = (
  diceSet: DICE_SET,
  protection: PROTECTION = PROTECTION.NONE,
  forceMode?: PROBABILITY_MODE,
): Probabilities => {
  const maxDicesForMathsMode = 4; // 4 is the maximum dices thrown at once in the game
  const diceCount = countDices(diceSet, protection);
  if (
    forceMode === PROBABILITY_MODE.MATHS ||
    (diceCount <= maxDicesForMathsMode &&
      forceMode !== PROBABILITY_MODE.SIMULATION)
  ) {
    return getMathematicalProbabilitiesFromDiceSet(diceSet, protection);
  }

  return getSimulatedProbabilitiesFromDiceSet(diceSet, protection);
};

const getSampleFromDiceSet = (
  diceSet: DICE_SET,
  protection: PROTECTION = PROTECTION.NONE,
  size: number = 1,
): number[] => {
  const damages = [];

  for (let i = 0; i < size; i++) {
    damages.push(getPossibleDamage(diceSet, protection));
  }

  return damages;
};

export { getSampleFromDiceSet, getProbabilitiesFromDiceSet };
