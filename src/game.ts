import { DisplayMode, Engine, Loader } from "excalibur";
import { Resources } from "./resources";
import { Level } from "./level";
import { DevTool } from "@excaliburjs/dev-tools";

export class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 600,
      displayMode: DisplayMode.FitScreen,
      canvasElementId: "game",
      antialiasing: false, // pixel art
      suppressPlayButton: process.env.NODE_ENV === "development",
    });

    if (process.env.NODE_ENV === "development") {
      const devtool = new DevTool(this);
      devtool.pane.expanded = false;
    }
  }

  initialize = async () => {
    const level = new Level();
    this.add("level", level);

    const loader = new Loader(Object.values(Resources));

    await this.start(loader);

    this.goToScene("level");
  };
}
