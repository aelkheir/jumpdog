import React from "react";
import { Text } from "./types";

interface TitleMediumProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    Text {}

export const TitleMedium: React.FC<TitleMediumProps> = ({
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
      className={`text-base leading-7 ltr:tracking-[0.15px] ${fontWeight} ${color} ${className}`}
    >
      {children}
    </span>
  );
};
