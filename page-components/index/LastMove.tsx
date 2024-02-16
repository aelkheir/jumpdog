import { BoardContext, SettingsContext } from "@/store/contexts";
import React, { useContext } from "react";

interface LastMoveProps {}

export const LastMove: React.FC<LastMoveProps> = ({}) => {
  const { moveLog } = useContext(BoardContext);
  const { highlightLastMove } = useContext(SettingsContext);

  if (!highlightLastMove) {
    return null;
  }

  const lastMove = moveLog.at(-1);

  if (!lastMove) {
    return null;
  }

  const fromSquare = lastMove.from;
  const toSquare = lastMove.to;
  return (
    <>
      <div
        className={`absolute w-1/5 h-1/5 bg-primary-container square-${fromSquare[0]}${fromSquare[1]} z-0`}
      >
        <div className="w-full h-full bg-primary bg-opacity-80" />
      </div>
      <div
        className={`absolute w-1/5 h-1/5 bg-primary-container square-${toSquare[0]}${toSquare[1]} z-0`}
      >
        <div className="w-full h-full bg-primary bg-opacity-80" />
      </div>
    </>
  );
};
