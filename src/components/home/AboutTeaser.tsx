'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useReveal } from '@/lib/useReveal';
import Sparkle from '@/components/brand/Sparkle';
import PerfumeBottle from '@/components/brand/PerfumeBottle';
import MistBackdrop from '@/components/brand/MistBackdrop';

export default function AboutTeaser() {
  const t = useTranslations('home.about');
  useReveal();

  // Title with italiana mid-words: try to split title into halves to highlight one segment
  const titleRaw = t('title');
  const titleWords = titleRaw.split(' ');
  const midIndex = Math.floor(titleWords.length / 2);
  const titleStart = titleWords.slice(0, midIndex).join(' ');
  const titleAccent = titleWords[midIndex] ?? '';
  const titleEnd = titleWords.slice(midIndex + 1).join(' ');

  return (
    <section
      id="about"
      className="section-editorial"
      style={{
        background:
          'linear-gradient(180deg, var(--color-creme-soft) 0%, var(--color-nude-soft) 100%)',
        position: 'relative',
      }}
    >
      <MistBackdrop density="soft" tone="warm" />
      <div className="container-editorial" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 96, alignItems: 'center' }}
        >
          <div className="reveal" style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                background: 'linear-gradient(160deg, #EFDFD0, #D4A092 80%)',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 60px 120px -60px rgba(74,55,40,0.4)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PerfumeBottle tone="caramel" size="65%" />
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '12%',
                  left: '14%',
                  color: 'var(--color-gold)',
                }}
              >
                <Sparkle size={14} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '20%',
                  right: '18%',
                  color: 'var(--color-creme)',
                }}
              >
                <Sparkle size={10} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '30%',
                  right: '10%',
                  color: 'var(--color-gold)',
                }}
              >
                <Sparkle size={6} />
              </div>
            </div>
            {/* Frame offset */}
            <div
              style={{
                position: 'absolute',
                inset: -16,
                border: '1px solid var(--color-caramel)',
                opacity: 0.3,
                borderRadius: 4,
                transform: 'translate(20px, 20px)',
                zIndex: -1,
              }}
            />
            {/* Numeric accent */}
            <div
              style={{
                position: 'absolute',
                bottom: -32,
                right: -16,
                background: 'var(--color-creme-soft)',
                border: '1px solid var(--line)',
                padding: '20px 28px',
                textAlign: 'right',
                borderRadius: 2,
              }}
            >
              <p
                className="font-display"
                style={{
                  fontSize: 44,
                  color: 'var(--color-caramel-deep)',
                  margin: 0,
                  lineHeight: 1,
                  fontWeight: 400,
                }}
              >
                08
              </p>
              <p
                style={{
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: 'var(--color-caramel)',
                  margin: '6px 0 0',
                }}
              >
                Maisons
              </p>
            </div>
          </div>

          <div className="reveal reveal-2">
            <p className="eyebrow-thin" style={{ marginBottom: 20 }}>
              {t('label')}
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(40px, 4.5vw, 64px)',
                margin: '0 0 32px',
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
            <span
              className="rule-short"
              style={{ width: 64, height: 1, marginBottom: 32 }}
            />
            <p
              style={{
                fontSize: 14,
                color: 'var(--color-dark)',
                opacity: 0.75,
                lineHeight: 1.9,
                margin: '0 0 24px',
                maxWidth: 460,
              }}
            >
              {t('text')}
            </p>
            <p
              style={{
                fontFamily:
                  "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 17,
                color: 'var(--color-caramel-deep)',
                lineHeight: 1.7,
                margin: '0 0 40px',
                maxWidth: 460,
              }}
            >
              “Curamos cada essência como quem escolhe joias — pela origem, pelo tempo,
              pela intenção.”
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <Link href="/about" className="btn-link">
                {t('cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
