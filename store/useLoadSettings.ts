import { useEffect } from "react";
import { BoardColor, SettingsDispatchers } from "./types";

export default function useLoadSettings(actions: SettingsDispatchers) {
  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.classList.contains("dark")
      ? "dark"
      : "light";
    actions.setTheme(initialColorValue);
  }, []);

  useEffect(() => {
    const highlightLastMove = window.localStorage.getItem("highlightLastMove");
    actions.setHighlightLastMove(
      highlightLastMove === null ? true : JSON.parse(highlightLastMove)
    );
    const showLegalMoves = window.localStorage.getItem("showLegalMoves");
    actions.setShowLegalMoves(
      showLegalMoves === null ? false : JSON.parse(showLegalMoves)
    );
    const showCoordinates = window.localStorage.getItem("showCoordinates");
    actions.setShowCoordinates(
      showCoordinates === null ? true : JSON.parse(showCoordinates)
    );
    const playSounds = window.localStorage.getItem("playSounds");
    actions.setPlaySounds(playSounds === null ? true : JSON.parse(playSounds));
    const boardColor = window.localStorage.getItem("boardColor");
    actions.setBoardColor(
      boardColor === null ? "gray" : (boardColor as BoardColor)
    );
  }, []);
}
