import { initializePieces } from "../initializeStore";
import { Actions, Store } from "../types";
import { getValidMoves } from "./getValidMoves";

export const gameControlsReducer = (state: Store, action: Actions) => {
  const { gameControls } = state;
  switch (action.type) {
    case "start_new_game": {
      gameControls.hasGameStarted = false;
      gameControls.isGameover = false;
      gameControls.hasDismissedModal = false;
      const newPieces = initializePieces(gameControls.color);
      state.board = {
        hint: null,
        whiteToPlay: true,
        hoverSquare: [],
        pieces: newPieces,
        isAnimating: false,
        validMoves: getValidMoves({ whiteToPlay: true, pieces: newPieces }),
        playerClicks: [],
        isFirstClick: true,
        moveLog: [],
      };
      state.tutorial = {
        ...state.tutorial,
        tutorialBestMove: null,
      };
      localStorage.setItem("hasGameStarted", `false`);
      localStorage.setItem("isGameover", `false`);
      localStorage.setItem(
        "whiteToPlay",
        JSON.stringify(state.board.whiteToPlay)
      );
      localStorage.setItem("pieces", JSON.stringify(state.board.pieces));
      localStorage.setItem("moveLog", JSON.stringify(state.board.moveLog));
      localStorage.setItem("tutorialBestMove", JSON.stringify(null));
      return gameControls;
    }
    case "rematch": {
      gameControls.hasGameStarted = true;
      gameControls.isGameover = false;
      gameControls.hasDismissedModal = false;
      const newPieces = initializePieces(gameControls.color);
      state.board = {
        hint: null,
        whiteToPlay: true,
        hoverSquare: [],
        pieces: newPieces,
        isAnimating: false,
        validMoves: getValidMoves({ whiteToPlay: true, pieces: newPieces }),
        playerClicks: [],
        isFirstClick: true,
        moveLog: [],
      };
      localStorage.setItem("hasGameStarted", `true`);
      localStorage.setItem("isGameover", `false`);
      localStorage.setItem(
        "whiteToPlay",
        JSON.stringify(state.board.whiteToPlay)
      );
      localStorage.setItem("pieces", JSON.stringify(state.board.pieces));
      localStorage.setItem("moveLog", JSON.stringify(state.board.moveLog));
      return gameControls;
    }
    case "set_has_game_started": {
      gameControls.hasGameStarted = action.payload;
      localStorage.setItem("hasGameStarted", `${action.payload}`);
      return gameControls;
    }
    case "set_gameover": {
      gameControls.isGameover = action.payload;
      localStorage.setItem("isGameover", `${action.payload}`);
      return gameControls;
    }
    case "set_has_dismissed_modal": {
      gameControls.hasDismissedModal = action.payload;
      return gameControls;
    }
    case "set_color": {
      gameControls.color = action.payload;
      const newPieces = initializePieces(action.payload);
      state.board.pieces = newPieces;
      state.board.validMoves = getValidMoves({
        whiteToPlay: true,
        pieces: newPieces,
      });
      state.tutorial = {
        ...state.tutorial,
        tutorialBestMove: null,
      };
      localStorage.setItem("color", `${action.payload}`);
      localStorage.setItem("pieces", JSON.stringify(state.board.pieces));
      localStorage.setItem(
        "validMoves",
        JSON.stringify(state.board.validMoves)
      );
      localStorage.setItem("tutorialBestMove", JSON.stringify(null));
      return gameControls;
    }
    case "set_level": {
      gameControls.level = action.payload;
      localStorage.setItem("level", `${action.payload}`);
      return gameControls;
    }
  }
};
