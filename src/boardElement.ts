export const boardElement: HTMLCanvasElement =
  document.querySelector("#board")!;
export const boardCtx = boardElement.getContext("2d")!;

export const CELL_SIZE = boardElement.width / 8;
