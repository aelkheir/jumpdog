import React from "react";
import { Text } from "./types";

interface BodyLargeProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >,
    Text {}

export const BodyLarge: React.FC<BodyLargeProps> = ({
  className,
  children,
  weight,
  color,
  ...props
}) => {
  const fontWeight = weight ? weight : "font-normal";
  color = color ? color : "text-inherit";
  return (
    <p
      {...props}
      className={`text-base text-inherit ltr:tracking-[0.5px] ${fontWeight} ${color} ${className}`}
    >
      {children}
    </p>
  );
};
