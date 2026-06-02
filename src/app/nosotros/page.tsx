'use client';

import { Package, Globe, Zap } from 'lucide-react';

export default function NosotrosPage() {
  return (
    <main className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold uppercase mb-4">
            Sobre <span className="text-kako-accent">BA Reps</span>
          </h1>
          <p className="text-kako-muted max-w-xl mx-auto text-lg">
            Traemos lo mejor del streetwear internacional directo a tu puerta.
          </p>
        </div>

        {/* Story */}
        <div className="bg-kako-card border border-kako-border rounded-sm p-8 mb-12">
          <h2 className="font-display text-2xl font-bold uppercase mb-4">Nuestra Historia</h2>
          <p className="text-kako-muted leading-relaxed mb-4">
            BA Reps nació de la pasión por la moda urbana y la frustración de no encontrar
            piezas auténticas en Argentina. Importamos directamente desde los mejores proveedores
            internacionales, asegurando calidad premium a precios accesibles.
          </p>
          <p className="text-kako-muted leading-relaxed">
            Cada prenda es seleccionada a mano, verificando calidad y autenticidad antes de
            llegar a vos. No somos una tienda más — somos tu conexión directa con el streetwear global.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-kako-card border border-kako-border rounded-sm p-6 text-center">
            <div className="w-12 h-12 bg-kako-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="text-kako-accent" size={24} />
            </div>
            <h3 className="font-display text-lg font-bold uppercase mb-2">Importación Directa</h3>
            <p className="text-kako-muted text-sm">
              Sin intermediarios. Mejores precios y piezas que no encontrás en otro lado.
            </p>
          </div>

          <div className="bg-kako-card border border-kako-border rounded-sm p-6 text-center">
            <div className="w-12 h-12 bg-kako-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-kako-accent" size={24} />
            </div>
            <h3 className="font-display text-lg font-bold uppercase mb-2">Calidad Verificada</h3>
            <p className="text-kako-muted text-sm">
              Revisamos cada prenda antes de enviarla. Si no pasa nuestro control, no sale.
            </p>
          </div>

          <div className="bg-kako-card border border-kako-border rounded-sm p-6 text-center">
            <div className="w-12 h-12 bg-kako-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-kako-accent" size={24} />
            </div>
            <h3 className="font-display text-lg font-bold uppercase mb-2">Envío Rápido</h3>
            <p className="text-kako-muted text-sm">
              Despachamos en 24-48hs. Seguimiento en tiempo real hasta tu puerta.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-16 bg-kako-card border border-kako-border rounded-sm p-8">
          <h2 className="font-display text-2xl font-bold uppercase mb-4">Contacto</h2>
          <p className="text-kako-muted mb-2">📩 Instagram: @kakobuy</p>
          <p className="text-kako-muted">📍 Buenos Aires, Argentina</p>
        </div>
      </div>
    </main>
  );
}
