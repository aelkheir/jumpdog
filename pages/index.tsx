import { PlayerPanel } from "@/page-components/index/PlayerPanel";
import { GameoverModal } from "@/page-components/index/GameoverModal";
import { Board } from "@/page-components/index/Board";
import { useContext } from "react";
import { GameControlsContext } from "@/store/contexts";
import { NewGameControls } from "@/page-components/index/NewGameControls";
import { InGameControls } from "@/page-components/index/InGameControls";
import { GameoverControls } from "@/page-components/index/GameoverControls";
import { TutorialModal } from "@/page-components/index/TutuorialModal";

export default function Home() {
  const { hasGameStarted, isGameover } = useContext(GameControlsContext);
  return (
    <>
      <div
        className={`${
          hasGameStarted ? "flex" : "hidden lg:flex"
        } h-full pt-16 lg:pt-0`}
      >
        {/* Board */}
        <div className={`w-full h-full flex flex-col lg:flex-row `}>
          <div className={`flex flex-col grow lg:grow-0`}>
            <GameoverModal />
            <TutorialModal />
            <PlayerPanel isCPU />
            <Board />
            <PlayerPanel />
          </div>
        </div>
      </div>

      {/* Game Controls */}
      {!hasGameStarted && <NewGameControls />}
      {hasGameStarted && !isGameover && <InGameControls />}
      {hasGameStarted && isGameover && <GameoverControls />}
    </>
  );
}
