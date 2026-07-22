import React, { useCallback, useEffect, useRef, useState } from "react";

const PRELOADER_VIDEO = "/preloader/preloadervideo.mp4";
const CACHE_NAME = "ilmic-preloader-v1";
const FADE_MS = 400;
/** Safety only — real exit is video ended (~10s) */
const MAX_SHOW_MS = 14000;

/** Module-level: fetch once, reuse blob URL for the whole session */
let blobUrlPromise = null;

async function getFullyBufferedVideoUrl() {
  if (blobUrlPromise) return blobUrlPromise;

  blobUrlPromise = (async () => {
    // 1) Cache API — next reload pe bhi instant
    try {
      if (typeof caches !== "undefined") {
        const cache = await caches.open(CACHE_NAME);
        let cached = await cache.match(PRELOADER_VIDEO);
        if (!cached) {
          const network = await fetch(PRELOADER_VIDEO, {
            credentials: "same-origin",
            cache: "force-cache",
          });
          if (!network.ok) throw new Error(`preloader fetch ${network.status}`);
          await cache.put(PRELOADER_VIDEO, network.clone());
          cached = network;
        }
        const blob = await cached.blob();
        return URL.createObjectURL(blob);
      }
    } catch {
      /* fall through to plain fetch */
    }

    // 2) Plain fetch — wait for FULL body before play (no mid-stream underrun)
    const res = await fetch(PRELOADER_VIDEO, {
      credentials: "same-origin",
      cache: "force-cache",
    });
    if (!res.ok) throw new Error(`preloader fetch ${res.status}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  })();

  return blobUrlPromise;
}

const SplashLoader = () => {
  const videoRef = useRef(null);
  const finishedRef = useRef(false);
  const objectUrlRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [ready, setReady] = useState(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const video = videoRef.current;
    if (video) {
      try {
        video.pause();
      } catch {
        /* ignore */
      }
    }

    setFadeOut(true);
    window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      // Keep blob for session reuse; only revoke on hard unmount of app
    }, FADE_MS);
  }, []);

  // Lock scroll + hard safety cap
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const hardCap = window.setTimeout(finish, MAX_SHOW_MS);
    return () => {
      clearTimeout(hardCap);
      document.body.style.overflow = "";
    };
  }, [finish]);

  // Fully download video → blob URL → then play (zero network stutter)
  useEffect(() => {
    let cancelled = false;
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("muted", "");

    const onEnded = () => finish();
    const onError = () => finish();
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    (async () => {
      try {
        const url = await getFullyBufferedVideoUrl();
        if (cancelled || finishedRef.current) return;

        objectUrlRef.current = url;
        video.src = url;
        video.load();

        // Wait until element can decode from local blob
        await new Promise((resolve) => {
          if (video.readyState >= 3) {
            resolve();
            return;
          }
          const done = () => {
            video.removeEventListener("canplay", done);
            video.removeEventListener("loadeddata", done);
            resolve();
          };
          video.addEventListener("canplay", done, { once: true });
          video.addEventListener("loadeddata", done, { once: true });
        });

        if (cancelled || finishedRef.current) return;

        setReady(true);
        try {
          await video.play();
        } catch {
          // Autoplay blocked — don't hang the site
          finish();
        }
      } catch {
        finish();
      }
    })();

    return () => {
      cancelled = true;
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
    };
  }, [finish]);

  if (!visible) return null;

  return (
    <div
      className={`splash-cinema splash-cinema--video ${fadeOut ? "splash-cinema--exit" : ""}`}
      role="status"
      aria-label="Loading ILMIC Health Care"
      aria-busy={!ready}
    >
      <video
        ref={videoRef}
        className="splash-cinema__video"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        aria-hidden
      />
    </div>
  );
};

export default SplashLoader;
