import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@layout/Layout";
import PolicyContentRenderer from "@components/policy/PolicyContentRenderer";
import { POLICY_LINKS } from "@utils/policyPages";

const PolicyPageLayout = ({
  title,
  lastUpdated,
  cmsHtml,
  sections,
  loading,
  error,
}) => {
  const router = useRouter();

  return (
    <Layout title={title} description={title}>
      <div className="bg-white min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {lastUpdated && (
            <p className="text-xs text-gray-500 mb-6">{lastUpdated}</p>
          )}

          <PolicyContentRenderer
            cmsHtml={cmsHtml}
            sections={sections}
            loading={loading}
            error={error}
          />

          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {POLICY_LINKS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={
                    router.pathname === item.href
                      ? "text-[#ED1C24] font-medium"
                      : "text-gray-600 hover:text-[#ED1C24]"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PolicyPageLayout;
