const ilmicTherapeuticCategories = [
  {
    name: "Anti-Cancer Medicines",
    slug: "anti-cancer-medicines",
    image: "/products/cancer_treatment_pack.png",
    status: "show",
    bgColor: "#FFF0F0",
    textColor: "#DC2626",
    icon: "anti-cancer",
  },
  {
    name: "Oncology Drugs",
    slug: "oncology-drugs",
    image: "/products/oncology_box.png",
    status: "show",
    bgColor: "#F3EEFF",
    textColor: "#7C3AED",
    icon: "oncology",
  },
  {
    name: "Critical Care Medicines",
    slug: "critical-care-medicines",
    image: "/products/critical_care_injection.png",
    status: "show",
    bgColor: "#FFF0F5",
    textColor: "#BE185D",
    icon: "critical-care",
  },
  {
    name: "Lifesaving Drugs",
    slug: "lifesaving-drugs",
    image: "/products/lifesaving_emergency_box.png",
    status: "show",
    bgColor: "#FFFBEA",
    textColor: "#D97706",
    icon: "lifesaving",
  },
  {
    name: "Imported medicine",
    slug: "imported-medicine",
    image: "/products/imported_specialty_pack.png",
    status: "show",
    bgColor: "#EDFFF5",
    textColor: "#059669",
    icon: "imported",
  },
  {
    name: "HIV",
    slug: "hiv",
    image: "/products/hiv.png",
    status: "show",
    bgColor: "#FFF0F5",
    textColor: "#BE185D",
    icon: "hiv",
  },
  {
    name: "Nephrology Medicine",
    slug: "nephrology-medicine",
    image: "/products/nephrology.png",
    status: "show",
    bgColor: "#EFF7FF",
    textColor: "#1D4ED8",
    icon: "nephrology",
  },
];

const categoryRenameMap = {
  "Oncology Medicines": "Oncology Drugs",
  "Anti Cancer Drugs": "Anti-Cancer Medicines",
  "Critical Care": "Critical Care Medicines",
  "Lifesaving Medicines": "Lifesaving Drugs",
  Lifesaving: "Lifesaving Drugs",
  "Imported Medicines": "Imported medicine",
  "HIV Medicines": "HIV",
  "Nephrology Medicines": "Nephrology Medicine",
};

const popularCategoryItems = ilmicTherapeuticCategories.map(
  ({ name, bgColor, textColor, icon }) => ({
    name,
    category: name,
    bgColor,
    textColor,
    icon,
  }),
);

module.exports = {
  ilmicTherapeuticCategories,
  popularCategoryItems,
  categoryRenameMap,
};
