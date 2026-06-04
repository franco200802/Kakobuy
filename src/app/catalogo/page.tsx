'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/mock-data';

export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const base = MOCK_PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesStock = !onlyInStock || product.stock > 0;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesStock && matchesSearch;
    });

    const sorted = [...base];

    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'));
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return sorted;
  }, [activeCategory, onlyInStock, searchTerm, sortBy]);

  const clearFilters = () => {
    setActiveCategory('all');
    setSearchTerm('');
    setSortBy('featured');
    setOnlyInStock(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-28 pb-12">
      {/* Header */}
      <div className="mb-12">
        <span className="text-[10px] uppercase tracking-[0.4em] text-kako-accent mb-2 block">Nuestra colección</span>
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase">
          Catálogo
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-kako-accent to-transparent mt-4" />
        <p className="text-kako-muted mt-4 text-sm uppercase tracking-wider">
          {filteredProducts.length} producto{filteredProducts.length === 1 ? '' : 's'}
        </p>
      </div>

      {/* Search and controls */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-3 mb-6">
        <label className="relative block">
          <span className="sr-only">Buscar productos</span>
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-kako-muted"
            aria-hidden="true"
          />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar por nombre o descripción..."
            className="w-full bg-kako-card border border-kako-border rounded-lg focus:border-kako-accent outline-none pl-9 pr-4 py-2.5 text-sm transition-colors"
          />
        </label>

        <label className="inline-flex items-center gap-2 px-3 py-2.5 bg-kako-card border border-kako-border rounded-lg">
          <SlidersHorizontal size={16} className="text-kako-muted" aria-hidden="true" />
          <span className="sr-only">Ordenar productos</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
            className="bg-transparent text-sm uppercase tracking-wider text-kako-white outline-none cursor-pointer"
          >
            <option value="featured" className="bg-kako-card">Destacados</option>
            <option value="price-asc" className="bg-kako-card">Menor precio</option>
            <option value="price-desc" className="bg-kako-card">Mayor precio</option>
            <option value="name" className="bg-kako-card">Nombre A-Z</option>
          </select>
        </label>

        <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-kako-card border border-kako-border rounded-lg text-xs uppercase tracking-wider cursor-pointer hover:border-kako-accent/40 transition-colors">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(event) => setOnlyInStock(event.target.checked)}
            className="accent-kako-accent w-3.5 h-3.5"
          />
          Solo en stock
        </label>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-xs uppercase tracking-wider border rounded-full transition-all duration-300 ${
              activeCategory === cat.id
                ? 'border-kako-accent bg-gradient-to-r from-kako-accent to-kako-accent-light text-white shadow-lg shadow-kako-accent/20'
                : 'border-kako-border text-kako-muted hover:border-kako-accent/50 hover:text-kako-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
        <button
          onClick={clearFilters}
          className="ml-auto text-xs uppercase tracking-wider text-kako-muted hover:text-kako-accent transition-colors"
        >
          ✕ Limpiar
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-24 border border-dashed border-kako-border rounded-lg bg-kako-card/30">
          <p className="text-kako-muted font-display text-2xl mb-2">
            No encontramos productos
          </p>
          <p className="text-kako-muted text-sm mb-6">Probá con otros filtros o buscá algo diferente</p>
          <button onClick={clearFilters} className="btn-outline text-sm rounded-sm">
            Restablecer búsqueda
          </button>
        </div>
      )}
    </div>
  );
}
