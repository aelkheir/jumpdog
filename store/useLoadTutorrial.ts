import { useEffect } from "react";
import { BoardColor, SettingsDispatchers, TutorialDispatchers } from "./types";

export default function useLoadTutorial(actions: TutorialDispatchers) {
  useEffect(() => {
    const takeTutorial = window.localStorage.getItem("takeTutorial");
    actions.setTakeTutorial(
      takeTutorial === null ? null : JSON.parse(takeTutorial)
    );

    const tutorialBestMove = window.localStorage.getItem("tutorialBestMove");
    actions.setTutorialBestMove(
      tutorialBestMove === null ? null : JSON.parse(tutorialBestMove)
    );

    const learntCaptureMoves =
      window.localStorage.getItem("learntCaptureMoves");
    actions.setLearntCaptureMoves(
      learntCaptureMoves === null ? false : JSON.parse(learntCaptureMoves)
    );

    const learntNormalMoves = window.localStorage.getItem("learntNormalMoves");
    actions.setLearntNormalMoves(
      learntNormalMoves === null ? false : JSON.parse(learntNormalMoves)
    );

    const completedTutorial = window.localStorage.getItem("completedTutorial");
    actions.setCompletedTutorial(
      completedTutorial === null ? false : JSON.parse(completedTutorial)
    );
  }, []);
}
