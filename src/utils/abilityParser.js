export function parseAbilityPowerBonus(abilityText) {
  if (!abilityText || typeof abilityText !== "string") return 0;

  const regex = /\+(\d+)\s*power/gi;
  let totalBonus = 0;
  let match;

  while ((match = regex.exec(abilityText)) !== null) {
    totalBonus += parseInt(match[1], 10);
  }

  return totalBonus;
}

export function parseAbilityCostReduction(abilityText) {
  if (!abilityText || typeof abilityText !== "string") return 0;

  const regex = /[-−](\d+)\s*cost/gi;
  let totalReduction = 0;
  let match;

  while ((match = regex.exec(abilityText)) !== null) {
    totalReduction += parseInt(match[1], 10);
  }

  return totalReduction;
}