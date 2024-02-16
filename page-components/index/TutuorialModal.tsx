import { Dialog } from "@/components/Dialog";
import { TitleLarge } from "@/components/text/TitleLarge";
import useTranslation from "@/hooks/useTranslation";
import React, { useContext, useEffect, useState } from "react";
import { GameControlsContext, TutorialContext } from "@/store/contexts";
import { Modal } from "@/components/Modal";
import { useOverlayTriggerState } from "react-stately";
import { BodyLarge } from "@/components/text/BodyLarge";

interface TutorialModalProps {}

export const TutorialModal: React.FC<TutorialModalProps> = ({}) => {
  const { translate } = useTranslation();
  const { takeTutorial, setTakeTutorial } = useContext(TutorialContext);
  const { hasGameStarted } = useContext(GameControlsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const message = translate("howToPlay");

  useEffect(() => {
    if (takeTutorial === null) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [takeTutorial, hasGameStarted]);

  let state = useOverlayTriggerState({
    isOpen: isModalOpen && takeTutorial === null && hasGameStarted,
  });

  console.log(isModalOpen);
  console.log("take, ", takeTutorial);

  return (
    <>
      {state.isOpen && (
        <Modal
          state={{
            ...state,
            close: () => {
              state.close();
              close();
            },
          }}
        >
          <Dialog>
            {() => (
              <div className="w-80 h-60 flex flex-col items-center justify-between text-on-surface">
                <div className="w-full h-16 flex flex-col px-2">
                  <div className="w-full h-full flex justify-center items-center border-b border-outline-variant">
                    <TitleLarge color="text-primary">{message}</TitleLarge>
                  </div>
                </div>
                <div className="flex p-4">
                  <BodyLarge color="text-on-surface">
                    {translate("takeTutorial")}
                  </BodyLarge>
                </div>
                <div className="w-full px-2">
                  <div
                    className="h-16 flex border-t border-outline-variant"
                    dir="ltr"
                  >
                    <button
                      className="text-on-surface w-full"
                      onClick={() => setTakeTutorial(false)}
                    >
                      {translate("dismiss")}
                    </button>
                    <button
                      className="text-on-surface w-full"
                      onClick={() => setTakeTutorial(true)}
                    >
                      {translate("takeGuide")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog>
        </Modal>
      )}
    </>
  );
};
