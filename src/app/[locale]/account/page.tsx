'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/navigation';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Package, User, Heart, LogOut, Shield } from 'lucide-react';

const STATUS_STYLES = {
  pending: 'bg-yellow-50 text-yellow-700',
  processing: 'bg-blue-50 text-blue-700',
  shipped: 'bg-purple-50 text-purple-700',
  delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
};

export default function AccountPage() {
  const t = useTranslations('account');
  const router = useRouter();
  const { user, orders, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="pt-20 min-h-screen bg-creme">
      {/* Page header */}
      <div className="bg-darker py-12">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <p className="text-[0.6rem] tracking-widest3 uppercase text-gold/60 mb-2">{t('title')}</p>
          <h1 className="font-serif text-3xl text-creme">
            {t('hello', { name: user.name.split(' ')[0] })}
          </h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar nav */}
          <aside className="w-full md:w-56 shrink-0">
            <nav className="space-y-1">
              {[
                { id: 'orders', label: t('nav_orders'), icon: Package },
                { id: 'profile', label: t('nav_profile'), icon: User },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as typeof activeTab)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase transition-all duration-200 text-left',
                    activeTab === id
                      ? 'bg-dark text-creme'
                      : 'text-dark/60 hover:text-dark hover:bg-nude/40'
                  )}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  {label}
                </button>
              ))}

              {user.isAdmin && (
                <Link
                  href="/admin"
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase text-gold/70 hover:text-gold hover:bg-gold/5 transition-all duration-200"
                >
                  <Shield size={14} strokeWidth={1.5} />
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase text-dark/30 hover:text-dark/60 hover:bg-nude/40 transition-all duration-200 mt-4"
              >
                <LogOut size={14} strokeWidth={1.5} />
                {t('nav_logout')}
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'orders' && (
              <div>
                <h2 className="font-serif text-2xl text-darker mb-6">{t('orders_title')}</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-16 border border-nude">
                    <Package size={40} strokeWidth={0.8} className="text-nude mx-auto mb-4" />
                    <p className="font-serif text-xl text-dark/40 mb-4">{t('no_orders')}</p>
                    <Link href="/shop" className="btn-outline">
                      {t('no_orders_cta')}
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-nude p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[0.55rem] tracking-widest uppercase text-dark/40 mb-1">
                              {t('order_number')}{order.id}
                            </p>
                            <p className="text-xs text-dark/50">{formatDate(order.date)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              'text-[0.55rem] tracking-widest uppercase px-2 py-1',
                              STATUS_STYLES[order.status]
                            )}>
                              {t(`status_${order.status}`)}
                            </span>
                            <p className="font-serif text-base text-darker">
                              {formatCurrency(order.total)}
                            </p>
                          </div>
                        </div>
                        <div className="thin-divider" />
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item) => (
                            <span key={`${item.productId}-${item.volume}`}
                              className="text-[0.6rem] text-dark/50 bg-nude/30 px-2 py-1">
                              {item.brand} {item.name} {item.volume} × {item.quantity}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="font-serif text-2xl text-darker mb-6">{t('profile_title')}</h2>
                <div className="border border-nude p-6 space-y-6 max-w-md">
                  <div>
                    <p className="text-[0.6rem] tracking-widest uppercase text-dark/40 mb-1">Nome</p>
                    <p className="text-sm text-dark">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-widest uppercase text-dark/40 mb-1">E-mail</p>
                    <p className="text-sm text-dark">{user.email}</p>
                  </div>
                  {user.isAdmin && (
                    <div>
                      <p className="text-[0.6rem] tracking-widest uppercase text-dark/40 mb-1">Perfil</p>
                      <span className="text-[0.6rem] tracking-widest uppercase text-gold bg-gold/10 px-2 py-1">
                        Administrador
                      </span>
                    </div>
                  )}
                  <Button variant="outline" size="sm">{t('save_changes')}</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
