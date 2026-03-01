import Playerstats from "../ui/PlayerStats";

export default function PlayersSection({hpPlayer1, hpPlayer2}) {
  
  return (
    <section className={"flex justify-center items-center h-35 w-full gap-5 md:gap-30 -space-x-10 md:space-x-0 font-semibold text-lg tracking-wider text-red-800"}>
      <Playerstats left={true} name={"Yu Zhong"} rank={"Mythic"} hp={hpPlayer1} maxHp={1000}/>

        <div className="flex flex-col items-center md:gap-3">
          <p className="text-lg md:text-5xl font-bold text-slate-200/20 italic">VS</p>
          <p className="text-sm md:text-xl tracking-widest text-transparent bg-clip-text bg-linear-to-r text-center md:truncate from-red-700 to-cyan-400 via-indigo-500 font-bold">ROUND 2</p>
        </div>
        
      <Playerstats left={false} name={"Shifuu"} rank={"Epical Glory"} hp={hpPlayer2} maxHp={1000}/>
    </section>
  )
}