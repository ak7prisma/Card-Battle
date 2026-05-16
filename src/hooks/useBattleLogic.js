import { useState, useEffect } from "react";
import { fetchCards, getBattleCards } from "../utils/api";
import { getWeightedRandomCard } from "../utils/gachaSystem";

//initial stats
const INITIAL_ENERGY = 50;
const MAX_ENERGY = 100;
const MAX_HP = 10000;

//rarity bonus
const RARITY_BONUS = {
  C: 1,
  UC: 1.1,
  R: 1.25,
  SR: 1.5,
  SEC: 2,
  L: 2,
  SP: 1.8,
  P: 1.3
};

//get rarity mult
const getRarityMult = (rarity) => RARITY_BONUS[rarity?.toUpperCase()] || 1;

//calculate damage
const calculateDamage = (attacker, defender) => {
  if (!attacker || !defender) return 0;
  
  const atkBonus = getRarityMult(attacker.rarity);
  const defBonus = getRarityMult(defender.rarity);

  const atkPower = attacker.power * atkBonus;
  const defPower = defender.power * defBonus;
  
  const baseDmg = Math.floor(atkPower / 10);
  
  const diff = atkPower - defPower;
  const bonusDmg = diff > 0 ? Math.floor(diff / 10) : 0;
  
  const finalDmg = Math.floor((baseDmg + bonusDmg) / defBonus);
  
  return Math.max(50, finalDmg);
};

//calculate charge
const calculateCharge = (card) => {
  if (!card) return 0;
  const bonus = getRarityMult(card.rarity);
  return Math.floor((card.power * bonus) / 300);
};

