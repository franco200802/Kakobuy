'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isOutOfStock = product.stock <= 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuickAdd = () => {
    if (isOutOfStock) return;
    addItem(product, product.sizes[0]);
  };

  return (
    <article className="card-product group block h-full">
      <Link href={`/producto/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-kako-dark overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-kako-muted">
              <div className="w-full h-full bg-gradient-to-br from-kako-dark to-kako-card flex items-center justify-center">
                <span className="font-display text-4xl opacity-20">BA REPS</span>
              </div>
            </div>
          )}

          {/* Discount badge */}
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-kako-accent text-white text-xs font-bold px-2 py-1 z-10">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute top-3 right-3 bg-black/80 border border-kako-border text-white text-[10px] font-bold px-2 py-1 z-10 uppercase tracking-wider">
              Sin stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 pb-3">
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

      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={handleQuickAdd}
          disabled={isOutOfStock}
          className="btn-primary flex items-center justify-center gap-2 text-xs w-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingBag size={14} />
          {isOutOfStock ? 'No disponible' : 'Agregar rápido'}
        </button>
      </div>
    </article>
  );
}
