import HealthBar from "../ui/HealthBar";
import { useState } from "react";

export default function PlayersSection() {
  const maxHp=1000;
  const [hp, setHp] = useState(maxHp);
  
  return (
    <section className="flex justify-center items-center h-35 w-full gap-30 font-semibold text-lg tracking-wider text-red-800">
        <div className="flex flex-col w-100 gap-3">
          <div className="flex justify-between">
            <p>
              PLAYER 1
            </p>
            <p className="text-slate-300/80 font-normal">
              Rank B
            </p>
          </div>
          <HealthBar hp={hp} maxHp={maxHp}/>
          <div className="flex justify-end text-sm font-medium">
            <p className="text-white">
              {hp} / {maxHp} HP
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="text-5xl font-bold text-slate-200/20 italic">VS</p>
          <p className="text-xl tracking-widest">ROUND 2</p>
        </div>
        <div className="flex flex-col w-100 gap-3">
          <div className="flex flex-row-reverse justify-between">
            <p>
              PLAYER 2
            </p>
            <p className="text-slate-300 font-normal">
              Rank A
            </p>
          </div>
          <HealthBar hp={hp} maxHp={maxHp} />
          <div className="flex justify-start text-sm font-medium">
            <p className="text-white">
              {hp} / {maxHp} HP
            </p>
          </div>
        </div>
    </section>
  )
}