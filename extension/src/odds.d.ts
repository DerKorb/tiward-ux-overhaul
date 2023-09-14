declare type Race =
  | "Arborec"
  | "Creuss"
  | "Hacan"
  | "JolNar"
  | "L1Z1X"
  | "Letnev"
  | "Mentak"
  | "Muaat"
  | "Naalu"
  | "Saar"
  | "Sardakk"
  | "Sol"
  | "Virus"
  | "Winnu"
  | "Xxcha"
  | "Yin"
  | "Yssaril";
declare type UnitType =
  | "Flagship"
  | "WarSun"
  | "Dreadnought"
  | "Cruiser"
  | "Carrier"
  | "Destroyer"
  | "Fighter"
  | "Ground"
  | "PDS";

declare interface Options {
  race: Race;
  riskDirectHit?: boolean;
}
declare type Fleet = {
  [key in UnitType]?: {
    count: number;
  };
};

declare module "ti4calc/calculator.js" {
  interface Input {
    attackerUnits: Fleet;
    defenderUnits: Fleet;
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
