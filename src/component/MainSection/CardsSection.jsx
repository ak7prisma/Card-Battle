import { TbPlayCard } from "react-icons/tb"

export default function CardsSection({ isFlip, isShuffle, Image1, Image2 }) {
  
  const animateClass = `perspective-dramatic transition-all backface-hidden duration-700`;
  
  return (

    <section className="flex justify-center w-full gap-10 mb-5">
      <div className="flex max-w-full max-h-full justify-center ">
        <TbPlayCard size={320} className={`fill-red-700 ${animateClass} ${isFlip? "rotate-y-180": ""} ${isShuffle ? "-translate-x-50 -translate-y-10 z-0" : "z-30"}`}/>
        <Image1 size={320} className={`absolute fill-red-700 z-30 ${animateClass} rotate-y-180 ${isFlip? "rotate-y-360": ""}`}/>
        <TbPlayCard size={320} className={`absolute fill-red-700 ${isShuffle ? "z-30" : "translate-4 z-20"}`}/>
        <TbPlayCard size={320} className={`absolute fill-red-700 ${animateClass} ${isShuffle ? "translate-4 z-20" : "translate-7 z-10"}`}/>
      </div>
      <div className="flex max-w-full maxh-full justify-center">
        <TbPlayCard size={320} className={`fill-cyan-400 ${animateClass} ${isFlip? "rotate-y-180": ""} ${isShuffle ? "translate-x-50 translate-y-10 z-0" : "z-30"}`}/>
        <Image2 size={320} className={`absolute fill-cyan-400 z-30 ${animateClass} rotate-y-180 ${isFlip? "rotate-y-360": ""}`}/>
        <TbPlayCard size={320} className={`absolute fill-cyan-400 ${isShuffle ? "z-30" : "translate-4 z-20"}`}/>
        <TbPlayCard size={320} className={`absolute fill-cyan-400 ${isShuffle ? "translate-4 z-20" : "translate-7 z-10"}`}/>
      </div>
    </section>

  )
}