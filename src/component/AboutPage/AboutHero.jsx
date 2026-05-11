import { SiRepublicofgamers } from "react-icons/si";

export default function AboutHero() {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-4">
        <SiRepublicofgamers className="w-16 h-16 p-3 bg-red-700 rounded-tl-2xl rounded-br-2xl" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-widest">
        <span className="text-slate-200">Card</span>{" "}
        <span className="text-red-700">Battle</span>
      </h1>
      <p className="text-slate-400 text-sm mt-3 tracking-wider max-w-md mx-auto">
        A Dragon Ball-inspired card battle game built with React.
        Draw cards, manage your energy, and defeat your opponent!
      </p>
    </div>
  );
}