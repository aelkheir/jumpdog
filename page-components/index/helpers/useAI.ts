import {
  BoardContext,
  GameControlsContext,
  SettingsContext,
  TutorialContext,
} from "@/store/contexts";
import { useContext, useEffect } from "react";
import { findBestMove } from "./ai-engin";
import _ from "lodash";
import { isHumanToPlay } from "@/store/reducers/boardReducer";

export const useAI = () => {
  const board = useContext(BoardContext);
  const gameControls = useContext(GameControlsContext);
  const { takeTutorial } = useContext(TutorialContext);
  const { whiteToPlay, makeMove, isAnimating } = board;
  const { color } = gameControls;

  useEffect(() => {
    if (!gameControls.hasGameStarted) return;
    if (gameControls.isGameover) return;
    if (isAnimating) return;
    if (whiteToPlay === undefined || color === undefined) return;
    if (takeTutorial === null) return;
    let timeoutId: NodeJS.Timeout;
    if (!isHumanToPlay({ color, whiteToPlay })) {
      timeoutId = setTimeout(() => {
        const state = {
          board,
          gameControls,
        };
        // @ts-ignore
        const bestMove = findBestMove(_.cloneDeep(state));
        makeMove(bestMove);
      }, 300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    whiteToPlay,
    makeMove,
    color,
    isAnimating,
    gameControls,
    board,
    takeTutorial,
  ]);
};
