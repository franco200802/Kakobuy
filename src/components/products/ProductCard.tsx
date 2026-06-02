'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuickAdd = () => {
    addItem(product, product.sizes[0]);
  };

  return (
    <div className="card-product group">
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-kako-dark overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-kako-muted">
          {/* Placeholder si no hay imagen */}
          <div className="w-full h-full bg-gradient-to-br from-kako-dark to-kako-card flex items-center justify-center">
            <span className="font-display text-4xl opacity-20">KAKO</span>
          </div>
        </div>

        {/* Discount badge */}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-kako-accent text-white text-xs font-bold px-2 py-1 z-10">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}

        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <button
            onClick={handleQuickAdd}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <ShoppingBag size={16} />
            Agregar
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-kako-muted uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-lg font-semibold leading-tight mb-2 group-hover:text-kako-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-kako-muted text-sm line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="flex gap-1 mt-3">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="text-xs border border-kako-border px-2 py-0.5 text-kako-muted"
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
