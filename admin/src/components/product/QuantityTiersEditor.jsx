import React from "react";
import { Button, Input } from "@windmill/react-ui";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const emptyTier = () => ({
  minQuantity: 1,
  maxQuantity: 0,
  discountPercent: 0,
  unitPrice: 0,
});

const QuantityTiersEditor = ({ tiers = [], onChange, basePrice = 0 }) => {
  const updateTier = (index, field, value) => {
    const next = tiers.map((t, i) =>
      i === index ? { ...t, [field]: value } : t
    );
    onChange(next);
  };

  const addTier = () => {
    const last = tiers[tiers.length - 1];
    const nextMin = last
      ? (parseInt(last.maxQuantity, 10) || parseInt(last.minQuantity, 10)) + 1
      : 1;
    onChange([
      ...tiers,
      {
        ...emptyTier(),
        minQuantity: nextMin,
        maxQuantity: 0,
      },
    ]);
  };

  const removeTier = (index) => {
    onChange(tiers.filter((_, i) => i !== index));
  };

  const applyStarterTiers = () => {
    onChange([
      { minQuantity: 1, maxQuantity: 9, discountPercent: 0, unitPrice: 0 },
      { minQuantity: 10, maxQuantity: 49, discountPercent: 5, unitPrice: 0 },
      { minQuantity: 50, maxQuantity: 0, discountPercent: 12, unitPrice: 0 },
    ]);
  };

  const previewPrice = (tier) => {
    const base = Number(basePrice) || 0;
    if (Number(tier.unitPrice) > 0) return Number(tier.unitPrice).toFixed(2);
    const pct = Number(tier.discountPercent) || 0;
    if (pct > 0) return (base * (1 - pct / 100)).toFixed(2);
    return base.toFixed(2);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 leading-relaxed">
        Kitni quantity par kitna discount — yahi yahan set hota hai. Har row ek slab hai
        (jaise 10–49 pcs par 5%, 50+ par 10%). <strong>Max Qty</strong> 0 rakho = us slab
        ke upar koi limit nahi. <strong>Discount %</strong> base sale price se cut karta
        hai; ya direct <strong>Unit Price (₹)</strong> daal do (GST inclusive). Dono bhare
        hon to unit price priority lega.
      </p>
      <p className="text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2 leading-relaxed">
        Example: Min 1, Max 9, Discount 0 → retail rate · Min 10, Max 49, Discount 5 →
        5% off · Min 50, Max 0, Discount 12 → 50+ pcs par 12% off (customer site + enquiry
        par auto dikhega).
      </p>

      {tiers.length === 0 ? (
        <p className="text-sm text-gray-400 italic py-2">
          No bulk tiers — customers pay the standard product price for any quantity.
        </p>
      ) : (
        <>
        {/* Mobile: card editor */}
        <div className="md:hidden space-y-3">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-3 bg-white space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-700">
                  Slab {index + 1} · ₹{previewPrice(tier)}/pc
                </span>
                <button
                  type="button"
                  onClick={() => removeTier(index)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Min Qty</label>
                  <Input
                    type="number"
                    min="1"
                    value={tier.minQuantity}
                    onChange={(e) =>
                      updateTier(index, "minQuantity", e.target.value)
                    }
                    className="h-9 text-sm mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Max Qty</label>
                  <Input
                    type="number"
                    min="0"
                    value={tier.maxQuantity}
                    onChange={(e) =>
                      updateTier(index, "maxQuantity", e.target.value)
                    }
                    className="h-9 text-sm mt-0.5"
                    placeholder="0 = ∞"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Discount %</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={tier.discountPercent}
                    onChange={(e) =>
                      updateTier(index, "discountPercent", e.target.value)
                    }
                    className="h-9 text-sm mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Unit ₹</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={tier.unitPrice}
                    onChange={(e) =>
                      updateTier(index, "unitPrice", e.target.value)
                    }
                    className="h-9 text-sm mt-0.5"
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="px-3 py-2 text-left">Min Qty</th>
                <th className="px-3 py-2 text-left">Max Qty</th>
                <th className="px-3 py-2 text-left">Discount %</th>
                <th className="px-3 py-2 text-left">Unit Price (₹)</th>
                <th className="px-3 py-2 text-left">Preview / pc</th>
                <th className="px-3 py-2 w-10" />
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="px-2 py-2">
                    <Input
                      type="number"
                      min="1"
                      value={tier.minQuantity}
                      onChange={(e) =>
                        updateTier(index, "minQuantity", e.target.value)
                      }
                      className="h-9 text-sm"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <Input
                      type="number"
                      min="0"
                      value={tier.maxQuantity}
                      onChange={(e) =>
                        updateTier(index, "maxQuantity", e.target.value)
                      }
                      className="h-9 text-sm"
                      placeholder="0 = no max"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={tier.discountPercent}
                      onChange={(e) =>
                        updateTier(index, "discountPercent", e.target.value)
                      }
                      className="h-9 text-sm"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={tier.unitPrice}
                      onChange={(e) =>
                        updateTier(index, "unitPrice", e.target.value)
                      }
                      className="h-9 text-sm"
                      placeholder="Optional"
                    />
                  </td>
                  <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">
                    ₹{previewPrice(tier)}
                  </td>
                  <td className="px-2 py-2">
                    <button
                      type="button"
                      onClick={() => removeTier(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}

      <div className="flex flex-wrap gap-2">
        <Button type="button" size="small" onClick={addTier} className="flex items-center gap-1">
          <FiPlus className="w-4 h-4" /> Add slab
        </Button>
        <Button
          type="button"
          size="small"
          layout="outline"
          onClick={applyStarterTiers}
          className="text-xs"
        >
          Use sample slabs (1–9 / 10–49 / 50+)
        </Button>
      </div>
    </div>
  );
};

export default QuantityTiersEditor;
