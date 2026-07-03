import { FiSlack, FiHelpCircle } from "react-icons/fi";

const sidebar = [
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
        path: "/brands",
        name: "Brands",
      },
    ],
  },
  {
    path: "/faq",
    icon: FiHelpCircle,
    name: "FAQ",
  },
];

export default sidebar;
