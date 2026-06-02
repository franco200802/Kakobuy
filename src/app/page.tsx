import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Marquee banner */}
      <div className="bg-kako-accent overflow-hidden py-3">
        <div className="animate-marquee whitespace-nowrap flex gap-8 text-sm font-bold uppercase tracking-widest">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>🔥 Envío gratis +$50.000</span>
              <span>⚡ Stock limitado</span>
              <span>🌎 Importación directa</span>
              <span>✓ Calidad verificada</span>
            </span>
          ))}
        </div>
      </div>

      <FeaturedProducts />

      {/* Benefits section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-kako-card border border-kako-border rounded-sm hover:border-kako-accent transition-colors">
            <Truck className="mx-auto mb-3 text-kako-accent" size={28} />
            <h4 className="font-display font-bold text-sm uppercase">Envío rápido</h4>
            <p className="text-kako-muted text-xs mt-1">24-72hs a todo el país</p>
          </div>
          <div className="text-center p-6 bg-kako-card border border-kako-border rounded-sm hover:border-kako-accent transition-colors">
            <Shield className="mx-auto mb-3 text-kako-accent" size={28} />
            <h4 className="font-display font-bold text-sm uppercase">Compra segura</h4>
            <p className="text-kako-muted text-xs mt-1">Mercado Pago protegido</p>
          </div>
          <div className="text-center p-6 bg-kako-card border border-kako-border rounded-sm hover:border-kako-accent transition-colors">
            <RefreshCw className="mx-auto mb-3 text-kako-accent" size={28} />
            <h4 className="font-display font-bold text-sm uppercase">100% Original</h4>
            <p className="text-kako-muted text-xs mt-1">Productos importados</p>
          </div>
          <div className="text-center p-6 bg-kako-card border border-kako-border rounded-sm hover:border-kako-accent transition-colors">
            <Headphones className="mx-auto mb-3 text-kako-accent" size={28} />
            <h4 className="font-display font-bold text-sm uppercase">Soporte</h4>
            <p className="text-kako-muted text-xs mt-1">Atención por WhatsApp</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-kako-accent/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-4">
            Unite al <span className="text-kako-accent text-glow">movimiento</span>
          </h2>
          <p className="text-kako-muted max-w-lg mx-auto mb-8">
            Seguinos en Instagram para enterarte primero de los drops, descuentos exclusivos y sorteos.
          </p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
            @bareps_
          </a>
        </div>
      </section>
    </>
  );
}
