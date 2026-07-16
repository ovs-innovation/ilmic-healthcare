import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Button, WindmillContext } from "@windmill/react-ui";
import { IoLogOutOutline } from "react-icons/io5";

import sidebar from "@/routes/sidebar";
import logoDark from "@/assets/img/logo/logo.png";
import logoLight from "@/assets/img/logo/logo.png";
import { AdminContext } from "@/context/AdminContext";
import SidebarSubMenu from "@/components/sidebar/SidebarSubMenu";
import useGetCData from "@/hooks/useGetCData";
import { getAdminLoginUrl } from "@/utils/adminUrl";

const getRouteKey = (path) => path?.split("?")[0].split("/")[1];

const SidebarContent = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  const { dispatch } = useContext(AdminContext);
  const { accessList, role } = useGetCData();

  const handleLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("adminInfo");
    window.location.replace(getAdminLoginUrl());
  };

  const isPrivilegedAdmin = role === "Admin" || role === "Super Admin";
  const hasAccessControl =
    !isPrivilegedAdmin && Array.isArray(accessList) && accessList.length > 0;

  const updatedSidebar = hasAccessControl
    ? sidebar
        .map((route) => {
          if (route.routes) {
            const validSubRoutes = route.routes.filter((subRoute) => {
              const routeKey = getRouteKey(subRoute.path);
              return routeKey && (accessList.includes(routeKey) || subRoute.outside);
            });
            return validSubRoutes.length > 0 ? { ...route, routes: validSubRoutes } : null;
          }

          const routeKey = getRouteKey(route.path);
          return routeKey && accessList.includes(routeKey) ? route : null;
        })
        .filter(Boolean)
    : sidebar;

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className="text-gray-900 dark:text-gray-200" href="/dashboard">
        {mode === "dark" ? (
          <img src={logoLight} alt="ILMIC Health Care" width="135" className="pl-6" />
        ) : (
          <img src={logoDark} alt="ILMIC Health Care" width="135" className="pl-6" />
        )}
      </a>
      <ul className="mt-8">
        {updatedSidebar?.map((route) =>
          route.routes ? (
            <SidebarSubMenu route={route} key={route.name} />
          ) : (
            <li className="relative" key={route.name}>
              <NavLink
                exact
                to={route.path}
                target={`${route?.outside ? "_blank" : "_self"}`}
                className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-600 dark:hover:text-gray-200"
                activeStyle={{ color: "#0F4C81" }}
                rel="noreferrer"
              >
                <route.icon className="w-5 h-5" aria-hidden="true" />
                <span className="ml-4">{t(`${route.name}`)}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block">
        <Button onClick={handleLogOut} size="large" className="w-full">
          <span className="flex items-center">
            <IoLogOutOutline className="mr-3 text-lg" />
            <span className="text-sm">{t("LogOut")}</span>
          </span>
        </Button>
      </span>
    </div>
  );
};

export default SidebarContent;
