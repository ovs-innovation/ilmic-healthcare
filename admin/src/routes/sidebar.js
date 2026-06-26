import {
  FiGrid,
  FiCompass,
  FiSettings,
  FiSlack,
  FiFileText,
} from "react-icons/fi";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/leads",
    icon: FiFileText,
    name: "Enquiries",
  },
  {
    icon: FiSlack,
    name: "Catalog",
    routes: [
      {
        path: "/products",
        name: "Products",
      },
      {
        path: "/categories",
        name: "Parent Categories",
      },
      {
        path: "/sub-categories",
        name: "Sub Categories",
      },
      {
        path: "/homepage",
        name: "Homepage",
      },
      {
        path: "/brands",
        name: "Brands",
      },
    ],
  },
  {
    path: "/settings?settingTab=common-settings",
    icon: FiSettings,
    name: "Settings",
  },
];

export default sidebar;
