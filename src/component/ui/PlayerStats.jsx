import HealthBar from "../ui/HealthBar";
import EnergyBar from "../ui/EnergyBar";
import { SlEnergy } from "react-icons/sl";

export default function Playerstats({left, name, rank, hp, maxHp, energy, maxEnergy}){

    return(
        
        <div className={`flex flex-col scale-65 md:scale-100 gap-2 ${left? "text-red-800" : "text-cyan-400"}`}>
          <div className={`flex ${left? "": "flex-row-reverse"} justify-between`}>
            <p>
                {name}
            </p>
            <p className="text-slate-300/80 font-normal">
                Rank {rank}
            </p>
            </div>
            <HealthBar hp={hp} maxHp={maxHp} left={left}/>
            <div className={`flex ${left? "justify-end" :"justify-start"} text-sm font-medium`}>
            <p className="text-white">
              {hp} / {maxHp} HP
            </p>
          </div>
          <EnergyBar energy={energy} maxEnergy={maxEnergy} left={left}/>
          <div className={`flex ${left? "justify-end" :"justify-start"} text-xs font-medium`}>
            <p className="text-amber-400 flex gap-1">
              <SlEnergy size={15} />{energy} / {maxEnergy} EP
            </p>
          </div>
        </div>
    );
}