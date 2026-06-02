'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/mock-data';

export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts =
    activeCategory === 'all'
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-display text-5xl md:text-6xl font-bold uppercase">
          Catálogo
        </h1>
        <div className="w-20 h-1 bg-kako-accent mt-4" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
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
        <div className="text-center py-20">
          <p className="text-kako-muted font-display text-2xl">
            No hay productos en esta categoría
          </p>
        </div>
      )}
    </div>
  );
}
