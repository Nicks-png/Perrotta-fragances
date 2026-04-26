import { cn } from '@/lib/utils';

interface LogoIconProps {
  size?: number;
  className?: string;
}

export function LogoIcon({ size = 48, className }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="0.9" />

      {/* PF monogram — Cormorant Garamond italic, overlapping letters */}
      <text
        x="50"
        y="70"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="54"
        fontStyle="italic"
        fontWeight="400"
        fill="currentColor"
        letterSpacing="-6"
        dx="-2"
      >
        PF
      </text>

      {/* 4-pointed sparkle ✦ at top-right of circle */}
      <text
        x="86"
        y="20"
        textAnchor="middle"
        fontSize="10"
        fill="currentColor"
        fontFamily="sans-serif"
      >
        ✦
      </text>
    </svg>
  );
}

interface LogoFullProps {
  className?: string;
  inverted?: boolean;
  compact?: boolean;
}

export function LogoFull({ className, inverted = false, compact = false }: LogoFullProps) {
  return (
    <div className={cn('flex flex-col items-center select-none group', className)}>
      <LogoIcon size={compact ? 40 : 52} />
      <span
        className={cn(
          'font-serif tracking-widest2 font-light leading-none mt-0.5',
          compact ? 'text-base' : 'text-lg md:text-xl',
          inverted ? 'text-creme' : 'text-darker'
        )}
      >
        PERROTTA
      </span>
      <div className="flex items-center gap-2 mt-0.5">
        <div
          className={cn(
            'h-px w-5 transition-colors',
            inverted ? 'bg-creme/40' : 'bg-caramel/50'
          )}
        />
        <span
          className={cn(
            'text-[0.45rem] tracking-widest3 font-sans',
            inverted ? 'text-creme/70' : 'text-caramel'
          )}
        >
          FRAGRANCES
        </span>
        <div
          className={cn(
            'h-px w-5 transition-colors',
            inverted ? 'bg-creme/40' : 'bg-caramel/50'
          )}
        />
      </div>
    </div>
  );
}
