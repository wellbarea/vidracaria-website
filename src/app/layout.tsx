import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bareasquadrias.com.br";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Barêa Esquadrias de Alumínio e Vidros | São Paulo",
    template: "%s | Barêa Esquadrias",
  },
  description:
    "Transforme seu ambiente com esquadrias de alumínio e vidro sob medida! Qualidade, design moderno e segurança para residências e empresas. Solicite seu orçamento com a Barêa Esquadrias de Alumínio e Vidros em Santo Anastácio - SP.",

  keywords: [
    "esquadrias de alumínio",
    "vidraçaria São Paulo",
    "esquadrias de vidro",
    "janelas de alumínio",
    "portas de alumínio",
    "fachada de vidro",
    "vidro temperado",
    "divisórias de vidro",
    "esquadrias residenciais",
    "esquadrias comerciais",
    "Barêa Esquadrias",
    "vidraçaria SP",
  ],

  authors: [{ name: "Barêa Esquadrias de Alumínio e Vidros" }],
  creator: "Barêa Esquadrias de Alumínio e Vidros",
  publisher: "Barêa Esquadrias de Alumínio e Vidros",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Barêa Esquadrias de Alumínio e Vidros",
    title: "Barêa Esquadrias de Alumínio e Vidros | Santo Anastácio - SP",
    description:
      "Transforme seu ambiente com esquadrias de alumínio e vidro sob medida! Qualidade, design moderno e segurança para residências e empresas. Solicite seu orçamento.",
    images: [
      {
        url: "/images/logo-com-fundo-branco.png",
        width: 1200,
        height: 630,
        alt: "Barêa Esquadrias de Alumínio e Vidros — logo oficial",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Barêa Esquadrias de Alumínio e Vidros | Santo Anastácio - SP",
    description:
      "Transforme seu ambiente com esquadrias de alumínio e vidro sob medida! Qualidade, design moderno e segurança para residências e empresas.",
    images: ["/images/logo-com-fundo-branco.png"],
  },

  icons: {
    icon: [
      { url: "/images/B.svg", type: "image/svg+xml" },
      { url: "/images/logo-com-fundo-branco.png", type: "image/png" },
    ],
    apple: "/images/logo-com-fundo-branco.png",
  },

  category: "construction",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Barêa Esquadrias de Alumínio e Vidros",
  description:
    "Transforme seu ambiente com esquadrias de alumínio e vidro sob medida! Qualidade, design moderno e segurança para residências e empresas. Solicite seu orçamento com a Barêa Esquadrias de Alumínio e Vidros em Santo Anastácio - SP.",
  url: SITE_URL,
  telephone: "bareaesquadria@gmail.com",
  email: "bareaesquadria@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santo Anastácio",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -21.9747,
    longitude: -51.6522,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "13:00",
    },
  ],
  priceRange: "$$",
  image: `${SITE_URL}/images/logo-com-fundo-branco.png`,
  logo: `${SITE_URL}/images/logo-com-fundo-branco.png`,
  sameAs: [
    "https://www.instagram.com/esquadriaaluminio_barea?igsh=MXZydWx2MXNpMHJkbA==",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Produtos e Serviços",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Janelas de Alumínio" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Portas de Alumínio" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fachadas de Vidro" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Divisórias de Vidro" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Esquadrias Residenciais" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Esquadrias Comerciais" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
