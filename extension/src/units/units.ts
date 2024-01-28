let unitsComponentTemplate = document.createElement("template");
unitsComponentTemplate.innerHTML = `
    <style>
        table {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        #units {
            position: relative;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 10px;
            padding: 10px;
            display: none; /* Hide the table by default */
        }
        #units td {
            text-align: center;
            min-width: 60px;
            font-size: 16px;
            padding: 5px;
        }
        #showButton {
            position: absolute;
            top: 15px;
            right: 318px;
            z-index: 1000;
        }
        #showButton:hover + #units {
            display: inline-block; /* Show the table when the button is hovered */
        }
    </style>
    <button id="showButton">Show Units</button>
    <table id="units">
    </table>
`;

export const unitValue = {
  Flagship: 8,
  "War Sun": 12,
  Dreadnought: 4,
  Carrier: 3,
  Cruiser: 2,
  Destroyer: 1,
  Fighter: 0.5,
  PDS: 2,
  Infantry: 0.5,
  "Space Dock": 0,
};

class UnitsComponent extends HTMLElement {
  unitsContainer: HTMLElement | null;
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(unitsComponentTemplate.content.cloneNode(true));

    this.unitsContainer = this.shadowRoot!.getElementById("units");
  }

  async connectedCallback() {
    const API = (await import(
      "https://www.twilightwars.com/js/api.js"
    )) as TiWarsApi;
    const players = await API.getPlayers();
    const systems = await API.getBoardSystems();

    // add the hover button
    API.getGameLogs().then((logs) => {
      console.log(logs);
    });

    // Create table header with unit names
    const headerRow = document.createElement("tr");
    this.unitsContainer!.appendChild(headerRow);
    const emptyCell = document.createElement("td");
    headerRow.appendChild(emptyCell);
    const defaultUnitCounts = {
      Flagship: 0,
      "War Sun": 0,
      Dreadnought: 0,
      Carrier: 0,
      Cruiser: 0,
      Destroyer: 0,
      Fighter: 0,
      PDS: 0,
      Infantry: 0,
      "Space Dock": 0,
    };

    const unitCountsByPlayerColor = players.reduce((acc, player) => {
      acc[player.color] = { ...defaultUnitCounts };
      return acc;
    }, {} as Record<string, Record<string, number>>);

    const unitValuesByPlayerColor = players.reduce((acc, player) => {
      acc[player.color] = { ...defaultUnitCounts };
      return acc;
    }, {} as Record<string, Record<string, number>>);

    systems.forEach((system) => {
      system.units.forEach((unit) => {
        unitCountsByPlayerColor[unit.color][unit.name]++;
        unitValuesByPlayerColor[unit.color][unit.name] += unitValue[unit.name];
      });
      system.planets.forEach((planet) => {
        planet.units.forEach((unit) => {
          unitCountsByPlayerColor[unit.color][unit.name]++;
          unitValuesByPlayerColor[unit.color][unit.name] +=
            unitValue[unit.name];
        });
      });
    });

    Object.keys(defaultUnitCounts).forEach((unitName) => {
      const unitHeaderCell = document.createElement("td");
      unitHeaderCell.textContent = unitName;
      headerRow.appendChild(unitHeaderCell);
    });

    const headers = [
      "Unit Value",
      "Trade Goods",
      "Influence",
      "Resources",
      "Technology",
      "Command Counter",
      "Score",
    ];
    for (const header of headers) {
      const headerCell = document.createElement("td");
      headerCell.textContent = header;
      headerRow.appendChild(headerCell);
    }

    players.forEach((player) => {
      // Create a row for each player with unit counts
      const unitRow = document.createElement("tr");
      this.unitsContainer!.appendChild(unitRow);
      const playerNameCell = document.createElement("td");
      playerNameCell.textContent = player.faction;
      unitRow.appendChild(playerNameCell);

      Object.values(unitCountsByPlayerColor[player.color]).forEach(
        (unitCount) => {
          const unitCountCell = document.createElement("td");
          unitCountCell.style.color = player.color;
          unitCountCell.style.fontWeight = "bold";
          unitCountCell.style.fontSize = "20px";
          unitCountCell.textContent = unitCount > 0 ? unitCount.toString() : "";
          unitRow.appendChild(unitCountCell);
        }
      );

      const unitValueCell = document.createElement("td");
      unitValueCell.style.color = player.color;
      unitValueCell.style.fontWeight = "bold";
      unitValueCell.style.fontSize = "20px";
      const unitValue = Object.values(
        unitValuesByPlayerColor[player.color]
      ).reduce((a, b) => a + b, 0);
      unitValueCell.textContent = unitValue.toString();
      unitRow.appendChild(unitValueCell);

      const tradegoodsCell = document.createElement("td");
      tradegoodsCell.style.color = player.color;
      tradegoodsCell.style.fontWeight = "bold";
      tradegoodsCell.style.fontSize = "20px";
      tradegoodsCell.textContent = player.tradeGoods.toString();
      unitRow.appendChild(tradegoodsCell);

      const influenceCell = document.createElement("td");
      influenceCell.style.color = player.color;
      influenceCell.style.fontWeight = "bold";
      influenceCell.style.fontSize = "20px";
      const influenceValues = Object.values(
        player.planetCards.map((planetCard) =>
          planetCard.exhausted ? 0 : planetCard.influence
        )
      ).reduce((a, b) => a + b, 0);
      influenceCell.textContent = influenceValues.toString();
      unitRow.appendChild(influenceCell);

      const resourcesCell = document.createElement("td");
      resourcesCell.style.color = player.color;
      resourcesCell.style.fontWeight = "bold";
      resourcesCell.style.fontSize = "20px";
      const resourceValues = Object.values(
        player.planetCards.map((planetCard) =>
          planetCard.exhausted ? 0 : planetCard.resources
        )
      ).reduce((a, b) => a + b, 0);
      resourcesCell.textContent = resourceValues.toString();
      unitRow.appendChild(resourcesCell);

      const ccs =
        (player.fleetPool + player.strategyPool + player.tacticPool) * 2;
      const technologyValue = player.technology.length * 6;

      const technologyCell = document.createElement("td");
      technologyCell.style.color = player.color;
      technologyCell.style.fontWeight = "bold";
      technologyCell.style.fontSize = "20px";

      technologyCell.textContent = technologyValue.toString();
      unitRow.appendChild(technologyCell);

      const ccCell = document.createElement("td");
      ccCell.style.color = player.color;
      ccCell.style.fontWeight = "bold";
      ccCell.style.fontSize = "20px";
      ccCell.textContent = ccs.toString();
      unitRow.appendChild(ccCell);

      const completeCell = document.createElement("td");
      completeCell.style.color = player.color;
      completeCell.style.fontWeight = "bold";
      completeCell.style.fontSize = "20px";
      completeCell.textContent = (
        resourceValues +
        (influenceValues * 2) / 3 +
        unitValue +
        technologyValue +
        ccs +
        player.tradeGoods
      ).toFixed(0);
      unitRow.appendChild(completeCell);
    });
  }
}

window.customElements.define("ti-units-component", UnitsComponent);
