'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { Star, ShoppingBag, Share2, ChevronLeft } from 'lucide-react';
import { Link } from '@/navigation';
import { getProductBySlug, products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import PerfumePlaceholder from '@/components/product/PerfumePlaceholder';
import OlfactoryPyramid from '@/components/product/OlfactoryPyramid';
import ReviewSection from '@/components/product/ReviewSection';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';

export default function ProductPage() {
  const params = useParams();
  const slug = params.id as string;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const t = useTranslations('product');
  const { addItem } = useCartStore();
  const [selectedVolume, setSelectedVolume] = useState(product.volumes[0]);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      volume: selectedVolume,
      quantity: 1,
      gender: product.gender,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const related = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.gender === product.gender))
    .slice(0, 4);

  const genderLabel = {
    feminino: t('gender_for') + ' Ela',
    masculino: t('gender_for') + ' Ele',
    unissex: 'Unissex',
  }[product.gender];

  return (
    <div className="pt-20 min-h-screen bg-creme">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-[0.6rem] tracking-widest uppercase text-dark/40">
          <Link href="/shop" className="hover:text-dark transition-colors flex items-center gap-1">
            <ChevronLeft size={10} />
            Loja
          </Link>
          <span>/</span>
          <span>{product.brand}</span>
          <span>/</span>
          <span className="text-dark/70">{product.name}</span>
        </div>

        {/* Main product area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">

          {/* Image */}
          <div className="relative">
            <div className="aspect-[3/4] max-w-md mx-auto md:mx-0 bg-nude/20 border border-nude/40 overflow-hidden rounded-3xl">
              <PerfumePlaceholder gender={product.gender} brand={product.brand} size="lg" />
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isBestseller && (
                <span className="bg-dark text-creme text-[0.5rem] tracking-widest uppercase px-3 py-1.5 rounded-full">
                  {t('bestseller')}
                </span>
              )}
              {product.isNew && (
                <span className="bg-gold text-darker text-[0.5rem] tracking-widest uppercase px-3 py-1.5 rounded-full">
                  {t('new')}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Brand + gender */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-[0.6rem] tracking-widest3 uppercase text-caramel">
                {product.brand}
              </p>
              <span className="text-[0.55rem] tracking-widest uppercase text-dark/40 border border-nude px-2 py-1">
                {genderLabel}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-serif text-4xl md:text-5xl text-darker leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={13} strokeWidth={0}
                    className={star <= Math.round(product.rating) ? 'fill-gold' : 'fill-nude'} />
                ))}
              </div>
              <span className="text-xs text-dark/50">
                {product.rating.toFixed(1)} · {product.reviewCount} {t('reviews')}
              </span>
            </div>

            {/* Family + concentration */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[0.6rem] tracking-widest uppercase text-dark/40 bg-nude/40 px-3 py-1.5 rounded-full">
                {product.olfactoryFamily}
              </span>
              <span className="text-[0.6rem] tracking-widest uppercase text-dark/40 bg-nude/40 px-3 py-1.5 rounded-full">
                {product.concentration}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <p className="font-serif text-3xl text-darker">
                {formatCurrency(product.price)}
              </p>
              {product.originalPrice && (
                <p className="text-base text-dark/30 line-through">
                  {formatCurrency(product.originalPrice)}
                </p>
              )}
            </div>

            {/* Volume selector */}
            <div className="mb-8">
              <p className="text-[0.6rem] tracking-widest uppercase text-dark/50 mb-3">
                {t('volume')}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.volumes.map((vol) => (
                  <button
                    key={vol}
                    onClick={() => setSelectedVolume(vol)}
                    className={`px-4 py-2 text-xs border rounded-full transition-all duration-200 ${
                      selectedVolume === vol
                        ? 'bg-dark text-creme border-dark'
                        : 'border-nude text-dark hover:border-dark/40'
                    }`}
                  >
                    {vol}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <Button
              onClick={handleAddToCart}
              variant={added ? 'gold' : 'primary'}
              size="lg"
              className="w-full mb-3"
            >
              {added ? (
                <span>Adicionado ao Carrinho ✦</span>
              ) : (
                <>
                  <ShoppingBag size={15} strokeWidth={1.5} />
                  {t('add_to_cart')}
                </>
              )}
            </Button>

            {/* Shipping info */}
            <p className="text-center text-[0.6rem] tracking-wide text-dark/40 mb-8">
              {t('free_shipping')} · Produtos 100% originais
            </p>

            {/* Description */}
            <div className="border-t border-nude pt-6">
              <p className="text-[0.6rem] tracking-widest uppercase text-dark/40 mb-3">
                {t('description')}
              </p>
              <p className="text-sm text-dark/60 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 mt-6 text-[0.6rem] tracking-widest uppercase text-dark/30 hover:text-dark/60 transition-colors w-fit">
              <Share2 size={12} strokeWidth={1.5} />
              {t('share')}
            </button>
          </div>
        </div>

        {/* Olfactory pyramid */}
        <div className="mb-20 max-w-xl">
          <OlfactoryPyramid notes={product.notes} />
        </div>

        {/* Divider */}
        <div className="thin-divider mb-20" />

        {/* Reviews */}
        <div className="mb-20">
          <ReviewSection
            productId={product.id}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="thin-divider mb-10" />
            <p className="section-label mb-3">{product.brand}</p>
            <h2 className="section-title mb-10">{t('related_title')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
