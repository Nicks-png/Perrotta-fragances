'use client';

import { useTranslations } from 'next-intl';
import { useReveal } from '@/lib/useReveal';
import Sparkle from '@/components/brand/Sparkle';

const TESTIMONIALS = [
  {
    name: 'Isabela M.',
    city: 'São Paulo',
    text: 'Recebi o N°5 numa caixa que parecia presente. O atendimento é como o perfume — atemporal.',
  },
  {
    name: 'Camila R.',
    city: 'Curitiba',
    text: 'Delina, da Parfums de Marly, é divinal. A curadoria da Perrotta é uma das mais delicadas do Brasil.',
  },
  {
    name: 'Júlia A.',
    city: 'Belo Horizonte',
    text: 'Cheguei pelo Miss Dior e fiquei pelo cuidado. Já viraram a minha boutique de confiança.',
  },
];

export default function Testimonials() {
  const t = useTranslations('home.testimony');
  useReveal();

  const titleRaw = t('title');
  const titleWords = titleRaw.split(' ');
  const midStart = Math.max(1, Math.floor(titleWords.length / 3));
  const midEnd = Math.min(titleWords.length - 1, midStart + 1);
  const titleStart = titleWords.slice(0, midStart).join(' ');
  const titleAccent = titleWords.slice(midStart, midEnd + 1).join(' ');
  const titleEnd = titleWords.slice(midEnd + 1).join(' ');

  return (
    <section
      className="section-editorial"
      style={{ background: 'var(--color-creme)', position: 'relative' }}
    >
      <div className="container-editorial">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="eyebrow-thin" style={{ marginBottom: 16 }}>
            {t('label')}
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              margin: 0,
              fontWeight: 300,
              color: 'var(--color-darker)',
              lineHeight: 1.1,
            }}
          >
            {titleStart}{' '}
            {titleAccent && (
              <em
                style={{
                  fontFamily:
                    "var(--font-italiana), 'Italiana', 'Cormorant Garamond', serif",
                  fontStyle: 'normal',
                  color: 'var(--color-caramel)',
                }}
              >
                {titleAccent}
              </em>
            )}{' '}
            {titleEnd}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {TESTIMONIALS.map((entry, i) => (
            <div key={i} className={`glass-card reveal reveal-${i + 2}`}>
              <div className="quote-mark" style={{ marginBottom: 8 }}>
                &ldquo;
              </div>
              <p
                style={{
                  fontFamily:
                    "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 18,
                  color: 'var(--color-dark)',
                  lineHeight: 1.7,
                  margin: '0 0 28px',
                  minHeight: 120,
                }}
              >
                {entry.text}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  paddingTop: 24,
                  borderTop: '1px solid var(--line-soft)',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, var(--color-nude), var(--color-rose-soft))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily:
                      "var(--font-cormorant), 'Cormorant Garamond', serif",
                    color: 'var(--color-darker)',
                    fontSize: 16,
                  }}
                >
                  {entry.name.charAt(0)}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      color: 'var(--color-dark)',
                      margin: 0,
                      letterSpacing: '0.1em',
                      fontWeight: 500,
                    }}
                  >
                    {entry.name}
                  </p>
                  <p
                    style={{
                      fontSize: 9,
                      color: 'var(--color-caramel)',
                      margin: '4px 0 0',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {entry.city}
                  </p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Sparkle
                      key={s}
                      size={7}
                      style={{ color: 'var(--color-gold)' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: 72 }}>
          <span
            className="rule-thin"
            style={{ display: 'block', width: 200, margin: '0 auto 32px' }}
          />
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(24px, 3vw, 38px)',
              fontStyle: 'italic',
              color: 'var(--color-caramel-deep)',
              margin: 0,
              fontWeight: 300,
            }}
          >
            “Sofisticação em cada essência.”
          </p>
          <p className="eyebrow-thin" style={{ marginTop: 18 }}>
            Perrotta · 2024
          </p>
        </div>
      </div>
    </section>
  );
}
