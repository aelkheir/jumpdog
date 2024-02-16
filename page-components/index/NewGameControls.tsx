import useTranslation from "@/hooks/useTranslation";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { Radio, RadioGroup } from "../../components/RadioGroup";
import { Slider } from "../../components/Slider";
import { TitleMedium } from "../../components/text/TitleMedium";
import { GameControlsContext } from "@/store/contexts";

interface NewGameControlsProps {}

export const NewGameControls: React.FC<NewGameControlsProps> = ({}) => {
  const { setHasGameStarted, color, level, setColor, setLevel } =
    useContext(GameControlsContext);

  const { translate } = useTranslation();
  return (
    <div
      className={`w-full h-full lg:h-auto bg-surface lg:bg-transparent border-outline-variant border-t lg:border-t-0 lg:max-w-xs lg:min-w-fit`}
    >
      <div className="w-full h-full grow lg:grow-0 flex flex-col lg:gap-8">
        <div className="w-full h-full lg:h-auto lg:aspect-square flex bg-surface lg:drop-shadow">
          <div className="grow flex w-full bg-surface-tint bg-opacity-5">
            <div className="p-4 w-full flex flex-col items-center justify-center gap-8 ">
              <TitleMedium color="text-on-surface-variant">
                {translate("vsCPU")}
              </TitleMedium>
              <div className="flex flex-col items-center gap-2 text-on-surface">
                <RadioGroup
                  label={translate("selectColor")}
                  value={color ?? undefined}
                  onChange={(value) => setColor(value as "white" | "black")}
                >
                  <Radio value="white" aria-label="White" />
                  <Radio value="black" aria-label="Black" />
                </RadioGroup>
              </div>
              <div className="flex flex-col items-center text-on-surface">
                <div className="flex flex-col items-center">
                  <Slider
                    value={level}
                    onChange={(value) => setLevel(value as number)}
                    minValue={1}
                    maxValue={3}
                    label={translate("selectLevel")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-14 w-full">
          <button
            className="w-full h-full flex justify-center items-center bg-primary text-xl font-bold text-on-primary"
            onClick={() => setHasGameStarted(true)}
          >
            {translate("start")}
          </button>
        </div>
      </div>
    </div>
  );
};
