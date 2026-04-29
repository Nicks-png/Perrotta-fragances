'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useReveal } from '@/lib/useReveal';
import { getFeaturedProducts } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import PerfumeBottle, { type BottleTone } from '@/components/brand/PerfumeBottle';
import type { Product } from '@/types';

const BRAND_TONES: Record<string, BottleTone> = {
  Chanel: 'creme',
  Dior: 'rose',
  Valentino: 'gold',
  Prada: 'creme',
  'Parfums de Marly': 'rose',
  'Carolina Herrera': 'nude',
  'Hugo Boss': 'caramel',
  'Dolce & Gabbana': 'gold',
};

const toneFor = (p: Product): BottleTone => BRAND_TONES[p.brand] ?? 'creme';

const tagFor = (p: Product): { label: string; kind: 'new' | 'bestseller' } | null => {
  if (p.isNew) return { label: 'Novo', kind: 'new' };
  if (p.isBestseller) return { label: 'Bestseller', kind: 'bestseller' };
  return null;
};

interface CardProps {
  product: Product;
  featured?: boolean;
  onAdd: (p: Product) => void;
}

function ProductCard({ product, featured, onAdd }: CardProps) {
  const tag = tagFor(product);
  const tone = toneFor(product);
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="card-editorial reveal"
      style={{ height: '100%' }}
    >
      <div className="img-wrap" style={featured ? { aspectRatio: '1 / 1.1' } : undefined}>
        <div className="bottle">
          <PerfumeBottle tone={tone} size={featured ? '78%' : '70%'} />
        </div>
        {(tag || product.originalPrice) && (
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            {tag && (
              <span
                className={`badge ${tag.kind === 'new' ? 'badge-new' : 'badge-bestseller'}`}
              >
                {tag.label}
              </span>
            )}
            {product.originalPrice && (
              <span className="badge badge-sale">
                −{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            onAdd(product);
          }}
          aria-label="Adicionar ao carrinho"
          className="quick-add"
          style={{
            position: 'absolute',
            bottom: 18,
            right: 18,
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'var(--color-creme-soft)',
            border: '1px solid var(--line)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-dark)',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      <div style={{ padding: '22px 22px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span className="rule-short" style={{ width: 18 }} />
          <p
            style={{
              fontSize: 9,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--color-caramel)',
              margin: 0,
            }}
          >
            {product.brand}
          </p>
        </div>
        <h3
          className="font-display"
          style={{
            fontSize: featured ? 32 : 24,
            margin: '4px 0 10px',
            color: 'var(--color-darker)',
            fontWeight: 400,
            lineHeight: 1.1,
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            fontSize: 11,
            fontStyle: 'italic',
            color: 'var(--color-caramel-deep)',
            margin: '0 0 16px',
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          }}
        >
          {product.olfactoryFamily} · Eau de {product.concentration === 'EDP' ? 'Parfum' : 'Toilette'}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span
            className="font-display"
            style={{ fontSize: 20, color: 'var(--color-dark)' }}
          >
            R$ {product.price.toLocaleString('pt-BR')}
          </span>
          {product.originalPrice && (
            <span
              style={{
                fontSize: 11,
                color: 'var(--color-dark)',
                opacity: 0.4,
                textDecoration: 'line-through',
              }}
            >
              R$ {product.originalPrice.toLocaleString('pt-BR')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProducts() {
  const t = useTranslations('home.featured');
  const tCommon = useTranslations('common');
  useReveal();

  const featured = getFeaturedProducts();
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (p: Product) => {
    addItem({
      productId: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      volume: p.volumes[0] ?? '50ml',
      quantity: 1,
      gender: p.gender,
    });
  };

  // Layout: hero card (1 large) + 4 small + 3 row
  const hero = featured[0];
  const rightFour = featured.slice(1, 5);
  const bottomThree = featured.slice(5, 8); // may be empty/sparse

  return (
    <section id="shop" className="section-editorial" style={{ background: 'var(--color-creme)' }}>
      <div className="container-editorial">
        <div
          className="reveal"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: 64,
          }}
        >
          <span className="rule-diamond" style={{ marginBottom: 24 }}>
            <span />
            <i />
            <span />
          </span>
          <p className="eyebrow-thin" style={{ marginBottom: 18 }}>
            {t('label')}
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(40px, 5.5vw, 76px)',
              margin: 0,
              fontWeight: 300,
              color: 'var(--color-darker)',
              lineHeight: 1.05,
              maxWidth: 800,
              textWrap: 'balance',
            }}
          >
            {t('title')}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 17,
              color: 'var(--color-caramel-deep)',
              maxWidth: 540,
              margin: '20px 0 0',
              lineHeight: 1.7,
            }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Asymmetric editorial grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          style={{ alignItems: 'stretch' }}
        >
          {hero && (
            <div className="lg:col-span-6">
              <ProductCard product={hero} featured onAdd={handleAdd} />
            </div>
          )}
          {rightFour.length > 0 && (
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {rightFour.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={handleAdd} />
              ))}
            </div>
          )}
          {bottomThree.length > 0 && (
            <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {bottomThree.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={handleAdd} />
              ))}
            </div>
          )}
        </div>

        <div
          className="reveal"
          style={{
            marginTop: 72,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
          }}
        >
          <span className="rule-thin" style={{ width: 280 }} />
          <Link href="/shop" className="btn-pill">
            {tCommon('see_all')}
          </Link>
        </div>
      </div>
    </section>
  );
}
