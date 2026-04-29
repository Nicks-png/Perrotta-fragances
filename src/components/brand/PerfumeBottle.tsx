export type BottleTone = 'rose' | 'nude' | 'caramel' | 'creme' | 'gold';

interface PerfumeBottleProps {
  tone?: BottleTone;
  size?: string | number;
}

const PALETTES: Record<
  BottleTone,
  { glass: string; liquid: string; cap: string; glow: string }
> = {
  rose:    { glass: '#E5BCAE', liquid: '#D4A092', cap: '#C9A96E', glow: 'rgba(212,160,146,0.5)' },
  nude:    { glass: '#EFDFD0', liquid: '#E8D5C4', cap: '#A67B5B', glow: 'rgba(232,213,196,0.55)' },
  caramel: { glass: '#D4B795', liquid: '#A67B5B', cap: '#8B6648', glow: 'rgba(166,123,91,0.45)' },
  creme:   { glass: '#F0E4D5', liquid: '#EFDFD0', cap: '#C9A96E', glow: 'rgba(245,237,228,0.6)' },
  gold:    { glass: '#DAC094', liquid: '#C9A96E', cap: '#A67B5B', glow: 'rgba(201,169,110,0.5)' },
};

export default function PerfumeBottle({ tone = 'rose', size = '100%' }: PerfumeBottleProps) {
  const p = PALETTES[tone] ?? PALETTES.rose;
  return (
    <svg
      viewBox="0 0 200 280"
      width={size}
      height={size}
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`glow-${tone}`} cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.9" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`liq-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.liquid} stopOpacity="0.65" />
          <stop offset="100%" stopColor={p.liquid} stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`glass-${tone}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.glass} stopOpacity="0.85" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor={p.glass} stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="260" rx="70" ry="6" fill="rgba(74,55,40,0.18)" />
      <circle cx="100" cy="140" r="100" fill={`url(#glow-${tone})`} />

      <rect x="82" y="22" width="36" height="20" rx="2" fill={p.cap} opacity="0.95" />
      <rect x="84" y="24" width="32" height="3" fill="#FFFFFF" opacity="0.35" />
      <rect x="86" y="42" width="28" height="14" fill={p.cap} opacity="0.7" />

      <rect x="90" y="56" width="20" height="14" fill={p.glass} opacity="0.6" />

      <path
        d="M55 80 Q50 90 50 110 L50 230 Q50 250 70 250 L130 250 Q150 250 150 230 L150 110 Q150 90 145 80 Z"
        fill={`url(#glass-${tone})`}
        opacity="0.55"
      />
      <path
        d="M58 130 L142 130 L142 230 Q142 244 130 244 L70 244 Q58 244 58 230 Z"
        fill={`url(#liq-${tone})`}
      />
      <path
        d="M55 80 Q50 90 50 110 L50 230 Q50 250 70 250 L130 250 Q150 250 150 230 L150 110 Q150 90 145 80 Z"
        fill="none"
        stroke={p.cap}
        strokeWidth="0.7"
        opacity="0.45"
      />
      <path d="M62 100 Q60 130 62 200" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />

      <rect x="68" y="155" width="64" height="68" rx="2" fill="#FAF4EC" opacity="0.92" />
      <rect x="68" y="155" width="64" height="68" rx="2" fill="none" stroke={p.cap} strokeWidth="0.4" opacity="0.6" />
      <text
        x="100" y="180"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="11"
        fill={p.cap}
        letterSpacing="3"
        fontWeight="400"
      >
        PERROTTA
      </text>
      <line x1="80" y1="186" x2="120" y2="186" stroke={p.cap} strokeWidth="0.4" opacity="0.5" />
      <text
        x="100" y="198"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="5"
        fill={p.cap}
        letterSpacing="3.5"
        opacity="0.7"
      >
        FRAGRANCES
      </text>
      <text
        x="100" y="214"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="4.5"
        fill={p.cap}
        letterSpacing="2"
        opacity="0.5"
      >
        EAU DE PARFUM
      </text>
    </svg>
  );
}
