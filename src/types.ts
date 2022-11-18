export type MoveList = Array<{ x: number; y: number }>;

export type Move = {
  from: { x: number; y: number };
  to: { x: number; y: number };
};

export enum pieceType {
  king = "king",
  queen = "queen",
  rook = "rook",
  bishop = "bishop",
  knight = "knight",
  pawn = "pawn",
}
