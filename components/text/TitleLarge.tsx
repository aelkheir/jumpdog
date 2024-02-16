import React from "react";
import { Text } from "./types";

interface TitleLargeProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    Text {}

export const TitleLarge: React.FC<TitleLargeProps> = ({
  children,
  className,
  weight,
  color,
  ...props
}) => {
  const fontWeight = weight ? weight : "font-normal";
  color = color ? color : "text-inherit";
  return (
    <span
      {...props}
      className={`text-[22px] leading-7 ${fontWeight} ${color} ${className}`}
    >
      {children}
    </span>
  );
};
