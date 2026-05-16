import { API_FETCH_LIMIT } from "../constant/card";

const API_URL = import.meta.env.DEV 
  ? "/api/dragon-ball-fusion/cards" 
  : import.meta.env.VITE_TCG_API_DRAGONBALL_URL;
const API_KEY = import.meta.env.VITE_TCG_API_KEY;

function normalizeCard(raw) {
  const power = parseInt(raw.power) || 0;
  const rawCounter = raw.counter || raw.comboPower;
  const counter = rawCounter === "-" || rawCounter === null || rawCounter === undefined ? 0 : parseInt(rawCounter) || 0;

  return {
    id: raw.id || raw.code || `card-${Math.random().toString(36).slice(2, 8)}`,
    code: raw.code || raw.id || "",
    name: raw.name || "Unknown Card",
    type: (raw.type || raw.cardType || "CHARACTER").toUpperCase(),
    rarity: (raw.rarity || "C").toUpperCase(),
    power,
    counter,
    cost: parseInt(raw.cost) || 1,
    image: raw.images?.large || raw.images?.small || "",
  };
}

const CACHE_KEY = `card_battle_collection_${API_FETCH_LIMIT}`;
const CACHE_TIMESTAMP_KEY = `card_battle_timestamp_${API_FETCH_LIMIT}`;
const CACHE_DURATION = 1000 * 60 * 60;

let activeFetchPromise = null;

export async function fetchCards() {
  if (activeFetchPromise) {
    console.log("⏳ Reusing existing fetch promise...");
    return activeFetchPromise;
  }

  activeFetchPromise = (async () => {
    try {
      return await performFetch();
    } finally {
      activeFetchPromise = null;
    }
  })();

  return activeFetchPromise;
}

async function performFetch() {
  const now = Date.now();
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

  // Return cache if it's still fresh
  if (!API_KEY) {
    console.error("❌ VITE_TCG_API_KEY is missing! Check your .env.local file.");
  }

  if (cachedData && cachedTimestamp && now - parseInt(cachedTimestamp) < CACHE_DURATION) {
    console.log("🚀 Serving cards from LocalStorage cache");
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      console.error("Failed to parse cached cards", e);
    }
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      console.warn("⏳ API request timed out after 30s");
      controller.abort("timeout");
    }, 30000);

    let rawCards = [];
    const limitPerPage = Math.min(100, API_FETCH_LIMIT);
    const totalPages = Math.ceil(API_FETCH_LIMIT / 100);

    console.log(`📡 Fetching fresh cards from API (Target: ${API_FETCH_LIMIT} max total cards)...`);

    for (let page = 1; page <= totalPages; page++) {
      const url = `${API_URL}?limit=${limitPerPage}&page=${page}`;
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { "x-api-key": API_KEY },
      });

      if (!response.ok) throw new Error(`API responded with status ${response.status}`);

      const json = await response.json();
      const pageData = json.data || [];
      rawCards = rawCards.concat(pageData);

      // Stop if we got less than requested (meaning no more pages)
      if (pageData.length < limitPerPage) break;
    }

    clearTimeout(timeout);

    const characterCards = rawCards.filter(c => {
      const type = (c.type || c.cardType || "").toUpperCase();
      return type === "CHARACTER" || type === "BATTLE" || type === "LEADER";
    });

    const cards = characterCards.slice(0, API_FETCH_LIMIT).map(normalizeCard);
    const usable = cards.filter((c) => c.name && c.name !== "Unknown Card");

    if (usable.length > 0) {
      console.log(`API fetch successful: ${usable.length} cards`);

      // Update cache
      localStorage.setItem(CACHE_KEY, JSON.stringify(usable));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());

      return usable;
    }

    throw new Error("No usable cards from API");
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error("API fetch aborted:", error.reason || "Timeout or manual abort");
    } else {
      console.error("API fetch failed:", error.message);
    }

    // Fallback to stale cache if API fails
    if (cachedData) {
      console.warn("API failed, falling back to stale cache");
      return JSON.parse(cachedData);
    }

    return [];
  }
}

export function getBattleCards(allCards) {
  return allCards.filter((c) => (c.type === "CHARACTER" || c.type === "BATTLE" || c.type === "LEADER") && c.power > 0);
}