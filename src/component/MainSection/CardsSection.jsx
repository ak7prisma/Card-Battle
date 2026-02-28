import { TbPlayCard } from "react-icons/tb"

export default function CardsSection({ isFlip, isShuffle, Image1, Image2 }) {
  
  const animateClass = `perspective-dramatic transition-all backface-hidden duration-700`;
  
  return (

    <section className="flex justify-center w-full gap-10 mb-5">
      <div className="flex max-w-full max-h-full justify-center ">
        <TbPlayCard size={200} className={`fill-red-700 md:size-75 ${animateClass} ${isFlip? "rotate-y-180": ""} ${isShuffle ? "-translate-x-10 -translate-y-5 md:-translate-x-50 md:-translate-y-10 z-0" : "z-30"}`}/>
        <Image1 size={200} className={`absolute fill-red-700 z-30 md:size-75 ${animateClass} rotate-y-180 ${isFlip? "rotate-y-360": ""}`}/>
        <TbPlayCard size={200} className={`absolute fill-red-700 md:size-75 ${animateClass} ${isShuffle ? "z-30" : "translate-2 md:translate-4 z-20"}`}/>
        <TbPlayCard size={200} className={`absolute fill-red-700 md:size-75 ${animateClass} ${isShuffle ? "translate-2 md:translate-4 z-20" : "md:translate-7 z-10"}`}/>
      </div>
      <div className="flex max-w-full maxh-full justify-center">
        <TbPlayCard size={200} className={`fill-cyan-400 md:size-75 ${animateClass} ${isFlip? "rotate-y-180": ""} ${isShuffle ? "translate-x-10 translate-y-5 md:translate-x-50 md:translate-y-10 z-0" : "z-30"}`}/>
        <Image2 size={200} className={`absolute fill-cyan-400 z-30 md:size-75 ${animateClass} rotate-y-180 ${isFlip? "rotate-y-360": ""}`}/>
        <TbPlayCard size={200} className={`absolute fill-cyan-400 md:size-75 ${animateClass} ${isShuffle ? "z-30" : "translate-2 md:translate-4 z-20"}`}/>
        <TbPlayCard size={200} className={`absolute fill-cyan-400 md:size-75 ${animateClass} ${isShuffle ? "translate-2 md:translate-4 z-20" : "md:translate-7 z-10"}`}/>
      </div>
    </section>

  )
}