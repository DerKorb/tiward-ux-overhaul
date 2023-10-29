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
declare interface Input {
  attackerUnits: Fleet;
  defenderUnits: Fleet;
  battleType: "Space" | "Ground";
  options: {
    attacker: Options;
    defender: Options;
  };
}

declare module "ti4calc/calculator.js" {
  interface Calculator {
    computeProbabilities: (input: Input) => {
      distribution: { [key: string]: number };
      attacker: string[];
      defender: string[];
    };
  }
  const calculator: Calculator;
  export { calculator };
}
