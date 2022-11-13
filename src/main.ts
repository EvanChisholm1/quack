import "./style.css";

console.log("hello world");
const boardElement: HTMLCanvasElement = document.querySelector("#board")!;
const boardCtx = boardElement.getContext("2d")!;

const whiteQueen = new Image();
whiteQueen.src = "./white-queen.svg";

enum pieceType {
  king = "king",
  queen = "queen",
  rook = "rook",
  bishop = "bishop",
  knight = "knight",
  pawn = "pawn",
}

class Piece {
  positions: Array<{ x: number; y: number }>;
  color: "black" | "white";
  type: pieceType;

  constructor(type: pieceType, color: "white" | "black", x: number, y: number) {
    this.positions = [{ x, y }];
    this.color = color;
    this.type = type;
  }
}

class Board {
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
        const x = (boardElement.width / 8) * i;
        const y = (boardElement.height / 8) * j;
        boardCtx.fillStyle = (i + j) % 2 == 0 ? "#D7BA89" : "#47320e";
        boardCtx.fillRect(x, y, 100, 100);
      }
    }

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const current = this.grid[x][y];
        if (current) {
          const screenX = (x * boardElement.width) / 8;
          const screenY = (y * boardElement.width) / 8 + 70;
          this.ctx.fillStyle = (x + y) % 2 == 0 ? "black" : "white";
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

const globalBoard = new Board(boardCtx);

boardElement.addEventListener("mousedown", e => {
  const boardX = Math.floor(e.offsetX / (boardElement.width / 8));
  const boardY = Math.floor(e.offsetY / (boardElement.width / 8));
  console.log("mouse down");
  console.log(e.offsetX, e.offsetY);
  console.log(globalBoard.grid[boardX][boardY], boardX, boardY);
  globalBoard.selected.x = boardX;
  globalBoard.selected.y = boardY;
});

boardElement.addEventListener("mouseup", e => {
  const boardX = Math.floor(e.offsetX / (boardElement.width / 8));
  const boardY = Math.floor(e.offsetY / (boardElement.width / 8));
  console.log("mouse up");
  console.log(e.offsetX, e.offsetY);
  console.log(boardX, boardY);
  if (globalBoard.selected.x != -1) {
    globalBoard.grid[boardX][boardY] =
      globalBoard.grid[globalBoard.selected.x][globalBoard.selected.y];
    if (
      !(globalBoard.selected.x == boardX && globalBoard.selected.y == boardY)
    ) {
      globalBoard.grid[globalBoard.selected.x][globalBoard.selected.y] = null;
    }
  }
  globalBoard.selected = { x: -1, y: -1 };
  globalBoard.renderPieces();
});

boardElement.addEventListener("mousemove", e => {
  globalBoard.mouseCoords = { x: e.offsetX, y: e.offsetY };
  globalBoard.renderPieces();
});
