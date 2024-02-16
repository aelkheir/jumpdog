import { findBestMove } from "@/page-components/index/helpers/ai-engin";
import _ from "lodash";
import { Actions, Color, Move, Piece, Store } from "../types";
import { createMove, getValidMoves } from "./getValidMoves";

export const boardReducer = (state: Store, action: Actions) => {
  const { board, tutorial } = state;
  switch (action.type) {
    case "set_hover_square": {
      board.hoverSquare = action.payload;
      return board;
    }
    case "set_is_animating": {
      board.isAnimating = action.payload;
      return board;
    }
    case "set_white_to_play": {
      board.whiteToPlay = action.payload;
      localStorage.setItem("whiteToPlay", JSON.stringify(action.payload));
      return board;
    }
    case "set_valid_moves": {
      board.validMoves = action.payload;
      localStorage.setItem("validMoves", JSON.stringify(action.payload));
      return board;
    }
    case "set_pieces": {
      board.pieces = action.payload;
      localStorage.setItem("pieces", JSON.stringify(action.payload));
      return board;
    }
    case "set_move_log": {
      board.moveLog = action.payload;
      localStorage.setItem("moveLog", JSON.stringify(action.payload));
      return board;
    }
    case "show_hint_move": {
      const showHint = action.payload;
      if (showHint) {
        board.hint = findBestMove(_.cloneDeep(state));
      } else {
        board.hint = null;
      }
      return board;
    }
    case "remove_piece": {
      const square = action.payload;
      board.pieces[square[0]][square[1]] = "";
      state.gameControls.isGameover = board.validMoves.length === 0;
      localStorage.setItem(
        "isGameover",
        JSON.stringify(state.gameControls.isGameover)
      );
      localStorage.setItem("pieces", JSON.stringify(state.board.pieces));
      return board;
    }
    case "make_move": {
      const move = action.payload;
      makeMove(state, move);
      board.whiteToPlay = !state.board.whiteToPlay;
      board.moveLog.push(move);
      board.hint = null;
      board.isAnimating = true;
      board.validMoves = getValidMoves({
        whiteToPlay: board.whiteToPlay,
        pieces: board.pieces,
      });
      localStorage.setItem("whiteToPlay", JSON.stringify(board.whiteToPlay));
      localStorage.setItem("pieces", JSON.stringify(board.pieces));
      localStorage.setItem("moveLog", JSON.stringify(board.moveLog));
      localStorage.setItem("validMoves", JSON.stringify(board.validMoves));
      return state;
    }
    case "set_player_clicks": {
      const { square, eventType } = action.payload;
      switch (eventType) {
        case "pointerdown": {
          if (square.length === 0) {
            board.playerClicks = [];
            board.hoverSquare = [];
            board.isFirstClick = true;
            return board;
          }
          if (board.playerClicks.length === 0) {
            board.playerClicks = [square];
            board.hoverSquare = square;
            return board;
          }
          if (board.playerClicks.length === 1) {
            const clickOne = board.playerClicks[0];
            const piece = board.pieces[clickOne[0]][clickOne[1]] as Piece;
            if (clickOne.toString() === square.toString()) {
              board.playerClicks = [square];
              board.hoverSquare = square;
              return board;
            }
            if (board.pieces[square[0]][square[1]] !== "") {
              board.playerClicks = [square];
              board.hoverSquare = square;
              board.isFirstClick = true;
              return board;
            }
            board.playerClicks = [];
            board.isFirstClick = true;
            if (board.isAnimating) {
              return;
            }
            // check to see if it's human turn, if not return.
            const {
              board: { whiteToPlay },
              gameControls: { color },
            } = state;
            if (!isHumanToPlay({ color, whiteToPlay })) return;

            // check to see if the move is valid, if not return
            const move = createMove({
              from: [...clickOne],
              to: [...square],
              pieceMoved: _.cloneDeep(piece),
            });
            const [validMove] = board.validMoves.filter(
              (validMove) => validMove.id === move.id
            );
            if (!validMove) return;

            // check if in tutorial, and the move matches tutorial move
            const success = handleTutorial(state, validMove);
            if (!success) return;

            // set the pieceMoved property to the current piece
            // so that the new dragged value appers in the board state
            piece.dragged = false;
            validMove.pieceMoved = piece;
            makeMove(state, validMove);
            board.isAnimating = true;
            board.whiteToPlay = !board.whiteToPlay;
            board.moveLog.push(move);
            board.hint = null;
            board.validMoves = getValidMoves({
              whiteToPlay: board.whiteToPlay,
              pieces: board.pieces,
            });
            localStorage.setItem(
              "whiteToPlay",
              JSON.stringify(board.whiteToPlay)
            );
            localStorage.setItem("pieces", JSON.stringify(board.pieces));
            localStorage.setItem("moveLog", JSON.stringify(board.moveLog));
            localStorage.setItem(
              "validMoves",
              JSON.stringify(board.validMoves)
            );

            return board;
          }
        }
        case "pointerup": {
          board.hoverSquare = [];
          const clickOne = board.playerClicks[0];
          const firstClick = board.isFirstClick;
          if (!clickOne) return;
          const piece = board.pieces[clickOne[0]][clickOne[1]] as Piece;
          if (clickOne.toString() === square.toString() && firstClick) {
            board.isFirstClick = false;
            return board;
          }
          if (clickOne.toString() === square.toString() && !firstClick) {
            board.playerClicks = [];
            board.isFirstClick = true;
            return board;
          }
          board.playerClicks = [];
          board.isFirstClick = true;
          if (board.isAnimating) {
            return;
          }
          // check to see if it's human turn, if not return.
          const {
            board: { whiteToPlay },
            gameControls: { color },
          } = state;
          if (!isHumanToPlay({ color, whiteToPlay })) return;

          // check to see if the move is valid, if not return
          const move = createMove({
            from: [...clickOne],
            to: [...square],
            pieceMoved: piece,
          });
          const [validMove] = board.validMoves.filter(
            (validMove) => validMove.id === move.id
          );
          if (!validMove) return;

          // check if in tutorial, and the move matches tutorial move
          const success = handleTutorial(state, validMove);
          if (!success) return;

          // set the pieceMoved property to the current piece
          // so that the new dragged value appers in the board state
          piece.dragged = true;
          validMove.pieceMoved = piece;
          makeMove(state, validMove);
          // we set isAnimating to true only if the move has some captures,
          // otherwise, there is no animation going, since the player was dragging :)
          if (validMove.captures && Object.keys(validMove.captures).length) {
            board.isAnimating = true;
          }
          board.whiteToPlay = !board.whiteToPlay;
          board.moveLog.push(move);
          board.hint = null;
          board.validMoves = getValidMoves({
            whiteToPlay: board.whiteToPlay,
            pieces: board.pieces,
          });
          localStorage.setItem(
            "whiteToPlay",
            JSON.stringify(board.whiteToPlay)
          );
          localStorage.setItem("pieces", JSON.stringify(board.pieces));
          localStorage.setItem("moveLog", JSON.stringify(board.moveLog));
          localStorage.setItem("validMoves", JSON.stringify(board.validMoves));
          return board;
        }
      }
    }
  }
};

