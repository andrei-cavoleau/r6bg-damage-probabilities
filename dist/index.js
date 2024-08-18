"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProbabilitiesFromDiceSet = exports.getSampleFromDiceSet = void 0;
var constants_1 = require("./constants");
var probabilities_1 = require("./probabilities");
var getProbabilitiesFromDiceSet = function (diceSet, protection, forceMode) {
    if (protection === void 0) { protection = constants_1.PROTECTION.NONE; }
    var maxDicesForMathsMode = 4; // 4 is the maximum dices thrown at once in the game
    var diceCount = (0, probabilities_1.countDices)(diceSet, protection);
    if (forceMode === constants_1.PROBABILITY_MODE.MATHS ||
        (diceCount <= maxDicesForMathsMode &&
            forceMode !== constants_1.PROBABILITY_MODE.SIMULATION)) {
        return (0, probabilities_1.getMathematicalProbabilitiesFromDiceSet)(diceSet, protection);
    }
    return (0, probabilities_1.getSimulatedProbabilitiesFromDiceSet)(diceSet, protection);
};
exports.getProbabilitiesFromDiceSet = getProbabilitiesFromDiceSet;
var getSampleFromDiceSet = function (diceSet, protection, size) {
    if (protection === void 0) { protection = constants_1.PROTECTION.NONE; }
    if (size === void 0) { size = 1; }
    var damages = [];
    for (var i = 0; i < size; i++) {
        damages.push((0, probabilities_1.getPossibleDamage)(diceSet, protection));
    }
    return damages;
};
exports.getSampleFromDiceSet = getSampleFromDiceSet;
