'use client';

import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { brands } from '@/data/brands';
import { FilterState } from '@/types';

interface Props {
  filters: FilterState;
  onChange: (filters: Partial<FilterState>) => void;
  onClear: () => void;
  totalResults: number;
}

const CONCENTRATIONS = ['EDT', 'EDP', 'Parfum', 'Cologne', 'EDC'];
const FAMILIES = [
  'Floral', 'Floral Aldeído', 'Oriental', 'Madeiroso',
  'Aromático', 'Cítrico', 'Gourmand', 'Aquático', 'Fougère', 'Chypre',
];

export default function ProductFilters({ filters, onChange, onClear, totalResults }: Props) {
  const t = useTranslations('shop');

  const hasActiveFilters = Boolean(
    filters.brand || filters.gender || filters.concentration || filters.family
  );

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[0.6rem] tracking-widest uppercase text-dark/60">{t('filters')}</p>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-[0.55rem] tracking-widest uppercase text-caramel hover:text-dark transition-colors"
          >
            <X size={10} />
            {t('clear_filters')}
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-dark/40">
        {totalResults === 1
          ? t('results', { count: totalResults })
          : t('results_plural', { count: totalResults })}
      </p>

      <div className="thin-divider" />

      {/* Brand */}
      <div>
        <p className="text-[0.6rem] tracking-widest uppercase text-dark/50 mb-3">{t('filter_brand')}</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="brand"
              value=""
              checked={filters.brand === ''}
              onChange={() => onChange({ brand: '' })}
              className="accent-dark"
            />
            <span className="text-xs text-dark/60 group-hover:text-dark transition-colors">
              {t('all_brands')}
            </span>
          </label>
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="brand"
                value={brand.name}
                checked={filters.brand === brand.name}
                onChange={() => onChange({ brand: brand.name })}
                className="accent-dark"
              />
              <span className="text-xs text-dark/60 group-hover:text-dark transition-colors">
                {brand.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="thin-divider" />

      {/* Gender */}
      <div>
        <p className="text-[0.6rem] tracking-widest uppercase text-dark/50 mb-3">{t('filter_gender')}</p>
        <div className="flex flex-wrap gap-2">
          {[
            { value: '', label: t('gender_all') },
            { value: 'feminino', label: t('gender_feminino') },
            { value: 'masculino', label: t('gender_masculino') },
            { value: 'unissex', label: t('gender_unissex') },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onChange({ gender: value })}
              className={`text-[0.6rem] tracking-widest uppercase px-3 py-1.5 border rounded-full transition-all duration-200 ${
                filters.gender === value
                  ? 'bg-dark text-creme border-dark'
                  : 'border-nude text-dark/60 hover:border-dark/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="thin-divider" />

      {/* Concentration */}
      <div>
        <p className="text-[0.6rem] tracking-widest uppercase text-dark/50 mb-3">{t('filter_concentration')}</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChange({ concentration: '' })}
            className={`text-[0.6rem] tracking-widest uppercase px-3 py-1.5 border rounded-full transition-all duration-200 ${
              filters.concentration === ''
                ? 'bg-dark text-creme border-dark'
                : 'border-nude text-dark/60 hover:border-dark/30'
            }`}
          >
            {t('all_concentrations')}
          </button>
          {CONCENTRATIONS.map((conc) => (
            <button
              key={conc}
              onClick={() => onChange({ concentration: conc })}
              className={`text-[0.6rem] tracking-widest uppercase px-3 py-1.5 border rounded-full transition-all duration-200 ${
                filters.concentration === conc
                  ? 'bg-dark text-creme border-dark'
                  : 'border-nude text-dark/60 hover:border-dark/30'
              }`}
            >
              {conc}
            </button>
          ))}
        </div>
      </div>

      <div className="thin-divider" />

      {/* Olfactory family */}
      <div>
        <p className="text-[0.6rem] tracking-widest uppercase text-dark/50 mb-3">{t('filter_family')}</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="family"
              value=""
              checked={filters.family === ''}
              onChange={() => onChange({ family: '' })}
              className="accent-dark"
            />
            <span className="text-xs text-dark/60 group-hover:text-dark transition-colors">
              {t('all_families')}
            </span>
          </label>
          {FAMILIES.map((family) => (
            <label key={family} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="family"
                value={family}
                checked={filters.family === family}
                onChange={() => onChange({ family })}
                className="accent-dark"
              />
              <span className="text-xs text-dark/60 group-hover:text-dark transition-colors">
                {family}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
