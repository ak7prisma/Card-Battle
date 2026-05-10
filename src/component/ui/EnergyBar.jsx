export default function EnergyBar({ energy, maxEnergy, left }) {
  const barWidth = Math.min(100, (energy / maxEnergy) * 100);

  const yellowLeft = `left-1 bg-linear-to-br from-yellow-700 to-yellow-400 via-amber-500`;
  const yellowRight = `-right-1 bg-linear-to-bl from-amber-700 to-yellow-300 via-amber-500`;

  return (
    <div className="flex justify-center">
      <div className={`box-border w-55 md:w-sm h-4 relative text-white p-1 border-2 border-amber-700/50 bg-slate-700/15 ${left ? "-rotate-10 skew-10" : "rotate-10 -skew-10"}`}>
        <div
          className={`max-w-95 h-3 -translate-1 absolute transition-[width] duration-300 ease-[cubic-bezier(0.47,1.64,0.41,0.8)] ${left ? yellowLeft : yellowRight}`}
          style={{ width: `${barWidth}%` }}
        ></div>
      </div>
    </div>
  );
}