import { GiBattleAxe, GiCardRandom } from "react-icons/gi";
import { FaBolt } from "react-icons/fa";

export default function ActionSection({ gamePhase, onDraw, onAttack, onCharge, isAnimating, energyPlayer1, Card1, activePlayer }) {

  const isIdle = gamePhase === "idle";
  const isDrawn = gamePhase === "drawn";
  const canDraw = isIdle && !isAnimating;
  const canAct = isDrawn && !isAnimating;

  return (
    <section className="flex flex-col items-center h-auto w-full gap-4 text-sm md:text-lg font-medium tracking-widest px-6 md:px-10">
      <div className="flex justify-center w-full mb-2">
        <button
          className={`${canDraw ? "cursor-pointer hover:bg-cyan-400/30 hover:scale-102" : "cursor-not-allowed opacity-40"} flex flex-row-reverse justify-center items-center py-2.5 rounded-bl-full rounded-tr-full gap-5 w-72 md:w-80 text-cyan-400 border-2 border-cyan-400 duration-300`}
          onClick={onDraw}
          disabled={!canDraw}
          id="btn-draw"
        >
          DRAW
          <GiCardRandom size={26} />
        </button>
      </div>

      <div className="flex justify-center items-center w-full gap-6 md:gap-12">
        <button
          className={`${canAct ? "cursor-pointer hover:bg-red-700/60 hover:scale-102" : "cursor-not-allowed opacity-40"} flex justify-center items-center py-2.5 rounded-br-full rounded-tl-full gap-5 w-40 md:w-56 text-red-500 bg-red-700/30 duration-300`}
          onClick={onAttack}
          disabled={!canAct}
          id="btn-attack"
        >
          ATTACK
          <GiBattleAxe size={24} />
        </button>
        <button
          className={`${canAct ? "cursor-pointer hover:bg-amber-500/30 hover:scale-102" : "cursor-not-allowed opacity-40"} flex justify-center items-center py-2.5 rounded-bl-full rounded-tr-full gap-5 w-40 md:w-56 text-amber-400 border-2 border-amber-500 duration-300`}
          onClick={onCharge}
          disabled={!canAct}
          id="btn-charge"
        >
          CHARGE
          <FaBolt size={20} />
        </button>
      </div>

    </section>
  )
}