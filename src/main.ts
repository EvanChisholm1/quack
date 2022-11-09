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

    // pawns
    for(let i = 0; i < 8; i++) {
      this.pieces.push(new Piece(pieceType.pawn, "black", 1, i))
      this.pieces.push(new Piece(pieceType.pawn, "white", 6, i))
    }

    // rooks
    this.pieces.push(new Piece(pieceType.rook, "black", 0, 0))
    this.pieces.push(new Piece(pieceType.rook, "black", 7, 0))

    this.pieces.push(new Piece(pieceType.rook, "white", 0, 7))
    this.pieces.push(new Piece(pieceType.rook, "white", 7, 7))

    // bishops
    this.pieces.push(new Piece(pieceType.bishop, "black", 2, 0))
    this.pieces.push(new Piece(pieceType.bishop, "black", 5 , 0))

    this.pieces.push(new Piece(pieceType.bishop, "white", 2, 7))
    this.pieces.push(new Piece(pieceType.bishop, "white", 5, 7))

    // knight
    this.pieces.push(new Piece(pieceType.knight, "black", 1, 0))
    this.pieces.push(new Piece(pieceType.knight, "black", 6, 0))

    this.pieces.push(new Piece(pieceType.knight, "white", 1, 7))
    this.pieces.push(new Piece(pieceType.knight, "white", 6, 7))

    // kings
    this.pieces.push(new Piece(pieceType.king, "black", 4, 0))
    this.pieces.push(new Piece(pieceType.king, "white", 4, 7))

    this.pieces.push(new Piece(pieceType.queen, "black", 3, 0))
    this.pieces.push(new Piece(pieceType.queen, "white", 3, 7))
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
  positions: Array<{x: number, y: number}>
  color: "black" | "white";
  type: pieceType;

  constructor(type: pieceType, color: "white" | "black", x: number, y: number) {
    this.positions = [{x, y}];
    this.color = color;
    this.type = type;
  }
}
