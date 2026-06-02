'use client';

import { useParams } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { useCartStore } from '@/store/cart';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Producto no encontrado</h1>
          <a href="/catalogo" className="btn-primary">Volver al catálogo</a>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <Link href="/catalogo" className="inline-flex items-center gap-2 text-kako-muted hover:text-kako-accent transition-colors mb-8">
          <ArrowLeft size={16} />
          <span className="text-sm uppercase tracking-wider">Volver al catálogo</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-kako-card border border-kako-border overflow-hidden">
            <div className="aspect-[3/4] relative">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-kako-dark to-kako-card flex items-center justify-center">
                  <span className="font-display text-6xl opacity-20">KAKO</span>
                </div>
              )}
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-kako-accent text-white text-sm font-bold px-3 py-1">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs text-kako-muted uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold uppercase mb-4">{product.name}</h1>
            <p className="text-kako-muted mb-6">{product.description}</p>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-display text-4xl font-bold text-kako-accent">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-kako-muted text-xl line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-wider text-kako-muted mb-3">Talle</p>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 border text-sm font-bold uppercase transition-all ${
                      selectedSize === size
                        ? 'border-kako-accent text-kako-accent bg-kako-accent/10'
                        : 'border-kako-border text-kako-muted hover:border-kako-white hover:text-kako-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-kako-muted mt-2">Seleccioná un talle</p>
              )}
            </div>

            {/* Stock */}
            <p className="text-xs text-kako-muted mb-6">
              {product.stock > 0 ? (
                <span className="text-green-400">✓ En stock ({product.stock} disponibles)</span>
              ) : (
                <span className="text-red-400">✗ Sin stock</span>
              )}
            </p>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={!selectedSize || added}
              className="btn-primary flex items-center justify-center gap-3 w-full md:w-auto disabled:opacity-50 text-lg py-4 px-8"
            >
              <ShoppingBag size={20} />
              {added ? '¡Agregado!' : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
