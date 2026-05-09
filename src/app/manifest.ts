import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Barêa Esquadrias de Alumínio e Vidros",
    short_name: "Barêa Esquadrias",
    description:
      "Especialista em esquadrias de alumínio e vidro em São Paulo há mais de 15 anos.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    lang: "pt-BR",
    icons: [
      {
        src: "/images/logo-black.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
