import { TbPlayCard } from "react-icons/tb"

export default function CardsSection({ isFlip, Card }) {
  
  
  return (
    <section className="flex justify-center w-full gap-10 mb-5">
      <div className="flex max-w-full max-h-full justify-center ">
        <TbPlayCard size={320} className={`fill-red-700 z-30 perspective-dramatic transform-3d backface-hidden ${isFlip? "rotate-y-180": ""} duration-500`}/>
        <TbPlayCard size={320} className={`absolute fill-red-700 z-30 perspective-dramatic transform-3d backface-hidden rotate-y-180 ${isFlip? "rotate-y-360": ""} duration-500`}/>
        <TbPlayCard size={320} className="absolute fill-red-700 translate-4 z-20"/>
        <TbPlayCard size={320} className="absolute fill-red-700 translate-7 z-10"/>
      </div>
      <div className="flex max-w-full maxh-full justify-center">
        <TbPlayCard size={320} className={`fill-cyan-400 z-30 perspective-dramatic transform-3d backface-hidden ${isFlip? "rotate-y-180": ""} duration-500`}/>
        <TbPlayCard size={320} className={`absolute fill-cyan-400 z-30 perspective-dramatic transform-3d backface-hidden rotate-y-180 ${isFlip? "rotate-y-360": ""} duration-500`}/>
        <TbPlayCard size={320} className="absolute fill-cyan-400 translate-4 z-20"/>
        <TbPlayCard size={320} className="absolute fill-cyan-400 translate-7 z-10"/>
      </div>
    </section>
  )
}