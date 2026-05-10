/**
 * One Piece TCG API Service (apitcg.com)
 * Auth: x-api-key header
 * Paginated: 25 cards/page, fetches up to 1000 cards max
 */

// Since we have a Vite proxy, we hit the local proxy URL to avoid CORS:
const API_URL = "api/dragon-ball-fusion/cards";
const API_KEY = import.meta.env.VITE_TCG_API_KEY;

/**
 * Normalize a single card from the apitcg.com One Piece response format.
 * API shape: { id, code, rarity, type, name, images: {small, large}, cost, power, counter, color, family, ability, trigger, attribute: {name, image}, set: {name} }
 */
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

/**
 * Fetch ALL cards from the API with pagination support.
 * Stops at 1000 cards or when all pages are fetched.
 */
export async function fetchCards() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    // Hit the API exactly 1 time requesting 1000 items
    const url = `${API_URL}?limit=1000`;
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
      console.log(`✅ Single fetch returned ${usable.length} cards from API`);
      return usable;
    }

    throw new Error("No usable cards from API");
  } catch (error) {
    console.error("⚠️ API fetch failed:", error.message);
    return [];
  }
}

//Get only CHARACTER-type cards with power > 0 for battle.

export function getBattleCards(allCards) {
  return allCards.filter((c) => c.type === "CHARACTER" && c.power > 0);
}