"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, ExternalLink } from "lucide-react";

const VIDEOS = [
  {
    id: 1,
    title: "Instalação de Fachada de Vidro",
    description: "Processo completo de instalação em edifício corporativo",
    thumbnail: "https://images.unsplash.com/photo-1561936621-a7391179bdee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyf...&ixlib=rb-4.1.0&q=80&w=1080",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    duration: "12:34",
  },
  {
    id: 2,
    title: "Esquadrias Residenciais",
    description: "Transformação completa de uma residência moderna",
    thumbnail: "https://images.unsplash.com/photo-1553597662-cd3af3507ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzf...&ixlib=rb-4.1.0&q=80&w=1080",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    duration: "08:17",
  },
  {
    id: 3,
    title: "Projeto Comercial Premium",
    description: "Detalhes da execução de um grande projeto comercial",
    thumbnail: "https://images.unsplash.com/photo-1659101970447-4c1cdabfec55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0f...&ixlib=rb-4.1.0&q=80&w=1080",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    duration: "15:52",
  },
];

function VideoCard({ video, index, isInView }: {
  video: typeof VIDEOS[0];
  index: number;
  isInView: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.15 }}
      className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:border-gray-300 hover:shadow-2xl transition-all duration-500"
    >
      {/* Thumbnail / Player */}
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        {playing ? (
          <iframe
            width="100%"
            height="100%"
            src={video.videoUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

            {/* Duration badge */}
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-xs font-mono">
              {video.duration}
            </div>

            {/* Play button with pulse */}
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Reproduzir ${video.title}`}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                {/* Pulsing rings */}
                <span className="absolute inset-0 rounded-full bg-white/30 animate-pulse-ring" />
                <span
                  className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring"
                  style={{ animationDelay: "0.5s" }}
                />

                {/* Main circle */}
                <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="text-black ml-1" size={26} fill="currentColor" />
                </div>
              </div>
            </button>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-700 transition-colors">
          {video.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{video.description}</p>
      </div>
    </motion.div>
  );
}

export default function Videos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="videos" className="py-32 bg-gray-50">
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
            <span className="text-xs tracking-[0.3em] text-gray-400 uppercase">Vídeos</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight"
            >
              Veja Nosso
              <br />
              <span className="text-gray-400">Trabalho</span>
            </motion.h2>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:border-black hover:text-black transition-all duration-300 self-start md:self-auto"
            >
              Ver Canal no YouTube
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.a>
          </div>
        </div>

        {/* Video grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
