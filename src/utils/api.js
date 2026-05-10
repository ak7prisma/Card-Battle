import { API_FETCH_LIMIT } from "../constant/card";

const API_URL = "api/dragon-ball-fusion/cards";
const API_KEY = import.meta.env.VITE_TCG_API_KEY;

function normalizeCard(raw) {
  const power = parseInt(raw.power) || 0;
  const rawCounter = raw.counter;
  const counter = rawCounter === "-" || rawCounter === null || rawCounter === undefined ? 0 : parseInt(rawCounter) || 0;

  return {
    id: raw.id || raw.code || `card-${Math.random().toString(36).slice(2, 8)}`,
    code: raw.code || raw.id || "",
    name: raw.name || "Unknown Card",
    type: (raw.type || "CHARACTER").toUpperCase(),
    rarity: (raw.rarity || "C").toUpperCase(),
    power,
    counter,
    cost: parseInt(raw.cost) || 1,
    ability: raw.ability || "",
    trigger: raw.trigger || "",
    color: raw.color || "",
    family: raw.family || "",
    image: raw.images?.large || raw.images?.small || "",
    imageSmall: raw.images?.small || "",
    attribute: raw.attribute?.name || "",
    attributeImage: raw.attribute?.image || "",
    set: raw.set?.name || "",
  };
}

const CACHE_KEY = "card_battle_collection";
const CACHE_TIMESTAMP_KEY = "card_battle_timestamp";
const CACHE_DURATION = 1000 * 60 * 60;

export async function fetchCards() {
  const now = Date.now();
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

  // Return cache if it's still fresh
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
    const timeout = setTimeout(() => controller.abort(), 10000);

    const url = `${API_URL}?limit=${API_FETCH_LIMIT}`;
    console.log("📡 Fetching fresh cards from API...");
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "x-api-key": API_KEY },
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`API responded with status ${response.status}`);

    const json = await response.json();
    const cards = (json.data || []).map(normalizeCard);
    const usable = cards.filter((c) => c.name && c.name !== "Unknown Card");

    if (usable.length > 0) {
      console.log(`✅ API fetch successful: ${usable.length} cards`);
      
      // Update cache
      localStorage.setItem(CACHE_KEY, JSON.stringify(usable));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());
      
      return usable;
    }

    throw new Error("No usable cards from API");
  } catch (error) {
    console.error("⚠️ API fetch failed:", error.message);
    
    // Fallback to stale cache if API fails
    if (cachedData) {
      console.warn("🔄 API failed, falling back to stale cache");
      return JSON.parse(cachedData);
    }
    
    return [];
  }
}

export function getBattleCards(allCards) {
  return allCards.filter((c) => c.type === "CHARACTER" && c.power > 0);
}