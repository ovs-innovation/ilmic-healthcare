import React from "react";
import useTranslation from "next-translate/useTranslation";
import PolicyPageLayout from "@components/policy/PolicyPageLayout";
import { getLegalDisclaimerSections } from "@utils/policyPages";

const LegalDisclaimer = () => {
  const { t } = useTranslation("common");

  return (
    <PolicyPageLayout
      title={t("legal-disclaimer-page")}
      lastUpdated={t("policy-last-updated")}
      sections={getLegalDisclaimerSections(t)}
    />
  );
};

export default LegalDisclaimer;
