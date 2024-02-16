import React from "react";
import {
  HiddenSelect,
  mergeProps,
  useButton,
  useFocusRing,
  useSelect,
} from "react-aria";
import { useSelectState } from "react-stately";
import type { AriaSelectProps } from "@react-types/select";
import { Popover } from "./Popover";
import { ListBox } from "./ListBox";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

interface SelectProps {}

export function Select<T extends object>(props: AriaSelectProps<T>) {
  // Create state based on the incoming props
  let state = useSelectState(props);

  // Get props for child elements from useSelect
  let ref = React.useRef<HTMLButtonElement>(null);
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    { ...props },
    state,
    ref
  );

  let { buttonProps } = useButton(triggerProps, ref);

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div className="inline-flex flex-col relative w-28">
      {props.label && (
        <div
          {...labelProps}
          className="block text-sm font-medium text-gray-700 text-left cursor-default"
        >
          {props.label}
        </div>
      )}
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={`px-3 py-2 relative inline-flex flex-row items-center justify-between overflow-hidden cursor-default rounded-[100px] outline-none  border-outline ${
          isFocusVisible ? "border-[3px]" : "border"
        } ${state.isOpen ? "bg-surface" : "bg-surface-variant"}`}
      >
        <span
          {...valueProps}
          className={`text-md ${
            state.selectedItem ? "text-on-surface" : "text-on-surface"
          }`}
        >
          {state.selectedItem
            ? state.selectedItem.rendered
            : props["aria-label"]}
        </span>
        <ChevronUpDownIcon
          className={`w-6 h-6 ${
            isFocusVisible ? "text-on-surface" : "text-on-surface"
          }`}
        />
      </button>
      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={ref}
          placement="bottom end"
          className="w-28"
        >
          <ListBox {...menuProps} listBoxState={state} />
        </Popover>
      )}
    </div>
  );
}
