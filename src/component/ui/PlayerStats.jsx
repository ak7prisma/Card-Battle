import HealthBar from "../ui/HealthBar";

export default function Playerstats({left, name, rank, hp, maxHp}){

    return(
        
        <div className={`flex flex-col scale-65 md:scale-100 gap-3 ${left? "text-red-800" : "text-cyan-400"}`}>
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
        </div>
    );
}