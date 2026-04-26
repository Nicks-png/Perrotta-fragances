'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { Link } from '@/navigation';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import PerfumePlaceholder from '@/components/product/PerfumePlaceholder';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const t = useTranslations('cart');
  const router = useRouter();
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();
  const subtotal = totalPrice();
  const shipping = subtotal >= 500 ? 0 : 25.9;
  const total = subtotal + shipping;

  return (
    <div className="pt-20 min-h-screen bg-creme">
      <div className="bg-darker py-12">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 text-center">
          <h1 className="font-serif text-4xl text-creme">{t('title')}</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <ShoppingBag size={52} strokeWidth={0.8} className="text-nude" />
            <p className="font-serif text-2xl text-dark/40">{t('empty')}</p>
            <p className="text-sm text-dark/30">{t('empty_subtitle')}</p>
            <Link href="/shop" className="btn-primary">{t('empty_cta')}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.volume}`}
                  className="flex gap-5 p-5 border border-nude bg-white/50">
                  <div className="w-24 h-28 shrink-0 overflow-hidden">
                    <PerfumePlaceholder gender={item.gender} brand={item.brand} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.55rem] tracking-widest uppercase text-caramel/80 mb-0.5">{item.brand}</p>
                    <p className="font-serif text-xl text-darker mb-1">{item.name}</p>
                    <p className="text-xs text-dark/40">{item.volume}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-nude">
                        <button onClick={() => updateQuantity(item.productId, item.volume, item.quantity - 1)}
                          className="px-3 py-2 text-dark/50 hover:text-dark hover:bg-nude/40 transition-colors">
                          <Minus size={11} />
                        </button>
                        <span className="px-4 text-sm border-x border-nude">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.volume, item.quantity + 1)}
                          className="px-3 py-2 text-dark/50 hover:text-dark hover:bg-nude/40 transition-colors">
                          <Plus size={11} />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-serif text-xl text-darker">{formatCurrency(item.price * item.quantity)}</p>
                        <button onClick={() => removeItem(item.productId, item.volume)}
                          className="text-dark/20 hover:text-dark/60 transition-colors">
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="border border-nude p-6 sticky top-24">
                <p className="text-[0.6rem] tracking-widest uppercase text-dark/40 mb-5">{t('order_summary')}</p>
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between text-dark/60">
                    <span>{t('subtotal')}</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-dark/60">
                    <span>{t('shipping')}</span>
                    <span>{shipping === 0 ? t('shipping_free') : formatCurrency(shipping)}</span>
                  </div>
                </div>
                <div className="thin-divider my-4" />
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif text-base text-darker">{t('total')}</span>
                  <span className="font-serif text-xl text-darker">{formatCurrency(total)}</span>
                </div>
                <Button className="w-full" onClick={() => router.push('/checkout')}>
                  {t('checkout')}
                </Button>
                <Link href="/shop" className="block text-center text-[0.6rem] tracking-widest uppercase text-dark/40 hover:text-dark/70 transition-colors py-3 mt-2">
                  {t('continue_shopping')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
