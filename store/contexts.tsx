import { createContext } from "react";
import {
  Board,
  BoardDispatchers,
  Dispatchers,
  GameControls,
  GameControlsDispatchers,
  Settings,
  SettingsDispatchers,
  Theme,
  Tutorial,
  TutorialDispatchers,
} from "./types";

export interface GameControlsContextType
  extends GameControls,
    GameControlsDispatchers {}
export const GameControlsContext = createContext<GameControlsContextType>(
  {} as GameControlsContextType
);

export interface ThemeContextType
  extends Pick<Settings, "theme">,
    Pick<Dispatchers["settings"], "setTheme"> {}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export interface SettingsContextType
  extends Omit<Settings, "theme">,
    Omit<SettingsDispatchers, "setTheme"> {}

export const SettingsContext = createContext<SettingsContextType>(
  {} as SettingsContextType
);

export interface TutorialContextType extends Tutorial, TutorialDispatchers {}

export const TutorialContext = createContext<TutorialContextType>(
  {} as TutorialContextType
);

export interface BoardContextType extends Board, BoardDispatchers {}

export const BoardContext = createContext<BoardContextType>(
  {} as BoardContextType
);
