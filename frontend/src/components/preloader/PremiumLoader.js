import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ILMIC_LOGO } from "@utils/ilmicDefaults";

const PremiumLoader = ({ onComplete, onRevealStart }) => {
  // Stages: "video" -> "video-fade" -> "loader" -> "loader-fade"
  const [stage, setStage] = useState("video");
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  // Safeguard: Ensure the video stage does not get stuck under any circumstances
  useEffect(() => {
    if (stage !== "video") return;

    const timer = setTimeout(() => {
      setStage("video-fade");
    }, 7000); // 7s maximum safeguard timeout

    return () => clearTimeout(timer);
  }, [stage]);

  // Handle video transition to fade-out
  const handleVideoEnded = () => {
    setStage("video-fade");
  };

  // Once video fade-out animation completes, move to logo loader
  useEffect(() => {
    if (stage === "video-fade") {
      const timer = setTimeout(() => {
        setStage("loader");
      }, 800); // Match fade animation duration (0.8s)
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Progress bar animation loop
  useEffect(() => {
    if (stage !== "loader") return;

    const duration = 2200; // 2.2 seconds loading progress duration
    const start = performance.now();
    let frameId;

    const updateProgress = (now) => {
      const elapsed = now - start;
      const current = Math.min(1, elapsed / duration);
      const ease = current * (2 - current); // Ease out quad for smooth slowdown

      setProgress(Math.round(ease * 100));

      if (current < 1) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        // Progress complete, hold for a moment then fade out loader
        setTimeout(() => {
          setStage("loader-fade");
          if (onRevealStart) onRevealStart();
        }, 400);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, [stage]);

  // Once loader fade animation finishes, trigger final completion
  useEffect(() => {
    if (stage === "loader-fade") {
      const timer = setTimeout(() => {
        onComplete();
      }, 600); // Match loader fade duration (0.6s)
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden select-none bg-white">
      <AnimatePresence mode="wait">
        {/* Stage 1: Full-Screen Video & Overlay */}
        {(stage === "video" || stage === "video-fade") && (
          <motion.div
            key="video-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: stage === "video-fade" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-[#051124] flex items-center justify-center"
          >
            <div className="w-full h-full relative overflow-hidden">
              <video
                ref={videoRef}
                src="/Hand1.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover"
              />
              {/* Dark premium blue overlay with vertical gradient edge fade */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#051124] via-transparent to-[#051124]"
                style={{ backgroundColor: "rgba(7, 36, 78, 0.35)" }}
              />
            </div>
          </motion.div>
        )}

        {/* Stage 2: Logo and Progress Loader */}
        {(stage === "loader" || stage === "loader-fade") && (
          <motion.div
            key="logo-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === "loader-fade" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white"
          >
            <div className="flex flex-col items-center max-w-md px-4 text-center">
              {/* Animated Logo with glowing shadow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8"
                style={{
                  filter: "drop-shadow(0 0 25px rgba(11, 94, 215, 0.4))",
                }}
              >
                <img
                  src={ILMIC_LOGO}
                  alt="ILMIC Health Care"
                  className="h-28 w-auto max-w-[14rem] object-contain"
                />
              </motion.div>

              {/* Fading words text */}
              <div className="flex gap-2 text-lg sm:text-xl font-bold tracking-wide select-none min-h-[28px] justify-center">
                <span className="text-[#123B72] transition-opacity duration-300">
                  Connecting
                </span>
                <span
                  className={`text-[#123B72] transition-all duration-500 transform ${progress >= 35
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                    }`}
                >
                  Healthcare
                </span>
                <span
                  className={`text-[#123B72] transition-all duration-500 transform ${progress >= 70
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                    }`}
                >
                  Worldwide
                </span>
              </div>

              {/* Gradient Loading Bar */}
              <div className="w-[240px] h-[6px] bg-slate-100 rounded-full overflow-hidden mt-6 relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0B5ED7] to-[#4AA3FF] transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Percentage Loading Progress */}
              <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mt-4">
                Loading... <span className="text-[#123B72]">{progress}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumLoader;
