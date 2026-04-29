'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useReveal } from '@/lib/useReveal';
import Sparkle from '@/components/brand/Sparkle';
import MistBackdrop from '@/components/brand/MistBackdrop';

export default function Hero() {
  const t = useTranslations('home.hero');
  useReveal();

  // Split tagline so the middle words render in italiana display variant.
  const tagline = t('tagline'); // e.g. "Sofisticação em cada essência"
  const words = tagline.split(' ');
  const first = words[0] ?? tagline;
  const last = words.length > 1 ? words[words.length - 1] : '';
  const middle = words.length > 2 ? words.slice(1, -1).join(' ') : '';

  return (
    <section className="hero-editorial">
      <MistBackdrop density="medium" tone="gold" />

      {/* Side rails */}
      <div
        aria-hidden="true"
        className="hidden md:flex"
        style={{
          position: 'absolute',
          left: 40,
          top: '22%',
          bottom: '22%',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <span className="rule-vertical" style={{ flex: 1, width: 1 }} />
      </div>
      <div
        aria-hidden="true"
        className="hidden md:flex"
        style={{
          position: 'absolute',
          right: 40,
          top: '22%',
          bottom: '22%',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <span className="rule-vertical" style={{ flex: 1, width: 1 }} />
        <span
          style={{
            writingMode: 'vertical-rl',
            fontSize: 8.5,
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: 'var(--color-caramel)',
            opacity: 0.55,
          }}
        >
          São Paulo · Brasil
        </span>
        <span className="rule-vertical" style={{ flex: 1, width: 1 }} />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '96px 32px 0',
          maxWidth: 920,
        }}
      >
        <div
          className="reveal"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}
        >
          <span className="rule-diamond">
            <span />
            <i />
            <span />
          </span>
        </div>

        <h1
          className="reveal reveal-2 font-display"
          style={{
            fontSize: 'clamp(56px, 9vw, 128px)',
            lineHeight: 0.98,
            margin: 0,
            color: 'var(--color-darker)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
          }}
        >
          {first}
          <br />
          {middle && (
            <em
              style={{
                fontFamily:
                  "var(--font-italiana), 'Italiana', 'Cormorant Garamond', serif",
                fontStyle: 'normal',
                color: 'var(--color-caramel)',
                letterSpacing: '0.02em',
              }}
            >
              {middle}
            </em>
          )}
          {middle && ' '}
          {last}
        </h1>

        <div
          className="reveal reveal-3"
          style={{ display: 'flex', justifyContent: 'center', margin: '40px 0 28px' }}
        >
          <Sparkle size={12} className="sparkle" />
        </div>

        <p
          className="reveal reveal-4"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontSize: 'clamp(15px, 1.6vw, 19px)',
            fontStyle: 'italic',
            color: 'var(--color-caramel-deep)',
            maxWidth: 520,
            margin: '0 auto 56px',
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {t('subtitle')}
        </p>

        <div
          className="reveal reveal-5"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 36,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Link href="/shop" className="btn-pill-filled">
            {t('cta_explore')}
          </Link>
          <Link href="/shop?brands=true" className="btn-link">
            {t('cta_brands')}
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'var(--color-caramel)',
          opacity: 0.55,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: 1,
            height: 32,
            background: 'linear-gradient(180deg, transparent, var(--color-caramel))',
            animation: 'scroll-cue 2.4s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