export const isHumanToPlay = ({
  color,
  whiteToPlay,
}: {
  color: Color;
  whiteToPlay: boolean;
}): boolean => {
  return (
    (whiteToPlay && color === "white") || (!whiteToPlay && color === "black")
  );
};

export const makeMove = (
  state: Store,
  move: Move,
  animation: boolean = true
) => {
  const {
    board: { pieces },
  } = state;
  const { from, to, pieceMoved, path } = move;
  const [toRow, toCol] = to;
  pieces[from[0]][from[1]] = "";
  pieces[toRow][toCol] = { ...pieceMoved, movePath: path };
  Object.entries(move.captures!).forEach(([position, pieceCaptured]) => {
    const [r, c] = [Number(position[0]), Number(position[1])];
    pieces[r][c] = animation ? { ...pieceCaptured, isCaptured: true } : "";
  });
};

export const undoMove = (state: Store, move: Move) => {
  const {
    board: { pieces },
  } = state;
  const { from, to, pieceMoved } = move!;
  const [toRow, toCol] = to;
  const reversdPath = move
    .path!.split(" ")
    .reverse()
    .slice(1)
    .concat([`${from[0]}${from[1]}`]);
  const movePath = reversdPath.join(" ");
  pieces[from[0]][from[1]] = { ...pieceMoved, movePath };
  pieces[toRow][toCol] = "";
  Object.entries(move.captures!).forEach(([position, pieceCaptured]) => {
    const [r, c] = [Number(position[0]), Number(position[1])];
    pieces[r][c] = { ...pieceCaptured, isCaptured: false };
  });
};

const handleTutorial = (state: Store, validMove: Move): boolean => {
  const { tutorial } = state;

  // check if in tutorial, and the move matches tutorial move
  if (
    tutorial.takeTutorial &&
    !tutorial.completedTutorial &&
    tutorial.tutorialBestMove
  ) {
    const tutorialBestMove = tutorial.tutorialBestMove;
    if (validMove.id !== tutorialBestMove.move.id) {
      return false;
    } else {
      if (tutorialBestMove.type === "normal") {
        tutorial.learntNormalMoves = true;
        window.localStorage.setItem("learntNormalMoves", JSON.stringify(true));
      } else if (tutorialBestMove.type === "capture") {
        tutorial.learntCaptureMoves = true;
        window.localStorage.setItem("learntCaptureMoves", JSON.stringify(true));
      }
      tutorial.tutorialBestMove = null;
      window.localStorage.setItem("tutorialBestMove", JSON.stringify(null));
      if (tutorial.learntCaptureMoves && tutorial.learntNormalMoves) {
        tutorial.completedTutorial = true;
        window.localStorage.setItem("completedTutorial", JSON.stringify(true));
      }
    }
  }
  return true;
};
