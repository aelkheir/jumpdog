import {
  BoardContext,
  GameControlsContext,
  TutorialContext,
} from "@/store/contexts";
import { Move, Store } from "@/store/types";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { findBestMove } from "./helpers/ai-engin";
import { PointUp } from "@/components/svg/PointerUp";
import { PointerDown } from "@/components/svg/PointerDown";
import { isHumanToPlay } from "@/store/reducers/boardReducer";
import { useOverlayTriggerState } from "react-stately";
import { Popover } from "@/components/Popover";
import { Dialog } from "@/components/Dialog";
import { BodyMedium } from "@/components/text/BodyMedium";
import useTranslation from "@/hooks/useTranslation";

interface TutorialProps {}

export const Tutorial: React.FC<TutorialProps> = ({}) => {
  const { translate } = useTranslation();
  const board = useContext(BoardContext);
  const gameControls = useContext(GameControlsContext);
  const {
    takeTutorial,
    tutorialBestMove: tutorialBestMove,
    setTutorialBestMove,
    learntCaptureMoves,
    learntNormalMoves,
    completedTutorial,
  } = useContext(TutorialContext);

  const isHumanTurn = isHumanToPlay({
    color: gameControls.color,
    whiteToPlay: board.whiteToPlay,
  });

  useEffect(() => {
    if (
      takeTutorial &&
      gameControls.hasGameStarted &&
      !tutorialBestMove &&
      isHumanTurn &&
      !completedTutorial
    ) {
      // @ts-ignore
      const bestMove = findBestMove(_.cloneDeep({ board, gameControls }));
      if (bestMove.captures && Object.keys(bestMove.captures).length) {
        if (!learntCaptureMoves) {
          setTutorialBestMove({
            move: bestMove,
            type: "capture",
          });
        }
      } else {
        if (!learntNormalMoves) {
          setTutorialBestMove({
            move: bestMove,
            type: "normal",
          });
        }
      }
    }
  }, [
    isHumanTurn,
    tutorialBestMove,
    takeTutorial,
    board,
    gameControls,
    learntCaptureMoves,
    learntNormalMoves,
    completedTutorial,
  ]);

  let toSquareRef = React.useRef<HTMLDivElement>(null);
  let state = useOverlayTriggerState({
    isOpen: Boolean(board.playerClicks[0]),
  });

  const from = tutorialBestMove?.move?.from;
  const to = tutorialBestMove?.move?.to;

  let fromSquareClass = "";
  let toSquareClass = "";
  if (tutorialBestMove && from && to) {
    fromSquareClass = `square-${from[0]}${from[1]}`;
    toSquareClass = `square-${to[0]}${to[1]}`;
  }

  const clickOne = board.playerClicks[0];
  const showFrom =
    clickOne === undefined || clickOne.toString() !== from?.toString();
  const showTo = clickOne && clickOne.toString() === from?.toString();

  if (
    !isHumanTurn ||
    board.isAnimating ||
    takeTutorial !== true ||
    completedTutorial ||
    !tutorialBestMove ||
    !gameControls.hasGameStarted
  ) {
    return null;
  }

  return (
    <>
      {showFrom && (
        <div
          className={`absolute z-20 w-1/5 h-1/5 ${fromSquareClass} flex justify-end items-end border-4 border-yellow-400`}
        >
          <PointUp />
        </div>
      )}
      {showTo && (
        <>
          <div
            ref={toSquareRef}
            className={`absolute z-20 w-1/5 h-1/5 ${toSquareClass} flex justify-end border-4 border-yellow-400`}
          >
            <PointerDown />
          </div>

          {state.isOpen && (
            <Popover
              isNonModal={true}
              triggerRef={toSquareRef}
              state={state}
              placement="top"
              className="w-80"
            >
              <Dialog>
                {({ close }) => (
                  <div className="w-full h-full flex flex-col gap-2 p-4 bg-surface">
                    <BodyMedium color="text-on-surface">
                      {tutorialBestMove.type === "normal"
                        ? translate("normalMoveHelp")
                        : translate("onCaptureHelp")}
                    </BodyMedium>
                  </div>
                )}
              </Dialog>
            </Popover>
          )}
        </>
      )}
    </>
  );
};
