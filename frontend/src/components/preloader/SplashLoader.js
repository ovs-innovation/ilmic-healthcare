import React, { useCallback, useEffect, useRef, useState } from "react";

const PRELOADER_VIDEO = "/preloader/preloadervideo.mp4";
/** Slower playback (was 1.4) — duration/cap unchanged */
const PLAYBACK_RATE = 1.0;
/** Hard cap — never block the site longer than this */
const MAX_SHOW_MS = 3500;
const FADE_MS = 400;

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

    const startPlayback = () => {
      try {
        video.playbackRate = PLAYBACK_RATE;
        video.play().catch(() => {});
      } catch {
        /* hard cap still finishes */
      }
    };

    video.addEventListener("ended", finish);
    if (video.readyState >= 1) startPlayback();
    else
      video.addEventListener("loadedmetadata", startPlayback, { once: true });

    return () => {
      video.removeEventListener("ended", finish);
      video.removeEventListener("loadedmetadata", startPlayback);
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
        preload="metadata"
        disablePictureInPicture
        aria-hidden
      />
    </div>
  );
};

export default SplashLoader;
