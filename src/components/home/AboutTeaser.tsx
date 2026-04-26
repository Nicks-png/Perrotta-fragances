'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutTeaser() {
  const t = useTranslations('home.about');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-darker">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Decorative frames */}
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto md:mx-0">
              <div className="absolute inset-0 border border-gold/20 translate-x-4 translate-y-4" />
              <div className="absolute inset-0 bg-gradient-to-br from-dark to-darker flex items-center justify-center overflow-hidden">
                {/* Abstract perfume art */}
                <svg viewBox="0 0 300 400" className="w-full h-full opacity-40">
                  <defs>
                    <radialGradient id="bottle-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="150" cy="200" r="120" fill="url(#bottle-glow)" />

                  {/* Bottle */}
                  <rect x="120" y="60" width="60" height="20" rx="6" fill="#C9A96E" opacity="0.6" />
                  <rect x="130" y="80" width="40" height="50" fill="#C9A96E" opacity="0.3" />
                  <path d="M100 130 Q95 170 95 220 Q95 280 110 290 L190 290 Q205 280 205 220 Q205 170 200 130 Z"
                    fill="none" stroke="#C9A96E" strokeWidth="1.5" opacity="0.5" />
                  <path d="M100 130 Q95 170 95 220 Q95 280 110 290 L190 290 Q205 280 205 220 Q205 170 200 130 Z"
                    fill="#C9A96E" opacity="0.08" />

                  {/* Label */}
                  <rect x="115" y="175" width="70" height="75" rx="3" fill="#C9A96E" opacity="0.12" stroke="#C9A96E" strokeWidth="0.5" strokeOpacity="0.4" />
                  <text x="150" y="210" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#C9A96E" opacity="0.7" letterSpacing="3">PERROTTA</text>
                  <line x1="125" y1="218" x2="175" y2="218" stroke="#C9A96E" strokeWidth="0.5" opacity="0.4" />
                  <text x="150" y="232" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fill="#C9A96E" opacity="0.5" letterSpacing="4">FRAGRANCES</text>

                  {/* Sparkles */}
                  <text x="210" y="100" fontSize="14" fill="#C9A96E" opacity="0.4">✦</text>
                  <text x="80" y="300" fontSize="8" fill="#C9A96E" opacity="0.3">✦</text>
                  <text x="220" y="280" fontSize="6" fill="#C9A96E" opacity="0.2">✦</text>
                </svg>
              </div>
            </div>

            {/* Small accent block */}
            <div className="absolute -bottom-8 -right-0 md:right-0 bg-gold/20 border border-gold/30 px-5 py-3 text-right">
              <p className="font-serif text-2xl text-gold">8</p>
              <p className="text-[0.55rem] tracking-widest uppercase text-creme/40">Marcas exclusivas</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-0"
          >
            <p className="section-label text-gold/60 mb-4">{t('label')}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-creme leading-tight mb-6">
              {t('title')}
            </h2>
            <div className="h-px w-12 bg-gold/40 mb-8" />
            <p className="text-sm text-creme/50 leading-loose font-light">
              {t('text')}
            </p>

            <div className="mt-10 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-creme/20 text-creme text-xs tracking-widest2 uppercase px-7 py-3.5 transition-all duration-300 hover:bg-creme/10 hover:border-creme/40"
              >
                {t('cta')}
              </Link>
              <div className="flex items-center gap-2 text-creme/30">
                <div className="h-px w-8 bg-current" />
                <span className="text-gold text-xs">✦</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