export default function useBattleLogic() {
  const [battleCards, setBattleCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isFlip, setIsFlip] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const [gamePhase, setGamePhase] = useState("idle");
  const [battleLog, setBattleLog] = useState("");

  const [activePlayer, setActivePlayer] = useState(1);
  const [p1Action, setP1Action] = useState(null);

  const [Card1, setCard1] = useState(null);
  const [Card2, setCard2] = useState(null);

  const [hpPlayer1, setHpPlayer1] = useState(MAX_HP);
  const [hpPlayer2, setHpPlayer2] = useState(MAX_HP);

  const [energyPlayer1, setEnergyPlayer1] = useState(INITIAL_ENERGY);
  const [energyPlayer2, setEnergyPlayer2] = useState(INITIAL_ENERGY);

  useEffect(() => {
    fetchCards().then((allCards) => {
      const battle = getBattleCards(allCards);
      setBattleCards(battle.length > 0 ? battle : allCards);
      setIsLoading(false);
    });
  }, []);

  //win condition check
  useEffect(() => {
    if (hpPlayer1 <= 0) {
      setTimeout(() => {
        alert("Player 2 Wins!");
        resetGame();
      }, 1500);
    } else if (hpPlayer2 <= 0) {
      setTimeout(() => {
        alert("Player 1 Wins!");
        resetGame();
      }, 1500);
    }
  }, [hpPlayer1, hpPlayer2]);

  //reset game
  const resetGame = () => {
    setHpPlayer1(MAX_HP);
    setHpPlayer2(MAX_HP);
    setEnergyPlayer1(INITIAL_ENERGY);
    setEnergyPlayer2(INITIAL_ENERGY);
    setCard1(null);
    setCard2(null);
    setGamePhase("idle");
    setBattleLog("");
    setActivePlayer(1);
    setP1Action(null);
  };

  //draw card
  const handleDraw = () => {
    if (battleCards.length === 0) return;
    setIsShuffle(true);

    const newCard1 = getWeightedRandomCard(battleCards);
    const newCard2 = getWeightedRandomCard(battleCards);
    setCard1(newCard1);
    setCard2(newCard2);

    setTimeout(() => {
      setIsShuffle(false);
      setGamePhase("drawn");
    }, 750);
  };

  //execute actions
  const executeActions = (action1, action2) => {
    setIsFlip(true);
    setGamePhase("resolving");

    setTimeout(() => {
      if (action1 === "attack") {
        setEnergyPlayer1((prev) => Math.max(0, prev - ((Card1.cost || 1) * 10)));
      }
      if (action2 === "attack") {
        setEnergyPlayer2((prev) => Math.max(0, prev - ((Card2.cost || 1) * 10)));
      }

      if (action1 === "attack" && action2 === "attack") {

        if (Card1.power > Card2.power) {
          const dmg = calculateDamage(Card1, Card2);
          setHpPlayer2((prev) => Math.max(0, prev - dmg));
          setBattleLog(`CLASH! P1 wins and deals ${dmg} DMG!`);
        } else if (Card2.power > Card1.power) {
          const dmg = calculateDamage(Card2, Card1);
          setHpPlayer1((prev) => Math.max(0, prev - dmg));
          setBattleLog(`CLASH! P2 wins and deals ${dmg} DMG!`);
        } else {
          setBattleLog(`CLASH TIE! No damage taken.`);
        }
      } else {
        let p1Log = "";
        let p2Log = "";

        if (action1 === "attack") {
          const dmg = calculateDamage(Card1, Card2);
          setHpPlayer2((prev) => Math.max(0, prev - dmg));
          p1Log = `P1 deals ${dmg} DMG`;
        } else {
          const charge = calculateCharge(Card1);
          setEnergyPlayer1((prev) => Math.min(MAX_ENERGY, prev + charge));
          p1Log = `P1 +${charge} EP`;
        }

        if (action2 === "attack") {
          const dmg = calculateDamage(Card2, Card1);
          setHpPlayer1((prev) => Math.max(0, prev - dmg));
          p2Log = `P2 deals ${dmg} DMG`;
        } else {
          const charge = calculateCharge(Card2);
          setEnergyPlayer2((prev) => Math.min(MAX_ENERGY, prev + charge));
          p2Log = `P2 +${charge} EP`;
        }

        setBattleLog(`${p1Log}  ||  ${p2Log}`);
      }
    }, 800);

    setTimeout(() => {
      setIsFlip(false);
      setGamePhase("idle");
      setBattleLog("");
      setActivePlayer(1);
      setP1Action(null);
    }, 4500);
  };

  //handle attack
  const handleAttack = () => {
    if (activePlayer === 1) {
      if (energyPlayer1 < (Card1.cost || 1) * 10) {
        setBattleLog("Not enough energy! Please Charge.");
        setTimeout(() => setBattleLog(""), 1500);
        return;
      }
      setP1Action("attack");
      setActivePlayer(2);
      setBattleLog("Player 2's turn!");
    } else {
      if (energyPlayer2 < (Card2.cost || 1) * 10) {
        setBattleLog("Not enough energy! Player 2 must Charge.");
        setTimeout(() => setBattleLog(""), 1500);
        return;
      }
      executeActions(p1Action, "attack");
    }
  };

  //handle charge
  const handleCharge = () => {
    if (activePlayer === 1) {
      if (energyPlayer1 >= MAX_ENERGY) {
        setBattleLog("Energy is full! You must Attack.");
        setTimeout(() => setBattleLog(""), 1500);
        return;
      }
      setP1Action("charge");
      setActivePlayer(2);
      setBattleLog("Player 2's turn!");
    } else {
      if (energyPlayer2 >= MAX_ENERGY) {
        setBattleLog("Energy is full! You must Attack.");
        setTimeout(() => setBattleLog(""), 1500);
        return;
      }
      executeActions(p1Action, "charge");
    }
  };

  return {
    isLoading,
    isFlip,
    isShuffle,
    gamePhase,
    battleLog,
    activePlayer,
    Card1,
    Card2,
    hpPlayer1,
    hpPlayer2,
    energyPlayer1,
    energyPlayer2,
    handleDraw,
    handleAttack,
    handleCharge,
  };
}