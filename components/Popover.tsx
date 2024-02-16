import { useRouter } from "next/router";
import React, { useCallback } from "react";
import {
  AriaPopoverProps,
  DismissButton,
  Overlay,
  useOverlayPosition,
  usePopover,
} from "react-aria";
import { OverlayTriggerState } from "react-stately";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement>;
}

export const Popover: React.FC<PopoverProps> = ({ offset = 8, ...props }) => {
  let ref = React.useRef<HTMLDivElement>(null);
  let { popoverRef = ref, state, children, className, isNonModal } = props;

  let { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state
  );

  let { updatePosition } = useOverlayPosition({
    targetRef: props.triggerRef,
    overlayRef: popoverRef,
    placement: props.placement,
    offset,
    isOpen: state.isOpen,
  });

  const popoverRefCallback = useCallback(
    (ref: HTMLDivElement) => {
      // @ts-ignore
      popoverRef.current = ref;
      updatePosition();
    },
    [popoverRef]
  );

  return (
    <Overlay>
      {!isNonModal && <div {...underlayProps} className="fixed inset-0" />}
      <div
        {...popoverProps}
        ref={popoverRefCallback}
        className={`z-10 drop-shadow ${className}`}
      >
        {!isNonModal && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};
