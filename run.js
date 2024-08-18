const {
  getSampleFromDiceSet,
  getProbabilitiesFromDiceSet,
  getAllFacesCombinations,
} = require("./dist/index");
const { PROTECTION, PROBABILITY_MODE } = require("./dist/constants");

const diceSet = {
  yellow: 2,
  orange: 0,
  red: 0,
  yellowLightning: 0,
  orangeLightning: 0,
  redLightning: 0,
  ignoreProtection: true,
};
const result = getProbabilitiesFromDiceSet(diceSet, PROTECTION.HEAVY);
console.log(result);
