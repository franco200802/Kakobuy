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
    <article className="card-product group h-full flex flex-col">
      <Link href={`/producto/${product.slug}`} className="block flex-1">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-kako-dark overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-kako-muted">
              <div className="w-full h-full bg-gradient-to-br from-kako-dark to-kako-card flex items-center justify-center">
                <span className="font-display text-4xl opacity-20">BA REPS</span>
              </div>
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

          {/* Discount badge */}
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-kako-accent to-kako-accent-light text-white text-[10px] font-bold px-2.5 py-1 z-10 rounded-sm shadow-lg shadow-kako-accent/20">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute top-3 right-3 glass text-white text-[10px] font-bold px-2.5 py-1 z-10 uppercase tracking-wider rounded-sm">
              Agotado
            </div>
          )}

          {/* Quick view label */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[2] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="glass text-[10px] uppercase tracking-widest text-white/80 px-4 py-1.5 rounded-full">
              Ver detalle
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 pb-3">
          <p className="text-[10px] text-kako-muted uppercase tracking-widest mb-1.5">
            {product.category}
          </p>
          <h3 className="font-display text-base font-semibold leading-tight mb-2 group-hover:text-kako-accent transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-kako-white">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-kako-muted text-xs line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex gap-1.5 mt-3">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="text-[10px] border border-kako-border px-2 py-0.5 text-kako-muted rounded-sm group-hover:border-kako-accent/30 transition-colors"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4 mt-auto">
        <button
          onClick={handleQuickAdd}
          disabled={isOutOfStock}
          className="btn-primary flex items-center justify-center gap-2 text-[11px] w-full py-2.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:from-kako-muted disabled:to-kako-muted rounded-sm"
        >
          <ShoppingBag size={13} />
          {isOutOfStock ? 'No disponible' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  );
}
