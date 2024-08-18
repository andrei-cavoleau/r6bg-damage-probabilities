import { DICE_SET, PROTECTION, PROBABILITY_MODE, Probabilities } from "./constants";
declare const getProbabilitiesFromDiceSet: (diceSet: DICE_SET, protection?: PROTECTION, forceMode?: PROBABILITY_MODE) => Probabilities;
declare const getSampleFromDiceSet: (diceSet: DICE_SET, protection?: PROTECTION, size?: number) => number[];
export { getSampleFromDiceSet, getProbabilitiesFromDiceSet };
