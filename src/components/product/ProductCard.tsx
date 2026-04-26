'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import PerfumePlaceholder from './PerfumePlaceholder';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const t = useTranslations('product');
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      volume: product.volumes[0],
      quantity: 1,
      gender: product.gender,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/shop/${product.slug}`} className="block group">
      <div className={cn('card-product', featured ? 'h-full' : '')}>

        {/* Image area */}
        <div className={cn(
          'relative overflow-hidden bg-nude/30',
          featured ? 'aspect-[3/4]' : 'aspect-square'
        )}>
          <PerfumePlaceholder gender={product.gender} brand={product.brand} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isBestseller && (
              <span className="bg-dark text-creme text-[0.5rem] tracking-widest uppercase px-2 py-1">
                {t('bestseller')}
              </span>
            )}
            {product.isNew && (
              <span className="bg-gold text-darker text-[0.5rem] tracking-widest uppercase px-2 py-1">
                {t('new')}
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-rose text-creme text-[0.5rem] tracking-widest uppercase px-2 py-1">
                SALE
              </span>
            )}
          </div>

          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              onClick={handleAddToCart}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-3 text-[0.6rem] tracking-widest uppercase transition-all duration-200',
                added
                  ? 'bg-gold text-darker'
                  : 'bg-dark text-creme hover:bg-darker'
              )}
            >
              <ShoppingBag size={12} strokeWidth={1.5} />
              {added ? 'Adicionado ✦' : t('add_to_cart')}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[0.55rem] tracking-widest3 uppercase text-caramel/80 mb-1">
            {product.brand}
          </p>
          <h3 className={cn(
            'font-serif text-dark leading-snug mb-2 group-hover:text-darker transition-colors duration-200',
            featured ? 'text-xl md:text-2xl' : 'text-lg'
          )}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={10}
                  strokeWidth={0}
                  className={star <= Math.round(product.rating)
                    ? 'fill-gold'
                    : 'fill-nude'
                  }
                />
              ))}
            </div>
            <span className="text-[0.55rem] text-dark/40">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className={cn('font-serif', featured ? 'text-xl' : 'text-lg', 'text-dark')}>
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-dark/30 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {featured && (
            <p className="text-xs text-dark/40 mt-2 leading-relaxed line-clamp-2">
              {product.olfactoryFamily} · {product.concentration}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
