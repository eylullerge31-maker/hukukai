"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const st = h.scrollTop;
      const sh = h.scrollHeight - h.clientHeight;
      setProgress(sh > 0 ? (st / sh) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gold z-30 origin-left transition-transform duration-150 pointer-events-none"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  );
}
