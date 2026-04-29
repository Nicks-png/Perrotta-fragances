'use client';

import { FormEvent, useState } from 'react';
import { useReveal } from '@/lib/useReveal';
import MistBackdrop from '@/components/brand/MistBackdrop';

export default function Newsletter() {
  useReveal();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section
      className="section-editorial"
      style={{
        background:
          'linear-gradient(180deg, var(--color-creme), var(--color-nude-soft))',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 0',
      }}
    >
      <MistBackdrop density="soft" tone="rose" />
      <div
        className="container-editorial"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: 640,
        }}
      >
        <p className="eyebrow-thin reveal" style={{ marginBottom: 20 }}>
          Atelier Perrotta
        </p>
        <h2
          className="reveal reveal-2 font-display"
          style={{
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            margin: 0,
            fontWeight: 300,
            color: 'var(--color-darker)',
            lineHeight: 1.15,
          }}
        >
          Convites{' '}
          <em
            style={{
              fontFamily:
                "var(--font-italiana), 'Italiana', 'Cormorant Garamond', serif",
              fontStyle: 'normal',
              color: 'var(--color-caramel)',
            }}
          >
            discretos
          </em>
          ,
          <br />
          descobertas{' '}
          <em
            style={{
              fontFamily:
                "var(--font-italiana), 'Italiana', 'Cormorant Garamond', serif",
              fontStyle: 'normal',
              color: 'var(--color-caramel)',
            }}
          >
            raras
          </em>
        </h2>
        <p
          className="reveal reveal-3"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 17,
            color: 'var(--color-caramel-deep)',
            margin: '24px auto 48px',
            maxWidth: 460,
            lineHeight: 1.7,
          }}
        >
          Receba nossas cartas mensais com pré-lançamentos, lançamentos exclusivos
          e ensaios sobre perfumaria.
        </p>
        {submitted ? (
          <p
            className="reveal reveal-4 font-display"
            style={{
              fontStyle: 'italic',
              fontSize: 18,
              color: 'var(--color-caramel-deep)',
            }}
          >
            Obrigado — sua assinatura foi recebida.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="reveal reveal-4"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              maxWidth: 480,
              margin: '0 auto',
              borderBottom: '1px solid var(--color-caramel)',
              paddingBottom: 4,
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu endereço de e-mail"
              className="input-line"
              style={{ borderBottom: 0, flex: 1, padding: '12px 0' }}
            />
            <button
              type="submit"
              style={{
                background: 'transparent',
                border: 0,
                fontSize: 10,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'var(--color-dark)',
                cursor: 'pointer',
                padding: '12px 0',
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}
            >
              Assinar →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
