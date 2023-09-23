let objectivesComponentTemplate = document.createElement("template");
objectivesComponentTemplate.innerHTML = `
    <style>
        table {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        #objectives {
            position: relative;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 10px;
            padding: 10px;
            display: none; /* Hide the table by default */
        }
        #objectives td {
            text-align: center;
            min-width: 60px;
            font-size: 16px;
            padding: 5px;
        }
        #showButton {
            position: absolute;
            top: 15px;
            right: 518px;
            z-index: 1000;
        }
        #showButton:hover + #objectives {
            display: inline-block; /* Show the table when the button is hovered */
        }
    </style>
    <button id="showButton">Show Objectives</button>
    <table id="objectives">
    </table>
`;

class ObjectivesComponent extends HTMLElement {
  objectivesContainer: HTMLElement | null;
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(objectivesComponentTemplate.content.cloneNode(true));

    this.objectivesContainer = this.shadowRoot!.getElementById("objectives");
  }

  async connectedCallback() {
    const API = (await import(
      "https://www.twilightwars.com/js/api.js"
    )) as TiWarsApi;
    const players = await API.getPlayers();
    const game = await API.getGame();

    // Create table header with player names
    const headerRow = document.createElement("tr");
    this.objectivesContainer!.appendChild(headerRow);
    const emptyCell = document.createElement("td");
    headerRow.appendChild(emptyCell);

    players.forEach((player) => {
      const playerHeaderCell = document.createElement("td");
      playerHeaderCell.textContent = player.faction;
      headerRow.appendChild(playerHeaderCell);
    });

    game.publicObjectives.forEach((objective) => {
      // Create a row for each objective with player claims
      const objectiveRow = document.createElement("tr");
      this.objectivesContainer!.appendChild(objectiveRow);
      const objectiveNameCell = document.createElement("td");
      objectiveNameCell.textContent = objective.name;
      objectiveRow.appendChild(objectiveNameCell);

      players.forEach((player) => {
        const playerClaimCell = document.createElement("td");
        playerClaimCell.style.color = player.color;
        playerClaimCell.style.fontWeight = "bold";
        playerClaimCell.style.fontSize = "20px";
        playerClaimCell.textContent = objective.scores.find(
          (s) => s.playerId === player._id
        )
          ? "✔"
          : "";
        objectiveRow.appendChild(playerClaimCell);
      });
    });
  }
}

window.customElements.define("ti-objectives-component", ObjectivesComponent);
