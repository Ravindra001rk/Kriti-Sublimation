"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { twMerge } from "tailwind-merge";

export const FlipWords = ({ words = [""], duration = 850, className }) => {
  // make sure we always have at least one word to avoid undefined errors
  const safeWords = Array.isArray(words) && words.length ? words : [""];
  const [currentWord, setCurrentWord] = useState(safeWords[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // keep track of the tallest word so we can reserve space and avoid
  // the surrounding layout shifting when the exiting word is taken out of
  // the document flow (it becomes `position: absolute` during its exit
  // animation).
  const containerRef = useRef(null);
  const [minHeight, setMinHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const h = containerRef.current.getBoundingClientRect().height;
      if (h > minHeight) setMinHeight(h);
    }
  }, [safeWords, minHeight]);

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = safeWords[safeWords.indexOf(currentWord) + 1] || safeWords[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, safeWords]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    // outer wrapper reserves space and hides overflow so the exit animation
    // can't change the flow height and cause the page to 'jump' or scroll.
    <div
      ref={containerRef}
      className={twMerge("relative inline-block overflow-hidden", className)}
      style={{ minHeight }}
    >
      <AnimatePresence
        onExitComplete={() => {
          setIsAnimating(false);
        }}
      >
        <motion.div
          style={{ willChange: "transform, opacity" }}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          exit={{
            opacity: 0,
            y: -10,
            x: 0,
            filter: "blur(8px)",
            scale: 1,
            position: "absolute",
          }}
          className="z-10 inline-block relative text-left w-full"
          key={currentWord}
        >
          {/* edit suggested by Sajal: https://x.com/DewanganSajal */}
          {currentWord.split(" ").map((word, wordIndex) => (
            <motion.span
              key={word + wordIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: wordIndex * 0.3,
                duration: 0.3,
              }}
              className="inline-block whitespace-nowrap"
            >
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={word + letterIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: wordIndex * 0.3 + letterIndex * 0.05,
                    duration: 0.2,
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
