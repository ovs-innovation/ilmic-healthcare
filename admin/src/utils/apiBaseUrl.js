const PRODUCTION_API_BASE_URL = "https://api.ilmichealthcare.in/api";

/**
 * Resolve axios base URL.
 * Vite inlines VITE_* at build time — runtime docker env_file cannot change it.
 * Production guard rejects stale HTTP / IP:port embeds (mixed-content cause).
 */
export function getApiBaseUrl() {
  const configured = String(import.meta.env.VITE_APP_API_BASE_URL || "").trim();

  if (!import.meta.env.PROD) {
    return configured || "http://localhost:5058/api";
  }

  const isInsecureHttp = configured.startsWith("http://");
  const isRawIpHost = /^https?:\/\/\d{1,3}(?:\.\d{1,3}){3}(?::\d+)?(?:\/|$)/i.test(
    configured
  );
  const isDockerHostPort =
    /:3096(?:\/|$)/.test(configured) || /72\.0\.111\.212/.test(configured);

  if (!configured || isInsecureHttp || isRawIpHost || isDockerHostPort) {
    if (configured && configured !== PRODUCTION_API_BASE_URL) {
      console.warn(
        `[apiBaseUrl] Rejecting unsafe production API URL "${configured}". Using ${PRODUCTION_API_BASE_URL}`
      );
    }
    return PRODUCTION_API_BASE_URL;
  }

  return configured.replace(/\/+$/, "");
}
