import { LabelMedium } from "@/components/text/LabelMedium";
import useTranslation from "@/hooks/useTranslation";
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/solid";
import React, { useContext } from "react";
import { GameControlsContext } from "@/store/contexts";

interface GameoverControlsProps {}

export const GameoverControls: React.FC<GameoverControlsProps> = ({}) => {
  const { startNewGame, rematch } = useContext(GameControlsContext);
  const { translate } = useTranslation();
  return (
    <div
      className={`w-full h-16 lg:h-auto shrink-0 lg:shrink bg-surface lg:bg-transparent border-outline-variant border-t lg:border-t-0 lg:max-w-xs lg:min-w-fit`}
    >
      <div className="w-ful h-full lg:h-auto grow lg:grow-0 lg:aspect-square flex justify-between lg:justify-start lg:gap-2 bg-surface-tint bg-opacity-5 lg:bg-transparent px-8 lg:px-0">
        <div className="h-full lg:h-1/2 w-1/2 lg:bg-surface lg:drop-shadow">
          <button
            className="w-full h-full lg:bg-surface-tint lg:bg-opacity-5 lg:p-2 flex flex-col justify-center items-center"
            onClick={() => {
              rematch();
            }}
          >
            <ArrowPathIcon className="text-on-surface-variant w-6 h-6" />
            <LabelMedium color="text-on-surface-variant">
              {translate("rematch")}
            </LabelMedium>
          </button>
        </div>
        <div className="h-full lg:h-1/2 w-1/2 lg:bg-surface lg:drop-shadow">
          <button
            className="w-full h-full lg:bg-surface-tint lg:bg-opacity-5 lg:p-2 flex flex-col justify-center items-center"
            onClick={() => {
              startNewGame();
            }}
          >
            <PlusIcon className="text-on-surface-variant w-6 h-6" />
            <LabelMedium color="text-on-surface-variant">
              {translate("newGame")}
            </LabelMedium>
          </button>
        </div>
      </div>
    </div>
  );
};
