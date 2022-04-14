import { ImageSource } from "excalibur";
import { TiledMapResource } from "@excaliburjs/plugin-tiled";

import box from "../assets/images/box.png";
import level1 from "../assets/levels/Level 1.tmj";

export const Resources = {
  Box: new ImageSource(box),
  Level1: new TiledMapResource(level1),
} as const;
