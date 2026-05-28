"use client";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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

/* ── Magnetic CTA link ── */
function MagneticLink({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 25 });
  const sy = useSpring(y, { stiffness: 300, damping: 25 });
  const onMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  }, [x, y]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}
      className="group flex items-center gap-3 text-sm font-semibold tracking-wide text-black hover:gap-5 transition-all duration-300"
    >
      {children}
    </motion.button>
  );
}

export default function Sobre() {
  const ref       = useRef(null);
  const statsRef  = useRef(null);
  const featsRef  = useRef(null);
  const isInView  = useInView(ref,      { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });
  const featsInView = useInView(featsRef, { once: true, amount: 0.2 });

  const count500 = useCountUp(80,  statsInView);
  const count15  = useCountUp(3,   statsInView);
  const count98  = useCountUp(97,  statsInView);

  const diferenciais = [
    "Projetos sob medida para cada cliente",
    "Instalação com equipe própria certificada",
    "Garantia estendida em todos os projetos",
    "Atendimento pós-venda ágil e eficiente",
  ];

  return (
    <section id="sobre" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── BLOCO PRINCIPAL: 2 colunas ── */}
        <div ref={ref} className="grid lg:grid-cols-2 gap-0 mb-0">

          {/* Coluna esquerda — texto editorial */}
          <div className="flex flex-col justify-center pr-0 lg:pr-20 pb-20 lg:pb-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-[1px] bg-black/30" />
              <span className="text-xs tracking-[0.35em] text-black/40 uppercase">Sobre Nós</span>
            </motion.div>

            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: 80 }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-[0.95] tracking-tight"
              >
                Excelência<br />
                <span className="text-black/25">em alumínio</span><br />
                <span className="text-black/25">e vidro</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-black/55 text-base leading-relaxed mb-10 max-w-md"
            >
              A <strong className="text-black font-semibold">Barêa</strong> é referência em
              esquadrias de alumínio e vidro, oferecendo soluções que combinam design
              contemporâneo, funcionalidade e durabilidade para residências e projetos
              comerciais de alto padrão.
            </motion.p>

            {/* Diferenciais */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="space-y-3 mb-12"
            >
              {diferenciais.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-black/60">
                  <CheckCircle2 size={16} className="text-black mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <MagneticLink onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="h-10 px-6 bg-black text-white rounded-full flex items-center gap-2 text-sm font-semibold group-hover:bg-black/80 transition-colors duration-300">
                  Solicitar Orçamento
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </MagneticLink>
            </motion.div>
          </div>

          {/* Coluna direita — painel escuro com foto + decoração */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl bg-black overflow-hidden min-h-[500px] flex flex-col justify-between p-10"
          >
            {/* Foto de fundo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projetos/WhatsApp Image 2026-05-28 at 19.41.31.jpeg"
              alt="Projeto residencial Barêa"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />

            {/* Grid decorativo de fundo */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Ano de fundação — grande watermark */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[160px] font-black text-white/[0.03] leading-none select-none pointer-events-none">
              15
            </div>

            {/* Spacer para empurrar o card ao bottom */}
            <div className="relative z-10 flex-1" />

            {/* Card de destaque central */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Nossa missão</p>
              <p className="text-white text-base leading-relaxed">
                "Transformar espaços com esquadrias de alumínio e vidro que unem
                <span className="text-white/50"> estética</span>,
                <span className="text-white/50"> segurança</span> e
                <span className="text-white/50"> durabilidade</span>."
              </p>
            </motion.div>

            {/* Linha decorativa diagonal */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
              <line x1="0" y1="100%" x2="100%" y2="0" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="20%" y1="100%" x2="100%" y2="20%" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            </svg>
          </motion.div>
        </div>

        {/* ── STATS — faixa horizontal ── */}
        <motion.div
          ref={statsRef}
          className="mt-0 border-t border-black/10"
        >
          <div className="grid md:grid-cols-3">
            {[
              { value: count500, suffix: "+", label: "Projetos Concluídos",  sub: "Residências e comércios" },
              { value: count15,  suffix: " anos", label: "de Mercado",        sub: "Crescendo com nossos clientes" },
              { value: count98,  suffix: "%", label: "Clientes Satisfeitos",  sub: "Índice de aprovação" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className={`py-14 px-8 group hover:bg-black/[0.025] transition-colors duration-300 ${
                  i < 2 ? "md:border-r border-black/10 border-b md:border-b-0" : ""
                }`}
              >
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-6xl lg:text-7xl font-black text-black tabular-nums tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-2xl font-bold text-black/40">{stat.suffix}</span>
                </div>
                <div className="text-sm font-semibold text-black mb-1">{stat.label}</div>
                <div className="text-xs text-black/40">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── FEATURES — lista editorial horizontal ── */}
        <div ref={featsRef} className="mt-0 border-t border-black/10">
          {[
            { num: "01", title: "Qualidade Premium",   desc: "Perfis de alumínio certificados e vidros temperados, laminados e insulados das melhores marcas do mercado." },
            { num: "02", title: "Projeto Personalizado", desc: "Do briefing à instalação: cada peça é desenhada e fabricada sob medida para o seu espaço." },
            { num: "03", title: "Equipe Certificada",  desc: "Instaladores treinados, ferramentas adequadas e rigoroso controle de qualidade em cada etapa da obra." },
          ].map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={featsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="grid md:grid-cols-[80px_1fr_2fr] items-start gap-6 py-10 border-b border-black/10 group hover:bg-black/[0.018] transition-colors duration-300 px-2"
            >
              <span className="text-xs font-bold text-black/20 tracking-widest pt-1">{feat.num}</span>
              <h3 className="text-base font-bold text-black">{feat.title}</h3>
              <p className="text-sm text-black/50 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
