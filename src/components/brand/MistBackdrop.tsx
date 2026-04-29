'use client';

import { useMemo } from 'react';

export type MistDensity = 'soft' | 'medium' | 'dense';
export type MistTone = 'warm' | 'rose' | 'gold' | 'cool';

interface MistBackdropProps {
  density?: MistDensity;
  tone?: MistTone;
}

const PROFILES: Record<MistDensity, { clouds: number; droplets: number }> = {
  soft:   { clouds: 5,  droplets: 14 },
  medium: { clouds: 8,  droplets: 22 },
  dense:  { clouds: 12, droplets: 36 },
};

const TONES: Record<
  MistTone,
  { cloud: string[]; spark: string; aura: string }
> = {
  warm: {
    cloud: ['rgba(232,213,196,0.7)', 'rgba(245,237,228,0.75)', 'rgba(212,160,146,0.5)'],
    spark: 'rgba(201,169,110,0.95)',
    aura:  'rgba(201,169,110,0.6)',
  },
  rose: {
    cloud: ['rgba(229,188,174,0.7)', 'rgba(212,160,146,0.6)', 'rgba(232,213,196,0.55)'],
    spark: 'rgba(212,160,146,0.95)',
    aura:  'rgba(212,160,146,0.7)',
  },
  gold: {
    cloud: ['rgba(218,192,148,0.6)', 'rgba(232,213,196,0.6)', 'rgba(201,169,110,0.5)'],
    spark: 'rgba(201,169,110,1)',
    aura:  'rgba(201,169,110,0.8)',
  },
  cool: {
    cloud: ['rgba(232,213,196,0.55)', 'rgba(245,237,228,0.7)', 'rgba(212,160,146,0.4)'],
    spark: 'rgba(166,123,91,0.9)',
    aura:  'rgba(166,123,91,0.5)',
  },
};

const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

export default function MistBackdrop({
  density = 'medium',
  tone = 'warm',
}: MistBackdropProps) {
  const { clouds, droplets } = PROFILES[density];
  const t = TONES[tone];

  const cloudParticles = useMemo(
    () =>
      Array.from({ length: clouds }, (_, i) => {
        const left = rand(i + 1) * 92 + 4;
        const size = 240 + rand(i + 7) * 260;
        const delay = -(rand(i + 13) * 18);
        const duration = 16 + rand(i + 19) * 10;
        const color = t.cloud[i % t.cloud.length];
        const animation = `mist-float-${(i % 3) + 1}`;
        return { left, size, delay, duration, color, animation, key: `cloud-${i}` };
      }),
    [clouds, t.cloud]
  );

  const dropletParticles = useMemo(
    () =>
      Array.from({ length: droplets }, (_, i) => {
        const left = rand(i + 31) * 100;
        const size = 2 + rand(i + 41) * 4;
        const delay = -(rand(i + 53) * 14);
        const duration = 10 + rand(i + 61) * 9;
        const drift = (rand(i + 71) - 0.5) * 120;
        const startTop = 80 + rand(i + 83) * 20;
        return { left, size, delay, duration, drift, startTop, key: `dp-${i}` };
      }),
    [droplets]
  );

  return (
    <div className="mist-canvas" aria-hidden="true" style={{ zIndex: 1 }}>
      {cloudParticles.map((b) => (
        <div
          key={b.key}
          style={{
            position: 'absolute',
            left: `${b.left}%`,
            top: 0,
            width: `${b.size}px`,
            height: `${b.size}px`,
            marginLeft: `-${b.size / 2}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle at 50% 50%, ${b.color} 0%, transparent 60%)`,
            filter: 'blur(18px)',
            animation: `${b.animation} ${b.duration}s linear ${b.delay}s infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
      {dropletParticles.map((d) => (
        <div
          key={d.key}
          style={
            {
              position: 'absolute',
              left: `${d.left}%`,
              top: `${d.startTop}%`,
              width: `${d.size}px`,
              height: `${d.size}px`,
              borderRadius: '50%',
              background: t.spark,
              boxShadow: `0 0 ${d.size * 3}px ${t.aura}`,
              animation: `particle-rise ${d.duration}s linear ${d.delay}s infinite`,
              ['--drift' as string]: `${d.drift}px`,
              willChange: 'transform, opacity',
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
