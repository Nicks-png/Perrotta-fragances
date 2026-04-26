'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    author: 'Isabela M.',
    city: 'São Paulo, SP',
    rating: 5,
    text: '"Comprei o Chanel N°5 e chegou rápido, embalagem impecável, produto 100% original. A experiência foi como comprar numa boutique."',
  },
  {
    id: 2,
    author: 'Rafael T.',
    city: 'Rio de Janeiro, RJ',
    rating: 5,
    text: '"Já é a terceira vez que compro na Perrotta. O Dior Sauvage é meu perfume de cabeceira e nunca encontrei um preço melhor com essa qualidade de atendimento."',
  },
  {
    id: 3,
    author: 'Camila R.',
    city: 'Curitiba, PR',
    rating: 5,
    text: '"O Parfums de Marly Delina é simplesmente divino. Recebi elogios o dia inteiro. Perrotta Fragrances tem uma curadoria que poucos têm."',
  },
];

export default function Testimonials() {
  const t = useTranslations('home.testimony');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-nude/30">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">{t('label')}</p>
          <h2 className="section-title">{t('title')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="bg-creme border border-nude p-7 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={12} strokeWidth={0} className="fill-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-dark/60 leading-relaxed italic flex-1 font-light">
                {item.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-nude">
                <div className="w-8 h-8 bg-nude rounded-full flex items-center justify-center">
                  <span className="font-serif text-sm text-caramel">
                    {item.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-dark">{item.author}</p>
                  <p className="text-[0.6rem] text-dark/40">{item.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="thin-divider mb-8" />
          <p className="font-serif text-2xl md:text-3xl text-dark/40 italic">
            "Sofisticação em cada essência."
          </p>
          <p className="text-[0.6rem] tracking-widest uppercase text-gold/60 mt-3">
            — Perrotta Fragrances ✦
          </p>
        </motion.div>
      </div>
    </section>
  );
}
