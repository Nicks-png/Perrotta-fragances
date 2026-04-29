'use client';

import { useTranslations } from 'next-intl';
import Sparkle from '@/components/brand/Sparkle';

const BRANDS = [
  'Chanel',
  'Dior',
  'Valentino',
  'Prada',
  'Parfums de Marly',
  'Carolina Herrera',
  'Hugo Boss',
  'Dolce & Gabbana',
];

export default function BrandsMarquee() {
  const t = useTranslations('home.brands');
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section
      id="brands"
      style={{
        padding: '80px 0',
        background:
          'linear-gradient(180deg, var(--color-creme-soft), var(--color-creme-deep), var(--color-creme-soft))',
        borderTop: '1px solid var(--line-soft)',
        borderBottom: '1px solid var(--line-soft)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="container-editorial" style={{ textAlign: 'center', marginBottom: 36 }}>
        <p className="eyebrow-thin reveal">{t('label')}</p>
      </div>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 160,
            background:
              'linear-gradient(90deg, var(--color-creme-soft), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 160,
            background:
              'linear-gradient(270deg, var(--color-creme-soft), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div className="marquee-track">
          {doubled.map((b, i) => (
            <span key={i} className="brand-tag">
              {b}
              <Sparkle
                size={6}
                style={{
                  color: 'var(--color-gold)',
                  opacity: 0.45,
                  marginLeft: 28,
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
