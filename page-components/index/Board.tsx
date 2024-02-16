import React, { useContext, useRef } from "react";
import { HoverSquare } from "./HoverSquare";
import { SelectedSquares } from "./SelectedSquares";
import { getPieceTranslate, getRowCol } from "./helpers/dragndrop";
import {
  BoardContext,
  GameControlsContext,
  SettingsContext,
} from "@/store/contexts";
import { Coordinates } from "./Coordinates";
import { LegalMoves } from "./LegalMoves";
import { useAI } from "./helpers/useAI";
import { Pieces } from "./Pieces";
import { LastMove } from "./LastMove";
import { Hint } from "./Hint";
import { Tutorial } from "./Tutorial";

interface BoardProps {}

export const Board: React.FC<BoardProps> = ({}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const board = useContext(BoardContext);
  const gameControls = useContext(GameControlsContext);
  const settings = useContext(SettingsContext);
  useAI();

  let handlers = () => {
    let piece: HTMLDivElement | null;
    const { pieces, setPlayerClicks, playerClicks, setHoverSquare } = board;

    function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
      if (gameControls.isGameover) return;
      e.preventDefault();
      const pageX = e.pageX;
      const pageY = e.pageY;
      const board = boardRef.current!;
      const [row, col] = getRowCol({ pageX, pageY, board });
      piece = document.querySelector<HTMLDivElement>(
        `.piece.square-${row}${col}`
      );
      if (piece) {
        const pieceObject = pieces[row][col];
        if (pieceObject === "") return;
        if (pieceObject.isCaptured) return;
        const [translateX, translateY] = getPieceTranslate({
          pageX,
          pageY,
          board,
        });
        setPlayerClicks([row, col], "pointerdown");
        piece!.style.transform = `translate(${translateX}%, ${translateY}%)`;
        piece!.style.zIndex = "30";
        piece!.style.cursor = "grabbing";
        document.body.addEventListener("pointermove", onPointerMove);
        document.body.addEventListener("pointerup", onPointerUp);
      } else {
        if (playerClicks.length === 1) {
          setPlayerClicks([row, col], "pointerdown");
        }
      }
    }

    function onPointerMove(e: PointerEvent) {
      const pageX = e.pageX;
      const pageY = e.pageY;
      const board = boardRef.current!;
      const [translateX, translateY] = getPieceTranslate({
        pageX,
        pageY,
        board,
      });
      const [row, col] = getRowCol({ pageX, pageY, board });
      setHoverSquare([row, col]);
      piece!.style.transform = `translate(${translateX}%, ${translateY}%)`;
    }

    function onPointerUp(e: PointerEvent) {
      const pageX = e.pageX;
      const pageY = e.pageY;
      const board = boardRef.current!;
      const [row, col] = getRowCol({ pageX, pageY, board });
      setPlayerClicks([row, col], "pointerup");
      piece!.style.removeProperty("transform");
      piece!.style.removeProperty("z-index");
      piece!.style.removeProperty("cursor");
      document.body.removeEventListener("pointermove", onPointerMove);
      document.body.removeEventListener("pointerup", onPointerUp);
    }
    return { onPointerDown };
  };

  let boardBackground = "";
  switch (settings.boardColor) {
    case "blue":
      boardBackground = "bg-blue-500";
      break;
    case "gray":
      boardBackground = "bg-gray-500";
      break;
    case "pink":
      boardBackground = "bg-pink-500";
      break;
  }

  return (
    <div
      className="w-full grow lg:grow-0 flex py-2 items-center lg:items-start justify-center lg:justify-start"
      dir="ltr"
    >
      <div
        className={`w-full max-w-[calc(100vh-256px)] lg:w-[calc(100vh-160px)] lg:max-w-none lg:min-w-[350px] ${boardBackground} bg-opacity-80 drop-shadow-sm`}
      >
        <div
          className={`relative w-full pb-[100%] bg-[url('/bg-board.png')] bg-contain touch-none`}
          ref={boardRef}
          onPointerDown={handlers().onPointerDown}
        >
          <Pieces />
          <HoverSquare
            key="hover-square"
            isHovering={Boolean(board.hoverSquare.length)}
            position={board.hoverSquare}
          />
          <SelectedSquares />
          <LastMove />
          <LegalMoves />
          <Hint />
          <Tutorial />
          <Coordinates />
        </div>
      </div>
    </div>
  );
};
