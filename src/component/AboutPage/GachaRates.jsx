import { rarityLabel } from "../../constant/about";

export default function GachaRates() {
  return (
    <div className="w-full max-w-3xl mt-4">
      <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-5">
        <h3 className="text-slate-200 font-semibold tracking-wider text-sm mb-3">Gacha Rarity Rates</h3>
        <div className="space-y-2">
          {rarityLabel.map((tier) => (
            <div key={tier.rarity} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${tier.color}`}></div>
              <span className="text-slate-300 text-sm flex-1">{tier.rarity}</span>
              <span className="text-slate-400 text-sm font-mono">{tier.rate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}