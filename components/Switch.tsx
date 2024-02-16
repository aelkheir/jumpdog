import cn from "classnames";
import { useRouter } from "next/router";
import React from "react";
import { useFocusRing, useSwitch, VisuallyHidden } from "react-aria";
import { ToggleProps, useToggleState } from "react-stately";
import { BodyLarge } from "./text/BodyLarge";

interface SwitchProps extends ToggleProps {}

export const Switch: React.FC<SwitchProps> = (props) => {
  const { locale } = useRouter();
  const dir = locale === "ar" ? "rtl" : "ltr";

  let state = useToggleState(props);
  let ref = React.useRef<HTMLInputElement>(null);
  let { inputProps } = useSwitch(props, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();

  let thumbXPosition: number;
  if (state.isSelected) {
    thumbXPosition = dir === "ltr" ? 40 : 20;
  } else {
    thumbXPosition = dir === "ltr" ? 20 : 40;
  }

  return (
    <label className="flex h-full w-full items-center justify-between">
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <BodyLarge color="text-on-surface grow">
        {props.children && props.children}
      </BodyLarge>
      <svg
        width="60"
        height="40"
        viewBox="0 0 60 40"
        aria-hidden="true"
        className="rtl:-scale-x-[100%] -mr-1"
      >
        <rect
          x={4}
          y={4}
          width={52}
          height={32}
          rx="16"
          className={cn(
            state.isSelected
              ? "fill-primary"
              : "fill-surface-variant stroke-outline stroke-1"
          )}
        />
        {isFocusVisible && (
          <circle
            cx={state.isSelected ? 40 : 20}
            cy={20}
            r={20}
            className={cn(
              "text-opacity-[24%] fill-current",
              state.isSelected ? "text-primary" : "text-on-surface"
            )}
          />
        )}
        <circle
          cx={state.isSelected ? 40 : 20}
          cy={20}
          r={12}
          className={cn(state.isSelected ? "fill-on-primary" : "fill-outline")}
        />
      </svg>
    </label>
  );
};
