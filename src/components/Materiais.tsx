"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckCircle } from "lucide-react";

const MATERIALS = [
  {
    name: "Alumínio Premium",
    description: "Perfis de alumínio de alta qualidade com tratamento anticorrosivo e acabamento superior.",
    image: "https://images.unsplash.com/photo-1691604889113-eb216361ae71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMG1ldGFsJTIwdGV4dHVyZSUyMGluZHVzdHJpYWx8ZW58MXx8fHwxNzc3ODk1MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Anticorrosivo", "Alta Resistência", "Versátil"],
    accent: "from-gray-100 to-gray-50",
  },
  {
    name: "Vidro Temperado",
    description: "Vidros de segurança com alto desempenho térmico, acústico e resistência a impactos.",
    image: "https://images.unsplash.com/photo-1708179422865-1a70c15e22ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjBhbHVtaW51bSUyMGdsYXNzJTIwd2luZG93cyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Nzc4OTUxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Segurança", "Isolamento", "Claridade"],
    accent: "from-slate-100 to-slate-50",
  },
  {
    name: "Vidro Laminado",
    description: "Máxima segurança com camadas de proteção integradas, bloqueio UV e isolamento acústico.",
    image: "https://images.unsplash.com/photo-1642148476277-ec119aeee0d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxtb2Rlcm4lMjBhbHVtaW51bSUyMGdsYXNzJTIwd2luZG93cyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Nzc4OTUxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Proteção UV", "Acústico", "Anti-estilhaço"],
    accent: "from-zinc-100 to-zinc-50",
  },
];

const BRANDS = [
  "Alcoa", "Guardian Glass", "Saint-Gobain", "Hydro", "AGC Glass", "Pilkington",
];

export default function Materiais() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="materiais" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20" ref={ref}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[1px] bg-gray-400" />
              <span className="text-xs tracking-[0.3em] text-gray-400 uppercase">Materiais</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight"
            >
              Materiais &
              <br />
              <span className="text-gray-400">Marcas Parceiras</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-sm text-gray-500 text-base leading-relaxed"
          >
            Trabalhamos apenas com as melhores marcas e materiais do mercado global para garantir
            durabilidade, beleza e desempenho em cada projeto.
          </motion.p>
        </div>

        {/* Material cards with shimmer */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {MATERIALS.map((mat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
              className="shimmer-card group rounded-3xl border border-gray-100 overflow-hidden hover:border-gray-300 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className={`p-7 bg-gradient-to-b ${mat.accent}`}>
                <h3 className="text-xl font-bold text-black mb-3">{mat.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{mat.description}</p>

                <div className="flex flex-wrap gap-2">
                  {mat.features.map((f, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 group-hover:border-gray-400 transition-colors duration-300"
                    >
                      <CheckCircle size={11} className="text-gray-400" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brands */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-[1px] bg-gray-300" />
              <span className="text-xs tracking-[0.3em] text-gray-400 uppercase">
                Marcas com que trabalhamos
              </span>
              <div className="w-8 h-[1px] bg-gray-300" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {BRANDS.map((brand, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.07 }}
                className="group flex items-center justify-center p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-black hover:border-black transition-all duration-300 cursor-default"
              >
                <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300 text-center">
                  {brand}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
