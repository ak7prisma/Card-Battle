const RARITY_WEIGHTS = {
  C: 50, UC: 30, R: 15, SR: 3, SEC: 2, L: 2, SP: 2, P: 15,
};

function getRarityWeight(rarity) {
  if (!rarity) return 50;
  const key = rarity.toUpperCase().trim();
  if (RARITY_WEIGHTS[key] !== undefined) return RARITY_WEIGHTS[key];
  if (key.includes("SEC") || key.includes("SECRET")) return 5;
  if (key.includes("SR") || key.includes("SUPER")) return 15;
  if (key.includes("R")) return 30;
  return 50;
}

export function getWeightedRandomCard(cards) {
  if (!cards || cards.length === 0) return null;
  const weighted = cards.map((card) => ({ card, weight: getRarityWeight(card.rarity) }));
  const total = weighted.reduce((sum, w) => sum + w.weight, 0);
  let roll = Math.random() * total;
  for (const w of weighted) {
    roll -= w.weight;
    if (roll <= 0) return w.card;
  }
  return cards[Math.floor(Math.random() * cards.length)];
}

export function getRarityLabel(rarity) {
  const labels = { C: "Common", UC: "Uncommon", R: "Rare", SR: "Super Rare", SEC: "Secret", L: "Legendary", SP: "Special", P: "Promo" };
  return labels[(rarity || "").toUpperCase()] || rarity || "Common";
}

export function getRarityColor(rarity) {
  const colors = {
    C: "text-gray-400 border-gray-600 bg-gray-600/20",
    UC: "text-green-400 border-green-600 bg-green-600/20",
    R: "text-blue-400 border-blue-500 bg-blue-600/20",
    SR: "text-purple-400 border-purple-500 bg-purple-600/20",
    SEC: "text-yellow-300 border-yellow-500 bg-yellow-600/20",
    L: "text-red-400 border-red-500 bg-red-600/20",
    SP: "text-pink-400 border-pink-500 bg-pink-600/20",
    P: "text-cyan-400 border-cyan-500 bg-cyan-600/20",
  };
  return colors[(rarity || "").toUpperCase()] || colors.C;
}