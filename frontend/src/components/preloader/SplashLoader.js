import React, { useCallback, useEffect, useRef, useState } from "react";

const PRELOADER_VIDEO = "/preloader/preloadervideo.mp4";
/** Slightly slower than original 1.4 — still snappy, not sluggish */
const PLAYBACK_RATE = 1.25;
/** Hard cap — never block the site longer than this */
const MAX_SHOW_MS = 3500;
const FADE_MS = 350;

const SplashLoader = () => {
  const videoRef = useRef(null);
  const finishedRef = useRef(false);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFadeOut(true);
    window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, FADE_MS);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const hardCap = window.setTimeout(finish, MAX_SHOW_MS);
    return () => {
      clearTimeout(hardCap);
      document.body.style.overflow = "";
    };
  }, [finish]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const startPlayback = () => {
      try {
        video.playbackRate = PLAYBACK_RATE;
        const playPromise = video.play();
        if (playPromise?.catch) playPromise.catch(() => {});
      } catch {
        /* hard cap still finishes */
      }
    };

    video.addEventListener("ended", finish);
    if (video.readyState >= 2) startPlayback();
    else {
      video.addEventListener("canplay", startPlayback, { once: true });
      video.addEventListener("loadeddata", startPlayback, { once: true });
    }

    return () => {
      video.removeEventListener("ended", finish);
      video.removeEventListener("canplay", startPlayback);
      video.removeEventListener("loadeddata", startPlayback);
    };
  }, [finish]);

  if (!visible) return null;

  return (
    <div
      className={`splash-cinema splash-cinema--video ${fadeOut ? "splash-cinema--exit" : ""}`}
      role="status"
      aria-label="Loading ILMIC Health Care"
    >
      <video
        ref={videoRef}
        className="splash-cinema__video"
        src={PRELOADER_VIDEO}
        muted
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        aria-hidden
      />
    </div>
  );
};

export default SplashLoader;
