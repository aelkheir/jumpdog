import React from "react";
import {
  AriaSliderProps,
  mergeProps,
  useFocusRing,
  useLocale,
  useNumberFormatter,
  useSlider,
  useSliderThumb,
  VisuallyHidden,
} from "react-aria";
import { SliderState, useSliderState } from "react-stately";
import { NumberFormatOptions } from "@internationalized/number";
import { LabelMedium } from "./text/LabelMedium";
import { LabelLarge } from "./text/LabelLarge";

interface SliderProps extends AriaSliderProps<number | number[]> {
  formatOptions?: NumberFormatOptions;
}

export const Slider: React.FC<SliderProps> = (props) => {
  // formatOptions need to be present so unify
  // the text rendered on server and client.
  const formatOptions = props.formatOptions
    ? props.formatOptions
    : { numberingSystem: "latn" };

  let trackRef = React.useRef(null);
  let numberFormatter = useNumberFormatter(formatOptions);
  let state = useSliderState({ ...props, numberFormatter });

  let { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef
  );

  return (
    <div {...groupProps} className={`flex flex-col w-44 ${state.orientation}`}>
      {/* Create a container for the label and output element. */}
      {props.label && (
        <div className="flex flex-col gap-2 items-center">
          <LabelMedium {...labelProps}>{props.label}</LabelMedium>
          <LabelMedium>
            <output {...outputProps}>{state.getThumbValueLabel(0)}</output>
          </LabelMedium>
        </div>
      )}
      {/* The track element holds the visible track line and the thumb. */}
      <div
        {...trackProps}
        ref={trackRef}
        className={`relative w-full h-[40px] before:content-[attr(x)] before:block before:absolute before:bg-surface-variant before:h-1 before:w-full before:top-1/2 before:-translate-y-1/2 ${
          state.isDisabled ? "disabled" : ""
        }`}
      >
        <Thumb index={0} state={state} trackRef={trackRef} />
        <div
          className={`absolute content-[attr(x)] before:block h-1 top-1/2 -translate-y-1/2 z-0 bg-primary`}
          style={{
            width: `${state.getThumbPercent(0) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

interface ThumbProps {
  index: number;
  state: SliderState;
  trackRef: React.MutableRefObject<null>;
}

const Thumb: React.FC<ThumbProps> = (props) => {
  let { state, trackRef, index } = props;
  let inputRef = React.useRef(null);
  let { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state
  );

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <>
      <div
        {...thumbProps}
        className={`z-10 top-1/2 w-5 h-5 rounded-full bg-primary`}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
        </VisuallyHidden>
      </div>
      {(isFocusVisible || isDragging) && (
        <div
          {...thumbProps}
          className={`thumb top-1/2 w-8 h-8 rounded-full bg-primary opacity-[14%]`}
        ></div>
      )}
    </>
  );
};
