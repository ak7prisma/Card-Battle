export const ITEMS_PER_PAGE = 24;
export const API_FETCH_LIMIT = 200;
export const RARITIES = ["ALL", "C", "UC" , "R", "SR", "L"];

export   const rarityConfig = {
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
    L: { 
      border: 'border-red-600', 
      glow: 'shadow-[0_0_25px_rgba(220,38,38,0.7)]', 
      badge: 'bg-red-700 text-red-50 border-red-500' 
    }
  };