import { GiBattleAxe, GiCardRandom } from "react-icons/gi";
import { cards } from "../../constant/card";
import { getRandomCard } from "../../utils/randomcard";

export default function ActionSection( { isFlip, setIsFlip, isShuffle, setIsShuffle, setCard1, setCard2, setHpPlayer1, setHpPlayer2, Card1, Card2} ) {
  
  const MinHp = 0;
  const handleShuffle = () => {
    setIsShuffle(true)

    resetCard();

    setTimeout(() => {
      setIsShuffle(false)
    }, 750);
  }

  const handleFlip = () => {
    setIsFlip(true)

    const damageDealt=Card1.damage+Card2.damage;

    setTimeout(() => {
      if(Card1.value > Card2.value) {
        setHpPlayer2(prev => Math.max( prev - damageDealt, MinHp))
      }
      else if(Card1.value == Card2.value) alert("Draw");
      else setHpPlayer1(prev => Math.max( prev - damageDealt, MinHp));
    }, 500);

    setTimeout(() => {

      resetCard();
      setIsFlip(false)
    }, 1500);
  }

  const resetCard = () => {
    setCard1(getRandomCard(cards))
    setCard2(getRandomCard(cards))
  }
  
  return (
    <section className="flex justify-center items-center h-20 w-full gap-10 md:gap-20 text-sm md:text-lg font-medium tracking-widest">
        <button 
          className={`${isFlip || isShuffle? "cursor-not-allowed" : "cursor-pointer"} flex flex-row-reverse justify-center items-center py-2 rounded-bl-full rounded-tr-full gap-5 w-80 text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400/30 hover:scale-102 duration-300`}
          onClick={handleShuffle}
          disabled={isFlip || isShuffle}
          >
          SHUFFLE
          <GiCardRandom size={30} />
        </button>
        <button 
          className={`${isShuffle || isFlip? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center py-2 rounded-br-full rounded-tl-full gap-5 w-80 text-red-500 bg-red-700/30 hover:bg-red-700/60 hover:scale-102 duration-300`}
          onClick={handleFlip}
          disabled={isShuffle || isFlip}
          >
          OPEN
          <GiBattleAxe size={30} />
        </button>
    </section>
  )
}