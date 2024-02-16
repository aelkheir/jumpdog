import React from "react";
import { Text } from "./types";

interface HeadlineSmallProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >,
    Text {}

export const HeadlineSmall: React.FC<HeadlineSmallProps> = ({
  className,
  children,
  weight,
  color,
  ...props
}) => {
  const fontWeight = weight ? weight : "font-normal";
  color = color ? color : "text-inherit";
  return (
    <h3 {...props} className={`text-2xl ${fontWeight} ${color} ${className}`}>
      {children}
    </h3>
  );
};
