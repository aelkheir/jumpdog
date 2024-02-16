import React, { useEffect, useRef } from "react";
import { Square } from "@/store/types";

interface PieceProps {
  row: number;
  col: number;
  color: "white" | "black";
  dragged: boolean | undefined;
  isCaptured?: boolean;
  movePath?: string;
  isGameover: boolean;
  removePiece: (square: Square) => void;
  tl: gsap.core.Timeline;
}

export const Piece: React.FC<PieceProps> = React.memo(
  ({
    row,
    col,
    color,
    dragged,
    isCaptured,
    removePiece,
    tl,
    movePath,
    isGameover,
  }) => {
    const pieceRef = useRef<HTMLDivElement>(null);
    const pieceBackground =
      color === "white"
        ? `bg-[url('/white-piece.png')]`
        : `bg-[url('/black-piece.png')]`;

    // add the square-\d\d class on the first render
    useEffect(() => {
      const squareClass = `square-${row}${col}`;
      const piece = pieceRef.current!;
      piece?.classList.add(squareClass);
    }, []);

    useEffect(() => {
      const piece = pieceRef.current!;
      let squareClassMatch = piece.className.match(/square-\d\d/);
      const oldSquareClass = squareClassMatch ? squareClassMatch[0] : null;
      const squareClass = `square-${row}${col}`;
      if (!oldSquareClass) return;
      if (dragged) {
        piece?.classList.replace(oldSquareClass!, squareClass);
        tl.add("moveend");
      }
    }, [dragged, row, col]);

    useEffect(() => {
      setTimeout(() => {
        const piece = pieceRef.current!;
        if (isCaptured) {
          tl.to(
            piece,
            {
              opacity: 0,
              scale: 0.5,
              rotate: 180,
              ease: "power4.out",
              onComplete: () => {
                removePiece([row, col]);
              },
            },
            `moveend`
          );
        }
      }, 10);
    }, [isCaptured]);

    useEffect(() => {
      if (isGameover) return;
      const piece = pieceRef.current!;
      let squareClassMatch = piece.className.match(/square-\d\d/);
      const oldSquareClass = squareClassMatch ? squareClassMatch[0] : null;
      const squareClass = `square-${row}${col}`;
      if (!oldSquareClass) return;
      if (!dragged) {
        setTimeout(() => {
          tl.set(piece, { zIndex: 30 });
          movePath?.split(" ").forEach((square, index, movePath) => {
            const isLast = index === movePath.length - 1;
            const [row, col] = [Number(square[0]), Number(square[1])];
            tl.to(piece, {
              duration: 0.35,
              x: `${col * 100}%`,
              y: `${row * 100}%`,
              ease: "power4.out",
              clearProps: isLast ? "transform, z-index" : "",
              onStart: () => {},
              onComplete: () => {
                if (isLast) {
                  piece?.classList.replace(oldSquareClass!, squareClass);
                  piece?.style.removeProperty("z-index");
                }
              },
            });
          });
          tl.addLabel("moveend");
        });
      }
    }, [row, col, dragged, movePath, isGameover]);

    return (
      <div
        className={`piece absolute w-1/5 h-1/5 ${pieceBackground} bg-contain z-20 cursor-grab`}
        ref={pieceRef}
      />
    );
  }
);
