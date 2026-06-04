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
        <h1 className="font-display text-5xl md:text-6xl font-bold uppercase">
          Catálogo
        </h1>
        <div className="w-20 h-1 bg-kako-accent mt-4" />
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
            placeholder="Buscar por nombre o descripción"
            className="w-full bg-kako-card border border-kako-border focus:border-kako-accent outline-none pl-9 pr-4 py-2.5 text-sm"
          />
        </label>

        <label className="inline-flex items-center gap-2 px-3 py-2.5 bg-kako-card border border-kako-border">
          <SlidersHorizontal size={16} className="text-kako-muted" aria-hidden="true" />
          <span className="sr-only">Ordenar productos</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
            className="bg-transparent text-sm uppercase tracking-wider text-kako-white outline-none"
          >
            <option value="featured" className="bg-kako-card">Destacados primero</option>
            <option value="price-asc" className="bg-kako-card">Precio: menor a mayor</option>
            <option value="price-desc" className="bg-kako-card">Precio: mayor a menor</option>
            <option value="name" className="bg-kako-card">Nombre A-Z</option>
          </select>
        </label>

        <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-kako-card border border-kako-border text-xs uppercase tracking-wider cursor-pointer">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(event) => setOnlyInStock(event.target.checked)}
            className="accent-kako-accent"
          />
          Solo en stock
        </label>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
              activeCategory === cat.id
                ? 'border-kako-accent bg-kako-accent text-white'
                : 'border-kako-border text-kako-muted hover:border-kako-accent hover:text-kako-accent'
            }`}
          >
            {cat.name}
          </button>
        ))}
        <button
          onClick={clearFilters}
          className="ml-auto text-xs uppercase tracking-wider text-kako-muted hover:text-kako-accent transition-colors"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 border border-dashed border-kako-border bg-kako-card/40">
          <p className="text-kako-muted font-display text-2xl">
            No encontramos productos con esos filtros
          </p>
          <button onClick={clearFilters} className="btn-outline mt-6 text-sm">
            Restablecer búsqueda
          </button>
        </div>
      )}
    </div>
  );
}
