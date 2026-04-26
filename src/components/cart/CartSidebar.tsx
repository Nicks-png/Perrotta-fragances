'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/navigation';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import PerfumePlaceholder from '@/components/product/PerfumePlaceholder';

export default function CartSidebar() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const router = useRouter();
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCartStore();

  const subtotal = totalPrice();
  const shipping = subtotal >= 500 ? 0 : 25.9;
  const total = subtotal + shipping;
  const itemCount = totalItems();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-darker/50 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-creme z-50 flex flex-col shadow-2xl rounded-l-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-nude">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-dark" />
                <span className="font-serif text-lg text-darker">{t('title')}</span>
                {itemCount > 0 && (
                  <span className="bg-gold text-darker text-[0.5rem] px-2 py-0.5 font-medium rounded-full">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-dark/50 hover:text-dark transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} strokeWidth={0.8} className="text-nude" />
                  <p className="font-serif text-xl text-dark/50">{t('empty')}</p>
                  <p className="text-xs text-dark/30">{t('empty_subtitle')}</p>
                  <button
                    onClick={() => {
                      closeCart();
                      router.push('/shop');
                    }}
                    className="btn-outline text-xs mt-2"
                  >
                    {t('empty_cta')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.volume}`}
                      className="flex gap-4 py-4 border-b border-nude/50 last:border-0"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-24 shrink-0 overflow-hidden rounded-xl">
                        <PerfumePlaceholder gender={item.gender} brand={item.brand} />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.55rem] tracking-widest uppercase text-caramel/80 mb-0.5">
                          {item.brand}
                        </p>
                        <p className="font-serif text-base text-darker truncate">{item.name}</p>
                        <p className="text-xs text-dark/40 mt-0.5">{item.volume}</p>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity */}
                          <div className="flex items-center border border-nude rounded-full overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.productId, item.volume, item.quantity - 1)}
                              className="px-2.5 py-1 text-dark/50 hover:text-dark hover:bg-nude/40 transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-3 text-xs border-x border-nude">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.volume, item.quantity + 1)}
                              className="px-2.5 py-1 text-dark/50 hover:text-dark hover:bg-nude/40 transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <p className="font-serif text-sm text-dark">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                            <button
                              onClick={() => removeItem(item.productId, item.volume)}
                              className="text-dark/20 hover:text-dark/60 transition-colors"
                            >
                              <Trash2 size={13} strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-nude px-6 py-5 space-y-3">
                {/* Shipping */}
                {subtotal < 500 && (
                  <div className="flex items-center justify-between text-xs text-dark/50">
                    <span>{t('shipping')}</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                )}
                {subtotal >= 500 && (
                  <div className="text-center text-[0.6rem] tracking-widest uppercase text-green-600/70 bg-green-50 py-2 rounded-xl">
                    ✓ Frete grátis incluído
                  </div>
                )}
                {subtotal < 500 && (
                  <div className="text-center text-[0.6rem] text-dark/40 bg-nude/30 py-2 rounded-xl">
                    Falta {formatCurrency(500 - subtotal)} para frete grátis
                  </div>
                )}

                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-wide text-dark/60">{t('subtotal')}</span>
                  <span className="text-xs text-dark">{formatCurrency(subtotal)}</span>
                </div>

                <div className="thin-divider" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base text-darker">{t('total')}</span>
                  <span className="font-serif text-lg text-darker">{formatCurrency(total)}</span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    closeCart();
                    router.push('/checkout');
                  }}
                  className="btn-primary w-full mt-2"
                >
                  {t('checkout')}
                </button>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-[0.6rem] tracking-widest uppercase text-dark/40 hover:text-dark/70 transition-colors py-2"
                >
                  {t('continue_shopping')}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
