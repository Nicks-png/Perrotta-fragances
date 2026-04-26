'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function FeaturedProducts() {
  const t = useTranslations('home.featured');
  const tCommon = useTranslations('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const featured = getFeaturedProducts();

  return (
    <section ref={ref} className="py-24 md:py-32 bg-creme">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <p className="section-label mb-3">{t('label')}</p>
            <h2 className="section-title">{t('title')}</h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-dark/40 leading-relaxed max-w-xs hidden md:block">
              {t('subtitle')}
            </p>
            <Link
              href="/shop"
              className="shrink-0 text-[0.65rem] tracking-widest uppercase text-caramel border-b border-caramel/30 pb-0.5 hover:border-caramel transition-colors duration-200"
            >
              {tCommon('see_all')}
            </Link>
          </div>
        </motion.div>

        {/* Editorial grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={index === 0 ? 'col-span-2 row-span-2' : ''}
            >
              <ProductCard product={product} featured={index === 0} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <div className="thin-divider mb-10" />
          <Link href="/shop" className="btn-primary">
            {tCommon('see_all')} — Coleção Completa
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
