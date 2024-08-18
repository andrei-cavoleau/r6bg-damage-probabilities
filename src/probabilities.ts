import { getSampleFromDiceSet } from "./index";
import {
  DICE_DAMAGES,
  DICE_SET,
  DICE_TYPE,
  Occurences,
  PREVENTED_DAMAGES,
  Probabilities,
  PROTECTION,
} from "./constants";

export const countDices = (
  diceSet: DICE_SET,
  protection: PROTECTION,
): number => {
  const normalDicesCount = diceSet.yellow + diceSet.orange + diceSet.red;
  if (isProtected(protection) && !diceSet.ignoreProtection) {
    return normalDicesCount;
  }

  return (
    normalDicesCount +
    (diceSet.yellowLightning || 0) +
    (diceSet.orangeLightning || 0) +
    (diceSet.redLightning || 0)
  );
};

const isProtected = (protection: PROTECTION): boolean =>
  protection !== PROTECTION.NONE;

export const getMathematicalProbabilitiesFromDiceSet = (
  diceSet: DICE_SET,
  protection: PROTECTION,
): Probabilities => {
  const diceTypesArray = getDiceTypesArray(diceSet, protection);
  const diceCount = diceTypesArray.length;
  const allFacesCombinations = getAllFacesCombinations(diceCount);
  const damages = allFacesCombinations.map((combination) =>
    mapFacesCombinationToDamage(
      combination,
      diceTypesArray,
      protection,
      diceSet.ignoreProtection,
    ),
  );

  const probabilities = getProbabilitiesFromDamages(damages);
  return probabilities;
};

const mapFacesCombinationToDamage = (
  combination: number[],
  diceTypesArray: DICE_TYPE[],
  protection: PROTECTION,
  ignoreProtection?: boolean,
): number => {
  let damage = combination.reduce((acc, face, index) => {
    return acc + DICE_DAMAGES[diceTypesArray[index]][face];
  }, 0);

  damage = getDamageAfterProtection(damage, protection, ignoreProtection);
  return Math.max(damage, 0);
};

const getProbabilitiesFromDamages = (damages: number[]): Probabilities => {
  // reduce to an object with the number of occurrences of each value
  const occurrencesAcc: Occurences = {};
  const occurrences = damages.reduce((acc: Occurences, value: number) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, occurrencesAcc);

  // reduce to the same object with the probabilities (occurrences / total)
  const probabilitiesAcc: Probabilities = {};
  const probabilities: Probabilities = Object.keys(occurrences).reduce(
    (acc: Probabilities, key: string) => {
      acc[+key] = occurrences[+key] / damages.length;
      return acc;
    },
    probabilitiesAcc,
  );

  return probabilities;
};

const getAllFacesCombinations = (diceCount: number): number[][] => {
  const possibilities = Math.pow(6, diceCount);
  const combinations = [];
  for (let i = 0; i < possibilities; i++) {
    const combination = base10toBase6(i);
    // pad with 0s if needed
    while (combination.length < diceCount) {
      combination.unshift(0);
    }
    combinations.push(combination);
  }

  return combinations;
};

const getDiceTypesArray = (
  diceSet: DICE_SET,
  protection: PROTECTION,
): DICE_TYPE[] => {
  const diceTypeArray = [];

  diceTypeArray.push(...getDiceTypeArray(DICE_TYPE.YELLOW, diceSet.yellow));
  diceTypeArray.push(...getDiceTypeArray(DICE_TYPE.ORANGE, diceSet.orange));
  diceTypeArray.push(...getDiceTypeArray(DICE_TYPE.RED, diceSet.red));

  if (diceSet.ignoreProtection || !isProtected(protection)) {
    diceTypeArray.push(
      ...getDiceTypeArray(DICE_TYPE.YELLOW, diceSet.yellowLightning),
    );
    diceTypeArray.push(
      ...getDiceTypeArray(DICE_TYPE.ORANGE, diceSet.orangeLightning),
    );
    diceTypeArray.push(
      ...getDiceTypeArray(DICE_TYPE.RED, diceSet.redLightning),
    );
  }

  return diceTypeArray;
};

const getDiceTypeArray = (type: DICE_TYPE, count?: number) => {
  if (!count) {
    return [];
  }

  const diceTypeArray = [];
  for (let i = 0; i < count; i++) {
    diceTypeArray.push(type);
  }

  return diceTypeArray;
};

const base10toBase6 = (number: number): number[] => {
  // convert a number from base 10 to an array of digits in base 6
  const result = [];
  while (number > 0) {
    result.push(number % 6);
    number = Math.floor(number / 6);
  }
  return result.reverse();
};

export const getSimulatedProbabilitiesFromDiceSet = (
  diceSet: DICE_SET,
  protection: PROTECTION,
): Probabilities => {
  const iterations = 100000;
  const damages = getSampleFromDiceSet(diceSet, protection, iterations);
  const probabilities = getProbabilitiesFromDamages(damages);

  return probabilities;
};

export const getPossibleDamage = (
  diceSet: DICE_SET,
  protection: PROTECTION,
): number => {
  let totalDamage = 0;

  totalDamage += throwDices(DICE_TYPE.YELLOW, diceSet.yellow);
  totalDamage += throwDices(DICE_TYPE.ORANGE, diceSet.orange);
  totalDamage += throwDices(DICE_TYPE.RED, diceSet.red);

  if (diceSet.ignoreProtection || !isProtected(protection)) {
    totalDamage += throwDices(DICE_TYPE.YELLOW, diceSet.yellowLightning);
    totalDamage += throwDices(DICE_TYPE.ORANGE, diceSet.orangeLightning);
    totalDamage += throwDices(DICE_TYPE.RED, diceSet.redLightning);
  }

  totalDamage = getDamageAfterProtection(
    totalDamage,
    protection,
    diceSet.ignoreProtection,
  );

  return Math.max(totalDamage, 0);
};

const getDamageAfterProtection = (
  initialDamage: number,
  protection: PROTECTION,
  ignoreProtection?: boolean,
): number => {
  if (ignoreProtection) {
    return initialDamage;
  }

  return initialDamage - PREVENTED_DAMAGES[protection];
};

const throwDices = (type: DICE_TYPE, count?: number) => {
  if (!count) {
    return 0;
  }

  let damage = 0;
  for (let i = 0; i < count; i++) {
    damage += throwDice(type);
  }
  return damage;
};

const throwDice = (type: DICE_TYPE): number => {
  const face = Math.floor(Math.random() * 6);
  return DICE_DAMAGES[type][face];
};
