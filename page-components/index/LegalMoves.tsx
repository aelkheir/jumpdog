import React, { useContext } from "react";
import {
  BoardContext,
  GameControlsContext,
  SettingsContext,
} from "@/store/contexts";
import { getValidMoves } from "@/store/reducers/getValidMoves";
import { Move } from "@/store/types";
import { isHumanToPlay } from "@/store/reducers/boardReducer";

interface LegalMovesProps {}

export const LegalMoves: React.FC<LegalMovesProps> = ({}) => {
  const {
    pieces,
    whiteToPlay,
    playerClicks: [clickOne],
    validMoves,
  } = useContext(BoardContext);
  const { showLegalMoves } = useContext(SettingsContext);
  const { color } = useContext(GameControlsContext);
  let moves: Move[] = [];
  if (!isHumanToPlay({ color, whiteToPlay })) return null;
  if (clickOne) {
    moves = validMoves.filter((move) => {
      return move.from.toString() === clickOne.toString();
    });
  }

  return (
    <>
      {showLegalMoves &&
        moves.map(({ to: [r, c], id }) => (
          <div
            key={`${id}`}
            style={{ padding: "7%" }}
            className={`w-1/5 h-1/5 absolute bg-black bg-opacity-20 bg-clip-content pointer-events-none rounded-full  square-${r}${c}`}
          ></div>
        ))}
    </>
  );
};
