import React from "react";
import { useState, useEffect } from "react";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function scrollToTopSmooth() {
  const start = window.scrollY;
  const duration = 600;
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start * (1 - easeOutCubic(progress)));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={scrollToTopSmooth}
      aria-label="Scroll to top"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: visible ? "auto" : "none",
        zIndex: 9999,
      }}
      className="fixed bottom-8 right-8 w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
    >
      <svg
        className="w-4 h-4 text-white"
        fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}