import { Gender } from '@/types';

interface Props {
  gender: Gender;
  brand: string;
  size?: 'sm' | 'md' | 'lg';
}

const GRADIENTS: Record<Gender, [string, string, string]> = {
  feminino: ['#D4A092', '#E8D5C4', '#F5EDE4'],
  masculino: ['#4A3728', '#6B4F3A', '#A67B5B'],
  unissex: ['#C9A96E', '#D4B896', '#E8D5C4'],
};

export default function PerfumePlaceholder({ gender, brand }: Props) {
  const [g1, g2, g3] = GRADIENTS[gender];
  const initial = brand.charAt(0).toUpperCase();

  return (
    <svg
      viewBox="0 0 300 360"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id={`bg-${gender}-${brand}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={g1} />
          <stop offset="50%" stopColor={g2} />
          <stop offset="100%" stopColor={g3} />
        </linearGradient>
        <linearGradient id={`bottle-${gender}-${brand}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
        </linearGradient>
        <filter id={`blur-${gender}`}>
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="300" height="360" fill={`url(#bg-${gender}-${brand})`} />

      {/* Ambient glow */}
      <ellipse cx="150" cy="180" rx="100" ry="120"
        fill="rgba(255,255,255,0.08)"
        filter={`url(#blur-${gender})`} />

      {/* Bottle cap */}
      <rect x="118" y="55" width="64" height="22" rx="6"
        fill="rgba(201,169,110,0.7)" />
      <rect x="130" y="45" width="40" height="12" rx="4"
        fill="rgba(201,169,110,0.5)" />

      {/* Bottle neck */}
      <rect x="128" y="77" width="44" height="48"
        fill={`url(#bottle-${gender}-${brand})`}
        stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

      {/* Bottle shoulder */}
      <path d="M108 125 Q103 148 100 175 L200 175 Q197 148 192 125 Z"
        fill={`url(#bottle-${gender}-${brand})`}
        stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

      {/* Bottle body */}
      <path d="M100 175 Q98 220 98 250 Q98 290 115 298 L185 298 Q202 290 202 250 Q202 220 200 175 Z"
        fill={`url(#bottle-${gender}-${brand})`}
        stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

      {/* Bottle label */}
      <rect x="112" y="195" width="76" height="80" rx="2"
        fill="rgba(255,255,255,0.1)"
        stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />

      {/* Brand initial */}
      <text x="150" y="232" textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22" fontWeight="300"
        fill="rgba(255,255,255,0.6)"
        letterSpacing="2">
        {initial}
      </text>
      <line x1="122" y1="245" x2="178" y2="245"
        stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <text x="150" y="258" textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="5.5" fill="rgba(255,255,255,0.4)"
        letterSpacing="4">
        FRAGRANCES
      </text>

      {/* Reflection */}
      <path d="M108 145 Q106 170 105 195 L115 195 Q116 170 118 145 Z"
        fill="rgba(255,255,255,0.12)" />

      {/* Sparkles */}
      <text x="218" y="95" fontSize="11" fill="rgba(201,169,110,0.5)">✦</text>
      <text x="72" y="295" fontSize="7" fill="rgba(255,255,255,0.2)">✦</text>
      <text x="225" y="265" fontSize="5" fill="rgba(255,255,255,0.15)">✦</text>
    </svg>
  );
}
