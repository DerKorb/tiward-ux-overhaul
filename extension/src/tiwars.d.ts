declare interface BoardSystem {
  units: Unit[];
  number: number;
  position: any;
  anomaly: string;
  wormhole?: "Alpha" | "Beta" | "Delta";
  controlTokens: any[];
  commandTokens: any[];

  planets: Planet[];
}

declare type TI4Colors =
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "purple"
  | "orange";

declare type UnitName =
  | "Flagship"
  | "War Sun"
  | "Dreadnought"
  | "Carrier"
  | "Cruiser"
  | "Destroyer"
  | "Fighter"
  | "PDS"
  | "Infantry"
  | "Space Dock";

declare interface PlanetCard {
  name: string;
  exhausted?: boolean;
}
declare interface Player {
  color: TI4Colors;
  faction: string;
  planetCards: PlanetCard[];
}

declare interface Unit {
  color: TI4Colors;
  name: UnitName;
  type: string;
  upgraded: boolean;
}

declare interface TiWarsApi {
  getPlayers: () => Promise<Player[]>;
  getBoardSystems: () => Promise<BoardSystem[]>;
}
declare interface Planet {
  name: string;
  resources: number;
  influence: number;
  units: Unit[];
  tech: "Warfare" | "Biotic" | "Cybernetic" | "Propulsion";
  trait: "Hazardous" | "Industrial" | "Cultural" | "Home";
}
declare interface boardCreation {
  skeletonHexArray: any;
  allBoardSystems: any[];
}

declare module "https://www.twilightwars.com/js/board-creation.js" {
  // Replace 'any' with the actual type
  export default boardCreation;
}

declare module "https://www.twilightwars.com/js/api.js" {
  export default TiWarsApi;
}

declare interface AppExports {
  camera: any;
}
declare module "https://www.twilightwars.com/js/app.js" {
  export default AppExports;
}

declare module "https://www.twilightwars.com/js/utils/geometries.js" {
  const geometries: any; // Replace 'any' with the actual type
  export default geometries;
}
