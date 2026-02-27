import PlayersSection from "./MainSection/PlayersSection"
import CardsSection from "./MainSection/CardsSection"
import ActionSection from "./MainSection/ActionSection"
import { cards } from "../constant/card"
import { useState } from "react"

export default function MainSection() {
  
  const [isFlip, setIsFlip] = useState(false);
  const [card, setCard] = useState("");
  
  return (
    <main className="flex flex-col justify-center items-center w-full gap-5">
        <PlayersSection />
        <CardsSection isFlip={isFlip} Card={card}/>
        <ActionSection isFlip={isFlip} setIsFlip={setIsFlip}/>
    </main>
  )
}