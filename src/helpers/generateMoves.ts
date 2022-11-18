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

function isPiece(x: number, y: number, board: Board) {
  if (isOnBoard({ x, y }) && board.grid[x][y] !== null) return true;
  else return false;
}

function isEnemyOrEmpty(
  x: number,
  y: number,
  color: "black" | "white",
  board: Board
) {
  if (
    isOnBoard({ x, y }) &&
    (board.grid[x][y] === null || isEnemy(x, y, color, board))
  )
    return true;
  else return false;
}

function isEnemy(x: number, y: number, color: "black" | "white", board: Board) {
  if (board.grid[x][y] && board.grid[x][y]?.color !== color) return true;
  else return false;
}

export function generateDiagonalMoves(
  x: number,
  y: number,
  color: "white" | "black",
  board: Board
): MoveList {
  const moves: MoveList = [];

  let upLeftBlocked = false;
  let upRightBlocked = false;
  let downRightBlocked = false;
  let downLeftBlocked = false;

  for (let i = 1; i < 8; i++) {
    if (x + i <= 7) {
      if (y + i <= 7 && !downRightBlocked) {
        if (isEnemyOrEmpty(x + i, y + i, color, board)) {
          moves.push({ x: x + i, y: y + i });
        }
        if (isPiece(x + i, y + i, board)) downRightBlocked = true;
      }
      if (y - i >= 0 && !upRightBlocked) {
        if (isEnemyOrEmpty(x + i, y - i, color, board)) {
          moves.push({ x: x + i, y: y - i });
        }
        if (isPiece(x + i, y - i, board)) upRightBlocked = true;
      }
    }

    if (x - i >= 0) {
      if (y + i <= 7 && !upLeftBlocked) {
        if (isEnemyOrEmpty(x - i, y + i, color, board)) {
          moves.push({ x: x - i, y: y + i });
        }
        if (isPiece(x - i, y + i, board)) upLeftBlocked = true;
      }
      if (y - i >= 0 && !downLeftBlocked) {
        if (isEnemyOrEmpty(x - i, y - i, color, board)) {
          moves.push({ x: x - i, y: y - i });
        }
        if (isPiece(x - i, y - i, board)) downLeftBlocked = true;
      }
    }
  }

  return moves;
}

export function generateStraightMoves(
  x: number,
  y: number,
  color: "black" | "white",
  board: Board
): MoveList {
  const moves: MoveList = [];

  let upBlocked = false;
  let downBlocked = false;
  let leftBlocked = false;
  let rightBlocked = false;

  for (let i = 1; i < 8; i++) {
    if (y + i <= 7 && !downBlocked) {
      if (isEnemyOrEmpty(x, y + i, color, board)) {
        moves.push({ x, y: y + i });
      }
      if (isPiece(x, y + i, board)) downBlocked = true;
    }
    if (y - i >= 0 && !upBlocked) {
      if (isEnemyOrEmpty(x, y - i, color, board)) {
        moves.push({ x, y: y - i });
      }
      if (isPiece(x, y - i, board)) upBlocked = true;
    }

    // horizontal moves
    if (x + i <= 7 && !leftBlocked) {
      if (isEnemyOrEmpty(x + i, y, color, board)) {
        moves.push({ x: x + i, y });
      }
      if (isPiece(x + i, y, board)) leftBlocked = true;
    }
    if (x - i >= 0 && !rightBlocked) {
      if (isEnemyOrEmpty(x - i, y, color, board)) {
        moves.push({ x: x - i, y });
      }
      if (isPiece(x - i, y, board)) rightBlocked = true;
    }
  }

  return moves;
}

export function generateKnightMoves(
  x: number,
  y: number,
  color: "black" | "white",
  board: Board
): MoveList {
  const moves: MoveList = [];

  if (isEnemyOrEmpty(x + 1, y - 2, color, board))
    addIfOnBoard(moves, { y: y - 2, x: x + 1 });
  if (isEnemyOrEmpty(x - 1, y - 2, color, board))
    addIfOnBoard(moves, { y: y - 2, x: x - 1 });

  if (isEnemyOrEmpty(x + 1, y + 2, color, board))
    addIfOnBoard(moves, { y: y + 2, x: x + 1 });
  if (isEnemyOrEmpty(x - 1, y + 2, color, board))
    addIfOnBoard(moves, { y: y + 2, x: x - 1 });

  if (isEnemyOrEmpty(x - 2, y + 1, color, board))
    addIfOnBoard(moves, { y: y + 1, x: x - 2 });
  if (isEnemyOrEmpty(x - 2, y - 1, color, board))
    addIfOnBoard(moves, { y: y - 1, x: x - 2 });

  if (isEnemyOrEmpty(x + 2, y + 1, color, board))
    addIfOnBoard(moves, { y: y + 1, x: x + 2 });
  if (isEnemyOrEmpty(x + 2, y - 1, color, board))
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

function generateKingMoves(
  x: number,
  y: number,
  color: "black" | "white",
  board: Board
): MoveList {
  const moves: MoveList = [];

  if (
    isOnBoard({ x: x - 1, y: y - 1 }) &&
    isEnemyOrEmpty(x - 1, y - 1, color, board)
  ) {
    moves.push({ x: x - 1, y: y - 1 });
  }
  if (isOnBoard({ x: x - 1, y: y }) && isEnemyOrEmpty(x - 1, y, color, board)) {
    moves.push({ x: x - 1, y });
  }
  if (
    isOnBoard({ x: x - 1, y: y + 1 }) &&
    isEnemyOrEmpty(x - 1, y + 1, color, board)
  ) {
    moves.push({ x: x - 1, y: y + 1 });
  }

  if (
    isOnBoard({ x: x + 1, y: y - 1 }) &&
    isEnemyOrEmpty(x + 1, y - 1, color, board)
  ) {
    moves.push({ x: x + 1, y: y - 1 });
  }
  if (isOnBoard({ x: x + 1, y: y }) && isEnemyOrEmpty(x + 1, y, color, board)) {
    moves.push({ x: x + 1, y });
  }
  if (
    isOnBoard({ x: x + 1, y: y + 1 }) &&
    isEnemyOrEmpty(x + 1, y + 1, color, board)
  ) {
    moves.push({ x: x + 1, y: y + 1 });
  }

  if (isOnBoard({ x, y: y + 1 }) && isEnemyOrEmpty(x, y + 1, color, board)) {
    moves.push({ x, y: y + 1 });
  }
  if (isOnBoard({ x, y: y - 1 }) && isEnemyOrEmpty(x, y - 1, color, board)) {
    moves.push({ x, y: y - 1 });
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
    const diagonalMoves = generateDiagonalMoves(x, y, color, board);
    moves = [...moves, ...diagonalMoves];
  }
  if (type === pieceType.rook || type === pieceType.queen) {
    const straightMoves = generateStraightMoves(x, y, color, board);
    moves = [...moves, ...straightMoves];
  }

  if (type === pieceType.knight) {
    const knightMoves = generateKnightMoves(x, y, color, board);
    moves = [...moves, ...knightMoves];
  }
  if (type === pieceType.pawn) {
    const pawnMoves = generatePawnMoves(x, y, color, board);
    moves = [...moves, ...pawnMoves];
  }
  if (type === pieceType.king) {
    const kingMoves = generateKingMoves(x, y, color, board);
    moves = [...moves, ...kingMoves];
  }

  return moves;
}
