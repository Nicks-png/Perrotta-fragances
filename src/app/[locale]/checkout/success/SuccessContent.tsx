'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuccessContent() {
  const t = useTranslations('success');
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order') || '---';
  const name = searchParams.get('name') || '';

  return (
    <div className="pt-20 min-h-screen bg-creme flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center">
            <CheckCircle size={36} strokeWidth={1} className="text-gold" />
          </div>
        </motion.div>

        <p className="text-[0.6rem] tracking-widest3 uppercase text-gold/70 mb-3">Perrotta Fragrances</p>
        <h1 className="font-serif text-3xl md:text-4xl text-darker mb-3">{t('title')}</h1>
        {name && (
          <p className="font-serif text-xl text-dark/60 mb-6">
            {t('subtitle', { name })}
          </p>
        )}

        <div className="thin-divider my-6" />

        <div className="bg-nude/30 border border-nude p-5 mb-6">
          <p className="text-[0.6rem] tracking-widest uppercase text-dark/40 mb-1">{t('order_number')}</p>
          <p className="font-serif text-2xl text-darker tracking-widest">#{orderId}</p>
        </div>

        <p className="text-sm text-dark/50 leading-relaxed mb-8 font-light">
          {t('message')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-primary">
            {t('continue')}
          </Link>
          <Link href="/account" className="btn-outline">
            {t('track')}
          </Link>
        </div>

        <div className="mt-10 flex justify-center">
          <p className="text-[0.55rem] tracking-widest uppercase text-dark/20">
            Perrotta Fragrances — Sofisticação em cada essência ✦
          </p>
        </div>
      </motion.div>
    </div>
  );
}
