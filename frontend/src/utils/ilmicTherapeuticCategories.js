export const ilmicTherapeuticCategories = [
  {
    name: "Anti-Cancer Medicines",
    category: "Anti-Cancer Medicines",
    slug: "anti-cancer-medicines",
    bgColor: "#FFF0F0",
    textColor: "#DC2626",
    icon: "anti-cancer",
  },
  {
    name: "Oncology Drugs",
    category: "Oncology Drugs",
    slug: "oncology-drugs",
    bgColor: "#F3EEFF",
    textColor: "#7C3AED",
    icon: "oncology",
  },
  {
    name: "Critical Care Medicines",
    category: "Critical Care Medicines",
    slug: "critical-care-medicines",
    bgColor: "#FFF0F5",
    textColor: "#BE185D",
    icon: "critical-care",
  },
  {
    name: "Lifesaving Drugs",
    category: "Lifesaving Drugs",
    slug: "lifesaving-drugs",
    bgColor: "#FFFBEA",
    textColor: "#D97706",
    icon: "lifesaving",
  },
  {
    name: "Imported medicine",
    category: "Imported medicine",
    slug: "imported-medicine",
    bgColor: "#EDFFF5",
    textColor: "#059669",
    icon: "imported",
  },
  {
    name: "HIV",
    category: "HIV",
    slug: "hiv",
    bgColor: "#FDF2F8",
    textColor: "#9D174D",
    icon: "hiv",
  },
  {
    name: "Nephrology Medicine",
    category: "Nephrology Medicine",
    slug: "nephrology-medicine",
    bgColor: "#EFF7FF",
    textColor: "#1D4ED8",
    icon: "nephrology",
  },
];

export const popularCategoryItems = ilmicTherapeuticCategories.map(
  ({ name, category, bgColor, textColor, icon }) => ({
    name,
    category,
    bgColor,
    textColor,
    icon,
  }),
);

export default ilmicTherapeuticCategories;
