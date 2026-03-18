import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import React from "react";

export default function CTAButton({ className = "" }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripple, setRipple] = useState(null);
  const btnRef = useRef(null);

  return (
    <Link to="gallery">
      <button
        ref={btnRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setPressed(false);
        }}
        onMouseUp={() => setPressed(false)}
        className={`relative inline-flex items-center border-none bg-transparent p-0 outline-none transition-transform duration-150 w-full
        ${pressed ? "scale-95" : "scale-100"}`}
      >
        {/* Pill Body */}
        <div
          className={`relative flex items-center gap-3 px-4 py-2.75 rounded-full border-[2.5px] border-[#ff0c00] overflow-hidden transition-colors duration-300
          ${hovered ? "bg-[#ff0c00]" : "bg-transparent"} ${className}`}
        >
          {/* Ripple */}
          {ripple && (
            <span
              key={ripple.key}
              className={`absolute w-10 h-10 rounded-full pointer-events-none animate-ripple
              ${hovered ? "bg-white/40" : "bg-orange-500/25"}`}
              style={{ left: ripple.x, top: ripple.y }}
            />
          )}

          {/* Icon */}
          <span
            className={`relative z-10 flex items-center transition-all duration-300
            ${hovered ? "text-white -rotate-12 scale-125" : "text-[#ff0c00]"}`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Head */}
              <circle
                cx="10"
                cy="8"
                r="3"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              {/* Body */}
              <path
                d="M4 18c0-3 3-5 6-5s6 2 6 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />

              {/* Plus icon */}
              <circle
                cx="18"
                cy="18"
                r="3"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M18 16.8v2.4M16.8 18h2.4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>

          {/* Label */}
          <span
            className={`relative z-10 font-semibold text-[0.95rem] tracking-wide whitespace-nowrap transition-colors duration-300
            ${hovered ? "text-white" : "text-[#FF6B1A]"}`}
          >
            Create your Account
          </span>
        </div>
      </button>
    </Link>
  );
}
