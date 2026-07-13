import Cookies from "js-cookie";
import { useContext } from "react";

import { notifyError } from "@/utils/toast";
import { AdminContext } from "@/context/AdminContext";
import { getAdminLoginUrl } from "@/utils/adminUrl";

const useError = () => {
  const { dispatch } = useContext(AdminContext);

  const handleErrorNotification = async (err, from, time = 1000) => {
    if (
      err?.response?.data?.message === "jwt expired" ||
      err?.response?.data?.message === "jwt malformed" ||
      err?.response?.data?.message === "invalid signature" ||
      err?.response?.data?.message === "Unauthorized Access!"
    ) {
      dispatch({ type: "USER_LOGOUT" });
      Cookies.remove("adminInfo");
      window.location.replace(getAdminLoginUrl());
      return;
    }

    notifyError(err?.response?.data?.message || err?.message, time);
  };

  return {
    handleErrorNotification,
  };
};

export default useError;
