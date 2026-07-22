import "swiper/css";
import "swiper/css/autoplay";
import "@styles/custom.css";
import "@styles/medical-tourism.css";
import { CartProvider } from "react-use-cart";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import ReactGA from "react-ga4";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

// Internal imports
import store from "@redux/store";
import { handlePageView } from "@lib/analytics";
import { UserProvider } from "@context/UserContext";
import DefaultSeo from "@components/common/DefaultSeo";
import SessionSync from "@components/common/SessionSync";
import { SidebarProvider } from "@context/SidebarContext";
import { WishlistProvider } from "@context/WishlistContext";
import { IlmicSettingsProvider } from "@context/IlmicSettingsContext";
import SettingServices from "@services/SettingServices";
import SplashLoader from "@components/preloader/SplashLoader";

let persistor = persistStore(store);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const AppCartProvider = ({ children }) => {
  return (
    <CartProvider id="ilmic_healthcare_cart">
      {children}
    </CartProvider>
  );
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [storeSetting, setStoreSetting] = useState(null);
  // Don't hydrate heavy page under the video — main-thread jank = video pause
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (!splashDone) return undefined;

    const fetchStoreSettings = async () => {
      try {
        const settings = await queryClient.fetchQuery({
          queryKey: ["storeSetting"],
          queryFn: async () => await SettingServices.getStoreSetting(),
          staleTime: 4 * 60 * 1000,
        });

        setStoreSetting(settings);

        if (settings?.google_analytic_status) {
          ReactGA.initialize(settings?.google_analytic_key || "");
          handlePageView();

          const handleRouteChange = () => {
            handlePageView(`/${router.pathname}`, "ILMIC Health Care");
          };

          router.events.on("routeChangeComplete", handleRouteChange);
          return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
          };
        }
      } catch (error) {
        console.error("Failed to fetch store settings:", error);
      }
    };

    fetchStoreSettings();
  }, [splashDone, router]);

  return (
    <>
      <SplashLoader onDone={() => setSplashDone(true)} />
      {splashDone ? (
        <QueryClientProvider client={queryClient}>
          <SessionProvider refetchOnWindowFocus={false} refetchInterval={0}>
            <UserProvider>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <SidebarProvider>
                    <WishlistProvider>
                      <IlmicSettingsProvider>
                        <AppCartProvider>
                          <SessionSync />
                          <DefaultSeo />
                          <Component {...pageProps} />
                        </AppCartProvider>
                      </IlmicSettingsProvider>
                    </WishlistProvider>
                  </SidebarProvider>
                </PersistGate>
              </Provider>
            </UserProvider>
          </SessionProvider>
        </QueryClientProvider>
      ) : null}
    </>
  );
}

export default MyApp;
