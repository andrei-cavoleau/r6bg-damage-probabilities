"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPossibleDamage = exports.getSimulatedProbabilitiesFromDiceSet = exports.getMathematicalProbabilitiesFromDiceSet = exports.countDices = void 0;
var index_1 = require("./index");
var constants_1 = require("./constants");
var countDices = function (diceSet, protection) {
    var normalDicesCount = diceSet.yellow + diceSet.orange + diceSet.red;
    if (isProtected(protection) && !diceSet.ignoreProtection) {
        return normalDicesCount;
    }
    return (normalDicesCount +
        (diceSet.yellowLightning || 0) +
        (diceSet.orangeLightning || 0) +
        (diceSet.redLightning || 0));
};
exports.countDices = countDices;
var isProtected = function (protection) {
    return protection !== constants_1.PROTECTION.NONE;
};
var getMathematicalProbabilitiesFromDiceSet = function (diceSet, protection) {
    var diceTypesArray = getDiceTypesArray(diceSet, protection);
    var diceCount = diceTypesArray.length;
    var allFacesCombinations = getAllFacesCombinations(diceCount);
    var damages = allFacesCombinations.map(function (combination) {
        return mapFacesCombinationToDamage(combination, diceTypesArray, protection, diceSet.ignoreProtection);
    });
    var probabilities = getProbabilitiesFromDamages(damages);
    return probabilities;
};
exports.getMathematicalProbabilitiesFromDiceSet = getMathematicalProbabilitiesFromDiceSet;
var mapFacesCombinationToDamage = function (combination, diceTypesArray, protection, ignoreProtection) {
    var damage = combination.reduce(function (acc, face, index) {
        return acc + constants_1.DICE_DAMAGES[diceTypesArray[index]][face];
    }, 0);
    damage = getDamageAfterProtection(damage, protection, ignoreProtection);
    return Math.max(damage, 0);
};
var getProbabilitiesFromDamages = function (damages) {
    // reduce to an object with the number of occurrences of each value
    var occurrencesAcc = {};
    var occurrences = damages.reduce(function (acc, value) {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, occurrencesAcc);
    // reduce to an object to the same object with the probabilities (occurrences / total)
    var probabilitiesAcc = {};
    var probabilities = Object.keys(occurrences).reduce(function (acc, key) {
        acc[+key] = occurrences[+key] / damages.length;
        return acc;
    }, probabilitiesAcc);
    return probabilities;
};
var getAllFacesCombinations = function (diceCount) {
    var possibilities = Math.pow(6, diceCount);
    var combinations = [];
    for (var i = 0; i < possibilities; i++) {
        var combination = base10toBase6(i);
        // pad with 0s if needed
        while (combination.length < diceCount) {
            combination.unshift(0);
        }
        combinations.push(combination);
    }
    return combinations;
};
var getDiceTypesArray = function (diceSet, protection) {
    var diceTypeArray = [];
    diceTypeArray.push.apply(diceTypeArray, getDiceTypeArray(constants_1.DICE_TYPE.YELLOW, diceSet.yellow));
    diceTypeArray.push.apply(diceTypeArray, getDiceTypeArray(constants_1.DICE_TYPE.ORANGE, diceSet.orange));
    diceTypeArray.push.apply(diceTypeArray, getDiceTypeArray(constants_1.DICE_TYPE.RED, diceSet.red));
    if (diceSet.ignoreProtection || !isProtected(protection)) {
        diceTypeArray.push.apply(diceTypeArray, getDiceTypeArray(constants_1.DICE_TYPE.YELLOW, diceSet.yellowLightning));
        diceTypeArray.push.apply(diceTypeArray, getDiceTypeArray(constants_1.DICE_TYPE.ORANGE, diceSet.orangeLightning));
        diceTypeArray.push.apply(diceTypeArray, getDiceTypeArray(constants_1.DICE_TYPE.RED, diceSet.redLightning));
    }
    return diceTypeArray;
};
var getDiceTypeArray = function (type, count) {
    if (!count) {
        return [];
    }
    var diceTypeArray = [];
    for (var i = 0; i < count; i++) {
        diceTypeArray.push(type);
    }
    return diceTypeArray;
};
var base10toBase6 = function (number) {
    // convert a number from base 10 to an array of digits in base 6
    var result = [];
    while (number > 0) {
        result.push(number % 6);
        number = Math.floor(number / 6);
    }
    return result.reverse();
};
var getSimulatedProbabilitiesFromDiceSet = function (diceSet, protection) {
    var iterations = 100000;
    var damages = (0, index_1.getSampleFromDiceSet)(diceSet, protection, iterations);
    var probabilities = getProbabilitiesFromDamages(damages);
    return probabilities;
};
exports.getSimulatedProbabilitiesFromDiceSet = getSimulatedProbabilitiesFromDiceSet;
var getPossibleDamage = function (diceSet, protection) {
    var totalDamage = 0;
    totalDamage += throwDices(constants_1.DICE_TYPE.YELLOW, diceSet.yellow);
    totalDamage += throwDices(constants_1.DICE_TYPE.ORANGE, diceSet.orange);
    totalDamage += throwDices(constants_1.DICE_TYPE.RED, diceSet.red);
    if (diceSet.ignoreProtection || !isProtected(protection)) {
        totalDamage += throwDices(constants_1.DICE_TYPE.YELLOW, diceSet.yellowLightning);
        totalDamage += throwDices(constants_1.DICE_TYPE.ORANGE, diceSet.orangeLightning);
        totalDamage += throwDices(constants_1.DICE_TYPE.RED, diceSet.redLightning);
    }
    totalDamage = getDamageAfterProtection(totalDamage, protection, diceSet.ignoreProtection);
    return Math.max(totalDamage, 0);
};
exports.getPossibleDamage = getPossibleDamage;
var getDamageAfterProtection = function (initialDamage, protection, ignoreProtection) {
    if (ignoreProtection) {
        return initialDamage;
    }
    return initialDamage - constants_1.PREVENTED_DAMAGES[protection];
};
var throwDices = function (type, count) {
    if (!count) {
        return 0;
    }
    var damage = 0;
    for (var i = 0; i < count; i++) {
        damage += throwDice(type);
    }
    return damage;
};
var throwDice = function (type) {
    var face = Math.floor(Math.random() * 6);
    return constants_1.DICE_DAMAGES[type][face];
};
