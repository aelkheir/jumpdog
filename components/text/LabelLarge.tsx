import React from "react";
import { Text } from "./types";

interface LabelLargeProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    Text {}

export const LabelLarge: React.FC<LabelLargeProps> = ({
  className,
  children,
  weight,
  color,
  ...props
}) => {
  const fontWeight = weight ? weight : "font-medium";
  color = color ? color : "text-inherit";
  className = className ? className : "";
  return (
    <span
      {...props}
      className={`text-sm ltr:tracking-[0.1px] ${fontWeight} ${color} ${className}`}
    >
      {children}
    </span>
  );
};
