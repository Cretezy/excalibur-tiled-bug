import { Actor, vec } from "excalibur";
import { Resources } from "./resources";

export class Player extends Actor {
  constructor() {
    super({
      pos: vec(100, 100),
      width: 100,
      height: 100,
    });
  }

  onInitialize() {
    this.graphics.add(Resources.Box.toSprite());
  }
}
