import React from "react";
import useTranslation from "next-translate/useTranslation";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import PolicyPageLayout from "@components/policy/PolicyPageLayout";
import { getReturnRefundPolicySections } from "@utils/policyPages";

const ReturnAndRefundPolicy = () => {
  const { t } = useTranslation("common");
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <PolicyPageLayout
      title={
        showingTranslateValue(
          storeCustomizationSetting?.return_and_refund_policy?.title
        ) || t("return-refund-policy-page")
      }
      lastUpdated={t("policy-last-updated")}
      cmsHtml={storeCustomizationSetting?.return_and_refund_policy?.description}
      sections={getReturnRefundPolicySections(t)}
      loading={loading}
      error={error}
    />
  );
};

export default ReturnAndRefundPolicy;
