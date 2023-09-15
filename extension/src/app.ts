import "./cards/cardRenderer";
import { updateHexTiles } from "./hexRenderer/updateHexTiles";
import "./units/units.ts";
import "./votes/votes.ts";

async function main() {
  console.log("running main");
  await updateHexTiles();
  // installOddsComponent();
  document.body.appendChild(document.createElement("ti-cards-component"));
  document.body.appendChild(document.createElement("ti-units-component"));
  document.body.appendChild(document.createElement("ti-votes-component"));
  setInterval(updateHexTiles, 4000);
}
main();
