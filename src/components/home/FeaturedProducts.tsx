import { ProductCard } from '@/components/products/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Flame } from 'lucide-react';

export function FeaturedProducts() {
  const featured = MOCK_PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex items-center justify-between mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Flame size={20} className="text-kako-accent" />
            <span className="text-xs uppercase tracking-widest text-kako-accent font-bold">Lo más vendido</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
            Destacados
          </h2>
          <div className="w-20 h-1 bg-kako-accent mt-3" />
        </div>
        <a
          href="/catalogo"
          className="text-sm uppercase tracking-widest text-kako-muted hover:text-kako-accent transition-colors hidden sm:inline-flex items-center gap-2"
        >
          Ver todo
          <span className="text-lg">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Mobile "ver todo" */}
      <div className="mt-8 text-center sm:hidden">
        <a href="/catalogo" className="btn-outline text-sm">
          Ver todo el catálogo →
        </a>
      </div>
    </section>
  );
}
