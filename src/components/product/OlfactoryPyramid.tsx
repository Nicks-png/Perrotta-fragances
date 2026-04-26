'use client';

import { useTranslations } from 'next-intl';
import { OlfactoryNotes } from '@/types';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  notes: OlfactoryNotes;
}

export default function OlfactoryPyramid({ notes }: Props) {
  const t = useTranslations('product');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const layers = [
    {
      key: 'top',
      label: t('top_notes'),
      description: t('top_description'),
      notes: notes.top,
      width: 'w-1/2',
      bg: 'bg-rose/15',
      border: 'border-rose/30',
      dot: 'bg-rose',
      delay: 0,
    },
    {
      key: 'heart',
      label: t('heart_notes'),
      description: t('heart_description'),
      notes: notes.heart,
      width: 'w-3/4',
      bg: 'bg-caramel/10',
      border: 'border-caramel/25',
      dot: 'bg-caramel',
      delay: 0.15,
    },
    {
      key: 'base',
      label: t('base_notes'),
      description: t('base_description'),
      notes: notes.base,
      width: 'w-full',
      bg: 'bg-dark/5',
      border: 'border-dark/15',
      dot: 'bg-dark',
      delay: 0.3,
    },
  ] as const;

  return (
    <div ref={ref}>
      <div className="flex items-center gap-3 mb-8">
        <span className="text-gold text-sm">✦</span>
        <h3 className="font-serif text-2xl text-darker">{t('olfactory_notes')}</h3>
      </div>

      <div className="flex flex-col items-center gap-0">
        {layers.map((layer) => (
          <motion.div
            key={layer.key}
            initial={{ opacity: 0, scaleX: 0.7 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: layer.delay, ease: [0.16, 1, 0.3, 1] }}
            className={`${layer.width} border ${layer.border} ${layer.bg} px-5 py-4 text-center`}
          >
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${layer.dot}`} />
              <p className="text-[0.6rem] tracking-widest uppercase text-dark/60">{layer.label}</p>
            </div>
            <p className="text-xs text-dark/40 mb-3 italic">{layer.description}</p>
            <p className="text-sm text-dark font-light leading-relaxed">
              {layer.notes.join(' · ')}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex justify-center gap-6">
        {[
          { dot: 'bg-rose', label: 'Topo' },
          { dot: 'bg-caramel', label: 'Coração' },
          { dot: 'bg-dark', label: 'Fundo' },
        ].map(({ dot, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${dot}`} />
            <span className="text-[0.6rem] tracking-widest uppercase text-dark/40">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
