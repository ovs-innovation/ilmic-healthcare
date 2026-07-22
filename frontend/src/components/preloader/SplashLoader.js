import React, { useEffect, useRef } from "react";

const PRELOADER_VIDEO = "/preloader/preloadervideo.mp4";
const CACHE_NAME = "ilmic-preloader-v1";
const FADE_MS = 400;
const MAX_SHOW_MS = 14000;

let sharedBlobUrl = null;
let fetchPromise = null;
/** Singleton player — React Strict Mode remount isse kill nahi karega */
let player = null;

async function fetchVideoBlobUrl() {
  if (sharedBlobUrl) return sharedBlobUrl;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    const toUrl = async (res) => {
      const blob = await res.blob();
      sharedBlobUrl = URL.createObjectURL(blob);
      return sharedBlobUrl;
    };

    try {
      if (typeof caches !== "undefined") {
        const cache = await caches.open(CACHE_NAME);
        const hit = await cache.match(PRELOADER_VIDEO);
        if (hit) return toUrl(hit);

        const network = await fetch(PRELOADER_VIDEO, {
          credentials: "same-origin",
          cache: "reload",
        });
        if (!network.ok) throw new Error(`preloader ${network.status}`);
        await cache.put(PRELOADER_VIDEO, network.clone());
        return toUrl(network);
      }
    } catch {
      /* fall through */
    }

    const res = await fetch(PRELOADER_VIDEO, {
      credentials: "same-origin",
      cache: "reload",
    });
    if (!res.ok) throw new Error(`preloader ${res.status}`);
    return toUrl(res);
  })();

  try {
    return await fetchPromise;
  } catch (e) {
    fetchPromise = null;
    throw e;
  }
}

function ensurePlayer() {
  if (player) return player;

  const root = document.createElement("div");
  root.className = "splash-cinema splash-cinema--video";
  root.setAttribute("role", "status");
  root.setAttribute("aria-label", "Loading ILMIC Health Care");

  const video = document.createElement("video");
  video.className = "splash-cinema__video";
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("muted", "");
  video.preload = "auto";
  video.controls = false;
  video.setAttribute("aria-hidden", "true");

  root.appendChild(video);
  document.body.appendChild(root);
  document.body.style.overflow = "hidden";

  player = {
    root,
    video,
    finished: false,
    started: false,
    hardCapId: null,
    doneCallbacks: new Set(),
  };

  return player;
}

function finishPlayer() {
  if (!player || player.finished) return;
  player.finished = true;

  if (player.hardCapId) {
    clearTimeout(player.hardCapId);
    player.hardCapId = null;
  }

  try {
    player.video.pause();
  } catch {
    /* ignore */
  }

  player.root.classList.add("splash-cinema--exit");

  const callbacks = Array.from(player.doneCallbacks);
  const root = player.root;

  window.setTimeout(() => {
    document.body.style.overflow = "";
    if (root.parentNode) root.parentNode.removeChild(root);
    player = null;
    callbacks.forEach((cb) => {
      try {
        cb();
      } catch {
        /* ignore */
      }
    });
  }, FADE_MS);
}

async function startPlayer() {
  const p = ensurePlayer();
  if (p.started || p.finished) return;
  p.started = true;

  p.hardCapId = window.setTimeout(finishPlayer, MAX_SHOW_MS);
  p.video.addEventListener("ended", finishPlayer, { once: true });
  p.video.addEventListener("error", finishPlayer, { once: true });

  try {
    const url = await fetchVideoBlobUrl();
    if (!player || player.finished) return;

    p.video.src = url;

    await new Promise((resolve) => {
      if (p.video.readyState >= 3) {
        resolve();
        return;
      }
      const done = () => resolve();
      p.video.addEventListener("canplaythrough", done, { once: true });
      p.video.addEventListener("canplay", done, { once: true });
    });

    if (!player || player.finished) return;
    await p.video.play();
  } catch {
    finishPlayer();
  }
}

/**
 * Imperative splash host — survives React Strict Mode remounts.
 * Mount page UI only after onDone (see _app.js) so hydration can't stall the video.
 */
const SplashLoader = ({ onDone }) => {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const p = ensurePlayer();
    const stableCb = () => {
      if (typeof onDoneRef.current === "function") onDoneRef.current();
    };
    p.doneCallbacks.add(stableCb);
    startPlayer();

    return () => {
      // Strict Mode: player/video mat todo — sirf callback hatao
      if (player) player.doneCallbacks.delete(stableCb);
    };
  }, []);

  return null;
};

export default SplashLoader;
