'use client';

import { useState, useEffect } from 'react';
import { useRouter, Link } from '@/navigation';
import { useAuthStore } from '@/store/authStore';
import { products as initialProducts } from '@/data/products';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Plus, Search, Edit2, Trash2, ArrowLeft, Star } from 'lucide-react';

export default function AdminProductsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) router.push('/login');
  }, [user, router]);

  if (!user?.isAdmin) return null;

  const filtered = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="pt-20 min-h-screen bg-creme">
      {/* Header */}
      <div className="bg-darker py-10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-creme/40 hover:text-creme transition-colors">
              <ArrowLeft size={16} strokeWidth={1.5} />
            </Link>
            <div>
              <p className="text-[0.6rem] tracking-widest3 uppercase text-gold/60 mb-1">Admin</p>
              <h1 className="font-serif text-3xl text-creme">Produtos</h1>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-gold text-xs flex items-center gap-2"
          >
            <Plus size={13} strokeWidth={2} />
            Novo Produto
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        {/* Search */}
        <div className="flex items-center gap-3 border-b border-nude pb-4 mb-6">
          <Search size={14} strokeWidth={1.5} className="text-dark/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar produtos por nome ou marca..."
            className="flex-1 bg-transparent text-sm text-dark placeholder-dark/30 focus:outline-none"
          />
          <span className="text-xs text-dark/30">{filtered.length} produtos</span>
        </div>

        {/* Table */}
        <div className="border border-nude bg-white/50 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-nude">
                {['Produto', 'Marca', 'Gênero', 'Concentração', 'Preço', 'Avaliação', 'Destaque', 'Ações'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left text-[0.55rem] tracking-widest uppercase text-dark/30">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-nude/50 hover:bg-nude/10 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-darker">{product.name}</p>
                      <p className="text-[0.6rem] text-dark/40">{product.slug}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-dark/70">{product.brand}</td>
                  <td className="px-5 py-4">
                    <span className="text-[0.55rem] tracking-widest uppercase px-2 py-1 bg-nude/40 text-dark/60">
                      {product.gender}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-dark/60">{product.concentration}</td>
                  <td className="px-5 py-4 text-xs font-medium text-dark">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star size={10} strokeWidth={0} className="fill-gold" />
                      <span className="text-xs text-dark/60">{product.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {product.isFeatured && (
                      <span className="text-[0.5rem] tracking-widest uppercase bg-gold/20 text-gold px-2 py-1">
                        Destaque
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-dark/30 hover:text-caramel transition-colors">
                        <Edit2 size={13} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-dark/30 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add product modal (simplified) */}
      {showModal && (
        <div className="fixed inset-0 bg-darker/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-creme max-w-md w-full p-8 border border-nude">
            <h2 className="font-serif text-2xl text-darker mb-6">Novo Produto</h2>
            <p className="text-xs text-dark/40 mb-6">
              Integração com banco de dados pendente. Em produção, este formulário salvará os dados no backend.
            </p>
            <div className="space-y-4">
              {['Nome', 'Marca', 'Preço (R$)', 'Concentração'].map((field) => (
                <div key={field}>
                  <label className="text-[0.6rem] tracking-widest uppercase text-dark/50 block mb-1">{field}</label>
                  <input className="w-full border-b border-nude bg-transparent py-2 text-sm text-dark focus:outline-none focus:border-caramel transition-colors" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button className="btn-primary flex-1">Salvar</button>
              <button className="btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
