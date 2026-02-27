import PlayersSection from "./MainSection/PlayersSection"
import CardsSection from "./MainSection/CardsSection"
import ActionSection from "./MainSection/ActionSection"

export default function MainSection() {
  
  
  return (
    <main className="flex flex-col justify-center items-center w-full">
        <PlayersSection />
        <CardsSection />
        <ActionSection />
    </main>
  )
}