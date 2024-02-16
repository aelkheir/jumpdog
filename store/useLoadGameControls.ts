import { useEffect } from "react";
import { Color, Dispatchers, GameControlsDispatchers } from "./types";

export default function useLoadGameControls(
  controlActions: GameControlsDispatchers
) {
  useEffect(() => {
    const hasGameStarted = window.localStorage.getItem("hasGameStarted");
    controlActions.setHasGameStarted(
      hasGameStarted === null ? false : JSON.parse(hasGameStarted)
    );
    const isGameover = window.localStorage.getItem("isGameover");
    controlActions.setIsGameover(
      isGameover === null ? false : JSON.parse(isGameover)
    );
    const color = window.localStorage.getItem("color");
    controlActions.setColor(color === null ? "black" : (color as Color));
    const level = window.localStorage.getItem("level");
    controlActions.setLevel(level === null ? 2 : JSON.parse(level));
  }, []);
}
