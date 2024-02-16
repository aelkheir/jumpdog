import { SettingsContext } from "@/store/contexts";
import React, { useContext } from "react";

interface CoordinatesProps {}

export const Coordinates: React.FC<CoordinatesProps> = ({}) => {
  const numbers = [5, 4, 3, 2, 1];
  const letters = ["a", "b", "c", "d", "e"];
  const { showCoordinates } = useContext(SettingsContext);
  if (!showCoordinates) return null;
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 select-none">
      <Text x="1.75" y="4.5">
        {numbers[0]}
      </Text>
      <Text x="1.75" y="24.5" dark>
        {numbers[1]}
      </Text>
      <Text x="1.75" y="44.5">
        {numbers[2]}
      </Text>
      <Text x="1.75" y="64.5" dark>
        {numbers[3]}
      </Text>
      <Text x="1.75" y="84.5">
        {numbers[4]}
      </Text>
      {/* bottom  */}
      <Text x="16.5" y="98">
        {letters[0]}
      </Text>
      <Text x="36.5" y="98" dark>
        {letters[1]}
      </Text>
      <Text x="56.5" y="98">
        {letters[2]}
      </Text>
      <Text x="76.5" y="98" dark>
        {letters[3]}
      </Text>
      <Text x="96.5" y="98">
        {letters[4]}
      </Text>
    </svg>
  );
};

const Text: React.FC<{
  dark?: boolean;
  x: string;
  y: string;
  children: React.ReactNode;
}> = ({ x, y, dark, children }) => {
  const color = dark ? "text-white" : "text-black";
  return (
    <text
      x={x}
      y={y}
      fontSize="2.8"
      className={`font-normal fill-current ${color}`}
    >
      {children}
    </text>
  );
};
