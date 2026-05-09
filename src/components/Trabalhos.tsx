"use client";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  { id: "todos",       label: "Todos" },
  { id: "residencial", label: "Residencial" },
  { id: "comercial",   label: "Comercial" },
  { id: "industrial",  label: "Industrial" },
];

const PROJECTS = [
  {
    id: 1, category: "comercial",
    title: "Edifício Corporativo Premium",
    description: "Fachada de vidro com perfis de alumínio de alta performance",
    tag: "Comercial",
    image: "https://images.unsplash.com/photo-1715156153744-d5fd2f1f66eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGZhY2FkZSUyMGJ1aWxkaW5nJTIwY29udGVtcG9yYXJ5fGVufDF8fHx8MTc3Nzg5NTE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2, category: "residencial",
    title: "Residência Moderna",
    description: "Esquadrias minimalistas com vidro temperado",
    tag: "Residencial",
    image: "https://images.unsplash.com/photo-1773085266769-fbee873610bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyf...&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3, category: "comercial",
    title: "Centro Empresarial",
    description: "Sistema de fachada cortina com isolamento térmico",
    tag: "Comercial",
    image: "https://images.unsplash.com/photo-1769146109206-e87b458649a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxnbGFzcyUyMGZhY2FkZSUyMGJ1aWxkaW5nJTIwY29udGVtcG9yYXJ5fGVufDF8fHx8MTc3Nzc4OTUxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4, category: "industrial",
    title: "Complexo Industrial",
    description: "Esquadrias de alta resistência para áreas industriais",
    tag: "Industrial",
    image: "https://images.unsplash.com/photo-1764083310892-7b816d9276f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxnbGFzcyUyMGZhY2FkZSUyMGJ1aWxkaW5nJTIwY29udGVtcG9yYXJ5fGVufDF8fHx8MTc3Nzg5NTE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5, category: "residencial",
    title: "Casa de Alto Padrão",
    description: "Portas e janelas com design exclusivo",
    tag: "Residencial",
    image: "https://images.unsplash.com/photo-1759063915992-a589c439c2f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxnbGFzcyUyMGZhY2FkZSUyMGJ1aWxkaW5nJTIwY29udGVtcG9yYXJ5fGVufDF8fHx8MTc3Nzg5NTE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6, category: "comercial",
    title: "Shopping Center",
    description: "Vitrines e estruturas de alumínio customizadas",
    tag: "Comercial",
    image: "https://images.unsplash.com/photo-1776617130019-361f70f3c703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxnbGFzcyUyMGZhY2FkZSUyMGJ1aWxkaW5nJTIwY29udGVtcG9yYXJ5fGVufDF8fHx8MTc3Nzg5NTE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

/* ── 3D tilt project card ── */
function ProjectCard({ project, index, isInView }: {
  project: typeof PROJECTS[0];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const sRotX = useSpring(rotX, { stiffness: 300, damping: 30 });
  const sRotY = useSpring(rotY, { stiffness: 300, damping: 30 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);

  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.div
      layout
      key={project.id}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer perspective-1000"
      >
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-400" />

        {/* Tag */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-white text-xs tracking-wide border border-white/20">
          {project.tag}
        </div>

        {/* Arrow */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/0 border border-white/0 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
          <ArrowUpRight className="text-white group-hover:text-black transition-colors duration-300" size={16} />
        </div>

        {/* Text */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [selected, setSelected] = useState("todos");

  const filtered = selected === "todos"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selected);

  return (
    <section id="portfolio" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16" ref={ref}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[1px] bg-gray-400" />
              <span className="text-xs tracking-[0.3em] text-gray-400 uppercase">Portfólio</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight"
            >
              Nossos
              <br />
              <span className="text-gray-400">Trabalhos</span>
            </motion.h2>
          </div>

          {/* Filter buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            <LayoutGroup>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelected(cat.id)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selected === cat.id
                      ? "text-white"
                      : "text-gray-500 hover:text-black bg-white border border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {selected === cat.id && (
                    <motion.div
                      layoutId="filter-pill"
                      className="absolute inset-0 bg-black rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </LayoutGroup>
          </motion.div>
        </div>

        {/* Project grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selected}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 px-8 py-4 border border-black text-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300"
          >
            Solicitar Projeto Personalizado
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

