import React from "react";
import { mergeProps, useFocusRing, useOption } from "react-aria";
import { Node } from "@react-types/shared";
import { ListState } from "react-stately";
import { LabelLarge } from "./text/LabelLarge";
import { useRouter } from "next/router";

interface ListBoxOptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

export const ListBoxOption: React.FC<ListBoxOptionProps> = ({
  item,
  state,
}) => {
  const { locale } = useRouter();
  const dir = locale === "ar" ? "rtl" : "ltr";

  let ref = React.useRef<HTMLLIElement>(null);
  let { optionProps, isDisabled, isSelected, isFocused, isPressed } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  const containerLayerStyles = isSelected ? "bg-surface-variant" : "";

  let stateLayerStyles;
  if (isPressed) {
    stateLayerStyles = "bg-on-surface bg-opacity-[12%]";
  } else if (isFocused) {
    stateLayerStyles = "bg-on-surface bg-opacity-[8%]";
  }

  return (
    <div className="w-full h-12 bg-surface">
      <div className="w-full h-full bg-surface-tint bg-opacity-5">
        <li
          {...optionProps}
          ref={ref}
          className={`${containerLayerStyles} w-full h-full outline-none cursor-default`}
          dir={dir}
        >
          <div
            className={`py-2 px-3 w-full h-full ${stateLayerStyles} flex items-center justify-between`}
          >
            <LabelLarge color="text-on-surface">{item.rendered}</LabelLarge>
          </div>
        </li>
      </div>
    </div>
  );
};
