import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import SettingServices from "@services/SettingServices";
import ilmicDefaults from "@utils/ilmicDefaults";

const IlmicSettingsContext = createContext({
  settings: ilmicDefaults,
  loading: true,
});

const mergeSettings = (remote, defaults) => {
  if (!remote || typeof remote !== "object") return defaults;

  return {
    ...defaults,
    ...remote,
    seo: { ...defaults.seo, ...remote.seo },
    hero: {
      ...defaults.hero,
      ...remote.hero,
      ctaPrimary: { ...defaults.hero?.ctaPrimary, ...remote.hero?.ctaPrimary },
      ctaSecondary: { ...defaults.hero?.ctaSecondary, ...remote.hero?.ctaSecondary },
      slides:
        Array.isArray(remote.hero?.slides) && remote.hero.slides.length > 0
          ? remote.hero.slides
          : defaults.hero?.slides,
      features:
        Array.isArray(remote.hero?.features) && remote.hero.features.length > 0
          ? remote.hero.features
          : defaults.hero?.features,
    },
    footer: { ...defaults.footer, ...remote.footer },
    bottomCta: { ...defaults.bottomCta, ...remote.bottomCta },
    popularCategories: {
      ...defaults.popularCategories,
      ...remote.popularCategories,
      items:
        Array.isArray(remote.popularCategories?.items) &&
        remote.popularCategories.items.length > 0
          ? remote.popularCategories.items
          : defaults.popularCategories?.items,
    },
  };
};

export const IlmicSettingsProvider = ({ children, initialSettings }) => {
  const [settings, setSettings] = useState(
    mergeSettings(initialSettings, ilmicDefaults)
  );
  const [loading, setLoading] = useState(!initialSettings);

  useEffect(() => {
    if (initialSettings) {
      setSettings(mergeSettings(initialSettings, ilmicDefaults));
      setLoading(false);
      return;
    }

    let active = true;
    (async () => {
      try {
        const remote = await SettingServices.getIlmicHomepageSetting();
        if (active) setSettings(mergeSettings(remote, ilmicDefaults));
      } catch {
        if (active) setSettings(ilmicDefaults);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [initialSettings]);

  const value = useMemo(() => ({ settings, loading }), [settings, loading]);

  return (
    <IlmicSettingsContext.Provider value={value}>
      {children}
    </IlmicSettingsContext.Provider>
  );
};

export const useIlmicSettings = () => useContext(IlmicSettingsContext);

export default IlmicSettingsContext;
