import { statsInfo } from "../../constant/about";

export default function GameMechanics() {
  return (
    <div className="w-full max-w-3xl mt-12 space-y-6">
      <h2 className="text-2xl font-bold tracking-widest text-slate-200 border-b border-slate-700/50 pb-3">
        Game <span className="text-red-700">Mechanics</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsInfo.map((stat) => (
          <div key={stat.label} className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-slate-500 text-xs mt-1 tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}