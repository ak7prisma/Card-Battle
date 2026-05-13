import { useState, useEffect } from "react";
import ActionSection from "../component/BattlePage/ActionSection"
import CardsSection from "../component/BattlePage/CardsSection"
import PlayersSection from "../component/BattlePage/PlayersSection"
import useBattleLogic from "../hooks/useBattleLogic";
import { IoCloseCircle } from "react-icons/io5";
import { GiBattleAxe, GiCrossedSwords } from "react-icons/gi";
import { FaBolt, FaUserAlt } from "react-icons/fa";
import { MdError } from "react-icons/md";

export default function BattlePage() {
  const {
    isLoading,
    isFlip,
    isShuffle,
    gamePhase,
    battleLog,
    activePlayer,
    Card1,
    Card2,
    hpPlayer1,
    hpPlayer2,
    energyPlayer1,
    energyPlayer2,
    handleDraw,
    handleAttack,
    handleCharge,
  } = useBattleLogic();

  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    if (battleLog || activePlayer) {
      setShowToast(true);
    }
  }, [battleLog, activePlayer]);

  if (isLoading) {
    return (
      <main className="flex flex-col justify-center items-center w-full min-h-[60vh] gap-5">
        <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-300 tracking-widest text-sm animate-pulse">Loading cards...</p>
      </main>
    );
  }

  const getIcon = () => {
    if (!battleLog) return <FaUserAlt className="text-slate-200" />;
    if (battleLog.includes("CLASH")) return <GiCrossedSwords className="text-amber-400" />;
    if (battleLog.includes("DMG")) return <GiBattleAxe className="text-red-500" />;
    if (battleLog.includes("EP") || battleLog.includes("Energy")) return <FaBolt className="text-cyan-400" />;
    if (battleLog.includes("Not enough") || battleLog.includes("full")) return <MdError className="text-red-500" />;
    return <FaUserAlt className="text-slate-200" />;
  };

  return (
    <main className="flex flex-col justify-center items-center w-full gap-5">
        <PlayersSection
          hpPlayer1={hpPlayer1}
          hpPlayer2={hpPlayer2}
          energyPlayer1={energyPlayer1}
          energyPlayer2={energyPlayer2}
        />
        <CardsSection
          isFlip={isFlip}
          isShuffle={isShuffle}
          Card1={Card1}
          Card2={Card2}
        />

        <ActionSection
          gamePhase={gamePhase}
          onDraw={handleDraw}
          onAttack={handleAttack}
          onCharge={handleCharge}
          isAnimating={isFlip || isShuffle}
          energyPlayer1={energyPlayer1}
          Card1={Card1}
          activePlayer={activePlayer}
        />

        {Card1 && showToast && (
          <div 
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-2 z-50 transition-all duration-500 backdrop-blur-xl min-w-[280px] flex items-center gap-4 group ${
              gamePhase === "resolving"
                ? "bg-purple-900/90 border-purple-500/50 text-purple-100"
                : activePlayer === 1 
                  ? "bg-red-950/90 border-red-500/50 text-red-100" 
                  : "bg-cyan-950/90 border-cyan-500/50 text-cyan-100"
            }`}
          >
            <div className="flex-shrink-0 text-xl animate-pulse">
              {getIcon()}
            </div>
            
            <div className="flex-1 text-left">
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-black mb-1">
                {battleLog ? "Battle Update" : `Player ${activePlayer} Active`}
              </p>
              <p className="font-bold tracking-wider text-sm uppercase leading-tight">
                {battleLog || `Waiting for Player ${activePlayer}...`}
              </p>
            </div>

            <button 
              onClick={() => setShowToast(false)}
              className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-slate-400 hover:text-white"
            >
              <IoCloseCircle size={22} />
            </button>
          </div>
        )}
    </main>
  )
}