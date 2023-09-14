import { Vector2 } from "three";
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

export async function installOddsComponent() {
  const sceneContainer = document.getElementById("scene-container");

  const { camera } = (await import(
    "https://www.twilightwars.com/js/app.js"
  )) as AppExports;
  const { Raycaster, Vector2 } = await import("three");
  const { allBoardSystems } = (await import(
    "https://www.twilightwars.com/js/board-creation.js"
  )) as boardCreation;
  const { getPlayers } = (await import(
    "https://www.twilightwars.com/js/api.js"
  )) as TiWarsApi;

  const players = await getPlayers();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  const selectedSystems = new Set<BoardSystem>();
  function setVectorCoordinates(event: MouseEvent, vector: Vector2) {
    vector.x = (event.clientX / window.innerWidth) * 2 - 1;
    vector.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  window.addEventListener("click", (event) => {
    if (event.button !== 0) return;
    if (!event.altKey) return;
    setVectorCoordinates(event, mouse);
    raycaster.setFromCamera(mouse, camera);
    const intersectAllBoardSystems =
      raycaster.intersectObjects(allBoardSystems);
    // toggle selection
    if (
      selectedSystems.has(
        intersectAllBoardSystems[0].object.userData as BoardSystem
      )
    ) {
      selectedSystems.delete(
        intersectAllBoardSystems[0].object.userData as BoardSystem
      );
    } else {
      selectedSystems.add(
        intersectAllBoardSystems[0].object.userData as BoardSystem
      );
    }
    if (selectedSystems.size >= 2) {
      const [attackingSystem, defendingSystem, ...others] =
        Array.from(selectedSystems);
      console.log(attackingSystem, defendingSystem, others);
      const attackingFleet: Fleet = {};
      for (const unit of attackingSystem.units) {
        const unitType = unitMap[unit.name];
        if (!attackingFleet[unitType]) attackingFleet[unitType] = { count: 0 };
        attackingFleet[unitType]!.count++;
      }
      if (attackingSystem.units.length === 0) {
        alert("Attacking system has no units");
        return;
      }
      if (defendingSystem.units.length === 0) {
        alert("Defending system has no units");
        return;
      }
      const attackingPlayer = players.find(
        (player) => player.color === attackingSystem.units[0].color
      )!;
      const defendingPlayer = players.find(
        (player) => player.color === defendingSystem.units[0].color
      )!;
      console.log(attackingPlayer, defendingPlayer);
      const defendingFleet: Fleet = {};
      for (const unit of defendingSystem.units) {
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
    }
  });
}

export function oddsComponent() {
  const div = document.createElement("div");
  div.setAttribute("draggable", "true");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.background = "red";
  div.style.position = "absolute";
  div.style.top = "50%";
  div.style.left = "50%";
  div.style.cursor = "move";

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.onclick = () => {
    document.body.removeChild(div);
  };

  div.appendChild(closeButton);
  document.body.appendChild(div);

  div.addEventListener("dragstart", (event) => {
    event.dataTransfer!.setData("text/plain", "This text may be dragged");
  });

  div.addEventListener("drag", (event) => {
    div.style.top = `${event.clientY}px`;
    div.style.left = `${event.clientX}px`;
  });
}
