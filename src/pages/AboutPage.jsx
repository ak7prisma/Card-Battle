import AboutHero from "../component/AboutPage/AboutHero";
import HowToPlay from "../component/AboutPage/HowToPlay";
import GameMechanics from "../component/AboutPage/GameMechanics";
import GachaRates from "../component/AboutPage/GachaRates";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen py-10 px-6 md:px-12">
      <AboutHero />
      <HowToPlay />
      <GameMechanics />
      <GachaRates />
    </main>
  );
}