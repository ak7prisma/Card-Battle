import { GiBattleAxe, GiCardRandom } from "react-icons/gi";
import { cards } from "../../constant/card";
import { getRandomCard } from "../../utils/randomcard";

export default function ActionSection( { isFlip, setIsFlip, isShuffle, setIsShuffle, setCard1, setCard2, setHpPlayer1, setHpPlayer2, Card1, Card2} ) {
  
  const flip = isFlip? "CLOSE" : "OPEN";
  
  const handleShuffle = () => {
    setIsShuffle(true)

    setCard1(getRandomCard(cards))
    setCard2(getRandomCard(cards))

    setTimeout(() => {
      setIsShuffle(false)
    }, 750);
  }

  const handleFlip = () => {
    setIsFlip(true)

    const damageDealt=Card1.damage+Card2.damage;
    
    setTimeout(() => {

      if(Card1.value > Card2.value) {
        setHpPlayer2(prev => prev - damageDealt)
        alert("Damage "+damageDealt)
      }
      else if(Card1.value == Card2.value) alert("Draw");
      else {
        setHpPlayer1(prev => prev - damageDealt)
        alert("Damage "+damageDealt)
      }

      setCard1(getRandomCard(cards))
      setCard2(getRandomCard(cards))
      
      setIsFlip(false)
    }, 2000);
  }

  return (
    <section className="flex justify-center items-center h-20 w-full gap-20 text-lg font-medium tracking-widest">
        <button 
          className={`${isFlip? "cursor-not-allowed" : "cursor-pointer"} flex flex-row-reverse justify-center items-center py-2 rounded-bl-full rounded-tr-full gap-5 w-80 text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400/30 hover:scale-102 duration-300`}
          onClick={handleShuffle}
          disabled={isFlip}
          >
          SHUFFLE
          <GiCardRandom size={30} />
        </button>
        <button 
          className={`${isShuffle? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center py-2 rounded-br-full rounded-tl-full gap-5 w-80 text-red-500 bg-red-700/30 hover:bg-red-700/60 hover:scale-102 duration-300`}
          onClick={handleFlip}
          disabled={isShuffle}
          >
          {flip}
          <GiBattleAxe size={30} />
        </button>
    </section>
  )
}