import Piece from "./piece";
import { pieceType } from "./types";
import { generateAllMoves } from "./helpers/generateMoves";
import { CELL_SIZE } from "./boardElement";

export default class Board {
  selected: { x: number; y: number };
  mouseCoords: { x: number; y: number };
  grid: Array<Array<Piece | null>>;
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.selected = { x: -1, y: -1 };
    this.mouseCoords = { x: -1, y: -1 };
    this.ctx = ctx;
    this.grid = [];
    for (let i = 0; i < 8; i++) {
      this.grid.push(new Array(8).fill(null));
    }

    for (let i = 0; i < 8; i++) {
      this.grid[i][1] = new Piece(pieceType.pawn, "black", i, 1);
      this.grid[i][6] = new Piece(pieceType.pawn, "white", i, 6);
    }

    // rooks
    this.grid[0][0] = new Piece(pieceType.rook, "black", 0, 0);
    this.grid[7][0] = new Piece(pieceType.rook, "black", 7, 0);

    this.grid[0][7] = new Piece(pieceType.rook, "white", 0, 7);
    this.grid[7][7] = new Piece(pieceType.rook, "white", 7, 7);

    // bishops
    this.grid[2][0] = new Piece(pieceType.bishop, "black", 2, 0);
    this.grid[5][0] = new Piece(pieceType.bishop, "black", 5, 0);

    this.grid[2][7] = new Piece(pieceType.bishop, "white", 2, 7);
    this.grid[5][7] = new Piece(pieceType.bishop, "white", 5, 7);

    // knight
    this.grid[1][0] = new Piece(pieceType.knight, "black", 1, 0);
    this.grid[6][0] = new Piece(pieceType.knight, "black", 6, 0);

    this.grid[1][7] = new Piece(pieceType.knight, "white", 1, 7);
    this.grid[6][7] = new Piece(pieceType.knight, "white", 6, 7);

    // kings
    this.grid[4][0] = new Piece(pieceType.king, "black", 4, 0);
    this.grid[4][7] = new Piece(pieceType.king, "white", 4, 7);

    //queens
    this.grid[3][0] = new Piece(pieceType.queen, "black", 3, 0);
    this.grid[3][7] = new Piece(pieceType.queen, "white", 3, 7);

    this.renderPieces();
  }

  renderPieces() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const x = CELL_SIZE * i;
        const y = CELL_SIZE * j;
        this.ctx.fillStyle = (i + j) % 2 == 0 ? "#D7BA89" : "#47320e";
        this.ctx.fillRect(x, y, 100, 100);
      }
    }

    if (this.selected.x !== -1) {
      const selectedMoves = generateAllMoves(
        this.selected.x,
        this.selected.y,
        this.grid[this.selected.x][this.selected.y]!.type
      );
      console.log(selectedMoves);
      for (const move of selectedMoves) {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(
          move.x * CELL_SIZE,
          move.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const current = this.grid[x][y];
        if (current) {
          const screenX = x * CELL_SIZE;
          const screenY = y * CELL_SIZE + 70;
          // this.ctx.fillStyle = (x + y) % 2 == 0 ? "black" : "white";
          this.ctx.fillStyle = current.color;
          this.ctx.font = "30px sans-serif";
          if (x == this.selected.x && y == this.selected.y) {
            this.ctx.fillText(
              current.type,
              this.mouseCoords.x - 50,
              this.mouseCoords.y + 20
            );
            this.ctx.fillText(
              current.color,
              this.mouseCoords.x - 50,
              this.mouseCoords.y
            );
          } else {
            this.ctx.fillText(current.type, screenX, screenY);
            this.ctx.fillText(current.color, screenX, screenY - 20);
          }
        }
      }
    }
  }
}
