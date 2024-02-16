import React from "react";

interface HoverSquareProps {
  isHovering: boolean;
  position: number[];
}

export const HoverSquare: React.FC<HoverSquareProps> = ({
  isHovering,
  position,
}) => {
  return (
    <>
      {isHovering && (
        <div
          className={`absolute w-1/5 h-1/5 border-4 border-black square-${position[0]}${position[1]} z-10`}
        />
      )}
    </>
  );
};
