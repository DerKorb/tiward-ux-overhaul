import "./cards/cardRenderer";
import { updateHexTiles } from "./hexRenderer/updateHexTiles";
import "./units/units.ts";

async function main() {
  console.log("running main");
  await updateHexTiles();
  // installOddsComponent();
  document.body.appendChild(document.createElement("ti-cards-component"));
  document.body.appendChild(document.createElement("ti-units-component"));
  setInterval(updateHexTiles, 4000);
}
main();
