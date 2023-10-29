declare interface BoardSystem {
  faction: string;
  units: Unit[];
  isHomeSystem: boolean;
  number: number;
  unitsToMove?: Unit[];
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
    faction?: string;
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

declare interface Game {
  _id: string;
  abilityRound: {
    inProgress: boolean;
    passed: string[];
    playedActionCards: string[];
  };
  turn: {
    player: {
      current: number;
      previous: number;
      active: number;
    };
    direction: string;
  };
  isPublic: boolean;
  usePok: boolean;
  controlledPlanets: string[];
  invadedPlanets: string[];
  combatDestroyedShipTypes: string[];
  combatParticipants: string[];
  custodiansTokenRemoved: boolean;
  phase: string;
  round: number;
  step: string;
  tradePlayers: string[];
  transactions: string[];
  victoryPoints: number;
  over: boolean;
  canUndoLastAction: boolean;
  name: string;
  mode: string;
  presetMap: string;
  numberOfPlayers: number;
  publicObjectives: Array<{
    canScorePlayerIds: string[];
    revealed: boolean;
    _id: string;
    name: string;
    stage: number;
    type: string;
    phase: string;
    victoryPoints: number;
    scores: Array<{
      _id: string;
      playerId: string;
      round: number;
      phase: string;
    }>;
  }>;
  strategyCards: Array<{
    exhausted: boolean;
    tradeGoods: number;
    _id: string;
    number: number;
    name: string;
  }>;
  actionCards: {
    discard: Array<{
      _id: string;
      name: string;
      ability: {
        used: boolean;
        delayedEffect: boolean;
        _id: string;
        isComponentAction: boolean;
      };
    }>;
  };
  agendas: {
    discard: string[];
  };
  appVersion: string;
  abilityRoundQueue: string[];
  laws: string[];
  subStepQueue: string[];
  speaker: number;
  createdAt: number;
  updatedAt: number;
  __v: number;
  lastPlayedActionCardId: string;
}

declare interface TiWarsApi {
  getPlayer: (playerNumber: number) => Promise<Player>;
  getPlayers: () => Promise<Player[]>;
  getPlayerSystems: () => Promise<any>;
  getNeighbors: (playerNumber: number) => Promise<any>;
  getAdjacentSystems: (
    systemNumber: number,
    playerNumber: number
  ) => Promise<any>;
  getGame: () => Promise<Game>;
  getBoardSystems: () => Promise<BoardSystem[]>;
  getGameLogs: (lastLogId: string) => Promise<any>;
  getChatMessages: (userId: string, lastChatId: string) => Promise<any>;
  getUnreadChats: () => Promise<any>;
  markAsRead: (messageId: string, userId: string) => Promise<any>;
  getLaws: () => Promise<any>;
  getScoredSecretObjectives: () => Promise<any>;
  getTopAgenda: () => Promise<any>;
  getTopTwoAgendas: () => Promise<any>;
  getVotingStatuses: () => Promise<any>;
  getTradeRequests: () => Promise<any>;
  getObjectiveStatuses: () => Promise<any>;
  getNekroAvailableTechnologies: () => Promise<any>;
  getDeckInfo: (type: string) => Promise<any>;
  getNotes: () => Promise<any>;
  saveNotes: (content: string) => Promise<any>;
  subscribePlayer: (subscription: any) => Promise<any>;
}
declare interface Planet {
  name: string;
  resources: number;
  influence: number;
  units: Unit[];
  unitsToMove?: Unit[];
  tech: "Warfare" | "Biotic" | "Cybernetic" | "Propulsion";
  trait: "Hazardous" | "Industrial" | "Cultural" | "Home";
}
declare interface boardCreation {
  skeletonHexArray: any;
  allBoardSystems: BoardSystem[];
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

declare module "https://www.twilightwars.com/js/utils/extras.js" {
  export function adjustPlanetCardStats(): void;
  export function exceedsCapacityOrFleetLimit(
    system: any,
    fleetPool: number
  ): boolean;
  export function fightersInSystem(): void;
  export function getActiveSystem(systems: BoardSystem[]): {
    userData: BoardSystem;
  };
  export function getAdjacencyList(position: number): number[];
  export function getFactionAbilities(): void;
  export function getFactionPromissoryNote(): void;
  export function getFactionTechnologies(): void;
  export function getPlanetName(planetId: string): string;
  export function getRGBValue(): void;
  export function getSystemName(systemNumber: number): string;
  export function getUnitUpgradeTechnology(
    unitName: string,
    technologies: any[]
  ): any;
  export function hasReinforcement(): void;
  export function infantryInSystem(): void;
  export function isTradeComponentsEmpty(): void;
  export function makeCircle(): void;
  export function makeLawMesh(lawName: string): any;
  export function makePlanetLawMesh(lawName: string, exhausted: boolean): any;
  export function makePromissoryNoteMesh(note: any): any;
  export function makePublicObjectiveMesh(position: any, userData: any): any;
  export function numberOfNonFighterShipsInSystem(): void;
  export function numberOfPlayersInSystem(): void;
  export function organizeActionCards(): void;
  export function organizeLaws(): void;
  export function organizePlanetCards(): void;
  export function organizePlanetLaws(): void;
  export function organizePlayerLawCards(): void;
  export function organizePlayerOwnedTechnologies(): void;
  export function organizePlayerPromissoryNotes(): void;
  export function organizeSecretObjectives(): void;
  export function printCommandTokenList(): void;
  export function printSystemUnitList(): void;
  export function printTradeComponents(): void;
  export function printUnitList(): void;
  export function removeCard(): void;
  export function removeLawFromGame(lawName: string): void;
  export function resolveAgenda(
    agendaName: string,
    result: string,
    playerVote: any
  ): void;
  export function revealStepButton(): void;
  export function setCameraPosition(): void;
  export function unitsInSystem(): void;
  export function updateUnitsForSaleImage(): void;
  export function urlBase64ToUint8Array(): void;
}

declare module "https://www.twilightwars.com/js/events/action-card.js" {
  const onActionCardDoubleClick: () => void;
  export { onActionCardDoubleClick };
}

declare module "https://www.twilightwars.com/js/loaders/load-player-cards.js" {
  const playerActionCards: any[];
  export { playerActionCards };
}
