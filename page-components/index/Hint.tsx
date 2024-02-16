import { BoardContext } from "@/store/contexts";
import React, { useContext } from "react";

interface HintProps {}

export const Hint: React.FC<HintProps> = ({}) => {
  const { hint } = useContext(BoardContext);
  if (!hint) {
    return null;
  }

  const fromSquare = hint.from;
  const toSquare = hint.to;
  return (
    <>
      <div
        className={`absolute w-1/5 h-1/5 bg-yellow-500 square-${fromSquare[0]}${fromSquare[1]} z-[5]`}
      >
        {/* <div className="w-full h-full bg-primary bg-opacity-80" /> */}
      </div>
      <div
        className={`absolute w-1/5 h-1/5 bg-yellow-500 square-${toSquare[0]}${toSquare[1]} z-[5]`}
      >
        {/* <div className="w-full h-full bg-primary bg-opacity-80" /> */}
      </div>
    </>
  );
};
