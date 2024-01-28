export interface Combat {
  time: string;
  attacker?: string;
  defender?: string;
  systemNumber?: number;
  planetNames?: string[];
  rolls?: {
    unit: string;
    unitDisplayName: string;
    rolls: {
      needed: number;
      rolled: number;
      afterModifiers: number;
      hit: boolean;
    }[];
    modifiers: any[];
  }[];
  attackerLosses?: {
    [unit: string]: number;
  };
  defenderLosses?: {
    [unit: string]: number;
  };
}

export function parseCombats(gameLogs: Log[]): Combat[] {
  console.log("parsing combats", gameLogs);
  let currentCombat: Combat | undefined;
  const combats: Combat[] = [];
  for (let i = 0; i < gameLogs.length; i++) {
    switch (gameLogs[i].event) {
      case "system activated":
        currentCombat = {
          time: gameLogs[i].time,
          attacker: gameLogs[i].user,
          defender: "",
          systemNumber: gameLogs[i].details.systemNumber,
          planetNames: [],
          rolls: [],
        };
        break;
      case "ships moved":
        if (currentCombat) {
          currentCombat.defender = gameLogs[i].user;
        }
        break;
      case "space combat hits assigned":
        if (currentCombat) {
          if (gameLogs[i].user === currentCombat.attacker) {
            currentCombat.attackerLosses = gameLogs[i].details.units;
          } else if (gameLogs[i].user === currentCombat.defender) {
            currentCombat.defenderLosses = gameLogs[i].details.units;
          }
        }
        break;
      case "ground forces committed":
        if (currentCombat) {
          currentCombat.planetNames = gameLogs[i].details.planetNames;
        }
        break;
      case "ground combat rolled":
      case "space combat rolled":
      case "bombardment rolled":
        if (currentCombat) {
          currentCombat.rolls = gameLogs[i].details.results;
        }
        break;
      case "ended turn":
        if (currentCombat) {
          combats.push(currentCombat);
        }
        currentCombat = undefined;
        break;
    }
  }
  console.log(combats);
  return combats;
}
