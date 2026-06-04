'use client';

import { useParams } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { useCartStore } from '@/store/cart';
import { ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/products/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [imageHover, setImageHover] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Producto no encontrado</h1>
          <p className="text-kako-muted mb-6">El producto que buscás no existe o fue eliminado.</p>
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

  // Related products (same category, not this one)
  const related = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-kako-muted mb-8">
          <Link href="/" className="hover:text-kako-accent transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-kako-accent transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-kako-white truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div
            className="bg-kako-card border border-kako-border overflow-hidden sticky top-24"
            onMouseEnter={() => setImageHover(true)}
            onMouseLeave={() => setImageHover(false)}
          >
            <div className="aspect-[3/4] relative cursor-zoom-in">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className={`object-cover transition-transform duration-700 ${imageHover ? 'scale-110' : 'scale-100'}`}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-kako-dark to-kako-card flex items-center justify-center">
                  <span className="font-display text-6xl opacity-20">BA REPS</span>
                </div>
              )}
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-kako-accent text-white text-sm font-bold px-3 py-1 z-10">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              )}
              {product.stock <= 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <span className="font-display text-2xl uppercase text-white/80">Agotado</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs text-kako-muted uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold uppercase mb-4 leading-tight">{product.name}</h1>
            <p className="text-kako-muted mb-6 leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-display text-4xl font-bold text-kako-accent">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-kako-muted text-xl line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-wider text-kako-muted mb-3">Talle</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 border text-sm font-bold uppercase transition-all ${
                      selectedSize === size
                        ? 'border-kako-accent text-kako-accent bg-kako-accent/10 shadow-[0_0_10px_rgba(255,45,85,0.2)]'
                        : 'border-kako-border text-kako-muted hover:border-kako-white hover:text-kako-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-yellow-400/70 mt-2">⚠ Seleccioná un talle para continuar</p>
              )}
            </div>

            {/* Stock */}
            <p className="text-xs mb-6">
              {product.stock > 0 ? (
                <span className="text-green-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  En stock — {product.stock === 1 ? '¡Último disponible!' : `${product.stock} disponibles`}
                </span>
              ) : (
                <span className="text-red-400">✗ Sin stock</span>
              )}
            </p>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={!selectedSize || added || product.stock <= 0}
              className="btn-primary flex items-center justify-center gap-3 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4 px-8 mb-8"
            >
              <ShoppingBag size={20} />
              {added ? '¡Agregado al carrito!' : product.stock <= 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 border-t border-kako-border pt-6">
              <div className="text-center">
                <Truck size={18} className="mx-auto text-kako-muted mb-1.5" />
                <p className="text-[10px] text-kako-muted uppercase tracking-wider">Envío 24-72hs</p>
              </div>
              <div className="text-center">
                <Shield size={18} className="mx-auto text-kako-muted mb-1.5" />
                <p className="text-[10px] text-kako-muted uppercase tracking-wider">Compra segura</p>
              </div>
              <div className="text-center">
                <RotateCcw size={18} className="mx-auto text-kako-muted mb-1.5" />
                <p className="text-[10px] text-kako-muted uppercase tracking-wider">Cambios</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase mb-8">
              También te puede gustar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
