"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useCallback } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  onExploreClick: () => void;
}

const TITLE_WORDS_L1 = ["Transformando"];
const TITLE_WORDS_L2 = ["Espaços", "em", "Arte"];

export default function Hero({ onExploreClick }: HeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.12]);

  // Magnetic button
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const springBtnX = useSpring(btnX, { stiffness: 300, damping: 30 });
  const springBtnY = useSpring(btnY, { stiffness: 300, damping: 30 });

  const handleBtnMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = btnRef.current!.getBoundingClientRect();
      btnX.set((e.clientX - rect.left - rect.width / 2) * 0.35);
      btnY.set((e.clientY - rect.top - rect.height / 2) * 0.35);
    },
    [btnX, btnY]
  );

  const handleBtnLeave = useCallback(() => {
    btnX.set(0);
    btnY.set(0);
  }, [btnX, btnY]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Parallax image */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1744063905290-105484a03c18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhbHVtaW51bSUyMGdsYXNzJTIwd2luZG93cyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Nzc4OTUxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Fachada de alumínio e vidro de alto padrão"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </motion.div>

      {/* Decorative corner frames */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute top-8 right-8 w-20 h-20 border-t border-r border-white/25 z-10 hidden md:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.4 }}
        className="absolute bottom-8 left-8 w-20 h-20 border-b border-l border-white/25 z-10 hidden md:block"
      />

      {/* Faint watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-end pr-4 overflow-hidden pointer-events-none">
        <motion.span
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 0.04, x: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-[clamp(5rem,22vw,18rem)] font-black text-white tracking-widest select-none leading-none"
        >
          VITRALLE
        </motion.span>
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 px-8 md:px-16 lg:px-24 max-w-6xl"
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-[1px] bg-white/60" />
          <span className="text-white/60 text-xs tracking-[0.3em] uppercase">
            Esquadrias de Alumínio e Vidro
          </span>
        </motion.div>

        {/* Title — word by word */}
        <h1 className="font-bold tracking-tight text-white mb-6">
          {/* Line 1 */}
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-x-5">
              {TITLE_WORDS_L1.map((word, i) => (
                <motion.span
                  key={`l1-${i}`}
                  initial={{ y: 110, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.12,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="block text-[clamp(2.8rem,7vw,6rem)] leading-tight"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Line 2 — silver gradient words */}
          <div className="overflow-hidden mt-1">
            <div className="flex flex-wrap gap-x-5">
              {TITLE_WORDS_L2.map((word, i) => (
                <motion.span
                  key={`l2-${i}`}
                  initial={{ y: 110, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.65 + i * 0.1,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="block text-[clamp(2.8rem,7vw,6rem)] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-300"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-white/65 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
        >
          Design contemporâneo com tecnologia de ponta.
          Projetos sob medida para residências e empresas.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="flex flex-wrap gap-4"
        >
          {/* Magnetic primary button */}
          <motion.button
            ref={btnRef}
            style={{ x: springBtnX, y: springBtnY }}
            onMouseMove={handleBtnMove}
            onMouseLeave={handleBtnLeave}
            onClick={onExploreClick}
            className="group relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-full text-sm tracking-wide"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver Nossos Trabalhos
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            {/* Shimmer on hover */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          </motion.button>

          {/* Secondary button */}
          <motion.button
            onClick={() =>
              document
                .getElementById("contato")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 border border-white/40 text-white font-semibold rounded-full text-sm tracking-wide hover:border-white/80 hover:bg-white/10 transition-all duration-300"
          >
            Solicitar Orçamento
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — animated vertical line */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-white/40 text-[10px] tracking-[0.3em] uppercase"
        >
          Scroll
        </motion.span>
        <div className="relative w-[1px] h-12 bg-white/20 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-white/80"
          />
        </div>
      </motion.div>
    </section>
  );
}
