import { GiBattleAxe, GiCardRandom } from "react-icons/gi";


export default function ActionSection( { isFlip, setIsFlip } ) {
  
  const flip = isFlip? "CLOSE" : "OPEN";

  return (
    <section className="flex justify-center items-center h-20 w-full gap-20 text-lg font-medium tracking-widest">
        <button 
          className="flex flex-row-reverse justify-center items-center py-2 rounded-bl-full rounded-tr-full gap-5 w-80 text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400/30 hover:scale-102 duration-300 cursor-pointer"
          >
          SHUFFLE
          <GiCardRandom size={30} />
        </button>
        <button 
          className="flex justify-center items-center py-2 rounded-br-full rounded-tl-full gap-5 w-80 text-red-500 bg-red-700/30 hover:bg-red-700/60 hover:scale-102 duration-300 cursor-pointer"
          onClick={() => setIsFlip(!isFlip)}
          >
          {flip}
          <GiBattleAxe size={30} />
        </button>
    </section>
  )
}