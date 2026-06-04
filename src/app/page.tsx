import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Truck, Shield, Headphones, Star, Package, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Marquee banner */}
      <div className="bg-gradient-to-r from-kako-accent via-kako-accent-light to-kako-accent overflow-hidden py-3 relative">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)' }} />
        <div className="animate-marquee whitespace-nowrap flex gap-8 text-sm font-bold uppercase tracking-widest relative z-10">
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
      <section className="max-w-7xl mx-auto px-4 py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kako-accent/[0.02] to-transparent pointer-events-none" />
        <div className="text-center mb-14 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.4em] text-kako-accent mb-3 block">Nuestras ventajas</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase">
            ¿Por qué <span className="gradient-text">BA Reps</span>?
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-kako-accent to-transparent mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
          <div className="text-center p-6 md:p-8 bg-kako-card/50 border border-kako-border rounded-lg hover:border-kako-accent/40 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(255,45,85,0.08)] hover:-translate-y-1">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-kako-accent/10 flex items-center justify-center group-hover:bg-kako-accent/20 group-hover:scale-110 transition-all duration-300">
              <Truck className="text-kako-accent" size={22} />
            </div>
            <h4 className="font-display font-bold text-sm uppercase mb-1">Envío rápido</h4>
            <p className="text-kako-muted text-xs">24-72hs a todo el país</p>
          </div>
          <div className="text-center p-6 md:p-8 bg-kako-card/50 border border-kako-border rounded-lg hover:border-kako-accent/40 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(255,45,85,0.08)] hover:-translate-y-1">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-kako-accent/10 flex items-center justify-center group-hover:bg-kako-accent/20 group-hover:scale-110 transition-all duration-300">
              <Shield className="text-kako-accent" size={22} />
            </div>
            <h4 className="font-display font-bold text-sm uppercase mb-1">Compra segura</h4>
            <p className="text-kako-muted text-xs">Mercado Pago protegido</p>
          </div>
          <div className="text-center p-6 md:p-8 bg-kako-card/50 border border-kako-border rounded-lg hover:border-kako-accent/40 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(255,45,85,0.08)] hover:-translate-y-1">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-kako-accent/10 flex items-center justify-center group-hover:bg-kako-accent/20 group-hover:scale-110 transition-all duration-300">
              <Headphones className="text-kako-accent" size={22} />
            </div>
            <h4 className="font-display font-bold text-sm uppercase mb-1">Soporte 24/7</h4>
            <p className="text-kako-muted text-xs">Atención por WhatsApp</p>
          </div>
          <div className="text-center p-6 md:p-8 bg-kako-card/50 border border-kako-border rounded-lg hover:border-kako-accent/40 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(255,45,85,0.08)] hover:-translate-y-1">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-kako-accent/10 flex items-center justify-center group-hover:bg-kako-accent/20 group-hover:scale-110 transition-all duration-300">
              <Star className="text-kako-accent" size={22} />
            </div>
            <h4 className="font-display font-bold text-sm uppercase mb-1">Premium</h4>
            <p className="text-kako-muted text-xs">Solo lo mejor del mercado</p>
          </div>
          <div className="text-center p-6 md:p-8 bg-kako-card/50 border border-kako-border rounded-lg hover:border-kako-accent/40 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(255,45,85,0.08)] hover:-translate-y-1">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-kako-accent/10 flex items-center justify-center group-hover:bg-kako-accent/20 group-hover:scale-110 transition-all duration-300">
              <Package className="text-kako-accent" size={22} />
            </div>
            <h4 className="font-display font-bold text-sm uppercase mb-1">Packaging</h4>
            <p className="text-kako-muted text-xs">Llega impecable</p>
          </div>
          <div className="text-center p-6 md:p-8 bg-kako-card/50 border border-kako-border rounded-lg hover:border-kako-accent/40 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(255,45,85,0.08)] hover:-translate-y-1">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-kako-accent/10 flex items-center justify-center group-hover:bg-kako-accent/20 group-hover:scale-110 transition-all duration-300">
              <Zap className="text-kako-accent" size={22} />
            </div>
            <h4 className="font-display font-bold text-sm uppercase mb-1">Exclusivo</h4>
            <p className="text-kako-muted text-xs">Drops únicos</p>
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
