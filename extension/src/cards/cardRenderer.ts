import { Material, Mesh } from "three";

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

    const { onActionCardDoubleClick } = await import(
      "https://www.twilightwars.com/js/events/action-card.js"
    );

    const { playerActionCards } = await import(
      "https://www.twilightwars.com/js/loaders/load-player-cards.js"
    );

    const player = await API.getPlayer();
    console.log(player);
    const { actionCards, secretObjectives, promissoryNotes } = player;

    actionCards.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.ondblclick = () => {
        const matchingMesh: Mesh | undefined = playerActionCards.find(
          (mesh: Mesh) => mesh.userData.name === card.name
        );
        if (matchingMesh) {
          (matchingMesh.material as Material).opacity = 0.3;
          matchingMesh.scale.x = 100;
          matchingMesh.scale.y = 100;
          matchingMesh.visible = true;
          setTimeout(() => {
            onActionCardDoubleClick();
            matchingMesh.scale.x = 1;
            matchingMesh.scale.y = 1;
            (matchingMesh.material as Material).opacity = 1;
            matchingMesh.visible = false;
          }, 1);
        }
      };
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
    promissoryNotes
      .filter((note) => note.color !== player.color)
      .forEach((note) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "card";
        this.cardsContainer!.appendChild(noteDiv);
        const noteImage = document.createElement("img");
        if ("faction" in note) {
          noteImage.src = `/img/faction/${note.faction}/${note.name}.png`;
        } else {
          noteImage.src = `/img/misc/${note.color}/${note.name}.png`;
        }
        noteDiv.appendChild(noteImage);
      });
  }
}

window.customElements.define("ti-cards-component", CardsComponent);
