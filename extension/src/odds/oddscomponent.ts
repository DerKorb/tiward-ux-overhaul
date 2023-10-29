import { calculator } from "ti4calc/calculator.js";

const factionMap: { [tiwars: string]: Race } = {
  "The Arborec": "Arborec",
  "The Barony of Letnev": "Letnev",
  "The Clan of Saar": "Saar",
  "The Embers of Muaat": "Muaat",
  "The Emirates of Hacan": "Hacan",
  "The Federation of Sol": "Sol",
  "The Ghosts of Creuss": "Creuss",
  "The L1Z1X Mindnet": "L1Z1X",
  "The Mentak Coalition": "Mentak",
  "The Naalu Collective": "Naalu",
  "The Nekro Virus": "Virus",
  "The Sardakk N'orr": "Sardakk",
  "The Universities of Jol-Nar": "JolNar",
  "The Winnu": "Winnu",
  "The Xxcha Kingdom": "Xxcha",
  "The Yin Brotherhood": "Yin",
  "The Yssaril Tribes": "Yssaril",
};

const unitMap: { [key in UnitName]: UnitType } = {
  Flagship: "Flagship",
  "War Sun": "WarSun",
  Dreadnought: "Dreadnought",
  Carrier: "Carrier",
  Cruiser: "Cruiser",
  Destroyer: "Destroyer",
  Fighter: "Fighter",
  PDS: "PDS",
  Infantry: "Ground",
  "Space Dock": "PDS",
};

export async function calculateOdds(): Promise<string> {
  const { allBoardSystems } = (await import(
    "https://www.twilightwars.com/js/board-creation.js"
  )) as boardCreation;
  const { getPlayers } = (await import(
    "https://www.twilightwars.com/js/api.js"
  )) as TiWarsApi;
  const { getActiveSystem } = await import(
    "https://www.twilightwars.com/js/utils/extras.js"
  );

  const players = await getPlayers();
  const activeSystem = getActiveSystem(allBoardSystems).userData;

  const allUnitsToBeMoved: Array<Unit> = [];
  if (!activeSystem) {
    return "No defending units";
  }

  console.log(activeSystem);
  for (const system of allBoardSystems) {
    for (const unit of system.unitsToMove ?? []) {
      allUnitsToBeMoved.push(unit);
    }
  }

  if (allUnitsToBeMoved.length === 0) {
    const x = activeSystem.units.filter(
      (unit) => unit.color !== activeSystem.units[0].color
    );
    if (x.length > 0) {
      allUnitsToBeMoved.push(...x);
    } else {
      return "No attacking units";
    }
  }

  const attackingFleet: Fleet = {};
  for (const unit of allUnitsToBeMoved) {
    const unitType = unitMap[unit.name];
    if (!attackingFleet[unitType]) attackingFleet[unitType] = { count: 0 };
    attackingFleet[unitType]!.count++;
  }
  const attackingPlayer = players.find(
    (player) => player.color === allUnitsToBeMoved[0].color
  )!;
  const defendingPlayer = players.find(
    (player) => player.color === activeSystem.units[0].color
  )!;
  console.log(attackingPlayer, defendingPlayer);
  const defendingFleet: Fleet = {};
  for (const unit of activeSystem.units) {
    const unitType = unitMap[unit.name];
    if (!defendingFleet[unitType]) defendingFleet[unitType] = { count: 0 };
    defendingFleet[unitType]!.count++;
  }

  const attackingRace = factionMap[attackingPlayer.faction];
  const defendingRace = factionMap[defendingPlayer.faction];
  const input: Input = {
    attackerUnits: attackingFleet,
    defenderUnits: defendingFleet,
    battleType: "Space",
    options: {
      attacker: { race: attackingRace, riskDirectHit: true },
      defender: { race: defendingRace, riskDirectHit: true },
    },
  };
  console.log(input);
  var result = calculator.computeProbabilities(input);
  console.log(result);
  let r1 = 0;
  let r2 = 0;
  for (const key in result.distribution) {
    if (!Number.isInteger(parseInt(key))) continue;

    console.log(result.distribution[key]);
    if (key.includes("-")) {
      r1 += result.distribution[key];
    } else {
      r2 += result.distribution[key];
    }
  }
  console.log(r1, r2);
  return `${r1.toFixed(2)} - ${r2.toFixed(2)}`;
}
