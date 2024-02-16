export const getRowCol = ({
  pageX,
  pageY,
  board,
}: {
  pageX: number;
  pageY: number;
  board: HTMLDivElement;
}) => {
  const boardOffsetLeft = board.getBoundingClientRect().left;
  const boardOffsetTop = board.getBoundingClientRect().top;
  const SQUARE_SIZE = board.clientWidth / 5;
  let row = Math.floor((pageY - boardOffsetTop) / SQUARE_SIZE);
  row = row > 4 ? 4 : row < 0 ? 0 : row;
  let col = Math.floor((pageX - boardOffsetLeft) / SQUARE_SIZE);
  col = col > 4 ? 4 : col < 0 ? 0 : col;
  return [row, col];
};

export const getPieceTranslate = ({
  pageX,
  pageY,
  board,
}: {
  pageX: number;
  pageY: number;
  board: HTMLDivElement;
}) => {
  const boardOffsetStart = board.getBoundingClientRect().left;
  const boardOffsetTop = board.getBoundingClientRect().top;
  const SQUARE_SIZE = board.clientWidth / 5;
  let translateY =
    ((pageY - boardOffsetTop - SQUARE_SIZE / 2) / SQUARE_SIZE) * 100;
  translateY = translateY > 400 ? 400 : translateY < 0 ? 0 : translateY;
  let translateX =
    ((pageX - boardOffsetStart - SQUARE_SIZE / 2) / SQUARE_SIZE) * 100;
  translateX = translateX > 400 ? 400 : translateX < 0 ? 0 : translateX;
  return [translateX, translateY];
};
