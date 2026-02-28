import PlayersSection from "./MainSection/PlayersSection"
import CardsSection from "./MainSection/CardsSection"
import ActionSection from "./MainSection/ActionSection"
import { cards } from "../constant/card"
import { useState, useEffect } from "react"
import { getRandomCard } from "../utils/randomcard"

export default function MainSection() {
  
  const [isFlip, setIsFlip] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const [Card1, setCard1] = useState(getRandomCard(cards));
  const [Card2, setCard2] = useState(getRandomCard(cards));

  const maxHp = 1000;
  const [hpPlayer1, setHpPlayer1] = useState(maxHp);
  const [hpPlayer2, setHpPlayer2] = useState(maxHp);

  const resetHp = () => {
    setHpPlayer1(1000)
    setHpPlayer2(1000)
  }

  useEffect(() => {
    if(hpPlayer1 <= 0 ) {
      setTimeout(() => {
        alert("Player 2 Win")
        resetHp();
      }, 1500);
    }
    else if(hpPlayer2 <= 0) {
      setTimeout(() => {
        alert("Player 1 Win")
        resetHp();
      }, 1500); 
    }
}, [hpPlayer1, hpPlayer2]);

  return (
    <main className="flex flex-col justify-center items-center w-full gap-5 px-10">
        <PlayersSection 
          hpPlayer1={hpPlayer1} 
          hpPlayer2={hpPlayer2}
        />
        <CardsSection 
          isFlip={isFlip} 
          isShuffle={isShuffle} 
          Image1={Card1.image} 
          Image2={Card2.image}
        />
        <ActionSection 
          isFlip={isFlip} 
          setIsFlip={setIsFlip} 
          isShuffle={isShuffle} 
          setIsShuffle={setIsShuffle} 
          Card1={Card1}
          Card2={Card2}
          setCard1={setCard1} 
          setCard2={setCard2}
          setHpPlayer1={setHpPlayer1} 
          setHpPlayer2={setHpPlayer2}
        />
    </main>
  )
}