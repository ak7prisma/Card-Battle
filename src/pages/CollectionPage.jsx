import { useState, useEffect } from "react";
import { fetchCards } from "../utils/api";
import DragonBallCard from "../component/ui/DragonBallCard";
import { RARITIES, ITEMS_PER_PAGE } from "../constant/card";
import { getRarityLabel } from "../utils/gachaSystem";

export default function CollectionPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rarityFilter, setRarityFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCards().then((data) => {
      setCards(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => { setPage(1); }, [rarityFilter, search]);

  const filtered = cards.filter((c) => {
    if (rarityFilter !== "ALL" && c.rarity !== rarityFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const displayed = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <main className="flex flex-col items-center w-full min-h-screen py-10 px-6">
        <div className="flex flex-col items-center gap-4 mt-20">
          <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-300 tracking-widest text-sm">Loading Collection...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center w-full min-h-screen py-8 px-4 md:px-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-widest uppercase">
          <span className="text-slate-200">Warrior</span>{" "}
          <span className="text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]">Collection</span>
        </h1>
        <p className="text-slate-400 text-xs mt-2 tracking-[0.2em] uppercase opacity-70">{filtered.length} Warriors detected</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-4xl">
        <div className="relative flex-1 group">
          <input
            id="collection-search"
            type="text"
            placeholder="Search Warriors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/80 border-2 border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:border-red-600/50 focus:outline-none tracking-widest text-xs uppercase duration-300"
          />
          <div className="absolute inset-0 rounded-xl bg-red-600/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {RARITIES.map((rarity) => (
            <button
              key={rarity}
              id={`filter-${rarity.toLowerCase()}`}
              onClick={() => setRarityFilter(rarity)}
              className={`px-5 py-2.5 rounded-lg text-[10px] tracking-[0.2em] font-black uppercase duration-300 cursor-pointer border-2 ${
                rarityFilter === rarity
                  ? "bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                  : "bg-slate-900/50 text-slate-500 border-slate-800 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {rarity === "ALL" ? "ALL" : getRarityLabel(rarity)}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full max-w-7xl">
        {displayed.map((card, index) => (
          <div key={card.id || index} className="w-full">
            <DragonBallCard card={card} />
          </div>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg tracking-wider">No cards match your search.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center gap-3 mt-10">
          <button
            id="pagination-prev"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl text-sm text-slate-300 hover:text-red-700/70 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer duration-300"
          >
            ← Prev
          </button>
          <span className="text-slate-400 text-sm tracking-wider">Page {page} / {totalPages}</span>
          <button
            id="pagination-next"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl text-sm text-slate-300 hover:text-red-700/70 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer duration-300"
          >
            Next →
          </button>
        </div>
      )}
    </main>
  );
}
