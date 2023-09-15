let votesComponentTemplate = document.createElement("template");
votesComponentTemplate.innerHTML = `
    <style>
        #votes {
            position: fixed;
            top: 50%;
            left: 50%;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 10px;
            transform: translate(-50%, -50%);
            display: none; /* Hide the table by default */

        }
        #showButton {
            position: absolute;
            top: 15px;
            right: 408px;
            z-index: 1000;
        }
        #showButton:hover + #votes {
            display: block; /* Show the table when the button is hovered */
        }

        .pie {
            width: 400px;
            height: 400px;
            border-radius: 50%
          }
    </style>
    <button id="showButton">Show Votes</button>
    <div id="votes">
          <div class="pie" id="pie1"></div>
    </div>
  `;

class VotesComponent extends HTMLElement {
  votesContainer: HTMLElement | null;
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(votesComponentTemplate.content.cloneNode(true));

    this.votesContainer = this.shadowRoot!.getElementById("votes");
  }

  async connectedCallback() {
    const API = (await import(
      "https://www.twilightwars.com/js/api.js"
    )) as TiWarsApi;
    const players = await API.getPlayers();

    const summedInfluenceOfAllPlanetsByPlayerColor = players.reduce(
      (acc2, player) => {
        const summedInfluenceOfAllPlanets = player.planetCards.reduce(
          (acc, planet) => {
            return acc + planet.influence;
          },
          0
        );
        acc2[player.color] = summedInfluenceOfAllPlanets;
        return acc2;
      },
      {} as { [key in TI4Colors]: number }
    );

    // for (const player of players) {
    //   const playerDiv = document.createElement("div");
    //   playerDiv.innerText = `${player.color}: ${
    //     summedInfluenceOfAllPlanetsByPlayerColor[player.color]
    //   }`;
    //   this.votesContainer!.appendChild(playerDiv);
    // }

    const totalInfluence = Object.values(
      summedInfluenceOfAllPlanetsByPlayerColor
    ).reduce((acc, influence) => acc + influence, 0);

    let x = 0;
    const gradient = `conic-gradient(${Object.entries(
      summedInfluenceOfAllPlanetsByPlayerColor
    )
      .map(([color, influence], n) => {
        const res = `${color} ${((100 * x) / totalInfluence).toFixed(
          2
        )}%, ${color} ${((100 * (x + influence)) / totalInfluence).toFixed(
          2
        )}%`;
        x += influence;
        return res;
      })
      .join(",")})`;
    (
      this.votesContainer!.getElementsByClassName("pie")![0] as HTMLDivElement
    ).style.backgroundImage = gradient;
  }
}

window.customElements.define("ti-votes-component", VotesComponent);
