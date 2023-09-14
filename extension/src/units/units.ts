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
            display: block; /* Show the table when the button is hovered */
        }
    </style>
    <button id="showButton">Show Units</button>
    <table id="units">
    </table>
`;

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

    systems.forEach((system) => {
      system.units.forEach((unit) => {
        unitCountsByPlayerColor[unit.color][unit.name]++;
      });
      system.planets.forEach((planet) => {
        planet.units.forEach((unit) => {
          unitCountsByPlayerColor[unit.color][unit.name]++;
        });
      });
    });

    Object.keys(defaultUnitCounts).forEach((unitName) => {
      const unitHeaderCell = document.createElement("td");
      unitHeaderCell.textContent = unitName;
      headerRow.appendChild(unitHeaderCell);
    });

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
    });
  }
}

window.customElements.define("ti-units-component", UnitsComponent);
