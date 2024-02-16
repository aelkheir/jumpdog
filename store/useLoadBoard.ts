import { useEffect } from "react";
import { initializePieces } from "./initializeStore";
import { getValidMoves } from "./reducers/getValidMoves";
import { BoardDispatchers } from "./types";

export const useLoadBoard = (board: BoardDispatchers) => {
  useEffect(() => {
    const whiteToPlay = window.localStorage.getItem("whiteToPlay");
    board.setWhiteToPlay(whiteToPlay === null ? true : JSON.parse(whiteToPlay));

    const defaultPieces = initializePieces("black");
    const pieces = window.localStorage.getItem("pieces");
    board.setPieces(pieces === null ? defaultPieces : JSON.parse(pieces));

    const validMoves = window.localStorage.getItem("validMoves");
    board.setValidMoves(
      validMoves === null
        ? getValidMoves({ whiteToPlay: true, pieces: defaultPieces })
        : JSON.parse(validMoves)
    );

    const moveLog = window.localStorage.getItem("moveLog");
    board.setMoveLog(moveLog === null ? [] : JSON.parse(moveLog));
  }, []);
};
