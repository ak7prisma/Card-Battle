const rarityConfig = {
    C: { 
      border: 'border-slate-500', 
      glow: 'shadow-[0_0_10px_rgba(148,163,184,0.3)]', 
      badge: 'bg-slate-700 text-slate-200 border-slate-500' 
    },
    UC: { 
      border: 'border-green-500', 
      glow: 'shadow-[0_0_10px_rgba(34,197,94,0.3)]', 
      badge: 'bg-green-800 text-green-100 border-green-600' 
    },
    R: { 
      border: 'border-blue-500', 
      glow: 'shadow-[0_0_12px_rgba(59,130,246,0.4)]', 
      badge: 'bg-blue-800 text-blue-100 border-blue-600' 
    },
    SR: { 
      border: 'border-purple-500', 
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.5)]', 
      badge: 'bg-purple-800 text-purple-100 border-purple-600' 
    },
    SEC: { 
      border: 'border-yellow-400', 
      glow: 'shadow-[0_0_20px_rgba(234,179,8,0.6)]', 
      badge: 'bg-yellow-600 text-yellow-50 border-yellow-300' 
    },
    L: { 
      border: 'border-red-600', 
      glow: 'shadow-[0_0_25px_rgba(220,38,38,0.7)]', 
      badge: 'bg-red-700 text-red-50 border-red-500' 
    },
    SP: { 
      border: 'border-pink-500', 
      glow: 'shadow-[0_0_15px_rgba(236,72,153,0.5)]', 
      badge: 'bg-pink-700 text-pink-50 border-pink-400' 
    },
    P: { 
      border: 'border-cyan-400', 
      glow: 'shadow-[0_0_15px_rgba(34,211,238,0.5)]', 
      badge: 'bg-cyan-700 text-cyan-50 border-cyan-400' 
    },
};

const getRarityConfig = (rarity) => rarityConfig[rarity] || rarityConfig.C;

export default getRarityConfig;