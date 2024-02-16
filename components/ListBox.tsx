import React from "react";
import { AriaListBoxOptions, useListBox } from "react-aria";
import { ListProps, SelectState, useListState } from "react-stately";
import { CollectionChildren, Node } from "@react-types/shared";
import { ListBoxOption } from "./ListBoxOption";

interface ListBoxProps extends AriaListBoxOptions<object> {
  listBoxRef?: React.LegacyRef<HTMLUListElement>;
  listBoxState?: SelectState<unknown>;
  children?: CollectionChildren<{ [key: string]: any }>;
}

export const ListBox: React.FC<ListBoxProps> = (props) => {
  let ref = React.useRef<HTMLUListElement>(null);
  let state = useListState(props as ListProps<object>);
  let { listBoxRef = ref, listBoxState = state } = props;
  let { listBoxProps } = useListBox(
    props,
    listBoxState,
    listBoxRef as React.RefObject<HTMLElement>
  );

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="w-full overflow-auto outline-none"
    >
      {[...listBoxState.collection].map((item) => (
        <ListBoxOption key={item.key} item={item} state={listBoxState} />
      ))}
    </ul>
  );
};
