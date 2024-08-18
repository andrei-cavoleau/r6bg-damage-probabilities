"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PREVENTED_DAMAGES = exports.DICE_DAMAGES = exports.PROBABILITY_MODE = exports.PROTECTION = exports.DICE_TYPE = void 0;
var DICE_TYPE;
(function (DICE_TYPE) {
    DICE_TYPE["YELLOW"] = "yellow";
    DICE_TYPE["ORANGE"] = "orange";
    DICE_TYPE["RED"] = "red";
})(DICE_TYPE || (exports.DICE_TYPE = DICE_TYPE = {}));
var PROTECTION;
(function (PROTECTION) {
    PROTECTION["NONE"] = "none";
    PROTECTION["LIGHT"] = "light";
    PROTECTION["HEAVY"] = "heavy";
})(PROTECTION || (exports.PROTECTION = PROTECTION = {}));
var PROBABILITY_MODE;
(function (PROBABILITY_MODE) {
    PROBABILITY_MODE["SIMULATION"] = "SIMULATION";
    PROBABILITY_MODE["MATHS"] = "MATHS";
})(PROBABILITY_MODE || (exports.PROBABILITY_MODE = PROBABILITY_MODE = {}));
exports.DICE_DAMAGES = (_a = {},
    _a[DICE_TYPE.YELLOW] = [0, 0, 1, 1, 2, 2],
    _a[DICE_TYPE.ORANGE] = [0, 1, 1, 2, 2, 3],
    _a[DICE_TYPE.RED] = [1, 1, 2, 2, 3, 3],
    _a);
exports.PREVENTED_DAMAGES = (_b = {},
    _b[PROTECTION.NONE] = 0,
    _b[PROTECTION.LIGHT] = 2,
    _b[PROTECTION.HEAVY] = 3,
    _b);
