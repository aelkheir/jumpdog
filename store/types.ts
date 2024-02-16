export type Piece = {
  id: string;
  color: "white" | "black";
  dragged?: boolean;
  isCaptured?: boolean;
  movePath?: string;
};

export type Move = {
  id?: string;
  from: Square;
  to: Square;
  pieceMoved: Piece;
  path?: string;
  captures?: { [prop: string]: Piece };
};

export type Square = number[];

export type Color = "white" | "black" | undefined;
export type Theme = "light" | "dark" | undefined;
export type BoardColor = "blue" | "gray" | "pink" | undefined;

export interface GameControls {
  hasGameStarted: boolean;
  isGameover: boolean;
  hasDismissedModal: boolean;
  level: number;
  color: Color;
}

export interface GameControlsDispatchers {
  startNewGame: () => void;
  rematch: () => void;
  setHasGameStarted: (hasGameStarted: boolean) => void;
  setIsGameover: (isGameover: boolean) => void;
  setHasDismissedModal: (hasDismissedModal: boolean) => void;
  setLevel: (level: number) => void;
  setColor: (color: Color) => void;
}

export interface Settings {
  highlightLastMove: boolean;
  showLegalMoves: boolean;
  showCoordinates: boolean;
  playSounds: boolean;
  theme: Theme;
  boardColor: BoardColor;
}

export interface SettingsDispatchers {
  setHighlightLastMove: (highlightLastMove: boolean) => void;
  setShowLegalMoves: (showLegalMoves: boolean) => void;
  setShowCoordinates: (showCoordinates: boolean) => void;
  setPlaySounds: (playSounds: boolean) => void;
  setTheme: (theme: Theme) => void;
  setBoardColor: (boardColor: BoardColor) => void;
}

export interface Board {
  whiteToPlay: boolean;
  isAnimating: boolean;
  pieces: (Piece | "")[][];
  moveLog: Move[];
  validMoves: Move[];
  hint: Move | null;
  hoverSquare: Square;
  playerClicks: Square[];
  isFirstClick: boolean;
}

export interface BoardDispatchers {
  setPieces: (pieces: ("" | Piece)[][]) => void;
  setValidMoves: (validMoves: Move[]) => void;
  setMoveLog: (moveLog: Move[]) => void;
  showHintMove: (showHintMove: boolean) => void;
  setWhiteToPlay: (whiteToPlay: boolean) => void;
  setHoverSquare: (square: Square) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  removePiece: (square: Square) => void;
  makeMove: (move: Move) => void;
  setPlayerClicks: (
    square: Square,
    eventType: "pointerdown" | "pointerup"
  ) => void;
}

type TutorialBestMove = {
  move: Move;
  type: "normal" | "capture";
};

export interface Tutorial {
  takeTutorial: boolean | null;
  tutorialBestMove: TutorialBestMove | null;
  learntNormalMoves: boolean;
  learntCaptureMoves: boolean;
  completedTutorial: boolean;
}

export interface TutorialDispatchers {
  setTakeTutorial: (takeTutorial: boolean | null) => void;
  setLearntNormalMoves: (learntNormalMoves: boolean) => void;
  setLearntCaptureMoves: (learntCaptureMoves: boolean) => void;
  setCompletedTutorial: (completedTutorial: boolean) => void;
  setTutorialBestMove: (tutorialBestMove: TutorialBestMove) => void;
}

export interface Store {
  gameControls: GameControls;
  settings: Settings;
  board: Board;
  tutorial: Tutorial;
}

export interface Dispatchers {
  gameControls: GameControlsDispatchers;
  settings: SettingsDispatchers;
  board: BoardDispatchers;
  tutorial: TutorialDispatchers;
}

export type Actions =
  | { type: "start_new_game" }
  | { type: "rematch" }
  | { type: "set_has_game_started"; payload: boolean }
  | { type: "set_gameover"; payload: boolean }
  | { type: "set_has_dismissed_modal"; payload: boolean }
  | { type: "set_color"; payload: Color }
  | { type: "set_level"; payload: number }
  | { type: "set_theme"; payload: Theme }
  | { type: "set_highlight_lastMove"; payload: boolean }
  | { type: "set_play_sounds"; payload: boolean }
  | { type: "set_board_color"; payload: BoardColor }
  | { type: "set_show_coordinates"; payload: boolean }
  | { type: "set_show_legal_moves"; payload: boolean }
  | { type: "set_hover_square"; payload: Square }
  | {
      type: "set_player_clicks";
      payload: { square: Square; eventType: "pointerdown" | "pointerup" };
    }
  | { type: "remove_piece"; payload: Square }
  | { type: "set_move_log"; payload: Move[] }
  | { type: "show_hint_move"; payload: boolean }
  | { type: "set_pieces"; payload: ("" | Piece)[][] }
  | { type: "set_valid_moves"; payload: Move[] }
  | { type: "set_white_to_play"; payload: boolean }
  | { type: "set_is_animating"; payload: boolean }
  | { type: "make_move"; payload: Move }
  | { type: "set_take_tutorial"; payload: boolean | null }
  | {
      type: "set_tutorial_best_move";
      payload: TutorialBestMove;
    }
  | { type: "set_learnt_normal_moves"; payload: boolean }
  | { type: "set_learnt_capture_moves"; payload: boolean }
  | { type: "set_completed_tutorial"; payload: boolean };

export type StoreReducer = (state: Store, action: Actions) => void;
