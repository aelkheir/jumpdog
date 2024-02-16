import React from "react";
import { Text } from "./types";

interface LabelMediumProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    Text {}

export const LabelMedium: React.FC<LabelMediumProps> = ({
  className,
  children,
  weight,
  color,
  ...props
}) => {
  const fontWeight = weight ? weight : "font-medium";
  color = color ? color : "text-inherit";
  return (
    <span
      {...props}
      className={`text-xs  ltr:tracking-[0.5px] ${fontWeight} ${color} ${className}`}
    >
      {children}
    </span>
  );
};
