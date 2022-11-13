import Board from "../board";
import { MoveList, pieceType } from "../types";

function isOnBoard(move: { x: number; y: number }): boolean {
  if (move.x >= 0 && move.x <= 7 && move.y >= 0 && move.y <= 7) {
    return true;
  } else return false;
}

function addIfOnBoard(moves: MoveList, move: { x: number; y: number }) {
  if (isOnBoard(move)) moves.push(move);
}

export function generateDiagonalMoves(x: number, y: number): MoveList {
  const moves: MoveList = [];

  for (let i = 1; i < 8; i++) {
    if (x + i <= 7) {
      if (y + i <= 7) moves.push({ x: x + i, y: y + i });
      if (y - i >= 0) moves.push({ x: x + i, y: y - i });
    }

    if (x - i >= 0) {
      if (y + i <= 7) moves.push({ x: x - i, y: y + i });
      if (y - i >= 0) moves.push({ x: x - i, y: y - i });
    }
  }

  return moves;
}

export function generateStraightMoves(x: number, y: number): MoveList {
  const moves: MoveList = [];

  for (let i = 1; i < 8; i++) {
    // vertical moves
    if (y + i <= 7) {
      moves.push({ x, y: y + i });
    }
    if (y - i >= 0) {
      moves.push({ x, y: y - i });
    }

    // horizontal moves
    if (x + i <= 7) {
      moves.push({ x: x + i, y });
    }
    if (x - i >= 0) {
      moves.push({ x: x - i, y });
    }
  }

  return moves;
}

export function generateKnightMoves(x: number, y: number): MoveList {
  const moves: MoveList = [];

  addIfOnBoard(moves, { y: y - 2, x: x + 1 });
  addIfOnBoard(moves, { y: y - 2, x: x - 1 });

  addIfOnBoard(moves, { y: y + 2, x: x + 1 });
  addIfOnBoard(moves, { y: y + 2, x: x - 1 });

  addIfOnBoard(moves, { y: y + 1, x: x - 2 });
  addIfOnBoard(moves, { y: y - 1, x: x - 2 });

  addIfOnBoard(moves, { y: y + 1, x: x + 2 });
  addIfOnBoard(moves, { y: y - 1, x: x + 2 });
  return moves;
}

export function generatePawnMoves(
  x: number,
  y: number,
  color: "black" | "white",
  board: Board
): MoveList {
  const moves: MoveList = [];

  if (color === "black") {
    if (!board.grid[x][y + 1]) {
      addIfOnBoard(moves, { x, y: y + 1 });
      if (y === 1 && !board.grid[x][y + 2]) {
        addIfOnBoard(moves, { x, y: y + 2 });
      }
    }

    if (
      isOnBoard({ x: x - 1, y: y + 1 }) &&
      board.grid[x - 1][y + 1]?.color === "white"
    ) {
      addIfOnBoard(moves, { x: x - 1, y: y + 1 });
    }
    if (
      isOnBoard({ x: x + 1, y: y + 1 }) &&
      board.grid[x + 1][y + 1]?.color === "white"
    ) {
      addIfOnBoard(moves, { x: x + 1, y: y + 1 });
    }
  }

  if (color === "white") {
    if (!board.grid[x][y - 1]) {
      addIfOnBoard(moves, { x, y: y - 1 });
      if (y === 6 && !board.grid[x][y - 2]) {
        addIfOnBoard(moves, { x, y: y - 2 });
      }
    }

    if (
      isOnBoard({ x: x - 1, y: y - 1 }) &&
      board.grid[x - 1][y - 1]?.color === "black"
    ) {
      addIfOnBoard(moves, { x: x - 1, y: y - 1 });
    }
    if (
      isOnBoard({ x: x + 1, y: y - 1 }) &&
      board.grid[x + 1][y - 1]?.color === "black"
    ) {
      addIfOnBoard(moves, { x: x + 1, y: y - 1 });
    }
  }

  return moves;
}

export function generateAllMoves(
  x: number,
  y: number,
  type: pieceType,
  color: "black" | "white",
  board: Board
): MoveList {
  let moves: MoveList = [];
  if (type === pieceType.bishop || type === pieceType.queen) {
    const diagonalMoves = generateDiagonalMoves(x, y);
    moves = [...moves, ...diagonalMoves];
  }
  if (type === pieceType.rook || type === pieceType.queen) {
    const straightMoves = generateStraightMoves(x, y);
    moves = [...moves, ...straightMoves];
  }

  if (type === pieceType.knight) {
    const knightMoves = generateKnightMoves(x, y);
    moves = [...moves, ...knightMoves];
  }
  if (type === pieceType.pawn) {
    const pawnMoves = generatePawnMoves(x, y, color, board);
    moves = [...moves, ...pawnMoves];
  }

  return moves;
}
