import React from "react";
import useTranslation from "next-translate/useTranslation";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import PolicyPageLayout from "@components/policy/PolicyPageLayout";
import { getShippingPolicySections } from "@utils/policyPages";

const ShippingPolicy = () => {
  const { t } = useTranslation("common");
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <PolicyPageLayout
      title={
        showingTranslateValue(storeCustomizationSetting?.shipping_policy?.title) ||
        t("shipping-policy-page")
      }
      lastUpdated={t("policy-last-updated")}
      cmsHtml={storeCustomizationSetting?.shipping_policy?.description}
      sections={getShippingPolicySections(t)}
      loading={loading}
      error={error}
    />
  );
};

export default ShippingPolicy;
