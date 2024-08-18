import { DICE_SET, Probabilities, PROTECTION } from "./constants";
export declare const countDices: (diceSet: DICE_SET, protection: PROTECTION) => number;
export declare const getMathematicalProbabilitiesFromDiceSet: (diceSet: DICE_SET, protection: PROTECTION) => Probabilities;
export declare const getSimulatedProbabilitiesFromDiceSet: (diceSet: DICE_SET, protection: PROTECTION) => Probabilities;
export declare const getPossibleDamage: (diceSet: DICE_SET, protection: PROTECTION) => number;
