import { TbPlayCard } from "react-icons/tb"

export default function CardsSection() {
  
  
  return (
    <section className="flex justify-center w-full gap-10">
      <div className="flex max-w-full max-h-full justify-center">
        <TbPlayCard size={320} className="fill-red-700 z-10"/>
        <TbPlayCard size={320} className="absolute fill-red-700/60 translate-4 z-8"/>
        <TbPlayCard size={320} className="absolute fill-red-700/30 translate-7 z-6"/>
      </div>
      <div className="flex maxw-full maxh-full justify-center">
        <TbPlayCard size={320} className="fill-cyan-400 z-10"/>
        <TbPlayCard size={320} className="absolute fill-cyan-400/60 translate-4 z-8"/>
        <TbPlayCard size={320} className="absolute fill-cyan-400/30 translate-7 z-6"/>
      </div>
    </section>
  )
}