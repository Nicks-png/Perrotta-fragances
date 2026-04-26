'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/navigation';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency, formatDate } from '@/lib/utils';
import { TrendingUp, ShoppingBag, Package, Users, ArrowRight, ExternalLink } from 'lucide-react';

const MOCK_STATS = {
  revenue: 18450.0,
  orders: 47,
  products: 12,
  newCustomers: 23,
};

const MOCK_RECENT_ORDERS = [
  { id: 'A8X2K1', date: '2024-04-25T10:30:00Z', customer: 'Mariana S.', total: 890, status: 'delivered' },
  { id: 'B3P7Q2', date: '2024-04-24T15:00:00Z', customer: 'Rafael T.', total: 750, status: 'shipped' },
  { id: 'C9M4R3', date: '2024-04-24T09:15:00Z', customer: 'Camila R.', total: 1280, status: 'processing' },
  { id: 'D1N8S4', date: '2024-04-23T18:45:00Z', customer: 'Ana C.', total: 580, status: 'pending' },
  { id: 'E5K2T5', date: '2024-04-23T11:00:00Z', customer: 'Lucas M.', total: 420, status: 'delivered' },
];

const STATUS_STYLES = {
  pending: 'bg-yellow-50 text-yellow-700',
  processing: 'bg-blue-50 text-blue-700',
  shipped: 'bg-purple-50 text-purple-700',
  delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
};

const STATUS_LABELS = {
  pending: 'Pendente',
  processing: 'Em separação',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

export default function AdminDashboard() {
  const t = useTranslations('admin');
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || !user.isAdmin) router.push('/login');
  }, [user, router]);

  if (!user?.isAdmin) return null;

  return (
    <div className="pt-20 min-h-screen bg-creme">
      {/* Header */}
      <div className="bg-darker py-10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <div>
            <p className="text-[0.6rem] tracking-widest3 uppercase text-gold/60 mb-1">Perrotta Fragrances</p>
            <h1 className="font-serif text-3xl text-creme">{t('title')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/products"
              className="text-[0.6rem] tracking-widest uppercase text-creme/50 hover:text-creme flex items-center gap-1.5 transition-colors">
              {t('products')} <ExternalLink size={10} />
            </Link>
            <Link href="/admin/orders"
              className="text-[0.6rem] tracking-widest uppercase text-creme/50 hover:text-creme flex items-center gap-1.5 transition-colors">
              {t('orders')} <ExternalLink size={10} />
            </Link>
            <Link href="/"
              className="text-[0.6rem] tracking-widest uppercase text-creme/50 hover:text-creme flex items-center gap-1.5 transition-colors">
              Ver site <ExternalLink size={10} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: t('revenue'), value: formatCurrency(MOCK_STATS.revenue), icon: TrendingUp, trend: '+12%' },
            { label: t('total_orders'), value: MOCK_STATS.orders, icon: ShoppingBag, trend: '+8%' },
            { label: t('total_products'), value: MOCK_STATS.products, icon: Package, trend: '' },
            { label: t('new_customers'), value: MOCK_STATS.newCustomers, icon: Users, trend: '+15%' },
          ].map(({ label, value, icon: Icon, trend }) => (
            <div key={label} className="bg-white/70 border border-nude p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[0.6rem] tracking-widest uppercase text-dark/40">{label}</p>
                <Icon size={16} strokeWidth={1.5} className="text-caramel" />
              </div>
              <p className="font-serif text-2xl text-darker">{value}</p>
              {trend && (
                <p className="text-[0.6rem] text-green-600 mt-1">{trend} {t('this_month')}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent orders */}
          <div className="lg:col-span-2 border border-nude bg-white/50">
            <div className="flex items-center justify-between px-5 py-4 border-b border-nude">
              <p className="text-[0.6rem] tracking-widest uppercase text-dark/50">{t('recent_orders')}</p>
              <Link href="/admin/orders" className="text-[0.6rem] tracking-widest uppercase text-caramel flex items-center gap-1">
                {t('view')} <ArrowRight size={10} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-nude">
                    {['Pedido', 'Cliente', 'Data', 'Total', 'Status'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[0.55rem] tracking-widest uppercase text-dark/30">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_RECENT_ORDERS.map((order) => (
                    <tr key={order.id} className="border-b border-nude/50 hover:bg-nude/20 transition-colors">
                      <td className="px-5 py-4 text-xs font-medium text-dark">#{order.id}</td>
                      <td className="px-5 py-4 text-xs text-dark/70">{order.customer}</td>
                      <td className="px-5 py-4 text-xs text-dark/50">{formatDate(order.date)}</td>
                      <td className="px-5 py-4 text-xs font-medium text-dark">{formatCurrency(order.total)}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[0.55rem] tracking-widest uppercase px-2 py-1 rounded-full ${STATUS_STYLES[order.status as keyof typeof STATUS_STYLES]}`}>
                          {STATUS_LABELS[order.status as keyof typeof STATUS_LABELS]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick actions */}
          <div className="space-y-4">
            <div className="border border-nude bg-white/50 p-5">
              <p className="text-[0.6rem] tracking-widest uppercase text-dark/40 mb-4">Ações Rápidas</p>
              <div className="space-y-2">
                {[
                  { href: '/admin/products', label: t('add_product'), icon: Package },
                  { href: '/admin/orders', label: 'Ver todos os pedidos', icon: ShoppingBag },
                  { href: '/shop', label: 'Visualizar loja', icon: ExternalLink },
                ].map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-4 py-3 text-xs text-dark/60 hover:text-dark hover:bg-nude/40 transition-all duration-200 tracking-wide"
                  >
                    <Icon size={14} strokeWidth={1.5} className="text-caramel" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Brands breakdown */}
            <div className="border border-nude bg-white/50 p-5">
              <p className="text-[0.6rem] tracking-widest uppercase text-dark/40 mb-4">Vendas por Marca</p>
              {[
                { brand: 'Chanel', pct: 28 },
                { brand: 'Dior', pct: 22 },
                { brand: 'Parfums de Marly', pct: 18 },
                { brand: 'Carolina Herrera', pct: 15 },
                { brand: 'Outros', pct: 17 },
              ].map(({ brand, pct }) => (
                <div key={brand} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-dark/60">{brand}</span>
                    <span className="text-dark/40">{pct}%</span>
                  </div>
                  <div className="h-1 bg-nude rounded-full overflow-hidden">
                    <div className="h-full bg-gold/60 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
