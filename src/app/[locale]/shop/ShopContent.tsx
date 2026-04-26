'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { products } from '@/data/products';
import { FilterState } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';

const DEFAULT_FILTERS: FilterState = {
  brand: '',
  gender: '',
  concentration: '',
  family: '',
  priceMin: 0,
  priceMax: 9999,
  sort: 'featured',
};

export default function ShopContent() {
  const t = useTranslations('shop');
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get('brand') || '';

  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    brand: initialBrand,
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (partial: Partial<FilterState>) => {
    setFilters((f) => ({ ...f, ...partial }));
  };

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    let result = [...products];

    const q = searchParams.get('q')?.toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.olfactoryFamily.toLowerCase().includes(q)
      );
    }

    if (filters.brand) result = result.filter((p) => p.brand === filters.brand);
    if (filters.gender) result = result.filter((p) => p.gender === filters.gender);
    if (filters.concentration) result = result.filter((p) => p.concentration === filters.concentration);
    if (filters.family) result = result.filter((p) => p.olfactoryFamily === filters.family);

    switch (filters.sort) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [filters, searchParams]);

  return (
    <div className="pt-20 min-h-screen bg-creme">
      {/* Page header */}
      <div className="bg-darker py-14 md:py-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 text-center">
          <p className="text-[0.6rem] tracking-widest3 uppercase text-gold/60 mb-3">{t('subtitle')}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-creme">{t('title')}</h1>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gold/40" />
              <span className="text-gold text-sm">✦</span>
              <div className="h-px w-8 bg-gold/40" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        {/* Sort + filter bar */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-nude">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 md:hidden text-[0.65rem] tracking-widest uppercase text-dark/60"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            {t('show_filters')}
          </button>

          <p className="hidden md:block text-xs text-dark/40">
            {filtered.length === 1
              ? t('results', { count: filtered.length })
              : t('results_plural', { count: filtered.length })}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[0.6rem] tracking-widest uppercase text-dark/50">{t('sort')}</span>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange({ sort: e.target.value as FilterState['sort'] })}
              className="bg-transparent text-xs text-dark border-b border-nude focus:outline-none focus:border-caramel py-1 pr-4 appearance-none cursor-pointer"
            >
              {(['featured', 'price_asc', 'price_desc', 'rating', 'newest'] as const).map((opt) => (
                <option key={opt} value={opt}>{t(`sort_options.${opt}`)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Filters sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-56 shrink-0`}>
            <ProductFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={clearFilters}
              totalResults={filtered.length}
            />
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-dark/30 mb-4">{t('no_results')}</p>
                <button
                  onClick={clearFilters}
                  className="text-xs tracking-widest uppercase text-caramel border-b border-caramel/30 pb-0.5"
                >
                  {t('clear_filters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
