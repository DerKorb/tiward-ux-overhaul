import "./cards/cardRenderer";
import { updateHexTiles } from "./hexRenderer/updateHexTiles";
import "./units/odds.ts";
import "./units/units.ts";
import "./votes/votes.ts";
import "./vp.ts";

async function main() {
  console.log("running main");
  await updateHexTiles();
  // installOddsComponent();
  document.body.appendChild(document.createElement("ti-cards-component"));
  document.body.appendChild(document.createElement("ti-units-component"));
  document.body.appendChild(document.createElement("ti-votes-component"));
  document.body.appendChild(document.createElement("ti-objectives-component"));
  document.body.appendChild(document.createElement("ti-odds-component"));
  // setInterval(updateHexTiles, 4000);
}
main();
