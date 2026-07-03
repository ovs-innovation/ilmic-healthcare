import React from "react";
import Link from "next/link";
import parse from "html-react-parser";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { flattenPolicySections } from "@utils/policyPages";

const PolicyContentRenderer = ({ cmsHtml, sections, loading, error }) => {
  const { showingTranslateValue } = useUtilsFunction();
  const htmlContent = showingTranslateValue(cmsHtml);
  const blocks = flattenPolicySections(sections);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="h-4 bg-gray-100 rounded w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-600">
        {error?.response?.data?.message || error?.message || "Unable to load policy."}
      </p>
    );
  }

  if (blocks.length > 0) {
    return (
      <div className="text-sm text-gray-700 leading-[1.75]">
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2 key={index} className="text-base font-bold text-gray-900 mt-6 mb-3 first:mt-0">
                {block.text}
              </h2>
            );
          }

          if (block.type === "list") {
            return (
              <ul key={index} className="mb-4 list-disc pl-5 space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );
          }

          if (block.type === "link") {
            return (
              <p key={index} className="mb-4 last:mb-0">
                {block.prefix}
                <Link href={block.href} className="text-[#1A2E5B] font-semibold hover:underline">
                  {block.label}
                </Link>
              </p>
            );
          }

          return (
            <p key={index} className="mb-4 last:mb-0">
              {block.text}
            </p>
          );
        })}
      </div>
    );
  }

  if (htmlContent && String(htmlContent).trim()) {
    return (
      <div className="policy-document text-sm text-gray-700 leading-[1.75] [&_h1]:text-sm [&_h1]:font-normal [&_h1]:mb-4 [&_h2]:text-sm [&_h2]:font-normal [&_h2]:mb-4 [&_h3]:text-sm [&_h3]:font-normal [&_h3]:mb-4 [&_p]:mb-4 [&_p]:last:mb-0 [&_li]:mb-4 [&_ul]:mb-4 [&_ol]:mb-4 [&_a]:text-[#ED1C24] [&_a]:hover:underline">
        {parse(htmlContent)}
      </div>
    );
  }

  return (
    <p className="text-sm text-gray-500">Policy content is not available right now.</p>
  );
};

export default PolicyContentRenderer;
