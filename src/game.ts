import { DisplayMode, Engine, Loader } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";

export class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 600,
      displayMode: DisplayMode.FitScreen,
      canvasElementId: "game",
      antialiasing: false, // pixel art
      suppressPlayButton: import.meta.env.DEV,
    });

    // Currently crashes
    // if(import.meta.env.DEV) {
    //    new DevTool(this);
    // }
  }

  async initialize() {
    const player = new Player();
    this.add(player);

    const loader = new Loader([Resources.Box, Resources.Level1]);

    await this.start(loader);

    Resources.Level1.addTiledMapToScene(this.currentScene);

    Resources.Level1.data
      .getObjectLayerByName("Objects")
      ?.objects.forEach((object) => {
        console.log(object);
      });

    console.log(Resources.Level1.layers);
  }
}
