import { rarityConfig } from '../../constant/card';

export default function DragonBallCard({ card, scale = 100 }) {
  if (!card) return null;

  const rarity = (card.rarity || 'C').toUpperCase();
  const config = rarityConfig[rarity] || rarityConfig.C;

  return (
    <div 
      className={`relative aspect-[3/4] rounded-xl overflow-hidden border-[3px] ${config.border} ${config.glow} transition-all duration-500 hover:scale-[1.02] hover:brightness-110 group cursor-pointer w-full h-full`}
      style={{ transform: scale !== 100 ? `scale(${scale / 100})` : 'none' }}
    >
      {/* Inner Shadow / Depth */}
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-10 pointer-events-none" />

      {/* Card Image */}
      {card.image ? (
        <img 
          src={card.image} 
          alt={card.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-900">
          <span className="text-4xl mb-2 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">🐉</span>
          <span className="text-[10px] font-black text-white/50 uppercase tracking-tighter text-center">{card.name}</span>
        </div>
      )}

      {/* Dragon Ball Decorative Icon */}
      <div className="absolute bottom-2 left-2 w-5 h-5 opacity-30 group-hover:opacity-70 transition-opacity z-20">
         <svg viewBox="0 0 24 24" fill="currentColor" className="text-orange-500">
           <path d="M12 .587l3.668 7.431 8.332 1.21-6.001 5.85 1.416 8.297L12 18.897l-7.415 3.898 1.416-8.297-6.001-5.85 8.332-1.21L12 .587z" />
         </svg>
      </div>

      {/* Rarity Badge - Angled and Styled */}
      <div className={`absolute bottom-2 right-2 px-2 py-0.5 rounded-sm text-[10px] font-black italic tracking-widest border shadow-lg z-20 transform -rotate-1 ${config.badge}`}>
        {rarity}
      </div>

      {/* Premium Polish: Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-white/5 pointer-events-none z-10" />
      
      {/* Interactive Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden z-30">
        <div className="absolute -inset-[100%] bg-linear-to-r from-transparent via-white/20 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
      </div>

      {/* Scanner Lines Effect (Very subtle DB tech look) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.5)_3px)]" />
    </div>
  );
}
