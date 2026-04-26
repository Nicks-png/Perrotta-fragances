'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency, generateOrderId } from '@/lib/utils';
import { ShippingAddress, PaymentMethod } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Check, CreditCard, Smartphone, FileText, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = ['step_cart', 'step_shipping', 'step_payment'] as const;
type Step = 0 | 1 | 2;

const INSTALLMENTS = [1, 2, 3, 6, 12];

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const { user, addOrder } = useAuthStore();
  const [step, setStep] = useState<Step>(0);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [installments, setInstallments] = useState(1);
  const [pixCopied, setPixCopied] = useState(false);

  const [address, setAddress] = useState<ShippingAddress>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const subtotal = totalPrice();
  const shipping = subtotal >= 500 ? 0 : 25.9;
  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const total = subtotal + shipping - pixDiscount;

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    const order = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      status: 'pending' as const,
      items: [...items],
      total,
      shippingAddress: address,
      paymentMethod,
    };

    addOrder(order);
    clearCart();
    router.push(`/checkout/success?order=${order.id}&name=${encodeURIComponent(address.name)}`);
  };

  if (items.length === 0 && step === 0) {
    return (
      <div className="pt-28 min-h-screen bg-creme flex flex-col items-center justify-center gap-6">
        <p className="font-serif text-2xl text-dark/40">Seu carrinho está vazio.</p>
        <Button onClick={() => router.push('/shop')} variant="outline">
          Explorar Loja
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-creme">
      <div className="max-w-screen-lg mx-auto px-6 md:px-10 py-12">

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {STEPS.map((stepKey, i) => (
            <div key={stepKey} className="flex items-center">
              <div
                className={cn(
                  'flex items-center gap-2 px-4 py-2 text-[0.6rem] tracking-widest uppercase transition-all duration-300',
                  i < step ? 'text-gold' : i === step ? 'text-dark' : 'text-dark/30'
                )}
              >
                <div className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center text-[0.5rem] border transition-all duration-300',
                  i < step ? 'bg-gold border-gold text-white' : i === step ? 'border-dark text-dark' : 'border-nude text-dark/30'
                )}>
                  {i < step ? <Check size={10} strokeWidth={2.5} /> : i + 1}
                </div>
                <span className="hidden sm:block">{t(stepKey)}</span>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight size={12} className="text-nude mx-1" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2">

            {/* Step 0: Cart review */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl text-darker mb-6">{t('step_cart')}</h2>
                {items.map((item) => (
                  <div key={`${item.productId}-${item.volume}`}
                    className="flex justify-between items-center py-4 border-b border-nude">
                    <div>
                      <p className="text-[0.55rem] tracking-widest uppercase text-caramel/70">{item.brand}</p>
                      <p className="font-serif text-base text-darker">{item.name}</p>
                      <p className="text-xs text-dark/40">{item.volume} · {t('quantity')}: {item.quantity}</p>
                    </div>
                    <p className="font-serif text-base">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
                <Button className="w-full mt-6" onClick={() => setStep(1)}>
                  {t('next')} — {t('step_shipping')}
                </Button>
              </div>
            )}

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-darker mb-6">{t('shipping_address')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <Input label={t('name')} value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })} />
                  </div>
                  <Input label={t('email')} type="email" value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })} />
                  <Input label={t('phone')} value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                  <Input label={t('cep')} value={address.cep}
                    onChange={(e) => setAddress({ ...address, cep: e.target.value })} />
                  <div className="md:col-span-2">
                    <Input label={t('street')} value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                  </div>
                  <Input label={t('number')} value={address.number}
                    onChange={(e) => setAddress({ ...address, number: e.target.value })} />
                  <Input label={t('complement')} value={address.complement}
                    onChange={(e) => setAddress({ ...address, complement: e.target.value })} />
                  <Input label={t('neighborhood')} value={address.neighborhood}
                    onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })} />
                  <Input label={t('city')} value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                  <Input label={t('state')} value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={() => setStep(0)}>{t('back')}</Button>
                  <Button className="flex-1" onClick={() => setStep(2)}>
                    {t('next')} — {t('step_payment')}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-darker mb-6">{t('payment_method')}</h2>

                {/* Payment options */}
                <div className="space-y-3">
                  {/* PIX */}
                  <button
                    onClick={() => setPaymentMethod('pix')}
                    className={cn(
                      'w-full flex items-start gap-4 p-4 border text-left transition-all duration-200',
                      paymentMethod === 'pix' ? 'border-gold bg-gold/5' : 'border-nude hover:border-caramel/30'
                    )}
                  >
                    <Smartphone size={20} strokeWidth={1.5} className="text-green-600 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-darker">{t('pix')}</p>
                        <span className="text-[0.5rem] tracking-widest uppercase bg-green-100 text-green-700 px-2 py-0.5">
                          {t('pix_discount')}
                        </span>
                      </div>
                      <p className="text-xs text-dark/50 mt-0.5">{t('pix_description')}</p>
                    </div>
                    <div className={cn('w-4 h-4 rounded-full border-2 mt-0.5 transition-all', paymentMethod === 'pix' ? 'border-gold bg-gold' : 'border-nude')} />
                  </button>

                  {/* Credit card */}
                  <button
                    onClick={() => setPaymentMethod('credit')}
                    className={cn(
                      'w-full flex items-start gap-4 p-4 border text-left transition-all duration-200',
                      paymentMethod === 'credit' ? 'border-gold bg-gold/5' : 'border-nude hover:border-caramel/30'
                    )}
                  >
                    <CreditCard size={20} strokeWidth={1.5} className="text-caramel mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-darker">{t('credit_card')}</p>
                      </div>
                      <p className="text-xs text-dark/50 mt-0.5">{t('credit_installments')}</p>
                    </div>
                    <div className={cn('w-4 h-4 rounded-full border-2 mt-0.5 transition-all', paymentMethod === 'credit' ? 'border-gold bg-gold' : 'border-nude')} />
                  </button>

                  {/* Debit card */}
                  <button
                    onClick={() => setPaymentMethod('debit')}
                    className={cn(
                      'w-full flex items-start gap-4 p-4 border text-left transition-all duration-200',
                      paymentMethod === 'debit' ? 'border-gold bg-gold/5' : 'border-nude hover:border-caramel/30'
                    )}
                  >
                    <CreditCard size={20} strokeWidth={1.5} className="text-caramel mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-darker">{t('debit_card')}</p>
                    </div>
                    <div className={cn('w-4 h-4 rounded-full border-2 mt-0.5 transition-all', paymentMethod === 'debit' ? 'border-gold bg-gold' : 'border-nude')} />
                  </button>

                  {/* Boleto */}
                  <button
                    onClick={() => setPaymentMethod('boleto')}
                    className={cn(
                      'w-full flex items-start gap-4 p-4 border text-left transition-all duration-200',
                      paymentMethod === 'boleto' ? 'border-gold bg-gold/5' : 'border-nude hover:border-caramel/30'
                    )}
                  >
                    <FileText size={20} strokeWidth={1.5} className="text-caramel mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-darker">{t('boleto')}</p>
                      <p className="text-xs text-dark/50 mt-0.5">{t('boleto_description')}</p>
                    </div>
                    <div className={cn('w-4 h-4 rounded-full border-2 mt-0.5 transition-all', paymentMethod === 'boleto' ? 'border-gold bg-gold' : 'border-nude')} />
                  </button>
                </div>

                {/* PIX QR code mock */}
                {paymentMethod === 'pix' && (
                  <div className="border border-nude p-6 text-center space-y-4">
                    <p className="text-xs tracking-widest uppercase text-dark/50">{t('pix_scan')}</p>
                    <div className="mx-auto w-36 h-36 bg-nude/30 border border-nude flex items-center justify-center">
                      <div className="grid grid-cols-7 gap-0.5 p-2 opacity-60">
                        {Array.from({ length: 49 }).map((_, i) => (
                          <div key={i} className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-dark' : 'bg-transparent'}`} />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => { setPixCopied(true); setTimeout(() => setPixCopied(false), 2000); }}
                      className="text-[0.65rem] tracking-widest uppercase border border-nude px-4 py-2 text-dark/60 hover:border-caramel transition-colors"
                    >
                      {pixCopied ? '✓ Código copiado' : t('pix_copy')}
                    </button>
                  </div>
                )}

                {/* Card form */}
                {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                  <div className="space-y-5 border border-nude p-6">
                    <Input label={t('card_number')} placeholder="0000 0000 0000 0000" />
                    <Input label={t('card_name')} placeholder="NOME COMO NO CARTÃO" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label={t('card_expiry')} placeholder="MM/AA" />
                      <Input label={t('card_cvv')} placeholder="CVV" />
                    </div>
                    {paymentMethod === 'credit' && (
                      <div>
                        <p className="text-[0.6rem] tracking-widest uppercase text-dark/50 mb-2">{t('installments')}</p>
                        <div className="flex flex-wrap gap-2">
                          {INSTALLMENTS.map((n) => (
                            <button
                              key={n}
                              onClick={() => setInstallments(n)}
                              className={cn('text-xs px-3 py-1.5 border transition-all', installments === n ? 'bg-dark text-creme border-dark' : 'border-nude text-dark/60')}
                            >
                              {n}x {formatCurrency(total / n)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={() => setStep(1)}>{t('back')}</Button>
                  <Button className="flex-1" loading={loading} onClick={handlePlaceOrder}>
                    {t('place_order')}
                  </Button>
                </div>

                <p className="text-center text-[0.6rem] tracking-wide text-dark/30">
                  🔒 {t('secure')}
                </p>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="border border-nude p-5 sticky top-24">
              <p className="text-[0.6rem] tracking-widest uppercase text-dark/50 mb-4">{t('order_summary')}</p>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.volume}`} className="flex justify-between text-xs">
                    <span className="text-dark/60">{item.brand} {item.name} × {item.quantity}</span>
                    <span className="text-dark shrink-0 ml-2">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="thin-divider mb-3" />
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-dark/60">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-dark/60">
                  <span>Frete</span>
                  <span>{shipping === 0 ? 'Grátis' : formatCurrency(shipping)}</span>
                </div>
                {pixDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto Pix (5%)</span>
                    <span>-{formatCurrency(pixDiscount)}</span>
                  </div>
                )}
              </div>
              <div className="thin-divider my-3" />
              <div className="flex justify-between">
                <span className="font-serif text-base text-darker">Total</span>
                <span className="font-serif text-lg text-darker">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
