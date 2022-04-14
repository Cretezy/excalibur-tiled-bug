import {
  Actor,
  CollisionEndEvent,
  CollisionStartEvent,
  CollisionType,
  Engine,
  Input,
  Physics,
  vec,
} from "excalibur";
import { Resources } from "./resources";

export class Player extends Actor {
  static ACCELERATION = 256;
  static MIN_SPEED = 128;

  sliding = false;

  constructor() {
    super({
      width: Resources.Player.width,
      height: Resources.Player.height,
      collisionType: CollisionType.Active,
    });

    this.on("collisionstart", this.onCollisionStart);
  }

  onCollisionStart = (event: CollisionStartEvent) => {
    console.log(this.pos,event);
    this.acc = vec(0, 0);
    this.vel = vec(0, 0);
    this.sliding = false;
  };

  onInitialize = () => {
    this.graphics.add(Resources.Player.toSprite());
  };

  public update = (engine: Engine, delta: number) => {
    if (this.sliding) {
      return;
    }

    const up =
      engine.input.keyboard.isHeld(Input.Keys.W) ||
      engine.input.keyboard.isHeld(Input.Keys.Up) ||
      engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickY) > 0.5;

    const down =
      engine.input.keyboard.isHeld(Input.Keys.S) ||
      engine.input.keyboard.isHeld(Input.Keys.Down) ||
      engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickY) < -0.5;

    const left =
      engine.input.keyboard.isHeld(Input.Keys.A) ||
      engine.input.keyboard.isHeld(Input.Keys.Left) ||
      engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) < -0.5;

    const right =
      engine.input.keyboard.isHeld(Input.Keys.D) ||
      engine.input.keyboard.isHeld(Input.Keys.Right) ||
      engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) > 0.5;

    this.sliding = up || down || left || right;

    if (up) {
      this.acc = vec(0, -Player.ACCELERATION);
      this.vel = vec(0, -Player.MIN_SPEED);
    } else if (down) {
      this.acc = vec(0, Player.ACCELERATION);
      this.vel = vec(0, Player.MIN_SPEED);
    } else if (left) {
      this.acc = vec(-Player.ACCELERATION, 0);
      this.vel = vec(-Player.MIN_SPEED, 0);
    } else if (right) {
      this.acc = vec(Player.ACCELERATION, 0);
      this.vel = vec(Player.MIN_SPEED, 0);
    }
  };
}
