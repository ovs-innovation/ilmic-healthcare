import React, { useCallback, useEffect, useRef, useState } from "react";

const PRELOADER_VIDEO = "/preloader/preloadervideo.mp4";
const PLAYBACK_RATE = 2.5;
const FADE_MS = 650;

const SplashLoader = () => {
  const videoRef = useRef(null);
  const fallbackRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const finish = useCallback(() => {
    if (fallbackRef.current) {
      clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
    setFadeOut(true);
    window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, FADE_MS);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const scheduleFallback = () => {
      const durationMs =
        Number.isFinite(video.duration) && video.duration > 0
          ? (video.duration / PLAYBACK_RATE) * 1000 + 600
          : 5000;
      fallbackRef.current = window.setTimeout(finish, durationMs);
    };

    const startPlayback = () => {
      video.playbackRate = PLAYBACK_RATE;
      scheduleFallback();
      video.play().catch(finish);
    };

    video.addEventListener("ended", finish);
    if (video.readyState >= 1) startPlayback();
    else video.addEventListener("loadedmetadata", startPlayback, { once: true });

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
        preload="auto"
        disablePictureInPicture
        aria-hidden
      />
    </div>
  );
};

export default SplashLoader;
