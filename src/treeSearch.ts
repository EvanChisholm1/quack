import Board from "./board";
import { generateAllMoves } from "./helpers/generateMoves";
import { Move } from "./types";

const pointsMap: { [key: string]: number } = {
  bishop: 325,
  knight: 300,
  king: 10000,
  pawn: 100,
  rook: 500,
  queen: 900,
};

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

  const sortedMoves = possibleMoves.sort((moveA: Move, moveB: Move) => {
    let moveAPoints = 0;
    let moveBPoints = 0;
    if (board.grid[moveA.to.x][moveA.to.y])
      moveAPoints = pointsMap[board.grid[moveA.to.x][moveA.to.y]!.type];
    if (board.grid[moveB.to.x][moveB.to.y])
      moveAPoints = pointsMap[board.grid[moveB.to.x][moveB.to.y]!.type];
    return moveAPoints - moveBPoints;
  });

  let newAlpha = alpha;
  let newBeta = beta;

  if (turn === maximizingPlayer) {
    let bestValue = {
      minmax: -Infinity,
      move: { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
    };

    for (const move of sortedMoves) {
      const from = board.grid[move.from.x][move.from.y];
      const to = board.grid[move.to.x][move.to.y];

      board.make(move);

      const ret = search(
        board,
        depth - 1,
        turn === "black" ? "white" : "black",
        newAlpha,
        newBeta,
        maximizingPlayer
      );

      board.grid[move.from.x][move.from.y] = from;
      board.grid[move.to.x][move.to.y] = to;

      ret.move = move;

      if (ret.minmax > bestValue.minmax) bestValue = ret;
      newAlpha = Math.max(newAlpha, bestValue.minmax);
      if (newBeta <= newAlpha) break;
    }
    return bestValue;
  } else {
    let bestValue = {
      minmax: Infinity,
      move: { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
    };

    for (const move of sortedMoves) {
      const from = board.grid[move.from.x][move.from.y];
      const to = board.grid[move.to.x][move.to.y];

      board.make(move);

      const ret = search(
        board,
        depth - 1,
        turn === "black" ? "white" : "black",
        newAlpha,
        newBeta,
        maximizingPlayer
      );

      board.grid[move.from.x][move.from.y] = from;
      board.grid[move.to.x][move.to.y] = to;

      ret.move = move;

      if (ret.minmax < bestValue.minmax) bestValue = ret;
      newBeta = Math.min(newBeta, bestValue.minmax);
      if (newBeta <= newAlpha) break;
    }
    return bestValue;
  }
}

export function evaluateBoard(
  board: Board,
  maximizingPlayer: "black" | "white"
): number {
  let whitePoints = 0;
  let blackPoints = 0;

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
