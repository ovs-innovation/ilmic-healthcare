const roundMoney = (value) => Math.round((Number(value) || 0) * 100) / 100;

const normalizeTier = (tier = {}) => ({
  minQuantity: Math.max(1, parseInt(tier.minQuantity, 10) || 1),
  maxQuantity: Math.max(0, parseInt(tier.maxQuantity, 10) || 0),
  discountPercent: Math.min(100, Math.max(0, Number(tier.discountPercent) || 0)),
  unitPrice: Math.max(0, Number(tier.unitPrice) || 0),
});

const sortTiers = (tiers = []) =>
  [...tiers].map(normalizeTier).sort((a, b) => a.minQuantity - b.minQuantity);

const getEffectiveMinOrder = (product = {}) => {
  const tiers = sortTiers(product.quantityTiers || []);
  const tierMin = tiers.length ? tiers[0].minQuantity : null;
  const moq = Math.max(1, parseInt(product.minOrderQuantity, 10) || 1);
  return tierMin ? Math.max(moq, tierMin) : moq;
};

const getEffectiveMaxOrder = (product = {}) => {
  const max = parseInt(product.maxOrderQuantity, 10) || 0;
  return max > 0 ? max : 0;
};

const getTierForQuantity = (product = {}, quantity = 1) => {
  const qty = Math.max(1, parseInt(quantity, 10) || 1);
  const tiers = sortTiers(product.quantityTiers || []);
  if (!tiers.length) return null;

  let match = null;
  for (const tier of tiers) {
    if (qty < tier.minQuantity) continue;
    if (tier.maxQuantity > 0 && qty > tier.maxQuantity) continue;
    if (!match || tier.minQuantity >= match.minQuantity) {
      match = tier;
    }
  }
  return match;
};

const getUnitPriceForQuantity = (product = {}, quantity = 1) => {
  const base = roundMoney(product?.price ?? 0);
  const tier = getTierForQuantity(product, quantity);
  if (!tier) return base;
  if (tier.unitPrice > 0) return roundMoney(tier.unitPrice);
  if (tier.discountPercent > 0) {
    return roundMoney(base * (1 - tier.discountPercent / 100));
  }
  return base;
};

const clampQuantity = (product = {}, quantity = 1) => {
  const min = getEffectiveMinOrder(product);
  const max = getEffectiveMaxOrder(product);
  let qty = Math.max(min, parseInt(quantity, 10) || min);
  if (max > 0) qty = Math.min(qty, max);
  return qty;
};

const sanitizeQuantityTiers = (tiers = []) => {
  if (!Array.isArray(tiers)) return [];
  return sortTiers(tiers).filter((t) => t.minQuantity > 0);
};

const formatTierRangeLabel = (tier) => {
  if (!tier) return "";
  if (tier.maxQuantity > 0) {
    return `${tier.minQuantity} – ${tier.maxQuantity} pcs`;
  }
  return `${tier.minQuantity}+ pcs`;
};

module.exports = {
  roundMoney,
  sortTiers,
  normalizeTier,
  getEffectiveMinOrder,
  getEffectiveMaxOrder,
  getTierForQuantity,
  getUnitPriceForQuantity,
  clampQuantity,
  sanitizeQuantityTiers,
  formatTierRangeLabel,
};
