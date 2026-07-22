import React, { useCallback, useEffect, useRef, useState } from "react";

const PRELOADER_VIDEO = "/preloader/preloadervideo.mp4";
/** 1x — changing playbackRate makes many devices stutter */
const PLAYBACK_RATE = 1;
/** Video is ~10s; exit on ended. Cap is safety only. */
const MAX_SHOW_MS = 12000;
const FADE_MS = 400;

const SplashLoader = () => {
  const videoRef = useRef(null);
  const finishedRef = useRef(false);
  const startedRef = useRef(false);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

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

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const startPlayback = () => {
      if (startedRef.current || finishedRef.current) return;
      startedRef.current = true;
      try {
        video.playbackRate = PLAYBACK_RATE;
        video.play().catch(() => finish());
      } catch {
        finish();
      }
    };

    video.addEventListener("ended", finish);
    video.addEventListener("error", finish);

    // Prefer canplaythrough so playback doesn't stall mid-way
    if (video.readyState >= 4) {
      startPlayback();
    } else {
      video.addEventListener("canplaythrough", startPlayback, { once: true });
    }

    // Mobile fallback — some browsers never fire canplaythrough
    const fallback = window.setTimeout(() => {
      if (!startedRef.current && video.readyState >= 2) startPlayback();
    }, 1200);

    return () => {
      clearTimeout(fallback);
      video.removeEventListener("ended", finish);
      video.removeEventListener("error", finish);
      video.removeEventListener("canplaythrough", startPlayback);
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
        preload="auto"
        disablePictureInPicture
        controls={false}
        aria-hidden
      />
    </div>
  );
};

export default SplashLoader;
