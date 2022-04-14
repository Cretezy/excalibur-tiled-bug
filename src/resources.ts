import { TiledMapResource } from "@excaliburjs/plugin-tiled";
import { ImageSource } from "excalibur";

import player from "../assets/images/player_preview.png";
import level1 from "../assets/levels/Level 1.tmj";

export const Resources = {
  Player: new ImageSource(player),
  Level1: new TiledMapResource(level1),
} as const;
