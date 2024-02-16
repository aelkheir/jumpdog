import produce from "immer";
import _ from "lodash";
import { Move, Piece } from "../types";

export const getValidMoves = ({
  whiteToPlay,
  pieces,
}: {
  whiteToPlay: boolean;
  pieces: (Piece | "")[][];
}) => {
  const board = _.cloneDeep(pieces);
  board.forEach((row, x) => {
    row.forEach((piece, y) => {
      if (piece === "") return;
      if (piece.isCaptured) board[x][y] = "";
    });
  });
  const playerColor = whiteToPlay ? "white" : "black";
  const validMoves: Move[] = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const piece = board[row][col];
      if (piece && piece.color == playerColor) {
        if (piece.isCaptured) continue;
        getDirectMoves(validMoves, row, col, piece, board);
        getCaptureMoves(validMoves, row, col, piece, board, playerColor);
      }
    }
  }
  return validMoves;
};

const getDirectMoves = (
  validMoves: Move[],
  pieceRow: number,
  pieceCol: number,
  piece: Piece,
  pieces: (Piece | "")[][]
) => {
  let directions = [
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 0],
  ];
  for (let [r, c] of directions) {
    const toRow = r + pieceRow;
    const toCol = c + pieceCol;
    if (4 >= toRow && toRow >= 0 && 4 >= toCol && toCol >= 0) {
      if (pieces[toRow][toCol] === "") {
        const from = [pieceRow, pieceCol];
        const to = [toRow, toCol];
        const pieceMoved: Piece = { ...piece };
        const move = createMove({
          from,
          to,
          pieceMoved,
          path: `${to[0]}${to[1]}`,
        });
        validMoves.push(move);
      }
    }
  }
};

const getCaptureMoves = (
  validMoves: Move[],
  pieceRow: number,
  pieceCol: number,
  piece: Piece,
  pieces: (Piece | "")[][],
  playerColor: string
) => {
  const opponentColor = playerColor === "white" ? "black" : "white";
  const pieceMoved = { ...piece };
  const from = [pieceRow, pieceCol];
  pieces = produce(pieces, (draft) => {
    draft[pieceRow][pieceCol] = "";
  });

  const squareCaptures = (
    validMoves: any,
    row: number,
    col: number,
    path: string = "",
    captures: any = {},
    visited: { [prop: string]: boolean } = {},
    exclude?: number[]
  ) => {
    if (visited[`${row}${col}`]) return;
    visited[`${row}${col}`] = true;

    let directions = [
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 0],
    ];
    if (exclude !== undefined) {
      directions = directions.filter(([r, c]) => {
        if (r === exclude[0] && c === exclude[1]) return false;
        return true;
      });
    }
    directions.forEach(([r, c]) => {
      const opponentRow = r + row;
      const opponentCol = c + col;
      const captureRow = r + r + row;
      const captureCol = c + c + col;
      if (
        4 >= captureRow &&
        captureRow >= 0 &&
        4 >= captureCol &&
        captureCol >= 0
      ) {
        const pieceCaptured = pieces[opponentRow][opponentCol];
        if (pieceCaptured && pieceCaptured.color === opponentColor) {
          if (pieces[captureRow][captureCol] === "") {
            const to = [captureRow, captureCol];
            const movePath: string =
              `${path} ${captureRow}${captureCol}`.trim();
            const moveCaptures = {
              ...captures,
              [String(opponentRow) + String(opponentCol)]: {
                ...pieceCaptured,
                isCaptured: true,
              },
            };
            const move = createMove({
              from,
              to,
              pieceMoved,
              path: movePath,
              captures: moveCaptures,
            });
            validMoves.push(move);
            const exclude = [-1 * r, -1 * c];
            const visitedSquares = { ...visited };
            squareCaptures(
              validMoves,
              captureRow,
              captureCol,
              movePath,
              moveCaptures,
              visitedSquares,
              exclude
            );
          }
        }
      }
    });
  };

  squareCaptures(validMoves, pieceRow, pieceCol);
};

export const createMove = ({
  from,
  to,
  pieceMoved,
  path = ``,
  captures = {},
}: Move) => {
  return {
    id:
      pieceMoved.id +
      (
        (from[0] + 1) * 100 * (to[1] + 1) * 100 +
        (to[0] + 1) * 100 * (from[1] + 1)
      ).toString(),
    from: from,
    to: to,
    path: path,
    pieceMoved: { ...pieceMoved, movePath: path },
    captures: captures,
  };
};
