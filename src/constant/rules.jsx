import { GiBattleAxe, GiCardRandom } from "react-icons/gi";
import { FaBolt } from "react-icons/fa";

export const getRules = [
    {
      id: 1,
      title: "1. DRAW",
      desc: "Draw cards for both players using the gacha system. Rarer cards are more powerful but less likely to appear.",
      icon: <GiCardRandom className="text-cyan-400" size={20} />,
      bgIcon: "bg-cyan-400/20",
      hoverBorder: "hover:border-cyan-400/30",
      textClass: "text-cyan-400",
    },
    {
      id: 2,
      title: "2. ATTACK",
      desc: (
        <>
          Battle your opponent! Attacking costs <span className="text-slate-200 font-mono">Card Cost × 10</span> Energy. If both players attack, cards <span className="text-red-500 font-bold">CLASH</span> and only the stronger card deals damage! Damage = <span className="text-slate-200 font-mono">10% Power + 10% Power Difference</span>.
        </>
      ),
      icon: <GiBattleAxe className="text-red-500" size={20} />,
      bgIcon: "bg-red-700/20",
      hoverBorder: "hover:border-red-500/30",
      textClass: "text-red-500",
    },
    {
      id: 3,
      title: "3. CHARGE",
      desc: (
        <>
          Skip the attack to recharge energy. Gain <span className="text-slate-200 font-mono">Power ÷ 300</span> energy. Beware your opponent might attack you while you charge!
        </>
      ),
      icon: <FaBolt className="text-amber-400" size={20} />,
      bgIcon: "bg-amber-500/20",
      hoverBorder: "hover:border-amber-400/30",
      textClass: "text-amber-400",
    },
  ];