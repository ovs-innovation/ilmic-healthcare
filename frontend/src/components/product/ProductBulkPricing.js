import React from "react";
import {
  getTierRowsForDisplay,
  getEffectiveMinOrder,
  getEffectiveMaxOrder,
  getBulkDiscountInfo,
} from "@utils/quantityPricing";

const ProductBulkPricing = ({ product, currency = "₹", selectedQty, compact = false }) => {
  const tiers = getTierRowsForDisplay(product, currency);
  const minOrder = getEffectiveMinOrder(product);
  const maxOrder = getEffectiveMaxOrder(product);
  const hasTiers = (product?.quantityTiers || []).length > 0;
  const qty = parseInt(selectedQty, 10) || minOrder;
  const bulkInfo = getBulkDiscountInfo(product);

  if (!hasTiers && minOrder <= 1 && !maxOrder) {
    return null;
  }

  return (
    <div
      className={`rounded-xl border border-gray-200 bg-gray-50/80 overflow-hidden w-full min-w-0 ${
        compact ? "mt-2" : "mt-4"
      }`}
    >
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0b1d3d] text-white">
        <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-widest">
          Quantity-wise pricing
        </h3>
        <p className="text-[9px] sm:text-[10px] text-white/70 mt-1 leading-snug break-words">
          Min: <strong>{minOrder}</strong>
          {maxOrder > 0 ? (
            <>
              {" "}
              · Max: <strong>{maxOrder}</strong> / order
            </>
          ) : null}
          {bulkInfo.detailLabel ? (
            <>
              <br />
              <span className="text-green-200">{bulkInfo.detailLabel}</span>
            </>
          ) : null}
        </p>
      </div>

      {/* Mobile: cards */}
      <div className="sm:hidden divide-y divide-gray-100">
        {tiers.map((row, idx) => {
          const inRange =
            qty >= row.minQuantity &&
            (row.maxQuantity === 0 || qty <= row.maxQuantity);
          return (
            <div
              key={idx}
              className={`px-3 py-2.5 ${inRange ? "bg-green-50" : "bg-white"}`}
            >
              <div className="flex justify-between items-start gap-2">
                <span className="text-xs font-bold text-gray-800">{row.label}</span>
                {inRange && (
                  <span className="text-[8px] font-black uppercase text-green-700 shrink-0">
                    Your qty
                  </span>
                )}
              </div>
              <div className="flex justify-between mt-1 text-[11px]">
                <span className="font-black text-[#0b1d3d]">
                  {currency}
                  {Number(row.unitPrice).toFixed(2)}/pc
                </span>
                <span className="text-gray-500">
                  {row.discountPercent > 0 ? `${row.discountPercent}% off` : "Standard"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm min-w-[260px]">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 uppercase text-[10px]">
              <th className="px-3 sm:px-4 py-2 font-bold">Quantity</th>
              <th className="px-3 sm:px-4 py-2 font-bold">Price / pc</th>
              <th className="px-3 sm:px-4 py-2 font-bold">Discount</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((row, idx) => {
              const inRange =
                qty >= row.minQuantity &&
                (row.maxQuantity === 0 || qty <= row.maxQuantity);
              return (
                <tr
                  key={idx}
                  className={`border-b border-gray-100 last:border-0 ${
                    inRange ? "bg-green-50" : ""
                  }`}
                >
                  <td className="px-3 sm:px-4 py-2.5 font-semibold text-gray-800">
                    {row.label}
                    {inRange ? (
                      <span className="ml-2 text-[9px] font-black uppercase text-green-700">
                        Your qty
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 font-black text-[#0b1d3d]">
                    {currency}
                    {Number(row.unitPrice).toFixed(2)}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-gray-600">
                    {row.discountPercent > 0
                      ? `${row.discountPercent}% off`
                      : row.unitPrice < (product?.price || 0)
                        ? "Special rate"
                        : "Standard"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductBulkPricing;
