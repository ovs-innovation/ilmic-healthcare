import {
  FiActivity,
  FiTarget,
  FiHeart,
  FiShield,
  FiZap,
  FiGlobe,
  FiDroplet,
} from "react-icons/fi";

const CATEGORY_ICONS = {
  oncology: FiActivity,
  "anti-cancer": FiTarget,
  "critical-care": FiHeart,
  immunotherapy: FiShield,
  "targeted-therapy": FiTarget,
  lifesaving: FiZap,
  imported: FiGlobe,
  hiv: FiShield,
  nephrology: FiDroplet,
};

const CATEGORY_ICON_BY_NAME = {
  "Anti-Cancer Medicines": FiTarget,
  "Oncology Drugs": FiActivity,
  "Critical Care Medicines": FiHeart,
  "Lifesaving Drugs": FiZap,
  "Imported medicine": FiGlobe,
  HIV: FiShield,
  "Nephrology Medicine": FiDroplet,
};

const normalizeKey = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const getCategoryTherapyIcon = (category) => {
  if (!category) return FiActivity;

  if (category.icon && CATEGORY_ICONS[category.icon]) {
    return CATEGORY_ICONS[category.icon];
  }

  if (CATEGORY_ICON_BY_NAME[category.name]) {
    return CATEGORY_ICON_BY_NAME[category.name];
  }

  if (CATEGORY_ICON_BY_NAME[category.category]) {
    return CATEGORY_ICON_BY_NAME[category.category];
  }

  const key = normalizeKey(category.category || category.name);
  if (key.includes("anti-cancer") || key.includes("anti-cancer-medicines")) {
    return FiTarget;
  }
  if (key.includes("oncology")) return FiActivity;
  if (key.includes("critical")) return FiHeart;
  if (key.includes("lifesav")) return FiZap;
  if (key.includes("imported")) return FiGlobe;
  if (key === "hiv" || key.includes("hiv")) return FiShield;
  if (key.includes("nephrology")) return FiDroplet;
  if (key.includes("immuno")) return FiShield;
  if (key.includes("target")) return FiTarget;

  return FiActivity;
};

export const renderCategoryTherapyIcon = (
  category,
  className = "ilmic-cat-circle__icon",
) => {
  const Icon = getCategoryTherapyIcon(category);
  return <Icon className={className} aria-hidden />;
};
