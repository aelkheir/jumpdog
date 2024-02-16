import { Actions, Store } from "../types";

export const tutorialReducer = (state: Store, action: Actions) => {
  const { tutorial } = state;
  switch (action.type) {
    case "set_take_tutorial": {
      tutorial.takeTutorial = action.payload;
      localStorage.setItem("takeTutorial", `${action.payload}`);
      return state;
    }
    case "set_tutorial_best_move": {
      tutorial.tutorialBestMove = action.payload;
      localStorage.setItem("tutorialBestMove", JSON.stringify(action.payload));
      return state;
    }
    case "set_completed_tutorial": {
      tutorial.completedTutorial = action.payload;
      localStorage.setItem("completedTutorial", JSON.stringify(action.payload));
      return state;
    }
    case "set_learnt_capture_moves": {
      tutorial.learntCaptureMoves = action.payload;
      localStorage.setItem(
        "learntCaptureMoves",
        JSON.stringify(action.payload)
      );
      return state;
    }
    case "set_learnt_normal_moves": {
      tutorial.learntNormalMoves = action.payload;
      localStorage.setItem("learntNormalMoves", JSON.stringify(action.payload));
      return state;
    }
  }
};
