"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LETTERS = "BARÊA".split("");

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const hasLoaded = sessionStorage.getItem("barea-loaded");
      if (hasLoaded) {
        setIsVisible(false);
        return;
      }
    }

    const timer = setTimeout(() => {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("barea-loaded", "1");
      }
      setIsVisible(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Letters */}
          <div className="flex items-end gap-[0.05em] overflow-hidden">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.07,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="text-[clamp(3rem,10vw,7rem)] font-bold text-black tracking-[0.2em] leading-none select-none"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-4 text-sm tracking-[0.35em] text-gray-400 uppercase select-none"
          >
            Esquadrias de Alumínio e Vidro
          </motion.p>

          {/* Progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, delay: 0.3, ease: "easeInOut" }}
            className="absolute bottom-10 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
