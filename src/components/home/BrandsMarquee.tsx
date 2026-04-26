'use client';

import { useTranslations } from 'next-intl';
import { brands } from '@/data/brands';

export default function BrandsMarquee() {
  const t = useTranslations('home.brands');
  const doubled = [...brands, ...brands];

  return (
    <section className="py-16 bg-darker overflow-hidden border-y border-creme/5">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 mb-8 text-center">
        <p className="section-label text-gold/60">{t('label')}</p>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-x-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-darker to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-darker to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((brand, i) => (
            <span
              key={`${brand.id}-${i}`}
              className="inline-flex items-center gap-8 mx-8"
            >
              <span className="font-serif text-2xl md:text-3xl font-light tracking-widest text-creme/20 hover:text-creme/50 transition-colors duration-500 cursor-default select-none">
                {brand.name}
              </span>
              <span className="text-gold/20 text-sm">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
