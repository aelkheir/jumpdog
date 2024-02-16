import { makeMove, undoMove } from "@/store/reducers/boardReducer";
import { getValidMoves } from "@/store/reducers/getValidMoves";
import { Move, Store } from "@/store/types";
import _ from "lodash";

const GAME_OVER = 100;
const PIECE_WEIGHT = 1;

export const findBestMove = (state: Store) => {
  const {
    gameControls: { level },
    board: { whiteToPlay },
  } = state;
  let bestMove: Move | null = null;
  let DEPTH: number;
  switch (level) {
    case 1:
      DEPTH = 1;
      break;
    case 2:
      DEPTH = 3;
      break;
    case 3:
      DEPTH = 4;
      break;
    default:
      DEPTH = 3;
  }

  const minMax = (
    state: Store,
    depth: number,
    alpha: number,
    beta: number,
    turnMultiplier: number
  ) => {
    let maxScore = -GAME_OVER;
    state.board.validMoves = _.shuffle(state.board.validMoves);

    if (depth === 0) {
      return turnMultiplier * evaluateBoard(state);
    }
    for (let move of state.board.validMoves) {
      makeMove(state, move, false);
      state.board.whiteToPlay = !state.board.whiteToPlay;
      state.board.validMoves = getValidMoves({
        whiteToPlay: state.board.whiteToPlay,
        pieces: state.board.pieces,
      });

      const score = -minMax(state, depth - 1, -beta, -alpha, -turnMultiplier);
      if (score > maxScore) {
        maxScore = score;
        if (depth === DEPTH) {
          bestMove = move;
        }
      }
      undoMove(state, move);
      state.board.whiteToPlay = !state.board.whiteToPlay;
      state.board.validMoves = getValidMoves({
        whiteToPlay: state.board.whiteToPlay,
        pieces: state.board.pieces,
      });
      if (maxScore > alpha) {
        alpha = maxScore;
      }
      if (alpha >= beta) {
        break;
      }
    }

    return maxScore;
  };

  minMax(state, DEPTH, -GAME_OVER, GAME_OVER, state.board.whiteToPlay ? 1 : -1);

  if (!bestMove) {
    bestMove = _.shuffle(state.board.validMoves)[0];
  }
  return bestMove;
};

const evaluateBoard = (state: Store) => {
  const {
    board: { pieces },
  } = state;
  let score = 0;
  let whiteCount = 0;
  let blackCount = 0;
  for (let row of pieces) {
    for (let piece of row) {
      if (piece === "") continue;
      if (piece.color === "white") {
        score += PIECE_WEIGHT;
        whiteCount += 1;
      }
      if (piece.color === "black") {
        score -= PIECE_WEIGHT;
        blackCount += 1;
      }
    }
  }
  if (whiteCount === 0) {
    score -= GAME_OVER;
  } else if (blackCount === 0) {
    score += GAME_OVER;
  }
  return score;
};
