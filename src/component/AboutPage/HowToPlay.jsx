import { getRules } from "../../constant/rules";

export default function HowToPlay() {

  return (
    <div className="w-full max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold tracking-widest text-slate-200 border-b border-slate-700/50 pb-3">
        How to <span className="text-red-700">Play</span>
      </h2>
      <div className="grid gap-4">
        {getRules.map((rule) => (
          <div key={rule.id} className={`flex gap-4 p-5 bg-slate-800/20 border border-slate-700/30 rounded-xl ${rule.hoverBorder} duration-300`}>
            <div className={`flex-shrink-0 w-10 h-10 ${rule.bgIcon} rounded-xl flex items-center justify-center`}>
              {rule.icon}
            </div>
            <div>
              <h3 className={`${rule.textClass} font-semibold tracking-wider text-sm`}>{rule.title}</h3>
              <p className="text-slate-400 text-sm mt-1">{rule.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}