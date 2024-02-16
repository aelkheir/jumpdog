import { Dialog } from "@/components/Dialog";
import { ModalTrigger } from "@/components/ModalTrigger";
import { BodyMedium } from "@/components/text/BodyMedium";
import { TitleLarge } from "@/components/text/TitleLarge";
import useTranslation from "@/hooks/useTranslation";
import React, { useContext, useEffect, useState } from "react";
import { BoardContext, GameControlsContext } from "@/store/contexts";
import { isHumanToPlay } from "@/store/reducers/boardReducer";

interface GameoverModalProps {}

export const GameoverModal: React.FC<GameoverModalProps> = ({}) => {
  const { translate } = useTranslation();
  const { color, startNewGame, rematch } = useContext(GameControlsContext);
  const { whiteToPlay } = useContext(BoardContext);

  const message = isHumanToPlay({ color, whiteToPlay })
    ? translate("youLost")
    : translate("youWon");

  const { isGameover, hasDismissedModal, setHasDismissedModal } =
    useContext(GameControlsContext);
  const [isModalOpen, setIsModalOpen] = useState(isGameover);

  useEffect(() => {
    setIsModalOpen(isGameover);
  }, [isGameover]);

  return (
    <ModalTrigger
      label="Open Modal"
      isOpen={isGameover && isModalOpen && !hasDismissedModal}
      close={() => {
        setIsModalOpen(false);
        setHasDismissedModal(true);
      }}
    >
      {({ close }) => (
        <Dialog>
          {() => (
            <div className="w-80 h-96 flex flex-col items-center justify-between text-on-surface">
              <div className="w-full h-16 flex flex-col px-2">
                <div className="w-full h-full flex justify-center items-center border-b border-outline-variant">
                  <TitleLarge color="text-primary">{message}</TitleLarge>
                </div>
              </div>
              <div className="flex items-center gap-4 ">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 bg-[url('/kuku.png')] bg-contain"></div>
                  <BodyMedium color="text-on-surface">
                    {translate("kuku")}
                  </BodyMedium>
                </div>
                <BodyMedium color="text-on-surface">
                  {translate("vs")}
                </BodyMedium>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 bg-[url('/guest.png')] bg-contain"></div>
                  <BodyMedium color="text-on-surface">
                    {translate("guest")}
                  </BodyMedium>
                </div>
              </div>
              <div className="w-full px-2">
                <div className="h-16 flex border-t border-outline-variant">
                  <button
                    className="text-on-surface w-full"
                    onClick={() => rematch()}
                  >
                    {translate("rematch")}
                  </button>
                  <button
                    className="text-on-surface w-full"
                    onClick={() => {
                      startNewGame();
                    }}
                  >
                    {translate("newGame")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </Dialog>
      )}
    </ModalTrigger>
  );
};
