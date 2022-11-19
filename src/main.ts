import "./style.css";
import Board from "./board";
import { boardElement, boardCtx } from "./boardElement";
import { evaluateBoard, search } from "./treeSearch";

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

boardElement.addEventListener("touchstart", e => {
  // const boardX = Math.floor(e./ (boardElement.width / 8));
  // const boardY = Math.floor(e.offsetY / (boardElement.width / 8));
  // console.log("mouse down");
  // console.log(e.offsetX, e.offsetY);
  // console.log(globalBoard.grid[boardX][boardY], boardX, boardY);
  // globalBoard.selected.x = boardX;
  // globalBoard.selected.y = boardY;
  // globalBoard.renderPieces();
  console.log(e.targetTouches[0].pageX - (e as any).target.offsetLeft);
  console.log(e.targetTouches[0].pageY - (e as any).target.offsetTop);
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

let maximizing: "white" | "black" = "white";
const whiteButton: HTMLButtonElement | null =
  document.querySelector("#white-button");
whiteButton?.addEventListener("click", () => {
  maximizing = "white";
});

const blackButton: HTMLButtonElement | null =
  document.querySelector("#black-button");
blackButton?.addEventListener("click", () => {
  maximizing = "black";
});

const scoreHeader: HTMLHeadingElement = document.querySelector("#score")!;

const evaluateButton: HTMLButtonElement | null =
  document.querySelector("#evaluate-button");
evaluateButton?.addEventListener("click", e => {
  console.log("moving...");
  const minmax = search(
    globalBoard,
    4,
    maximizing,
    -Infinity,
    Infinity,
    maximizing
  );
  console.log(minmax);
  globalBoard.make(minmax.move);
  scoreHeader!.innerHTML = `score: ${evaluateBoard(globalBoard, maximizing)}`;
  console.log("move made!");
  globalBoard.renderPieces();
});

function playSelf(turn: "white" | "black") {
  const { move } = search(globalBoard, 4, turn, -Infinity, Infinity, turn);
  globalBoard.make(move);
  globalBoard.renderPieces();

  setTimeout(() => {
    playSelf(turn === "white" ? "black" : "white");
  }, 500);
}

// playSelf();
