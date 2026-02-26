import PlayersSection from "./organism/PlayersSection"
import CardsSection from "./organism/CardsSection"
import ActionSection from "./organism/ActionSection"

function MainSection() {
  
  
  return (
    <main className="flex flex-col justify-center items-center w-full">
        <PlayersSection />
        <CardsSection />
        <ActionSection />
    </main>
  )
}

export default MainSection