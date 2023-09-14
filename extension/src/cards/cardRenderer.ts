let cardsComponentTemplate = document.createElement("template");
cardsComponentTemplate.innerHTML = `
    <style>
        :host {
            position: fixed;
            bottom: 0px;
        }
        #cards {
            display: flex;
            position: fixed;
            bottom: -242px;
            transition: bottom 0.5s;
        }
        .card {
            border-radius: 5px;
            margin: 5px;
            overflow: hidden;
        }
        .card img {
            width: 200px;
            height: 300px;
        }
        #cards:hover {
            bottom: 0;
        }
    </style>
    <div id="cards">
    </div>
`;

class CardsComponent extends HTMLElement {
  cardsContainer: HTMLElement | null;
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(cardsComponentTemplate.content.cloneNode(true));

    this.cardsContainer = this.shadowRoot!.getElementById("cards");
  }

  async connectedCallback() {
    const API = (await import(
      "https://www.twilightwars.com/js/api.js"
    )) as TiWarsApi;
    const player = await API.getPlayer();
    console.log(player);
    const { actionCards, secretObjectives } = player;

    actionCards.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      this.cardsContainer!.appendChild(cardDiv);
      const cardImage = document.createElement("img");
      cardImage.src = `/img/action-cards/${card.name}.png`;
      cardDiv.appendChild(cardImage);
    });
    secretObjectives.forEach((objective) => {
      const objectiveDiv = document.createElement("div");
      objectiveDiv.className = "card";
      this.cardsContainer!.appendChild(objectiveDiv);
      const objectiveImage = document.createElement("img");
      objectiveImage.src = `/img/objectives/${objective.name}.png`;
      objectiveDiv.appendChild(objectiveImage);
    });
  }
}

window.customElements.define("ti-cards-component", CardsComponent);
