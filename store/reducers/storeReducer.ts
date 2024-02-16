import { StoreReducer } from "../types";
import { boardReducer } from "./boardReducer";
import { gameControlsReducer } from "./gameControlsReducer";
import { settingsReducer } from "./settingsReducer";
import { tutorialReducer } from "./tutorialReducer";

const storeReducer: StoreReducer = (state, action) => {
  const gameControls = gameControlsReducer(state, action);
  if (gameControls) return state;
  const settings = settingsReducer(state, action);
  if (settings) return state;
  const board = boardReducer(state, action);
  if (board) return state;
  const tutorial = tutorialReducer(state, action);
  if (tutorial) return state;
  return state;
};

export default storeReducer;
