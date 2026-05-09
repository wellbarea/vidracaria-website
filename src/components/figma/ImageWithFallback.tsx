"use client";
import { useState } from "react";

export function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);
  return error ? (
    <div className={className} style={{ background: "#222", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span>Imagem não disponível</span>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} onError={() => setError(true)} />
  );
}
