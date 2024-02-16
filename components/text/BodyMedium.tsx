import React from "react";
import { Text } from "./types";

interface BodyMediumProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >,
    Text {}

export const BodyMedium: React.FC<BodyMediumProps> = ({
  className,
  children,
  weight,
  color,
  ...props
}) => {
  const fontWeight = weight ? weight : "font-normal";
  color = color ? color : "text-on-background";
  return (
    <p
      {...props}
      className={`text-sm ltr:tracking-[0.25px] ${fontWeight} ${color} ${className}`}
    >
      {children}
    </p>
  );
};
