import type { CSSProperties } from 'react';

interface SparkleProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Sparkle({ size = 8, className = '', style }: SparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M6 0 L6.8 5.2 L12 6 L6.8 6.8 L6 12 L5.2 6.8 L0 6 L5.2 5.2 Z"
        fill="currentColor"
      />
    </svg>
  );
}
