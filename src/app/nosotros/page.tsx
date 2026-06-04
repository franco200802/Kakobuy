'use client';

import { Package, Globe, Zap, Users, TrendingUp, Heart, MessageCircle } from 'lucide-react';

export default function NosotrosPage() {
  return (
    <main className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-4">
            Sobre <span className="text-kako-accent text-glow">BA Reps</span>
          </h1>
          <p className="text-kako-muted max-w-xl mx-auto text-lg">
            Traemos lo mejor del streetwear internacional directo a tu puerta. Sin vueltas.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: '100+', label: 'Pedidos enviados' },
            { value: '4.9', label: 'Calificación' },
            { value: '24hs', label: 'Despacho promedio' },
            { value: '0', label: 'Reclamos sin resolver' },
          ].map((stat) => (
            <div key={stat.label} className="text-center bg-kako-card border border-kako-border p-5 hover:border-kako-accent/40 transition-colors">
              <p className="font-display text-2xl md:text-3xl font-bold text-kako-accent">{stat.value}</p>
              <p className="text-[10px] md:text-xs text-kako-muted uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-kako-card border border-kako-border rounded-sm p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-kako-accent/5 rounded-full blur-2xl" />
            <h2 className="font-display text-2xl font-bold uppercase mb-4 flex items-center gap-3">
              <Heart size={20} className="text-kako-accent" />
              Nuestra Historia
            </h2>
            <p className="text-kako-muted leading-relaxed mb-4">
              BA Reps nació de la pasión por la moda urbana y la frustración de no encontrar
              piezas auténticas en Argentina a buen precio.
            </p>
            <p className="text-kako-muted leading-relaxed">
              Importamos directamente desde los mejores proveedores internacionales,
              asegurando calidad premium sin los márgenes abusivos.
            </p>
          </div>
          <div className="bg-kako-card border border-kako-border rounded-sm p-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-kako-accent/5 rounded-full blur-2xl" />
            <h2 className="font-display text-2xl font-bold uppercase mb-4 flex items-center gap-3">
              <TrendingUp size={20} className="text-kako-accent" />
              Cómo trabajamos
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-kako-accent font-bold text-sm mt-0.5">01</span>
                <p className="text-kako-muted text-sm">Seleccionamos las mejores prendas de proveedores verificados</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-kako-accent font-bold text-sm mt-0.5">02</span>
                <p className="text-kako-muted text-sm">Verificamos calidad antes de importar: costuras, materiales, detalles</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-kako-accent font-bold text-sm mt-0.5">03</span>
                <p className="text-kako-muted text-sm">Hacemos QC final en Argentina y despachamos en 24-48hs</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-kako-accent font-bold text-sm mt-0.5">04</span>
                <p className="text-kako-muted text-sm">Soporte post-venta real. No desaparecemos después de vender.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold uppercase mb-8 text-center">
            ¿Qué nos diferencia?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-kako-card border border-kako-border rounded-sm p-6 text-center group hover:border-kako-accent/50 transition-all hover:shadow-[0_0_20px_rgba(255,45,85,0.1)]">
              <div className="w-14 h-14 bg-kako-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-kako-accent/20 transition-colors">
                <Globe className="text-kako-accent" size={24} />
              </div>
              <h3 className="font-display text-lg font-bold uppercase mb-2">Importación Directa</h3>
              <p className="text-kako-muted text-sm">
                Sin intermediarios. Mejores precios y piezas que no encontrás en otro lado.
              </p>
            </div>

            <div className="bg-kako-card border border-kako-border rounded-sm p-6 text-center group hover:border-kako-accent/50 transition-all hover:shadow-[0_0_20px_rgba(255,45,85,0.1)]">
              <div className="w-14 h-14 bg-kako-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-kako-accent/20 transition-colors">
                <Package className="text-kako-accent" size={24} />
              </div>
              <h3 className="font-display text-lg font-bold uppercase mb-2">QC Estricto</h3>
              <p className="text-kako-muted text-sm">
                Revisamos cada prenda antes de enviarla. Si no pasa nuestro control, no sale.
              </p>
            </div>

            <div className="bg-kako-card border border-kako-border rounded-sm p-6 text-center group hover:border-kako-accent/50 transition-all hover:shadow-[0_0_20px_rgba(255,45,85,0.1)]">
              <div className="w-14 h-14 bg-kako-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-kako-accent/20 transition-colors">
                <Zap className="text-kako-accent" size={24} />
              </div>
              <h3 className="font-display text-lg font-bold uppercase mb-2">Envío Express</h3>
              <p className="text-kako-muted text-sm">
                Despachamos en 24-48hs. Seguimiento en tiempo real hasta tu puerta.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold uppercase mb-8 text-center">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { text: 'Increíble calidad, el hoodie es pesadísimo y los detalles son perfectos. Ya compré 3 veces.', name: 'Matías L.', stars: 5 },
              { text: 'Pedí un lunes y el miércoles ya lo tenía. El packaging es de otro nivel.', name: 'Valentina R.', stars: 5 },
              { text: 'Mejor que comprar en Taobao directo. Te ahorrás quilombos y llega impecable.', name: 'Tomás G.', stars: 5 },
            ].map((review, i) => (
              <div key={i} className="bg-kako-card border border-kako-border p-5 relative">
                <div className="text-yellow-400 text-xs mb-3">
                  {'★'.repeat(review.stars)}
                </div>
                <p className="text-sm text-kako-muted italic mb-4">&ldquo;{review.text}&rdquo;</p>
                <p className="text-xs font-bold text-kako-white">{review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center bg-gradient-to-b from-kako-card to-kako-black border border-kako-border rounded-sm p-10">
          <Users size={32} className="mx-auto text-kako-accent mb-4" />
          <h2 className="font-display text-2xl font-bold uppercase mb-2">¿Tenés dudas?</h2>
          <p className="text-kako-muted mb-6 text-sm max-w-md mx-auto">
            Escribinos por WhatsApp o Instagram. Respondemos rápido y sin vueltas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/5491161242741?text=Hola!%20Tengo%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href="https://instagram.com/bareps_"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
