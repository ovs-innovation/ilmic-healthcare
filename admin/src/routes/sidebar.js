import { FiSlack, FiMail, FiSettings, FiGrid, FiLayers, FiHelpCircle, FiImage } from "react-icons/fi";

const sidebar = [
  {
    path: "/dashboard",
    icon: FiGrid,
    name: "Dashboard",
  },
  {
    icon: FiSlack,
    name: "Catalog",
    routes: [
      { path: "/products", name: "Products" },
      { path: "/categories", name: "Parent Categories" },
      { path: "/sub-categories", name: "Sub Categories" },
      { path: "/brands", name: "Brands" },
    ],
  },
  {
    path: "/services",
    icon: FiLayers,
    name: "Services",
  },
  {
    path: "/leads",
    icon: FiMail,
    name: "Enquiries",
  },
  {
    path: "/settings",
    icon: FiSettings,
    name: "Homepage & Footer",
  },
  {
    path: "/about-us-settings",
    icon: FiImage,
    name: "About Us Images",
  },
  {
    path: "/faq",
    icon: FiHelpCircle,
    name: "FAQ",
  },
];

export default sidebar;
