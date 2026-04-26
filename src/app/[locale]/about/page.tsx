'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutPage() {
  const t = useTranslations('about');
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView1 = useInView(ref1, { once: true, margin: '-80px' });
  const isInView2 = useInView(ref2, { once: true, margin: '-80px' });

  return (
    <div className="pt-20 min-h-screen">

      {/* Hero */}
      <section className="min-h-[70vh] bg-darker flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(ellipse at 50% 50%, #C9A96E 0%, transparent 65%)' }} />

        <div className="absolute w-[500px] h-[500px] border border-creme/5 rounded-full" />
        <div className="absolute w-[300px] h-[300px] border border-gold/10 rounded-full" />

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[0.6rem] tracking-widest3 uppercase text-gold/60 mb-6"
          >
            {t('hero_label')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl text-creme leading-tight mb-4"
          >
            {t('hero_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-serif text-2xl md:text-3xl text-gold/70 italic"
          >
            {t('hero_subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section ref={ref1} className="py-24 md:py-32 bg-creme">
        <div className="max-w-screen-lg mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={isInView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9 }}
            >
              <p className="section-label mb-4">{t('story_title')}</p>
              <div className="thin-divider mb-8" />
              <p className="text-sm text-dark/60 leading-loose mb-6 font-light">
                {t('story_text_1')}
              </p>
              <p className="text-sm text-dark/60 leading-loose font-light">
                {t('story_text_2')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={isInView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="space-y-5"
            >
              <div className="border-l-2 border-gold pl-5 py-2">
                <p className="font-serif text-2xl text-darker mb-2">{t('mission_title')}</p>
                <p className="text-sm text-dark/50 leading-relaxed font-light">{t('mission_text')}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { num: '8', label: 'Marcas' },
                  { num: '100%', label: 'Originais' },
                  { num: '∞', label: 'Elegância' },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center border border-nude p-4">
                    <p className="font-serif text-3xl text-darker">{num}</p>
                    <p className="text-[0.6rem] tracking-widest uppercase text-dark/40 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={ref2} className="py-20 bg-nude/30 border-y border-nude/50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-gold/40" />
              <span className="text-gold text-sm">✦</span>
              <div className="h-px w-12 bg-gold/40" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(['authenticity', 'curation', 'experience'] as const).map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="bg-creme border border-nude p-7 text-center"
              >
                <span className="text-gold text-xl mb-4 block">✦</span>
                <h3 className="font-serif text-xl text-darker mb-3">{t(`values.${key}`)}</h3>
                <p className="text-sm text-dark/50 font-light leading-relaxed">{t(`values.${key}_text`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-darker text-center">
        <div className="max-w-md mx-auto px-6">
          <p className="font-serif text-3xl text-creme mb-4">Conheça nossa coleção</p>
          <p className="text-sm text-creme/40 mb-8 font-light">
            Fragrâncias das maiores maisons do mundo, esperando por você.
          </p>
          <Link href="/shop" className="btn-gold">
            Explorar Loja
          </Link>
        </div>
      </section>
    </div>
  );
}
