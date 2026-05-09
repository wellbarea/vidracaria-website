"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useSpring(dotX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(dotY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    // Only enable on non-touch / desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovered(!!el.closest("a, button, [data-cursor-hover]"));
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — springs to cursor position */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovered ? 48 : clicked ? 20 : 36,
          height: hovered ? 48 : clicked ? 20 : 36,
          marginLeft: hovered ? -24 : clicked ? -10 : -18,
          marginTop: hovered ? -24 : clicked ? -10 : -18,
          backgroundColor: hovered ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0)",
          borderColor: hovered ? "#0A0A0A" : "#9CA3AF",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9999]"
      />

      {/* Inner dot — exact cursor position */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: clicked ? 0.6 : hovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-black pointer-events-none z-[9999]"
      />
    </>
  );
}
