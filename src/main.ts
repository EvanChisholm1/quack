import "./style.css";

console.log("hello world");
const boardElement = document.querySelector("#board");

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const square = document.createElement("div");
    square.classList.add((i + j) % 2 == 0 ? "white" : "black");
    square.classList.add(`${i}:${j}`);
    square.classList.add("square");
    boardElement?.appendChild(square);
  }
}

class Board {
  pieces: Piece[];

  constructor() {
    this.pieces = [];
  }
}

enum pieceType {
  king,
  queen,
  rook,
  bishop,
  knight,
  pawn,
}

class Piece {
  x: number;
  y: number;
  color: "black" | "white";
  type: pieceType;

  constructor(type: pieceType, color: "white" | "black", x: number, y: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type;
  }
}
