import { useState } from "react";
import { TbPlayCard } from "react-icons/tb";
import DragonBallCard from "../ui/DragonBallCard";

function CardBack({ color = "red" }) {
  const borderColor = color === "red" ? "border-red-700/60" : "border-cyan-500/60";
  return (
    <div className={`w-full h-full rounded-xl border-2 flex items-center justify-center overflow-hidden bg-slate-900 ${borderColor}`}>
      <img src="/backfacecard.png" alt="Card Back" className="w-full h-full object-cover" />
    </div>
  );
}

export default function CardsSection({ isFlip, isShuffle, Card1, Card2 }) {
  const cardSize = "w-36 h-52 md:w-48 md:h-68";
  const animateClass = "perspective-dramatic transition-all backface-hidden duration-700";

  return (
    <section className="flex justify-center w-full gap-6 md:gap-10 mb-5">
      {/* === Player 1 (Red) === */}
      <div className="flex max-w-full max-h-full justify-center relative">
        {/* Card Back (face-down, flips away) */}
        <div className={`${cardSize} ${animateClass} rounded-xl overflow-hidden ${isFlip ? "rotate-y-180" : ""} ${
          isShuffle ? "-translate-x-10 -translate-y-5 md:-translate-x-40 md:-translate-y-10 z-0" : "z-30"
        }`}>
          <CardBack color="red" />
        </div>

        {/* Card Front (revealed on flip) */}
        <div className={`absolute ${cardSize} ${animateClass} z-30 rotate-y-180 rounded-xl overflow-hidden ${
          isFlip ? "rotate-y-360" : ""
        }`}>
          {Card1 ? <DragonBallCard card={Card1} /> : <CardBack color="red" />}
        </div>

        {/* Deck stack cards */}
        <div className={`absolute ${cardSize} ${animateClass} rounded-xl overflow-hidden ${
          isShuffle ? "z-30" : "translate-1 md:translate-2 z-20"
        }`}>
          <CardBack color="red" />
        </div>
        <div className={`absolute ${cardSize} ${animateClass} rounded-xl overflow-hidden ${
          isShuffle ? "translate-1 md:translate-2 z-20" : "translate-2 md:translate-4 z-10"
        }`}>
          <CardBack color="red" />
        </div>
      </div>

      {/* === Player 2 (Cyan) === */}
      <div className="flex max-w-full max-h-full justify-center relative">
        {/* Card Back (face-down, flips away) */}
        <div className={`${cardSize} ${animateClass} rounded-xl overflow-hidden ${isFlip ? "rotate-y-180" : ""} ${
          isShuffle ? "translate-x-10 translate-y-5 md:translate-x-40 md:translate-y-10 z-0" : "z-30"
        }`}>
          <CardBack color="cyan" />
        </div>

        {/* Card Front (revealed on flip) */}
        <div className={`absolute ${cardSize} ${animateClass} z-30 rotate-y-180 rounded-xl overflow-hidden ${
          isFlip ? "rotate-y-360" : ""
        }`}>
          {Card2 ? <DragonBallCard card={Card2} /> : <CardBack color="cyan" />}
        </div>

        {/* Deck stack cards */}
        <div className={`absolute ${cardSize} ${animateClass} rounded-xl overflow-hidden ${
          isShuffle ? "z-30" : "translate-1 md:translate-2 z-20"
        }`}>
          <CardBack color="cyan" />
        </div>
        <div className={`absolute ${cardSize} ${animateClass} rounded-xl overflow-hidden ${
          isShuffle ? "translate-1 md:translate-2 z-20" : "translate-2 md:translate-4 z-10"
        }`}>
          <CardBack color="cyan" />
        </div>
      </div>
    </section>
  );
}