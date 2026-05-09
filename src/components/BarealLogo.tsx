export default function BarealLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Barêa Esquadrias de Alumínio e Vidros"
    >
      {/* Geometric B mark */}
      <polygon points="0,29 23,0 23,100 0,100" fill="currentColor" />
      <rect x="23" y="0" width="67" height="12" fill="currentColor" />
      <rect x="23" y="45" width="67" height="11" fill="currentColor" />
      <rect x="23" y="88" width="67" height="12" fill="currentColor" />
      <rect x="78" y="12" width="12" height="33" fill="currentColor" />
      <rect x="78" y="56" width="12" height="32" fill="currentColor" />

      {/* Vertical divider */}
      <line x1="110" y1="8" x2="110" y2="92" stroke="currentColor" strokeWidth="1.5" />

      {/* BARÊA wordmark */}
      <text
        x="126"
        y="67"
        fontFamily="'Helvetica Neue', 'Arial Black', Arial, sans-serif"
        fontSize="57"
        fontWeight="900"
        fill="currentColor"
        letterSpacing="5"
      >
        BAR&#x00CA;A
      </text>

      {/* Subtitle */}
      <text
        x="128"
        y="89"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="11"
        fontWeight="400"
        fill="currentColor"
        letterSpacing="3"
      >
        ESQUADRIAS DE ALUM&#x00CD;NIO E VIDROS
      </text>
    </svg>
  );
}
