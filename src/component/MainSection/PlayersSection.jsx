import HealthBar from "../ui/HealthBar";
import { useState } from "react";
import Playerstats from "../ui/PlayerStats";

export default function PlayersSection() {
  const maxHp = 1000;
  const [hpPlayer1, setHpPlayer1] = useState(maxHp);
  const [hpPlayer2, setHpPlayer2] = useState(maxHp);
  
  return (
    <section className="flex justify-center items-center h-35 w-full gap-30 font-semibold text-lg tracking-wider text-red-800">
      <Playerstats left={true} name={"Yu Zhong"} rank={"Mythic"} hp={hpPlayer1} maxHp={maxHp}/>

        <div className="flex flex-col items-center gap-3">
          <p className="text-5xl font-bold text-slate-200/20 italic">VS</p>
          <p className="text-xl tracking-widest">ROUND 2</p>
        </div>
        
      <Playerstats left={false} name={"Shifuu"} rank={"Epical Glory"} hp={hpPlayer2} maxHp={maxHp}/>
    </section>
  )
}