import { Color, Piece, Store } from "./types";

export const initializePieces = (color: Color): (Piece | "")[][] => {
  const pieces: (Piece | "")[][] = [];
  for (let r = 0; r <= 4; r++) {
    const row: ("" | Piece)[] = [];
    for (let c = 0; c <= 4; c++) {
      if (r <= 1)
        row.push({
          id: String(Math.random() * 1000),
          color: color === "white" ? "black" : "white",
        });
      if (r >= 3)
        row.push({
          id: String(Math.random() * 1000),
          color: color === "white" ? "white" : "black",
        });
      if (r === 2 && c === 2) row.push("");
      if (r === 2 && c >= 3)
        row.push({
          id: String(Math.random() * 1000),
          color: color === "white" ? "black" : "white",
        });
      if (r === 2 && c <= 1)
        row.push({
          id: String(Math.random() * 1000),
          color: color === "white" ? "white" : "black",
        });
    }
    pieces.push(row);
  }
  return pieces;
};

const initializeStore = (): Store => {
  return {
    gameControls: {
      hasGameStarted: false,
      isGameover: false,
      hasDismissedModal: false,
      color: undefined,
      level: 1,
    },
    settings: {
      boardColor: undefined,
      highlightLastMove: false,
      showCoordinates: false,
      showLegalMoves: false,
      theme: "light",
      playSounds: false,
    },
    board: {
      hint: null,
      isAnimating: false,
      moveLog: [],
      validMoves: [],
      whiteToPlay: true,
      hoverSquare: [],
      pieces: initializePieces("white"),
      playerClicks: [],
      isFirstClick: true,
    },
    tutorial: {
      takeTutorial: null,
      tutorialBestMove: null,
      completedTutorial: false,
      learntCaptureMoves: false,
      learntNormalMoves: false,
    },
  };
};

export default initializeStore;
