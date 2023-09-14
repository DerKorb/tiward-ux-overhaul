declare module "ti4calc/calculator.js" {
  enum Race {
    Arborec = "Arborec",
    Creuss = "Creuss",
    Hacan = "Hacan",
    JolNar = "JolNar",
    L1Z1X = "L1Z1X",
    Letnev = "Letnev",
    Mentak = "Mentak",
    Muaat = "Muaat",
    Naalu = "Naalu",
    Saar = "Saar",
    Sardakk = "Sardakk",
    Sol = "Sol",
    Virus = "Virus",
    Winnu = "Winnu",
    Xxcha = "Xxcha",
    Yin = "Yin",
    Yssaril = "Yssaril",
  }
  enum UnitType {
    Flagship = "Flagship",
    WarSun = "WarSun",
    Dreadnought = "Dreadnought",
    Cruiser = "Cruiser",
    Carrier = "Carrier",
    Destroyer = "Destroyer",
    Fighter = "Fighter",
    Ground = "Ground",
    PDS = "PDS",
  }

  interface Options {
    race: Race;
    riskDirectHit?: boolean;
  }
  interface Input {
    attackerUnits: { [key in UnitType]?: { count: number } }[];
    defenderUnits: { [key in UnitType]?: { count: number } }[];
    options: {
      attacker: Options;
      defender: Options;
    };
  }
  interface Calculator {
    computeProbabilities: (input: Input) => {
      attacker: any;
      defender: any;
    };
  }
  const calculator: Calculator;
  export { calculator };
}
