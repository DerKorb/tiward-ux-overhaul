import { calculateOdds } from "../odds/oddscomponent";

let oddsComponentTemplate = document.createElement("template");
oddsComponentTemplate.innerHTML = `
    <style>
        #calculateButton {
            position: absolute;
            top: 15px;
            right: 658px;
            z-index: 1000;
        }
    </style>
    <button id="calculateButton">Calculate Odds</button>
`;

class OddsComponent extends HTMLElement {
  calculateButton: HTMLElement | null;
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(oddsComponentTemplate.content.cloneNode(true));

    this.calculateButton = this.shadowRoot!.getElementById("calculateButton");
  }

  async connectedCallback() {
    this.calculateButton!.addEventListener("click", async () => {
      const odds = await calculateOdds();
      this.calculateButton!.innerText = odds;
    });
  }
}

window.customElements.define("ti-odds-component", OddsComponent);
