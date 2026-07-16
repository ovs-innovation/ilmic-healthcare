export const getAdminLoginUrl = () => {
  const domain = import.meta.env.VITE_APP_ADMIN_DOMAIN || "http://localhost:4100";
  if (domain.startsWith("http://") || domain.startsWith("https://")) {
    return `${domain.replace(/\/$/, "")}/login`;
  }
  const protocol = domain.includes("localhost") ? "http" : "https";
  return `${protocol}://${domain}/login`;
};

export const setAdminAuthCookie = (value, expiresDays = 0.5) => {
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  return {
    expires: expiresDays,
    sameSite: isLocalhost ? "Lax" : "None",
    secure: !isLocalhost,
    ...(value !== undefined ? {} : {}),
  };
};
