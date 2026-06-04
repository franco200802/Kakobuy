'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/drops', label: 'Drops' },
    { href: '/nosotros', label: 'Nosotros' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'glass border-kako-border/50 shadow-2xl shadow-black/30' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl md:text-3xl font-bold tracking-wider hover:scale-105 transition-transform">
          <span className="text-kako-white">BA</span> <span className="gradient-text">REPS</span>
        </Link>

        {/* Nav Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-widest transition-all duration-300 px-4 py-2 rounded-full relative ${
                pathname === link.href
                  ? 'text-kako-accent bg-kako-accent/10'
                  : 'text-kako-white/70 hover:text-kako-white hover:bg-kako-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleCart}
            className="relative p-2.5 hover:bg-kako-white/5 rounded-full transition-all duration-300"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-kako-accent to-kako-accent-light text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-glow shadow-lg shadow-kako-accent/30">
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
        <div className="md:hidden bg-kako-dark/95 backdrop-blur-lg border-t border-kako-border">
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-widest py-3 px-4 transition-colors rounded ${
                  pathname === link.href
                    ? 'text-kako-accent bg-kako-accent/10'
                    : 'text-kako-white hover:text-kako-accent hover:bg-kako-card'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
