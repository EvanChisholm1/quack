import "./style.css";
import Board from "./board";
import { boardElement, boardCtx } from "./boardElement";

console.log("hello world");

const globalBoard = new Board(boardCtx);

boardElement.addEventListener("mousedown", e => {
  const boardX = Math.floor(e.offsetX / (boardElement.width / 8));
  const boardY = Math.floor(e.offsetY / (boardElement.width / 8));
  console.log("mouse down");
  console.log(e.offsetX, e.offsetY);
  console.log(globalBoard.grid[boardX][boardY], boardX, boardY);
  globalBoard.selected.x = boardX;
  globalBoard.selected.y = boardY;
  globalBoard.renderPieces();
});

boardElement.addEventListener("mouseup", e => {
  const boardX = Math.floor(e.offsetX / (boardElement.width / 8));
  const boardY = Math.floor(e.offsetY / (boardElement.width / 8));
  console.log("mouse up");
  console.log(e.offsetX, e.offsetY);
  console.log(boardX, boardY);
  if (
    globalBoard.selected.x != -1 &&
    globalBoard.grid[globalBoard.selected.x][globalBoard.selected.y]
  ) {
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
