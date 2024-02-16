import React from "react";
import type { RadioProps } from "@react-types/radio";
import {
  RadioGroupProps as AriaRadioGroupProps,
  RadioGroupState,
  useRadioGroupState,
} from "react-stately";
import {
  mergeProps,
  useFocusRing,
  useRadio,
  useRadioGroup,
  VisuallyHidden,
} from "react-aria";
import { LabelLarge } from "./text/LabelLarge";
import { LabelMedium } from "./text/LabelMedium";

let RadioContext = React.createContext<RadioGroupState>({} as RadioGroupState);

interface RadioGroupProps extends AriaRadioGroupProps {
  children: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  let { children, label } = props;
  let state = useRadioGroupState(props);
  let { radioGroupProps, labelProps } = useRadioGroup(
    {
      ...props,
      orientation: "horizontal",
    },
    state
  );

  return (
    <div {...radioGroupProps} className="flex flex-col items-center gap-2">
      <LabelMedium {...labelProps}>{label}</LabelMedium>
      <div className="flex gap-2">
        <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
      </div>
    </div>
  );
};

export function Radio(props: RadioProps) {
  let state = React.useContext(RadioContext);
  let ref = React.useRef(null);
  let { inputProps } = useRadio(props, state, ref);
  let { focusProps, isFocusVisible } = useFocusRing();

  let ring = "";
  if (isFocusVisible) {
    ring = `ring-2 ring-on-surface`;
  } else if (state.selectedValue === props.value) {
    ring = `ring-1 ring-primary`;
  }

  const pieceBackground =
    props.value === "white"
      ? `bg-[url('/white-piece.png')]`
      : `bg-[url('/black-piece.png')]`;

  return (
    <label
      className={`${pieceBackground} bg-contain w-12 aspect-square ${ring}`}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
    </label>
  );
}
