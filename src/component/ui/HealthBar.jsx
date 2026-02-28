export default function HealthBar({hp, maxHp, left}) {
  const barWidth = ((hp / maxHp) * 100);

  const redBar = `left-1 bg-linear-to-br from-red-950 to-red-500 via-red-800`;
  const blueBar = `-right-1 bg-linear-to-bl from-cyan-800 to-cyan-300 via-cyan-600 `;

  return (
    <div className="flex justify-center">
      <div className={`box-border w-sm h-6 relative text-white p-1.25 border-2 border-mauve-700 bg-slate-700/15 ${left? "-rotate-10 skew-10" : "rotate-10 -skew-10"}`}>
        <div 
          className={`max-w-95 h-5 -translate-1 absolute transition-[width] duration-300 ease-[cubic-bezier(0.47,1.64,0.41,0.8)] ${left? redBar: blueBar}`} 
          style={{ width: `${barWidth}%` }}>
        </div>
        <div className="absolute transition-[width] duration-500 ease-linear right-1.25 inset-y-1.25 bg-white" style={{ width: `${0}%` }}></div>

        <div className="absolute top-1.25 left-0 right-0 text-center">
        </div>
      </div>
    </div>
  );
}