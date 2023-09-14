import { updateHexTiles } from "./hexRenderer/updateHexTiles";
import { installOddsComponent } from "./odds/oddscomponent";

async function main() {
  console.log("running main");
  await updateHexTiles();
  installOddsComponent();
}
main();
