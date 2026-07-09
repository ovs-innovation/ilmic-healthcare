import React, { useEffect, useState } from "react";
import { ILMIC_LOGO } from "@utils/ilmicDefaults";

const SplashLoader = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const removeTimer = setTimeout(() => { setVisible(false); document.body.style.overflow = ""; }, 2700);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); document.body.style.overflow = ""; };
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-ilmic-blue-soft transition-opacity duration-500 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <div className="flex flex-col items-center max-w-md px-4 text-center">
        <img src={ILMIC_LOGO} alt="ILMIC Health Care" className="h-28 w-auto max-w-[14rem] object-contain mb-4 animate-logo-pulse" />
        <h1 className="text-lg font-bold tracking-wide text-ilmic-text mb-1">Loading...</h1>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ilmic-muted">Oncology · Pharma · Surgical</p>
        <div className="w-32 h-[3px] bg-ilmic-border rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-ilmic-blue to-ilmic-blue-dark rounded-full animate-progress-bar" />
        </div>
      </div>
      <style jsx global>{`
        @keyframes logoPulse { 0%, 100% { transform: scale(0.96); } 50% { transform: scale(1.04); } }
        @keyframes progressBar { 0% { width: 0%; } 100% { width: 100%; } }
        .animate-logo-pulse { animation: logoPulse 2s infinite ease-in-out; }
        .animate-progress-bar { animation: progressBar 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
};

export default SplashLoader;
