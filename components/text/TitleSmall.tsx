import React from "react";
import { Text } from "./types";

interface TitleSmallProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    Text {}

export const TitleSmall: React.FC<TitleSmallProps> = ({
  children,
  className,
  weight,
  color,
  ...props
}) => {
  const fontWeight = weight ? weight : "font-medium ";
  color = color ? color : "text-inherit";
  return (
    <span
      {...props}
      className={`text-sm tracking-[0.1px] ${fontWeight} ${color} ${className}`}
    >
      {children}
    </span>
  );
};
