import cn from "classnames";
import { Dialog } from "@/components/Dialog";
import { ResignButton } from "@/page-components/index/ResignButton";
import { BodyMedium } from "@/components/text/BodyMedium";
import { LabelMedium } from "@/components/text/LabelMedium";
import useTranslation from "@/hooks/useTranslation";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { BoardContext, GameControlsContext } from "@/store/contexts";
import { isHumanToPlay } from "@/store/reducers/boardReducer";

interface InGameControlsProps {}

export const InGameControls: React.FC<InGameControlsProps> = ({}) => {
  const { startNewGame, color } = useContext(GameControlsContext);
  const { showHintMove, hint, whiteToPlay } = useContext(BoardContext);
  const { translate } = useTranslation();
  const { locale } = useRouter();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <div
      className={`w-full h-16 shrink-0 lg:shrink lg:h-auto bg-surface lg:bg-transparent border-outline-variant border-t lg:border-t-0 lg:max-w-xs lg:min-w-fit`}
    >
      <div className="w-ful h-full lg:h-auto grow lg:grow-0 lg:aspect-square flex justify-around lg:grid grid-rows-2 grid-cols-2 lg:gap-2 bg-surface-tint bg-opacity-5 lg:bg-transparent px-8 lg:px-0">
        <div className="lg:bg-surface w-1/2 lg:w-full h-full lg:order-1 lg:drop-shadow">
          <button
            className="w-full h-full lg:bg-surface-tint lg:bg-opacity-5 lg:p-2 flex flex-col justify-center items-center"
            onClick={() => {
              if (!isHumanToPlay({ color, whiteToPlay })) {
                return;
              }
              showHintMove(!hint);
            }}
          >
            <LightBulbIcon className="text-on-surface-variant w-6 h-6" />
            <LabelMedium color="text-on-surface-variant">
              {translate("hint")}
            </LabelMedium>
          </button>
        </div>
        {/* <div className="lg:bg-surface lg:w-full h-full lg:order-3 lg:drop-shadow">
          <button className="w-full h-full lg:bg-surface-tint lg:bg-opacity-5 lg:p-2 flex flex-col justify-center items-center">
            <ArrowUturnLeftIcon
              className={cn(
                "text-on-surface-variant w-6 h-6",
                dir === "rtl" && "-scale-x-[100%]"
              )}
            />
            <LabelMedium color="text-on-surface-variant">
              {translate("undo")}
            </LabelMedium>
          </button>
        </div>
        <div className="lg:bg-surface lg:w-full h-full lg:order-4 lg:drop-shadow">
          <button className="w-full h-full lg:bg-surface-tint lg:bg-opacity-5 lg:p-2 flex flex-col justify-center items-center">
            <ArrowUturnRightIcon
              className={cn(
                "text-on-surface-variant w-6 h-6 ",
                dir === "rtl" && "-scale-x-[100%]"
              )}
            />
            <LabelMedium color="text-on-surface-variant">
              {translate("redo")}
            </LabelMedium>
          </button>
        </div> */}
        <div className="lg:bg-surface w-1/2 lg:w-full h-full lg:order-2 lg:drop-shadow">
          <ResignButton
            label={translate("resign")}
            className="w-full h-full lg:bg-surface-tint lg:bg-opacity-5 lg:p-2 flex flex-col justify-center items-center"
          >
            <Dialog>
              {({ close }) => (
                <div className="flex flex-col gap-2 pt-4">
                  <div className="px-4">
                    <BodyMedium color="text-on-surface">
                      {translate("resignConfirmation")}
                    </BodyMedium>
                  </div>
                  <div className="w-full flex rtl:flex-row-reverse">
                    <button
                      onClick={() => close()}
                      className="grow p-2 text-on-surface"
                    >
                      {translate("cancel")}
                    </button>
                    <button
                      onClick={() => {
                        startNewGame();
                        close();
                      }}
                      className="grow p-2 text-on-surface"
                    >
                      {translate("resign")}
                    </button>
                  </div>
                </div>
              )}
            </Dialog>
          </ResignButton>
        </div>
      </div>
    </div>
  );
};
