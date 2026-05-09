"use client";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Award, Clock, Users, Target } from "lucide-react";

/* ── Count-up hook ── */
function useCountUp(target: number, isInView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);
  return count;
}

/* ── 3D Tilt Card ── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Sobre() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });

  const count500 = useCountUp(500, statsInView);
  const count15  = useCountUp(15, statsInView);
  const count98  = useCountUp(98, statsInView);

  const features = [
    { icon: Award,  title: "Qualidade Premium",    description: "Materiais de primeira linha e acabamento impecável em cada projeto." },
    { icon: Clock,  title: "Pontualidade",          description: "Prazos cumpridos e entregas sempre no tempo combinado." },
    { icon: Users,  title: "Equipe Especializada",  description: "Profissionais certificados com anos de experiência no setor." },
    { icon: Target, title: "Personalização",        description: "Projetos sob medida, criados para cada necessidade e estilo." },
  ];

  return (
    <section id="sobre" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          ref={ref}
          className="max-w-3xl mb-24"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-gray-400" />
            <span className="text-xs tracking-[0.3em] text-gray-400 uppercase">Sobre Nós</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight"
          >
            Excelência em alumínio
            <br />
            <span className="text-gray-400">e vidro há 15 anos</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-500 text-lg leading-relaxed"
          >
            A Vitralle é referência em esquadrias de alumínio e vidro, oferecendo soluções
            inovadoras que combinam design contemporâneo, funcionalidade e durabilidade para
            residências e projetos comerciais de alto padrão.
          </motion.p>
        </motion.div>

        {/* Feature cards — 3D tilt */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
            >
              <TiltCard className="h-full">
                <div className="h-full p-8 bg-white border border-gray-100 rounded-2xl hover:border-gray-300 hover:shadow-xl transition-all duration-300 group">
                  <div className="mb-5 w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300">
                    <feature.icon className="text-gray-600 group-hover:text-white transition-colors duration-300" size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-3">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Stats — count-up */}
        <motion.div
          ref={statsRef}
          className="grid md:grid-cols-3 gap-0 border border-gray-100 rounded-3xl overflow-hidden"
        >
          {[
            { value: count500, suffix: "+", label: "Projetos Concluídos",   desc: "Residências e empreendimentos" },
            { value: count15,  suffix: "+", label: "Anos de Experiência",   desc: "Referência no mercado paulista" },
            { value: count98,  suffix: "%", label: "Clientes Satisfeitos",  desc: "Índice de aprovação dos clientes" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`p-12 ${i < 2 ? "border-r border-gray-100 md:border-b-0 border-b" : ""} hover:bg-gray-50 transition-colors duration-300`}
            >
              <div className="text-6xl font-black text-black mb-2 tracking-tight tabular-nums">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-base font-semibold text-black mb-1">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
