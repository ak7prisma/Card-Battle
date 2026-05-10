import { useState, useEffect } from "react";
import { fetchCards } from "../utils/api";
import { getRarityColor, getRarityLabel } from "../utils/gachaSystem";

const ITEMS_PER_PAGE = 20;
const TYPES = ["ALL", "CHARACTER", "LEADER", "EVENT", "STAGE"];

export default function CollectionPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCards().then((data) => {
      setCards(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => { setPage(1); }, [typeFilter, search]);

  const filtered = cards.filter((c) => {
    if (typeFilter !== "ALL" && c.type !== typeFilter) return false;
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
        <h1 className="text-3xl md:text-4xl font-bold tracking-widest">
          <span className="text-slate-200">Card</span>{" "}
          <span className="text-red-700">Collection</span>
        </h1>
        <p className="text-slate-400 text-sm mt-2 tracking-wider">{filtered.length} cards found</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-4xl">
        <input
          id="collection-search"
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-800/50 border-2 border-slate-600/50 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:border-red-700/50 focus:outline-none tracking-wider text-sm duration-300"
        />
        <div className="flex gap-2 flex-wrap justify-center">
          {TYPES.map((type) => (
            <button
              key={type}
              id={`filter-${type.toLowerCase()}`}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-xl text-xs tracking-widest font-semibold duration-300 cursor-pointer ${
                typeFilter === type
                  ? "bg-red-700 text-white"
                  : "bg-slate-800/50 text-slate-400 border border-slate-600/30 hover:bg-slate-700/50 hover:text-slate-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl">
        {displayed.map((card, index) => (
          <div
            key={card.id || index}
            className="group relative bg-slate-800/30 border border-slate-700/30 rounded-xl overflow-hidden hover:border-red-700/50 hover:scale-[1.03] duration-300 cursor-pointer"
          >
            <div className="aspect-3/4 bg-linear-to-b from-slate-700/50 to-slate-800/80 flex items-center justify-center overflow-hidden">
              {card.image ? (
                <img src={card.image} alt={card.name} className="w-full h-full object-cover group-hover:scale-105 duration-500" loading="lazy" />
              ) : (
                <div className="flex flex-col items-center justify-center p-3 text-center w-full h-full bg-linear-to-b from-slate-700/80 to-slate-900/90">
                  <span className="text-3xl mb-2">🃏</span>
                  <span className="text-white font-bold text-sm">{card.name}</span>
                  <span className="text-yellow-400 text-xs mt-1">⚡ {card.power}</span>
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="text-slate-200 font-semibold text-xs truncate">{card.name}</p>
              <div className="flex justify-between items-center mt-1.5">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${getRarityColor(card.rarity)}`}>
                  {getRarityLabel(card.rarity)}
                </span>
                <span className="text-slate-500 text-[10px]">⚡{card.power}</span>
              </div>
            </div>
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
            className="px-4 py-2 rounded-xl text-sm bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer duration-300"
          >
            ← Prev
          </button>
          <span className="text-slate-400 text-sm tracking-wider">Page {page} / {totalPages}</span>
          <button
            id="pagination-next"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl text-sm bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer duration-300"
          >
            Next →
          </button>
        </div>
      )}
    </main>
  );
}
