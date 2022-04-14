import { Scene, vec } from "excalibur";
import { Player } from "./player";
import { Resources } from "./resources";

export class Level extends Scene {
  onInitialize = () => {
    const player = new Player();
    this.add(player);

    Resources.Level1.addTiledMapToScene(this);

    Resources.Level1.data
      .getObjectLayerByName("Objects")
      ?.objects.forEach((object) => {
        switch (object.type) {
          case "Player":
            player.pos = vec(object.x, object.y);
            break;
        }
      });

    this.camera.strategy.lockToActor(player);
  };
}
