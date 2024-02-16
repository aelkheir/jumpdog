import { Actions, Store } from "../types";

export const settingsReducer = (state: Store, action: Actions) => {
  const { settings } = state;
  switch (action.type) {
    case "set_theme": {
      settings.theme = action.payload;
      const root = window.document.documentElement;
      localStorage.setItem("theme", action.payload!);
      if (action.payload === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      return settings;
    }
    case "set_highlight_lastMove": {
      settings.highlightLastMove = action.payload;
      localStorage.setItem("highlightLastMove", `${action.payload}`);
      return settings;
    }
    case "set_show_coordinates": {
      settings.showCoordinates = action.payload;
      localStorage.setItem("showCoordinates", `${action.payload}`);
      return settings;
    }
    case "set_show_legal_moves": {
      settings.showLegalMoves = action.payload;
      localStorage.setItem("showLegalMoves", `${action.payload}`);
      return settings;
    }
    case "set_play_sounds": {
      settings.playSounds = action.payload;
      localStorage.setItem("playSounds", `${action.payload}`);
      return settings;
    }
    case "set_board_color": {
      settings.boardColor = action.payload;
      localStorage.setItem("boardColor", action.payload!);
      return settings;
    }
  }
};
