const RARITY_WEIGHTS = {
  C: 50, UC: 30, R: 15, SR: 3, SEC: 2, L: 2, SP: 2, P: 15,
};

function getNormalizedRarity(rarity) {
  if (!rarity) return "C";
  const key = rarity.toUpperCase().trim();
  if (RARITY_WEIGHTS[key] !== undefined) return key;
  if (key.includes("SEC") || key.includes("SECRET")) return "SEC";
  if (key.includes("SR") || key.includes("SUPER")) return "SR";
  if (key.includes("R")) return "R";
  return "C";
}

export function getWeightedRandomCard(cards) {
  if (!cards || cards.length === 0) return null;

  //group cards by rarity
  const groups = {};
  cards.forEach((card) => {
    const key = getNormalizedRarity(card.rarity);
    if (!groups[key]) groups[key] = [];
    groups[key].push(card);
  });

  const availableKeys = Object.keys(groups);
  const totalWeight = availableKeys.reduce((sum, key) => sum + RARITY_WEIGHTS[key], 0);

  let roll = Math.random() * totalWeight;
  let selectedKey = availableKeys[0];

  for (const key of availableKeys) {
    roll -= RARITY_WEIGHTS[key];
    if (roll <= 0) {
      selectedKey = key;
      break;
    }
  }

  const pool = groups[selectedKey];
  return pool[Math.floor(Math.random() * pool.length)];
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