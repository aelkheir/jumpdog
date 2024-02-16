import { useMemo } from "react";
import { useImmerReducer } from "use-immer";
import {
  BoardContext,
  BoardContextType,
  GameControlsContext,
  GameControlsContextType,
  SettingsContext,
  SettingsContextType,
  ThemeContext,
  ThemeContextType,
  TutorialContext,
  TutorialContextType,
} from "./contexts";
import getActions from "./actions";
import storeReducer from "./reducers/storeReducer";
import initializeStore from "./initializeStore";
import useLoadSettings from "./useLoadSettings";
import useLoadGameControls from "./useLoadGameControls";
import { useLoadBoard } from "./useLoadBoard";
import useLoadTutorial from "./useLoadTutorrial";

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [{ gameControls, settings, board, tutorial }, dispatch] =
    useImmerReducer(storeReducer, initializeStore());

  const actions = getActions(dispatch);

  useLoadSettings(actions.settings);
  useLoadGameControls(actions.gameControls);
  useLoadBoard(actions.board);
  useLoadTutorial(actions.tutorial);

  const controls = useMemo<GameControlsContextType>(
    () => ({
      ...gameControls,
      ...actions.gameControls,
    }),
    [...Object.values(gameControls)]
  );

  const theme = useMemo<ThemeContextType>(
    () => ({
      theme: settings.theme,
      setTheme: actions.settings.setTheme,
    }),
    [settings.theme, actions.settings.setTheme]
  );

  const boardSettings = useMemo<SettingsContextType>(
    () => ({
      ...settings,
      ...actions.settings,
    }),
    [settings]
  );

  const boardProviderValue = useMemo<BoardContextType>(
    () => ({
      ...board,
      ...actions.board,
    }),
    [board]
  );

  const tutorialProviderValue = useMemo<TutorialContextType>(
    () => ({
      ...tutorial,
      ...actions.tutorial,
    }),
    [tutorial]
  );

  return (
    <GameControlsContext.Provider value={controls}>
      <ThemeContext.Provider value={theme}>
        <SettingsContext.Provider value={boardSettings}>
          <TutorialContext.Provider value={tutorialProviderValue}>
            <BoardContext.Provider value={boardProviderValue}>
              {children}
            </BoardContext.Provider>
          </TutorialContext.Provider>
        </SettingsContext.Provider>
      </ThemeContext.Provider>
    </GameControlsContext.Provider>
  );
};
