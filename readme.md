# Rainbow 6 Board Game - Damage Probabilities

A library to calculate damage probabilities and simulate damage rolls for "6: The BoardGame" a tabletop game based on video game "Rainbow 6: Siege".

## Usage

This section provides examples of how to use the library to calculate probabilities and simulate damage rolls.

### Imports

``` 
import { getProbabilitiesFromDiceSet } from "r6bg-damage-probabilities";
// or
import { getSampleFromDiceSet } from "r6bg-damage-probabilities";
``` 

### Simplest use

#### Probabilities

Get probabilities when throwing 2 yellow dice, 0 orange and 1 red.

`getProbabilitiesFromDiceSet({ yellow: 2, orange: 0, red: 1 })`

Will return object with the probability of each possible damage outcome

```
{
  '1': 0.03758,
  '2': 0.1105,
  '3': 0.22241,
  '4': 0.25765,
  '5': 0.22433,
  '6': 0.11133,
  '7': 0.0362
}
```

#### Sample roll

Get random damage roll when throwing 1 yellow dice, 1 orange and 2 red.

`getSampleFromDiceSet({ yellow: 1, orange: 1, red: 2 });`

Will return an array with the example damage roll (It's an array because 3rd parameters let you choose the number of rolls)

`[7]`

### Use with all parameters

#### Probabilities

Get probabilities when throwing 1 yellow dice, 1 orange and 1 red and 1 orange lightning dice without ignoring protection, using a target with light protection and simulating rolls

```
const diceSet = {
  yellow: 1,
  orange: 1,
  red: 1,
  yellowLightning: 0, // lightning dice are ignored if target is protected
  orangeLightning: 1, // lightning dice are ignored if target is protected
  redLightning: 0, // lightning dice are ignored if target is protected
  ignoreProtection: false, // if the weapon ignores protection (for example grenades)
};
getProbabilitiesFromDiceSet(
  diceSet, // all weapon characteristics above
  PROTECTION.LIGHT, // 'none'/'light'/'heavy', target's protection
  PROBABILITY_MODE.SIMULATION, // 'simulate'/'maths', Simulate rolls instead of calculating probabilities mathematically
);
```

This will return the probabilities object:

```
{
  '0': 0.09431,
  '1': 0.16792,
  '2': 0.23846,
  '3': 0.23927,
  '4': 0.16632,
  '5': 0.07461,
  '6': 0.01911
}
```

#### Sample rolls

Get 5 random possible damage rolls when throwing 2 orange dice, 1 red and 1 red lightning without ignoring protection, using a target with no protection

```
const diceSet = {
  yellow: 0,
  orange: 2,
  red: 1,
  yellowLightning: 0, // lightning dice are ignored if target is protected
  orangeLightning: 0, // lightning dice are ignored if target is protected
  redLightning: 1, // lightning dice are ignored if target is protected
  ignoreProtection: false, // if the weapon ignores protection (for example grenades)
};
getSampleFromDiceSet(
  diceSet, // all weapon characteristics above
  PROTECTION.NONE, // 'none'/'light'/'heavy', target's protection
  5, // Number of rolls to return
);
```

Will return an array with the example damage rolls

`[ 6, 11, 7, 5, 8 ]`

## Installation

`npm i r6bg-damage-probabilities`

## Additional infos

The game's maximum number of dice in a single roll is 4.

By default, probabilities are calculated mathematically for rolls with 4 dice and fewer, and simulating 100 000 rolls if you use more dice.

You can force using one probability mode or another, but with 10+ dice, the mathematical solution will probably crashes as it was not designed for it.
