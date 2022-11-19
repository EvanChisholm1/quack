import Board from "./board";
import { generateAllMoves } from "./helpers/generateMoves";
import { pieceType, Move } from "./types";

export function search(
  board: Board,
  depth: number,
  turn: "black" | "white",
  alpha: number,
  beta: number,
  maximizingPlayer: "white" | "black"
): { minmax: number; move: Move } {
  if (depth <= 0)
    return {
      minmax: evaluateBoard(board, maximizingPlayer),
      move: { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
    };
  let possibleMoves: Array<Move> = [];

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const piece = board.grid[x][y];
      if (piece) {
        if (piece.color == turn) {
          const pieceMoves = generateAllMoves(
            x,
            y,
            piece?.type,
            piece?.color,
            board
          ).map(to => ({ from: { x, y }, to }));
          possibleMoves = [...possibleMoves, ...pieceMoves];
        }
      }
    }
  }

  let minMinMax = {
    minmax: Infinity,
    move: { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
  };
  let maxMinMax = {
    minmax: -Infinity,
    move: { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
  };

  for (const move of possibleMoves) {
    const from = board.grid[move.from.x][move.from.y];
    const to = board.grid[move.to.x][move.to.y];

    board.make(move);
    const returnObject = search(
      board,
      depth - 1,
      turn === "black" ? "white" : "black",
      alpha,
      beta,
      maximizingPlayer
    );

    board.grid[move.from.x][move.from.y] = from;
    board.grid[move.to.x][move.to.y] = to;

    returnObject.move = move;

    if (returnObject.minmax > maxMinMax.minmax) maxMinMax = returnObject;
    if (returnObject.minmax < minMinMax.minmax) minMinMax = returnObject;

    // if (returnObject.minmax >= beta && turn == "white") break;
    // if (returnObject.minmax <= alpha && turn == "black") break;

    if (turn == "white") alpha = Math.max(alpha, returnObject.minmax);
    if (turn == "black") beta = Math.max(beta, returnObject.minmax);
  }

  if (turn === maximizingPlayer) {
    return maxMinMax;
  } else {
    return minMinMax;
  }
}

export function evaluateBoard(
  board: Board,
  maximizingPlayer: "black" | "white"
): number {
  let whitePoints = 0;
  let blackPoints = 0;

  const pointsMap: { [key: string]: number } = {
    bishop: 325,
    knight: 300,
    king: 10000,
    pawn: 100,
    rook: 500,
    queen: 900,
  };

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const square = board.grid[x][y];
      if (square) {
        if (square.color == "black") {
          blackPoints += pointsMap[square.type];
          // blackPoints += (y + 1) * 10;
          blackPoints += -2 * x * (x - 7);
          blackPoints += -2 * y * (y - 7);
        }
        if (square.color == "white") {
          whitePoints += pointsMap[square.type];
          whitePoints += -2 * y * (y - 7);
          whitePoints += -2 * x * (x - 7);
          // whitePoints += 8 * 10 - (y + 1) * 10;
        }
      }
    }
  }

  if (maximizingPlayer === "white") {
    return whitePoints - blackPoints;
  } else {
    return blackPoints - whitePoints;
  }
}
