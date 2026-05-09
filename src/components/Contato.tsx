"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2, Clock } from "lucide-react";

/* ── Floating-label input ── */
function FloatInput({
  id, name, label, type = "text", value, onChange, required,
}: {
  id: string; name: string; label: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const floating = focused || value !== "";

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full pt-6 pb-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:bg-white focus:outline-none transition-all duration-200 text-black text-sm peer"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none transition-all duration-200 ${
          floating
            ? "top-2 text-[10px] font-medium text-gray-400 tracking-wide"
            : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

/* ── Floating-label textarea ── */
function FloatTextarea({
  id, name, label, value, onChange, required, rows = 5,
}: {
  id: string; name: string; label: string; rows?: number;
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const floating = focused || value !== "";

  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={rows}
        className="w-full pt-7 pb-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:bg-white focus:outline-none transition-all duration-200 text-black text-sm resize-none"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none transition-all duration-200 ${
          floating
            ? "top-2.5 text-[10px] font-medium text-gray-400 tracking-wide"
            : "top-4 text-sm text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

type Status = "idle" | "sending" | "success" | "error";

const CONTACT_INFO = [
  { icon: Phone,  title: "Telefone",  info: "(11) 99999-9999",          link: "tel:+5511999999999" },
  { icon: Mail,   title: "E-mail",    info: "contato@vitralle.com.br",  link: "mailto:contato@vitralle.com.br" },
  { icon: MapPin, title: "Endereço",  info: "São Paulo, SP — Brasil",   link: "#" },
];

export default function Contato() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { success?: boolean; error?: string };

      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Erro ao enviar. Tente novamente.");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Erro de conexão. Verifique sua internet e tente novamente.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contato" className="py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-gray-400" />
            <span className="text-xs tracking-[0.3em] text-gray-400 uppercase">Contato</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight"
          >
            Fale
            <br />
            <span className="text-gray-400">Conosco</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl">

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-500 mb-10 leading-relaxed text-lg max-w-sm">
              Pronto para transformar seu projeto em realidade? Entre em contato e receba um
              orçamento personalizado.
            </p>

            {/* Contact cards */}
            <div className="space-y-4 mb-10">
              {CONTACT_INFO.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300 shrink-0">
                    <item.icon className="text-gray-500 group-hover:text-white transition-colors duration-300" size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">{item.title}</div>
                    <div className="text-sm font-semibold text-black">{item.info}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Opening hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 rounded-2xl border border-gray-100 bg-gray-50"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-gray-400" />
                <h3 className="text-sm font-semibold text-black">Horário de Atendimento</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Segunda a Sexta</span>
                  <span className="font-medium text-black">8h – 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado</span>
                  <span className="font-medium text-black">8h – 13h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo</span>
                  <span className="text-red-400">Fechado</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <FloatInput
                id="name" name="name" label="Nome Completo"
                value={form.name} onChange={handleChange} required
              />
              <FloatInput
                id="email" name="email" label="E-mail" type="email"
                value={form.email} onChange={handleChange} required
              />
              <FloatInput
                id="phone" name="phone" label="Telefone" type="tel"
                value={form.phone} onChange={handleChange} required
              />
              <FloatTextarea
                id="message" name="message" label="Descreva seu projeto..." rows={5}
                value={form.message} onChange={handleChange} required
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="relative w-full py-4 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 disabled:opacity-70"
                style={{
                  backgroundColor: status === "success" ? "#16a34a" : "#0a0a0a",
                  color: "#ffffff",
                }}
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Send size={16} />
                      Enviar Mensagem
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Loader2 size={16} className="animate-spin" />
                      Enviando...
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={16} />
                      Mensagem Enviada!
                    </motion.span>
                  )}
                  {status === "error" && (
                    <motion.span
                      key="error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-center gap-2"
                    >
                      Tentar Novamente
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Error message */}
              <AnimatePresence>
                {status === "error" && errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-sm text-red-500 text-center"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="text-xs text-center text-gray-400">
                Ao enviar você concorda que entraremos em contato pelo e-mail ou telefone informado.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
