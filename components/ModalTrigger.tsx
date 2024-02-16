import React, { useRef } from "react";
import { useButton, useOverlayTrigger } from "react-aria";
import { OverlayTriggerProps, useOverlayTriggerState } from "react-stately";
import { Modal } from "./Modal";

interface ModalTriggerProps extends OverlayTriggerProps {
  children: React.FC<{ close: () => void }>;
  label: string;
  close: () => void;
}

export const ModalTrigger: React.FC<ModalTriggerProps> = ({
  children: Render,
  label,
  close,
  ...props
}) => {
  let state = useOverlayTriggerState(props);
  let { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state
  );

  let ref = useRef(null);
  let { buttonProps } = useButton(triggerProps, ref);

  return (
    <>
      {/* <button ref={ref} {...buttonProps}>
        {label}
      </button> */}
      {state.isOpen && (
        <Modal
          state={{
            ...state,
            close: () => {
              state.close();
              close();
            },
          }}
          isDismissable={true}
        >
          {React.cloneElement(<Render close={state.close} />, overlayProps)}
        </Modal>
      )}
    </>
  );
};
