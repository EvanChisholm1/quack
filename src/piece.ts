import { pieceType } from "./types";

export default class Piece {
  positions: Array<{ x: number; y: number }>;
  color: "black" | "white";
  type: pieceType;

  constructor(type: pieceType, color: "white" | "black", x: number, y: number) {
    this.positions = [{ x, y }];
    this.color = color;
    this.type = type;
  }
}
