'use client';

import { useState, useEffect } from 'react';
import { useRouter, Link } from '@/navigation';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowLeft, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const STATUS_OPTIONS = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const;

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

const MOCK_ORDERS = [
  { id: 'A8X2K1', date: '2024-04-25T10:30:00Z', customer: 'Mariana S.', email: 'mariana@email.com', total: 890, status: 'delivered', items: 1 },
  { id: 'B3P7Q2', date: '2024-04-24T15:00:00Z', customer: 'Rafael T.', email: 'rafael@email.com', total: 750, status: 'shipped', items: 1 },
  { id: 'C9M4R3', date: '2024-04-24T09:15:00Z', customer: 'Camila R.', email: 'camila@email.com', total: 1280, status: 'processing', items: 1 },
  { id: 'D1N8S4', date: '2024-04-23T18:45:00Z', customer: 'Ana C.', email: 'ana@email.com', total: 580, status: 'pending', items: 2 },
  { id: 'E5K2T5', date: '2024-04-23T11:00:00Z', customer: 'Lucas M.', email: 'lucas@email.com', total: 420, status: 'delivered', items: 1 },
  { id: 'F2R9V6', date: '2024-04-22T14:20:00Z', customer: 'Beatriz L.', email: 'beatriz@email.com', total: 1170, status: 'shipped', items: 2 },
  { id: 'G7B4W7', date: '2024-04-22T08:00:00Z', customer: 'João P.', email: 'joao@email.com', total: 380, status: 'delivered', items: 1 },
];

export default function AdminOrdersPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orders, setOrders] = useState(MOCK_ORDERS);

  useEffect(() => {
    if (!user?.isAdmin) router.push('/login');
  }, [user, router]);

  if (!user?.isAdmin) return null;

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="pt-20 min-h-screen bg-creme">
      {/* Header */}
      <div className="bg-darker py-10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center gap-4">
          <Link href="/admin" className="text-creme/40 hover:text-creme transition-colors">
            <ArrowLeft size={16} strokeWidth={1.5} />
          </Link>
          <div>
            <p className="text-[0.6rem] tracking-widest3 uppercase text-gold/60 mb-1">Admin</p>
            <h1 className="font-serif text-3xl text-creme">Pedidos</h1>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex items-center gap-3 border-b border-nude pb-3 flex-1">
            <Search size={14} strokeWidth={1.5} className="text-dark/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por cliente ou número do pedido..."
              className="flex-1 bg-transparent text-sm text-dark placeholder-dark/30 focus:outline-none"
            />
          </div>

          {/* Status filter */}
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  'text-[0.55rem] tracking-widest uppercase px-3 py-1.5 border transition-all duration-200',
                  statusFilter === status
                    ? 'bg-dark text-creme border-dark'
                    : 'border-nude text-dark/50 hover:border-dark/30'
                )}
              >
                {status === 'all' ? 'Todos' : STATUS_LABELS[status as keyof typeof STATUS_LABELS]}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="border border-nude bg-white/50 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-nude">
                {['Pedido', 'Cliente', 'Data', 'Itens', 'Total', 'Status', 'Ação'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left text-[0.55rem] tracking-widest uppercase text-dark/30">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-nude/50 hover:bg-nude/10 transition-colors">
                  <td className="px-5 py-4 text-xs font-medium text-darker">#{order.id}</td>
                  <td className="px-5 py-4">
                    <p className="text-xs text-dark">{order.customer}</p>
                    <p className="text-[0.6rem] text-dark/40">{order.email}</p>
                  </td>
                  <td className="px-5 py-4 text-xs text-dark/50">{formatDate(order.date)}</td>
                  <td className="px-5 py-4 text-xs text-dark/60 text-center">{order.items}</td>
                  <td className="px-5 py-4 text-xs font-medium text-dark">{formatCurrency(order.total)}</td>
                  <td className="px-5 py-4">
                    <span className={cn(
                      'text-[0.55rem] tracking-widest uppercase px-2 py-1',
                      STATUS_STYLES[order.status as keyof typeof STATUS_STYLES]
                    )}>
                      {STATUS_LABELS[order.status as keyof typeof STATUS_LABELS]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="text-[0.55rem] tracking-widest uppercase bg-transparent border border-nude text-dark/60 px-2 py-1 focus:outline-none focus:border-caramel cursor-pointer"
                    >
                      {STATUS_OPTIONS.filter(s => s !== 'all').map((s) => (
                        <option key={s} value={s}>{STATUS_LABELS[s as keyof typeof STATUS_LABELS]}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-dark/30">Nenhum pedido encontrado.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 text-xs text-dark/40 text-right">
          {filtered.length} pedido(s) · Total: {formatCurrency(filtered.reduce((sum, o) => sum + o.total, 0))}
        </div>
      </div>
    </div>
  );
}
