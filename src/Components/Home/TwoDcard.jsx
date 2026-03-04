import React from "react";
import { useRef, useState, useEffect } from "react";

const TwoDcard = () => {
  const [rotateY, setRotateY] = useState(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocityX = useRef(0);
  const animFrameRef = useRef(null);
  const rotateYRef = useRef(0);

  const onStart = (x) => {
    dragging.current = true;
    lastX.current = x;
    velocityX.current = 0;
    cancelAnimationFrame(animFrameRef.current);
  };

  const onMove = (x) => {
    if (!dragging.current) return;
    const deltaX = x - lastX.current;
    velocityX.current = deltaX;
    lastX.current = x;
    rotateYRef.current += deltaX * 0.5;
    setRotateY(rotateYRef.current);
  };

  const onEnd = () => {
    dragging.current = false;
    const inertia = () => {
      if (Math.abs(velocityX.current) < 0.2) return;
      velocityX.current *= 0.93;
      rotateYRef.current += velocityX.current * 0.5;
      setRotateY(rotateYRef.current);
      animFrameRef.current = requestAnimationFrame(inertia);
    };
    inertia();
  };

  useEffect(() => {
    const handleMouseMove = (e) => onMove(e.clientX);
    const handleTouchMove = (e) => onMove(e.touches[0].clientX);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", onEnd);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const normalizedDeg = ((rotateY % 360) + 360) % 360;
  const isBack = normalizedDeg > 90 && normalizedDeg < 270;

  return (
    <div
      className="h-screen flex items-center justify-center select-none bg-gray-900 px-4"
      style={{ cursor: dragging.current ? "grabbing" : "grab" }}
      onMouseDown={(e) => onStart(e.clientX)}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
    >
      <div className="flex flex-col items-center gap-5 w-full max-w-[350px] sm:max-w-[400px]">
        <div className="w-full aspect-[2/3] perspective-1000">
          <div
            className={`w-full h-full relative transform-style-3d rounded-xl transition-shadow duration-200`}
            style={{
              transform: `rotateY(${rotateY}deg)`,
              boxShadow: isBack
                ? "0 20px 50px rgba(79,172,254,0.35)"
                : "0 20px 50px rgba(238,90,36,0.35)",
            }}
          >
            {/* Front */}
            <div className="absolute inset-0 rounded-xl backface-hidden bg-gradient-to-br from-[#ff6b6b] to-[#ee5a24] flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl font-serif text-center px-2">
                This is Front
              </span>
            </div>

            {/* Back */}
            <div className="absolute inset-0 rounded-xl backface-hidden bg-gradient-to-br from-[#4facfe] to-[#0062cc] flex items-center justify-center rotate-y-180">
              <span className="text-white font-bold text-lg sm:text-xl font-serif text-center px-2">
                This is Back
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-xs sm:text-sm font-mono tracking-widest text-center">
          DRAG LEFT / RIGHT TO ROTATE
        </p>
      </div>
    </div>
  );
};

export default TwoDcard;