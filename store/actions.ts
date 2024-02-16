import { Dispatch } from "react";
import { Actions, Dispatchers } from "./types";

export default function (dispatch: Dispatch<Actions>): Dispatchers {
  return {
    gameControls: {
      startNewGame: () => dispatch({ type: "start_new_game" }),
      rematch: () => dispatch({ type: "rematch" }),
      setHasGameStarted: (hasGameStarted) =>
        dispatch({ type: "set_has_game_started", payload: hasGameStarted }),
      setIsGameover: (isGameover) =>
        dispatch({ type: "set_gameover", payload: isGameover }),
      setLevel: (level) => dispatch({ type: "set_level", payload: level }),
      setColor: (color) => dispatch({ type: "set_color", payload: color }),
      setHasDismissedModal: (hasDismissedModal) =>
        dispatch({
          type: "set_has_dismissed_modal",
          payload: hasDismissedModal,
        }),
    },

    settings: {
      setHighlightLastMove: (highlightLastMove) =>
        dispatch({
          type: "set_highlight_lastMove",
          payload: highlightLastMove,
        }),
      setShowLegalMoves: (showLegalMoves) =>
        dispatch({ type: "set_show_legal_moves", payload: showLegalMoves }),
      setTheme: (theme) => dispatch({ type: "set_theme", payload: theme }),
      setPlaySounds: (playSounds) =>
        dispatch({ type: "set_play_sounds", payload: playSounds }),
      setShowCoordinates: (showCoordinates) =>
        dispatch({ type: "set_show_coordinates", payload: showCoordinates }),
      setBoardColor: (boardColor) =>
        dispatch({ type: "set_board_color", payload: boardColor }),
    },

    board: {
      setValidMoves: (validMoves) =>
        dispatch({ type: "set_valid_moves", payload: validMoves }),
      setIsAnimating: (isAnimating) =>
        dispatch({ type: "set_is_animating", payload: isAnimating }),
      showHintMove: (showHintMove) =>
        dispatch({ type: "show_hint_move", payload: showHintMove }),
      setWhiteToPlay: (whiteToPlay) =>
        dispatch({ type: "set_white_to_play", payload: whiteToPlay }),
      setPieces: (pieces) => dispatch({ type: "set_pieces", payload: pieces }),
      setMoveLog: (moveLog) =>
        dispatch({ type: "set_move_log", payload: moveLog }),
      setHoverSquare: (square) =>
        dispatch({ type: "set_hover_square", payload: square }),
      setPlayerClicks: (square, eventType) =>
        dispatch({ type: "set_player_clicks", payload: { square, eventType } }),
      removePiece: (square) =>
        dispatch({ type: "remove_piece", payload: square }),
      makeMove: (move) => dispatch({ type: "make_move", payload: move }),
    },
    tutorial: {
      setTakeTutorial(takeTutorial) {
        dispatch({ type: "set_take_tutorial", payload: takeTutorial });
      },
      setTutorialBestMove(tutorialBestMove) {
        dispatch({
          type: "set_tutorial_best_move",
          payload: tutorialBestMove,
        });
      },
      setCompletedTutorial(completedTutorial) {
        dispatch({
          type: "set_completed_tutorial",
          payload: completedTutorial,
        });
      },
      setLearntCaptureMoves(learntCaptureMoves) {
        dispatch({
          type: "set_learnt_capture_moves",
          payload: learntCaptureMoves,
        });
      },
      setLearntNormalMoves(learntNormalMoves) {
        dispatch({
          type: "set_learnt_normal_moves",
          payload: learntNormalMoves,
        });
      },
    },
  };
}
