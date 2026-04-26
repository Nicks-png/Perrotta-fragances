'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { Review } from '@/types';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    productId: '1',
    author: 'Mariana S.',
    rating: 5,
    comment: 'Absolutamente inesquecível. É exatamente o que esperava de um clássico — fixação impecável, sillage marcante e aquela elegância que só a perfumaria francesa tem. Vale cada centavo.',
    date: '2024-03-15',
    verified: true,
  },
  {
    id: '2',
    productId: '1',
    author: 'Fernanda R.',
    rating: 5,
    comment: 'Recebi em perfeito estado, embalagem excelente. O perfume é exatamente como descrito, 100% original. Já é o segundo frasco que compro aqui.',
    date: '2024-02-20',
    verified: true,
  },
  {
    id: '3',
    productId: '1',
    author: 'Ana C.',
    rating: 4,
    comment: 'Fragrância linda, projeção um pouco mais discreta do que eu esperava mas ainda assim perfeita para o cotidiano. Produto original sem dúvidas.',
    date: '2024-01-10',
    verified: true,
  },
];

interface Props {
  productId: string;
  rating: number;
  reviewCount: number;
}

export default function ReviewSection({ productId, rating, reviewCount }: Props) {
  const t = useTranslations('product');
  const [showForm, setShowForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');

  const ratingBars = [5, 4, 3, 2, 1].map((stars) => {
    const count = MOCK_REVIEWS.filter((r) => r.rating === stars).length;
    const pct = reviewCount > 0 ? (count / MOCK_REVIEWS.length) * 100 : 0;
    return { stars, count, pct };
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <span className="text-gold text-sm">✦</span>
        <h3 className="font-serif text-2xl text-darker">{t('reviews')}</h3>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 p-6 bg-nude/20 border border-nude/50">
        {/* Big rating */}
        <div className="flex flex-col items-center justify-center">
          <p className="font-serif text-6xl text-dark">{rating.toFixed(1)}</p>
          <div className="flex gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                strokeWidth={0}
                className={star <= Math.round(rating) ? 'fill-gold' : 'fill-nude'}
              />
            ))}
          </div>
          <p className="text-xs text-dark/40">{reviewCount} avaliações</p>
        </div>

        {/* Bars */}
        <div className="col-span-2 flex flex-col justify-center gap-2">
          {ratingBars.map(({ stars, count, pct }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-xs text-dark/50 w-2">{stars}</span>
              <Star size={10} strokeWidth={0} className="fill-gold/60 shrink-0" />
              <div className="flex-1 h-1.5 bg-nude rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold/60 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-dark/40 w-4 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-8 mb-10">
        {MOCK_REVIEWS.map((review, i) => (
          <div key={review.id}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-dark">{review.author}</p>
                  {review.verified && (
                    <span className="text-[0.5rem] tracking-widest uppercase text-green-600/70 bg-green-50 px-1.5 py-0.5">
                      {t('verified')}
                    </span>
                  )}
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={10}
                      strokeWidth={0}
                      className={star <= review.rating ? 'fill-gold' : 'fill-nude'}
                    />
                  ))}
                </div>
              </div>
              <span className="text-[0.6rem] text-dark/30">{formatDate(review.date)}</span>
            </div>
            <p className="text-sm text-dark/60 leading-relaxed">{review.comment}</p>
            {i < MOCK_REVIEWS.length - 1 && (
              <div className="thin-divider mt-8" />
            )}
          </div>
        ))}
      </div>

      {/* Write review */}
      {!showForm ? (
        <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
          {t('write_review')}
        </Button>
      ) : (
        <div className="border border-nude p-6 space-y-5">
          <p className="font-serif text-lg text-darker">{t('write_review')}</p>

          {/* Star picker */}
          <div>
            <p className="text-[0.6rem] tracking-widest uppercase text-dark/50 mb-2">
              {t('your_rating')}
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setSelectedRating(star)}
                >
                  <Star
                    size={20}
                    strokeWidth={0}
                    className={
                      star <= (hoverRating || selectedRating)
                        ? 'fill-gold'
                        : 'fill-nude'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <p className="text-[0.6rem] tracking-widest uppercase text-dark/50 mb-2">
              {t('your_comment')}
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Conte sua experiência com esta fragrância..."
              className="w-full bg-transparent border border-nude text-sm text-dark placeholder-dark/30 p-3 focus:outline-none focus:border-caramel resize-none transition-colors duration-200"
            />
          </div>

          <div className="flex gap-3">
            <Button
              size="sm"
              onClick={() => { setShowForm(false); setComment(''); setSelectedRating(0); }}
            >
              {t('submit_review')}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
