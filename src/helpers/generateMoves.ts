import { MoveList, pieceType } from "../types";

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

export function generateAllMoves(
  x: number,
  y: number,
  type: pieceType
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

  return moves;
}
