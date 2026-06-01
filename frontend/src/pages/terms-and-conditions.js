import React from "react";
import useTranslation from "next-translate/useTranslation";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import PolicyPageLayout from "@components/policy/PolicyPageLayout";
import { getTermsPolicySections } from "@utils/policyPages";

const TermAndConditions = () => {
  const { t } = useTranslation("common");
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <PolicyPageLayout
      title={
        showingTranslateValue(storeCustomizationSetting?.term_and_condition?.title) ||
        t("terms-and-conditions-page")
      }
      lastUpdated={t("policy-last-updated")}
      cmsHtml={storeCustomizationSetting?.term_and_condition?.description}
      sections={getTermsPolicySections(t)}
      loading={loading}
      error={error}
    />
  );
};

export default TermAndConditions;
