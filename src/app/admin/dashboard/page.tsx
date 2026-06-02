'use client';

import { useState } from 'react';
import { 
  DollarSign, 
  Package, 
  Calculator, 
  LogOut, 
  TrendingUp,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { ImportCalculator } from '@/components/admin/ImportCalculator';

type Tab = 'inventory' | 'calculator' | 'stats';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('inventory');
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');

  const handleEditStart = (id: string, currentPrice: number) => {
    setEditingId(id);
    setEditPrice(String(currentPrice));
  };

  const handleEditSave = (id: string) => {
    const newPrice = parseInt(editPrice, 10);
    if (isNaN(newPrice) || newPrice <= 0) return;

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: newPrice } : p))
    );
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditPrice('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin';
  };

  const tabs = [
    { id: 'inventory' as Tab, label: 'Inventario', icon: Package },
    { id: 'calculator' as Tab, label: 'Calculadora', icon: Calculator },
    { id: 'stats' as Tab, label: 'Resumen', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-kako-black">
      {/* Admin Header */}
      <header className="bg-kako-dark border-b border-kako-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold">
              <span className="text-kako-accent">KAKO</span> Admin
            </h1>
            <span className="text-xs bg-kako-accent/20 text-kako-accent px-2 py-0.5 uppercase tracking-wider">
              Dashboard
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-kako-muted hover:text-kako-accent transition-colors"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-kako-card border border-kako-border p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-kako-accent/20 flex items-center justify-center">
                <Package size={20} className="text-kako-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-xs text-kako-muted uppercase tracking-wider">Productos</p>
              </div>
            </div>
          </div>
          <div className="bg-kako-card border border-kako-border p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 flex items-center justify-center">
                <DollarSign size={20} className="text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatPrice(products.reduce((sum, p) => sum + p.price, 0))}
                </p>
                <p className="text-xs text-kako-muted uppercase tracking-wider">Valor Total</p>
              </div>
            </div>
          </div>
          <div className="bg-kako-card border border-kako-border p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 flex items-center justify-center">
                <TrendingUp size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {products.reduce((sum, p) => sum + p.stock, 0)}
                </p>
                <p className="text-xs text-kako-muted uppercase tracking-wider">Unidades Stock</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 border-b border-kako-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm uppercase tracking-wider transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-kako-accent text-kako-accent'
                  : 'border-transparent text-kako-muted hover:text-kako-white'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'inventory' && (
          <div className="bg-kako-card border border-kako-border overflow-hidden">
            <div className="p-4 border-b border-kako-border">
              <h2 className="font-display text-xl font-bold uppercase">Gestión de Precios</h2>
              <p className="text-kako-muted text-sm mt-1">
                Editá los precios de venta al público haciendo click en el ícono de edición.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-kako-black/50">
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-kako-muted">Producto</th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-kako-muted">Categoría</th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-kako-muted">Stock</th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-kako-muted">Talles</th>
                    <th className="text-right px-6 py-3 text-xs uppercase tracking-wider text-kako-muted">Precio</th>
                    <th className="text-center px-6 py-3 text-xs uppercase tracking-wider text-kako-muted">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-kako-border">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-kako-black/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-sm">{product.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs bg-kako-border px-2 py-1 uppercase">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-bold ${product.stock < 10 ? 'text-red-400' : 'text-green-400'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-kako-muted">
                          {product.sizes.join(', ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {editingId === product.id ? (
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-28 bg-kako-black border border-kako-accent px-3 py-1 text-sm text-right focus:outline-none"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleEditSave(product.id);
                              if (e.key === 'Escape') handleEditCancel();
                            }}
                          />
                        ) : (
                          <span className="font-bold text-kako-accent">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {editingId === product.id ? (
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleEditSave(product.id)}
                              className="p-1.5 text-green-400 hover:bg-green-400/10 transition-colors"
                              title="Guardar"
                            >
                              <Save size={14} />
                            </button>
                            <button
                              onClick={handleEditCancel}
                              className="p-1.5 text-red-400 hover:bg-red-400/10 transition-colors"
                              title="Cancelar"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditStart(product.id, product.price)}
                            className="p-1.5 text-kako-muted hover:text-kako-accent transition-colors"
                            title="Editar precio"
                          >
                            <Edit3 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'calculator' && <ImportCalculator />}

        {activeTab === 'stats' && (
          <div className="bg-kako-card border border-kako-border p-8 text-center">
            <TrendingUp size={48} className="mx-auto text-kako-muted mb-4" />
            <h3 className="font-display text-xl font-bold mb-2">Próximamente</h3>
            <p className="text-kako-muted text-sm">
              Estadísticas de ventas, productos más vendidos y análisis de rentabilidad.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
