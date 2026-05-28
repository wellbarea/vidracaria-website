"use client";

import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";

// Sub-component: draws a single SVG path driven by scroll progress
function DrawPath({
  d,
  progress,
  start,
  end,
  strokeWidth = 0.75,
  opacity = 0.09,
}: {
  d: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  strokeWidth?: number;
  opacity?: number;
}) {
  const pathLength = useTransform(progress, [start, Math.min(end, 1)], [0, 1]);
  return (
    <motion.path
      d={d}
      stroke="black"
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pathLength, opacity }}
    />
  );
}

import { useEffect, useState } from "react";

export default function GlassBackground() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 30 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {isMobile ? (
        <svg
          className="w-full h-full"
          viewBox="0 0 430 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* Versão mobile simplificada */}
          <DrawPath d="M 30,44 L 30,856 L 400,856 L 400,44 Z"
            progress={smooth} start={0} end={0.13} opacity={0.18} />
          <DrawPath d="M 60,64 L 60,836 L 370,836 L 370,64 Z"
            progress={smooth} start={0.08} end={0.21} opacity={0.13} />
          <DrawPath d="M 30,450 L 400,450"
            progress={smooth} start={0.16} end={0.25} opacity={0.16} />
          <DrawPath d="M 215,44 L 215,856"
            progress={smooth} start={0.20} end={0.29} opacity={0.16} />
        </svg>
      ) : (
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* ── LEFT PANEL: Window frame outer border ── */}
          <DrawPath d="M 48,44 L 48,856 L 492,856 L 492,44 Z"
            progress={smooth} start={0} end={0.13} opacity={0.18} />
          <DrawPath d="M 68,64 L 68,836 L 472,836 L 472,64 Z"
            progress={smooth} start={0.08} end={0.21} opacity={0.13} />
          <DrawPath d="M 48,450 L 492,450"
            progress={smooth} start={0.16} end={0.25} opacity={0.16} />
          <DrawPath d="M 270,44 L 270,856"
            progress={smooth} start={0.20} end={0.29} opacity={0.16} />
          <DrawPath d="M 48,44 L 104,44 M 48,44 L 48,100"
            progress={smooth} start={0.28} end={0.37} strokeWidth={1.2} opacity={0.20} />
          <DrawPath d="M 492,44 L 436,44 M 492,44 L 492,100"
            progress={smooth} start={0.31} end={0.40} strokeWidth={1.2} opacity={0.19} />
          <DrawPath d="M 48,856 L 104,856 M 48,856 L 48,800"
            progress={smooth} start={0.34} end={0.43} strokeWidth={1.2} opacity={0.19} />
          <DrawPath d="M 492,856 L 436,856 M 492,856 L 492,800"
            progress={smooth} start={0.37} end={0.46} strokeWidth={1.2} opacity={0.20} />
          <DrawPath d="M 940,80 L 1420,80 L 1420,124 L 980,124 L 980,380 L 940,380 Z"
            progress={smooth} start={0.40} end={0.55} opacity={0.15} />
          <DrawPath d="M 960,80 L 960,104 L 1400,104 L 1400,80"
            progress={smooth} start={0.48} end={0.57} strokeWidth={0.6} opacity={0.12} />
          <DrawPath d="M 940,460 L 1420,460 L 1420,780 L 940,780 Z"
            progress={smooth} start={0.52} end={0.66} opacity={0.14} />
          <DrawPath d="M 962,482 L 1398,482 L 1398,758 L 962,758 Z"
            progress={smooth} start={0.58} end={0.70} strokeWidth={0.7} opacity={0.10} />
          <DrawPath d="M 492,44 L 940,80 M 492,450 L 940,460"
            progress={smooth} start={0.62} end={0.73} strokeWidth={0.65} opacity={0.10} />
          <DrawPath d="M 48,884 L 492,884"
            progress={smooth} start={0.66} end={0.75} strokeWidth={0.9} opacity={0.16} />
          <DrawPath d="M 48,874 L 48,894 M 492,874 L 492,894"
            progress={smooth} start={0.70} end={0.78} strokeWidth={0.9} opacity={0.16} />
          <DrawPath d="M 522,44 L 522,856"
            progress={smooth} start={0.73} end={0.82} strokeWidth={0.8} opacity={0.14} />
          <DrawPath d="M 512,44 L 532,44 M 512,856 L 532,856"
            progress={smooth} start={0.77} end={0.84} strokeWidth={0.8} opacity={0.14} />
          <DrawPath d="M 714,434 L 714,466 M 698,450 L 730,450"
            progress={smooth} start={0.82} end={0.90} strokeWidth={1} opacity={0.17} />
          <DrawPath d="M 0,450 L 1440,450"
            progress={smooth} start={0.90} end={1.0} strokeWidth={0.5} opacity={0.08} />
        </svg>
      )}
    </div>
  );
}
