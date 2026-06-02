'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-kako-black/90 backdrop-blur-md border-b border-kako-border">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-3xl font-bold tracking-wider hover:text-kako-accent transition-colors">
          KAKO<span className="text-kako-accent">BUY</span>
        </Link>

        {/* Nav Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/catalogo" className="text-sm uppercase tracking-widest hover:text-kako-accent transition-colors">
            Catálogo
          </Link>
          <Link href="/drops" className="text-sm uppercase tracking-widest hover:text-kako-accent transition-colors">
            Drops
          </Link>
          <Link href="/nosotros" className="text-sm uppercase tracking-widest hover:text-kako-accent transition-colors">
            Nosotros
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="relative p-2 hover:text-kako-accent transition-colors"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-kako-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-kako-dark border-t border-kako-border animate-slide-up">
          <div className="flex flex-col p-4 gap-4">
            <Link href="/catalogo" className="text-sm uppercase tracking-widest py-2" onClick={() => setIsMenuOpen(false)}>
              Catálogo
            </Link>
            <Link href="/drops" className="text-sm uppercase tracking-widest py-2" onClick={() => setIsMenuOpen(false)}>
              Drops
            </Link>
            <Link href="/nosotros" className="text-sm uppercase tracking-widest py-2" onClick={() => setIsMenuOpen(false)}>
              Nosotros
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
