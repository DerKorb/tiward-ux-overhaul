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

declare interface ActionCard {
  name: string;
  ability: {
    used: boolean;
    delayedEffect: boolean;
    _id: string;
    isComponentAction: boolean;
    step: string;
    timing: string;
  };
}

interface Player {
  _id: string;
  reinforcements: {
    commandTokens: number;
    units: Array<{
      cost: {
        value: number;
        units: number;
      };
      combat: {
        value: number;
        rolls: number;
      };
      sustainDamage: {
        used: boolean;
        thisRound: boolean;
      };
      upgraded: boolean;
      _id: string;
      displayName: string;
      move: number;
      capacity: number;
      name: string;
      type: string;
      color: string;
    }>;
  };
  eliminated: boolean;
  passed: boolean;
  onSecondAction: boolean;
  tradeGoods: number;
  commodities: number;
  fleetPool: number;
  strategyPool: number;
  tacticPool: number;
  victoryPoints: number;
  hits: number;
  nonFighterHits: number;
  zombies: number;
  alastorUnitIds: string[];
  user: {
    _id: string;
    username: string;
    avatar: string;
  };
  number: number;
  faction: string;
  color: "red" | "green" | "blue" | "yellow" | "purple" | "orange";
  planetCards: Array<{
    _id: string;
    name: string;
    resources: number;
    influence: number;
    exhausted: boolean;
    faction: string;
    units: any[];
    laws: any[];
  }>;
  promissoryNotes: Array<{
    revealed: boolean;
    _id: string;
    name: string;
    color: string;
    ability: {
      used: boolean;
      delayedEffect: boolean;
      _id: string;
      isComponentAction: boolean;
      step: string;
      timing: string;
    };
    faction?: string;
  }>;
  startingUnits: any[];
  technology: Array<{
    exhausted: boolean;
    _id: string;
    name: string;
    type: string;
  }>;
  technologyDeck: Array<{
    prerequisites: {
      [key: string]: number;
    };
    exhausted: boolean;
    _id: string;
    name: string;
    type: string;
    ability?: {
      used: boolean;
      delayedEffect: boolean;
      _id: string;
      isComponentAction: boolean;
      step: string;
      timing: string;
    };
    faction?: string;
  }>;
  game: string;
  actionCards: Array<{
    _id: string;
    name: string;
    ability: {
      used: boolean;
      delayedEffect: boolean;
      _id: string;
      isComponentAction: boolean;
      step: string;
      timing: string;
    };
  }>;
  enemyActionCards: any[];
  activeActionCards: any[];
  secretObjectives: Array<{
    canScorePlayerIds: any[];
    revealed: boolean;
    _id: string;
    name: string;
    phase: string;
    type: string;
    victoryPoints: number;
    scores: any[];
  }>;
  strategyCards: Array<{
    exhausted: boolean;
    tradeGoods: number;
    _id: string;
    number: number;
    name: string;
  }>;
  vote: {
    abstain: boolean;
    count: number;
    outcome: string;
  };
  results: any[];
  laws: any[];
  lastReadMessages: Array<{
    _id: string;
    userId: string;
    messageId: string;
  }>;
  autoPassSettings: any;
}
declare interface Unit {
  color: TI4Colors;
  name: UnitName;
  type: string;
  upgraded: boolean;
}

declare interface TiWarsApi {
  getPlayer: () => Promise<Player>;
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
