import React from "react";
import { AriaModalOverlayProps, Overlay, useModalOverlay } from "react-aria";
import { OverlayTriggerState } from "react-stately";

interface ModalProps extends AriaModalOverlayProps {
  state: OverlayTriggerState;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ state, children, ...props }) => {
  let ref = React.useRef<HTMLDivElement>(null);
  let { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  return (
    <Overlay portalContainer={document.body}>
      <div
        className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        {...underlayProps}
      >
        <div {...modalProps} ref={ref} className="bg-background">
          {children}
        </div>
      </div>
    </Overlay>
  );
};
