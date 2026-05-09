"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import Hero from "./Hero";
import Sobre from "./Sobre";
import Trabalhos from "./Trabalhos";
import Materiais from "./Materiais";
import Videos from "./Videos";
import Contato from "./Contato";
import PageLoader from "./PageLoader";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import GlassBackground from "./GlassBackground";

const navItems = [
  { id: "home", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "portfolio", label: "Trabalhos" },
  { id: "materiais", label: "Materiais" },
  { id: "videos", label: "Vídeos" },
  { id: "contato", label: "Contato" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsPastHero(window.scrollY > heroHeight * 0.8);

      const sections = ["home", "sobre", "portfolio", "materiais", "videos", "contato"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <GlassBackground />

      <div className="size-full text-black overflow-x-hidden">
        {/* ── Header ── */}
        <motion.header
          animate={{
            backgroundColor: isPastHero
              ? "rgba(255,255,255,0.92)"
              : "rgba(0,0,0,0)",
            borderBottomColor: isPastHero
              ? "rgba(0,0,0,0.08)"
              : "rgba(255,255,255,0)",
          }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        >
          <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            {/* Logo */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => scrollToSection("home")}
              className="transition-opacity duration-300 hover:opacity-80"
            >
              <div className="flex items-center gap-3">
                <span className={`font-black text-3xl leading-none transition-colors duration-300 ${
                  isPastHero ? "text-black" : "text-white"
                }`}>B</span>
                <div className={`w-[1px] h-8 transition-colors duration-300 ${
                  isPastHero ? "bg-black/30" : "bg-white/30"
                }`} />
                <div className="flex flex-col items-start leading-tight">
                  <span className={`font-black text-xl tracking-[0.2em] uppercase transition-colors duration-300 ${
                    isPastHero ? "text-black" : "text-white"
                  }`}>BARÊA</span>
                  <span className={`text-[6.5px] tracking-[0.28em] uppercase transition-colors duration-300 ${
                    isPastHero ? "text-black/40" : "text-white/50"
                  }`}>ESQUADRIAS DE ALUMÍNIO E VIDROS</span>
                </div>
              </div>
            </motion.button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.07 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isPastHero
                      ? activeSection === item.id
                        ? "text-black"
                        : "text-black/50 hover:text-black"
                      : activeSection === item.id
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                  {/* Underline from left */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 ${
                      activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    } ${isPastHero ? "bg-black" : "bg-white"}`}
                  />
                </motion.button>
              ))}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-4">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => scrollToSection("contato")}
                className={`hidden md:block px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isPastHero
                    ? "bg-black text-white hover:bg-black/80"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                Orçamento
              </motion.button>

              <button
                className={`md:hidden transition-colors ${
                  isPastHero ? "text-black" : "text-white"
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white border-t border-black/08 overflow-hidden"
              >
                <div className="px-6 py-4 space-y-1">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-4 py-3 text-black/70 hover:text-black hover:bg-gray-50 rounded-xl transition-colors text-sm font-medium"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <div className="pt-2 pb-1">
                    <button
                      onClick={() => scrollToSection("contato")}
                      className="w-full py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-black/80 transition-colors"
                    >
                      Solicitar Orçamento
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ── Sections ── */}
        <main>
          <Hero onExploreClick={() => scrollToSection("portfolio")} />
          <Sobre />
          <Trabalhos />
          <Materiais />
          <Videos />
          <Contato />
        </main>

        {/* ── Footer ── */}
        <footer className="bg-black text-white">
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-black text-3xl leading-none text-white">B</span>
                  <div className="w-[1px] h-8 bg-white/30" />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="font-black text-xl tracking-[0.2em] uppercase text-white">BARÊA</span>
                    <span className="text-[6.5px] tracking-[0.28em] uppercase text-white/40">ESQUADRIAS DE ALUMÍNIO E VIDROS</span>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Esquadrias de alumínio e vidro com excelência, sofisticação e
                  tecnologia de ponta.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300"
                  >
                    <FaInstagram size={15} />
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300"
                  >
                    <FaFacebook size={15} />
                  </a>
                  <a
                    href="https://wa.me/5511999999999"
                    aria-label="WhatsApp"
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300"
                  >
                    <FaWhatsapp size={15} />
                  </a>
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-5">
                  Navegação
                </h4>
                <ul className="space-y-3">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-5">
                  Serviços
                </h4>
                <ul className="space-y-3 text-sm text-white/50">
                  {[
                    "Esquadrias Residenciais",
                    "Fachadas Comerciais",
                    "Vidros Temperados",
                    "Corrimãos e Guardas",
                    "Projetos Industriais",
                  ].map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-5">
                  Contato
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="tel:+5511999999999"
                      className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
                    >
                      <Phone size={14} />
                      (11) 99999-9999
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:contato@vitralle.com.br"
                      className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
                    >
                      <Mail size={14} />
                      contato@vitralle.com.br
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/50">
                    <MapPin size={14} className="shrink-0" />
                    São Paulo, SP — Brasil
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/30 text-xs">
                © 2026 Vitralle. Todos os direitos reservados.
              </p>
              <p className="text-white/20 text-xs">
                Esquadrias de alumínio e vidro de alto padrão
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

