'use client';

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';
import Image from 'next/image';

export function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-kako-dark border-l border-kako-border z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-kako-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-kako-accent" />
            <h2 className="font-display text-2xl font-bold uppercase">Tu Carrito</h2>
            {items.length > 0 && (
              <span className="bg-kako-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={toggleCart}
            className="p-2 hover:text-kako-accent transition-colors hover:bg-kako-card rounded"
            aria-label="Cerrar carrito"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-kako-muted">
              <ShoppingBag size={48} className="mb-4 opacity-30" />
              <p className="font-display text-xl mb-2">Carrito vacío</p>
              <p className="text-sm mb-6">Agregá productos para empezar</p>
              <button onClick={toggleCart} className="btn-outline text-sm">
                Ver catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 bg-kako-card p-3 border border-kako-border hover:border-kako-accent/30 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-kako-black flex-shrink-0 relative overflow-hidden">
                    {item.product.images[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-xs opacity-30">BA</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{item.product.name}</h3>
                    <p className="text-kako-muted text-xs mt-0.5">Talle: {item.size}</p>
                    <p className="text-kako-accent font-bold text-sm mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity - 1)
                        }
                        className="p-1 border border-kako-border hover:border-kako-accent hover:text-kako-accent transition-colors"
                        aria-label="Reducir cantidad"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity + 1)
                        }
                        className="p-1 border border-kako-border hover:border-kako-accent hover:text-kako-accent transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="p-1 ml-auto text-kako-muted hover:text-red-500 transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-kako-border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-kako-muted uppercase text-sm tracking-wider">Total</span>
              <span className="font-display text-2xl font-bold text-kako-accent">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={toggleCart}
              className="btn-primary w-full text-center block"
            >
              Finalizar Compra
            </Link>
            <button
              onClick={toggleCart}
              className="w-full text-center text-sm text-kako-muted hover:text-kako-accent transition-colors uppercase tracking-wider"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
