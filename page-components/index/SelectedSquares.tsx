import { BoardContext } from "@/store/contexts";
import React, { useContext } from "react";

interface SelectedSquaresProps {}

export const SelectedSquares: React.FC<SelectedSquaresProps> = ({}) => {
  const { playerClicks } = useContext(BoardContext);
  const hasStartedSelecting = playerClicks.length > 0;
  if (!hasStartedSelecting) return null;

  const fromSquare = playerClicks[0];

  return (
    <>
      {Boolean(fromSquare) && (
        <div
          className={`absolute w-1/5 h-1/5 bg-primary-container square-${fromSquare[0]}${fromSquare[1]} z-0`}
        >
          <div className="w-full h-full bg-primary bg-opacity-80" />
        </div>
      )}
    </>
  );
};
