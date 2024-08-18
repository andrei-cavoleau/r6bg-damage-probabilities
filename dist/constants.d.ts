export declare enum DICE_TYPE {
    YELLOW = "yellow",
    ORANGE = "orange",
    RED = "red"
}
export declare enum PROTECTION {
    NONE = "none",
    LIGHT = "light",
    HEAVY = "heavy"
}
export declare enum PROBABILITY_MODE {
    SIMULATION = "SIMULATION",
    MATHS = "MATHS"
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
export declare const DICE_DAMAGES: {
    yellow: number[];
    orange: number[];
    red: number[];
};
export declare const PREVENTED_DAMAGES: {
    none: number;
    light: number;
    heavy: number;
};
export type Occurences = {
    [key: number]: number;
};
export type Probabilities = {
    [key: number]: number;
};
