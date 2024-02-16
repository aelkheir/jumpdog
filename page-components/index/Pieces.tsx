import React, { useContext, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { BoardContext, GameControlsContext } from "@/store/contexts";
import { Piece } from "./Piece";

interface PiecesProps {}

export const Pieces: React.FC<PiecesProps> = ({}) => {
  const { hasGameStarted, isGameover } = useContext(GameControlsContext);
  const { pieces, removePiece, setIsAnimating, isAnimating } =
    useContext(BoardContext);
  const tl = useMemo(
    () =>
      gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
        },
      }),
    []
  );

  return (
    <>
      {hasGameStarted &&
        pieces.reduce((acc, row, r) => {
          row.forEach((piece, c) => {
            if (piece) {
              acc.push(
                <Piece
                  key={piece.id}
                  row={r}
                  col={c}
                  color={piece.color}
                  dragged={piece.dragged}
                  isCaptured={piece.isCaptured}
                  removePiece={removePiece}
                  movePath={piece.movePath}
                  isGameover={isGameover}
                  tl={tl}
                />
              );
            }
          });
          return acc;
        }, [] as JSX.Element[])}
    </>
  );
};
