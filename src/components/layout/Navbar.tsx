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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-kako-black/95 backdrop-blur-lg border-kako-border shadow-lg shadow-black/20' : 'bg-kako-black/80 backdrop-blur-md border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-3xl font-bold tracking-wider hover:text-kako-accent transition-colors">
          BA <span className="text-kako-accent">REPS</span>
        </Link>

        {/* Nav Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm uppercase tracking-widest transition-colors relative ${
                pathname === link.href
                  ? 'text-kako-accent'
                  : 'text-kako-white hover:text-kako-accent'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-kako-accent" />
              )}
            </Link>
          ))}
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
