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
  name: string;
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

declare module "https://www.twilightwars.com/js/board-creation.js" {
  // Replace 'any' with the actual type
  interface boardCreation {
    skeletonHexArray: any;
  }
  export default boardCreation;
}

declare module "https://www.twilightwars.com/js/api.js" {
  export default TiWarsApi;
}

declare module "https://www.twilightwars.com/js/utils/geometries.js" {
  const geometries: any; // Replace 'any' with the actual type
  export default geometries;
}
