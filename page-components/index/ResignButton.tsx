import { FlagIcon } from "@heroicons/react/24/solid";
import React, { JSXElementConstructor, ReactElement } from "react";
import { AriaPopoverProps, useButton, useOverlayTrigger } from "react-aria";
import { OverlayTriggerProps, useOverlayTriggerState } from "react-stately";
import { Popover } from "../../components/Popover";
import { LabelMedium } from "../../components/text/LabelMedium";

interface ResignButtonProps
  extends OverlayTriggerProps,
    Omit<AriaPopoverProps, "popoverRef" | "triggerRef"> {
  label: string;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  className: string;
  popOverWidth?: string;
}

export const OverlayStateContext = React.createContext(() => {});

export const ResignButton: React.FC<ResignButtonProps> = ({
  label,
  children,
  className,
  popOverWidth = "w-auto",
  ...props
}) => {
  let ref = React.useRef<HTMLButtonElement>(null);
  let state = useOverlayTriggerState(props);
  let { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    ref
  );

  let { buttonProps } = useButton(triggerProps, ref);

  return (
    <OverlayStateContext.Provider value={state.close}>
      <button {...buttonProps} ref={ref} className={className}>
        <FlagIcon className="text-on-surface-variant w-6 h-6 " />
        <LabelMedium color="text-on-surface-variant">{label}</LabelMedium>
      </button>
      {state.isOpen && (
        <Popover
          {...props}
          triggerRef={ref}
          state={state}
          className={popOverWidth}
        >
          {React.cloneElement(children, overlayProps)}
        </Popover>
      )}
    </OverlayStateContext.Provider>
  );
};
