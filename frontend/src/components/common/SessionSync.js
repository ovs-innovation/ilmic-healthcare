import { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "react-use-cart";
import { WishlistContext } from "@context/WishlistContext";
import CustomerServices from "@services/CustomerServices";
import { setToken } from "@services/httpServices";

/**
 * Syncs cart/wishlist with DB when user is logged in with a valid API token.
 */
const SessionSync = () => {
  const { data: session, status } = useSession();
  const { items, setItems, emptyCart } = useCart();
  const { wishlistItems, loadWishlist, clearWishlist } = useContext(WishlistContext);

  const prevStatus = useRef(status);
  const prevUserId = useRef(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isRestored, setIsRestored] = useState(false);

  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  const wishRef = useRef(wishlistItems);
  useEffect(() => {
    wishRef.current = wishlistItems;
  }, [wishlistItems]);

  const apiToken = session?.user?.token;
  const userId = session?.user?.id;
  const canSyncWithApi =
    status === "authenticated" && Boolean(userId) && Boolean(apiToken);

  useEffect(() => {
    if (canSyncWithApi && apiToken) {
      setToken(apiToken);
    }
  }, [canSyncWithApi, apiToken]);

  useEffect(() => {
    if (status === "authenticated" && userId && !apiToken && !isRestored) {
      setIsRestored(true);
    }
  }, [status, userId, apiToken, isRestored]);

  useEffect(() => {
    if (!canSyncWithApi) {
      if (status === "unauthenticated" && prevStatus.current === "authenticated") {
        setIsRestored(false);
        setIsRestoring(false);

        const logoutUserId = prevUserId.current;
        if (logoutUserId && apiToken && itemsRef.current?.length) {
          Promise.all([
            CustomerServices.saveCart(logoutUserId, { cart: itemsRef.current }),
            CustomerServices.saveWishlist(logoutUserId, {
              wishlist: wishRef.current,
            }),
          ]).catch(() => {});
        }

        prevUserId.current = null;
        emptyCart();
        if (typeof clearWishlist === "function") clearWishlist();
      }
      prevStatus.current = status;
      return;
    }

    if (prevStatus.current !== "authenticated" || !isRestored || prevUserId.current !== userId) {
      prevUserId.current = userId;

      const startRestoration = async () => {
        setIsRestoring(true);
        setToken(apiToken);

        try {
          let dbCart = [];
          let dbWishlist = [];

          try {
            const [cartRes, wishRes] = await Promise.all([
              CustomerServices.getCart(userId),
              CustomerServices.getWishlist(userId),
            ]);
            dbCart = cartRes?.cart || [];
            dbWishlist = wishRes?.wishlist || [];
          } catch (err) {
            if (err?.response?.status !== 401) {
              console.error("Error fetching cart/wishlist from API:", err);
            }
            dbCart = session.user.cart || [];
            dbWishlist = session.user.wishlist || [];
          }

          const mergedCart = [...dbCart];
          itemsRef.current.forEach((guestItem) => {
            const exists = dbCart.some(
              (dbItem) => (dbItem.id || dbItem._id) === (guestItem.id || guestItem._id)
            );
            if (!exists) mergedCart.push(guestItem);
          });

          const mergedWish = [...dbWishlist];
          wishRef.current.forEach((guestItem) => {
            const exists = dbWishlist.some(
              (dbItem) => (dbItem._id || dbItem.id) === (guestItem._id || guestItem.id)
            );
            if (!exists) mergedWish.push(guestItem);
          });

          setItems(mergedCart);
          loadWishlist(mergedWish);
        } catch (e) {
          if (e?.response?.status !== 401) {
            console.error("SessionSync restoration error:", e);
          }
        } finally {
          setIsRestoring(false);
          setIsRestored(true);
        }
      };

      startRestoration();
    }

    prevStatus.current = status;
  }, [
    canSyncWithApi,
    userId,
    apiToken,
    status,
    isRestored,
    session?.user?.cart,
    session?.user?.wishlist,
    setItems,
    loadWishlist,
    emptyCart,
    clearWishlist,
  ]);

  useEffect(() => {
    if (!canSyncWithApi || isRestoring || !isRestored) return;

    const syncData = async () => {
      setToken(apiToken);
      try {
        await Promise.all([
          CustomerServices.saveCart(userId, { cart: items }),
          CustomerServices.saveWishlist(userId, { wishlist: wishlistItems }),
        ]);
      } catch (error) {
        if (error?.response?.status !== 401) {
          console.error("Failed to sync cart/wishlist to DB:", error);
        }
      }
    };

    const timeout = setTimeout(syncData, 2000);
    return () => clearTimeout(timeout);
  }, [
    items,
    wishlistItems,
    canSyncWithApi,
    isRestored,
    isRestoring,
    userId,
    apiToken,
  ]);

  return null;
};

export default SessionSync;
