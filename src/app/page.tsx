import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Truck, Shield, Headphones, Star, Package, Zap } from 'lucide-react';

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
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase">
            ¿Por qué <span className="text-kako-accent">BA Reps</span>?
          </h2>
          <div className="w-16 h-1 bg-kako-accent mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-kako-card border border-kako-border rounded-sm hover:border-kako-accent transition-all group hover:shadow-[0_0_15px_rgba(255,45,85,0.15)]">
            <Truck className="mx-auto mb-3 text-kako-accent group-hover:scale-110 transition-transform" size={28} />
            <h4 className="font-display font-bold text-sm uppercase">Envío rápido</h4>
            <p className="text-kako-muted text-xs mt-1">24-72hs a todo el país</p>
          </div>
          <div className="text-center p-6 bg-kako-card border border-kako-border rounded-sm hover:border-kako-accent transition-all group hover:shadow-[0_0_15px_rgba(255,45,85,0.15)]">
            <Shield className="mx-auto mb-3 text-kako-accent group-hover:scale-110 transition-transform" size={28} />
            <h4 className="font-display font-bold text-sm uppercase">Compra segura</h4>
            <p className="text-kako-muted text-xs mt-1">Mercado Pago protegido</p>
          </div>
          <div className="text-center p-6 bg-kako-card border border-kako-border rounded-sm hover:border-kako-accent transition-all group hover:shadow-[0_0_15px_rgba(255,45,85,0.15)]">
            <Headphones className="mx-auto mb-3 text-kako-accent group-hover:scale-110 transition-transform" size={28} />
            <h4 className="font-display font-bold text-sm uppercase">Soporte</h4>
            <p className="text-kako-muted text-xs mt-1">Atención por WhatsApp</p>
          </div>
          <div className="text-center p-6 bg-kako-card border border-kako-border rounded-sm hover:border-kako-accent transition-all group hover:shadow-[0_0_15px_rgba(255,45,85,0.15)]">
            <Star className="mx-auto mb-3 text-kako-accent group-hover:scale-110 transition-transform" size={28} />
            <h4 className="font-display font-bold text-sm uppercase">Calidad premium</h4>
            <p className="text-kako-muted text-xs mt-1">Solo lo mejor</p>
          </div>
          <div className="text-center p-6 bg-kako-card border border-kako-border rounded-sm hover:border-kako-accent transition-all group hover:shadow-[0_0_15px_rgba(255,45,85,0.15)]">
            <Package className="mx-auto mb-3 text-kako-accent group-hover:scale-110 transition-transform" size={28} />
            <h4 className="font-display font-bold text-sm uppercase">Packaging cuidado</h4>
            <p className="text-kako-muted text-xs mt-1">Llega impecable</p>
          </div>
          <div className="text-center p-6 bg-kako-card border border-kako-border rounded-sm hover:border-kako-accent transition-all group hover:shadow-[0_0_15px_rgba(255,45,85,0.15)]">
            <Zap className="mx-auto mb-3 text-kako-accent group-hover:scale-110 transition-transform" size={28} />
            <h4 className="font-display font-bold text-sm uppercase">Drops exclusivos</h4>
            <p className="text-kako-muted text-xs mt-1">Prendas únicas</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-kako-accent/10 via-transparent to-kako-accent/5" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,45,85,0.5) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-4">
            Unite al <span className="text-kako-accent text-glow">movimiento</span>
          </h2>
          <p className="text-kako-muted max-w-lg mx-auto mb-8">
            Seguinos en Instagram para enterarte primero de los drops, descuentos exclusivos y sorteos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://instagram.com/bareps_" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
              @bareps_
            </a>
            <a href="https://wa.me/5491161242741" target="_blank" rel="noopener noreferrer" className="btn-outline inline-block">
              WhatsApp directo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
