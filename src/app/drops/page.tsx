'use client';

import { Clock, Bell } from 'lucide-react';

export default function DropsPage() {
  return (
    <main className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold uppercase mb-4">
            Próximos <span className="text-kako-accent">Drops</span>
          </h1>
          <p className="text-kako-muted max-w-xl mx-auto">
            Lanzamientos exclusivos con stock limitado. Seguinos en redes para no perderte nada.
          </p>
        </div>

        {/* Drops Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Drop 1 */}
          <div className="bg-kako-card border border-kako-border rounded-sm p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-kako-accent/20 text-kako-accent text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
              <Clock size={12} />
              Próximamente
            </div>
            <h3 className="font-display text-2xl font-bold uppercase mb-2">Drop #1 — Summer '26</h3>
            <p className="text-kako-muted mb-6">
              Nueva colección de remeras y shorts para el verano. Diseños exclusivos que no se repiten.
            </p>
            <div className="flex items-center gap-2 text-sm text-kako-muted">
              <Bell size={14} />
              <span>Fecha a confirmar</span>
            </div>
          </div>

          {/* Drop 2 */}
          <div className="bg-kako-card border border-kako-border rounded-sm p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-kako-accent/20 text-kako-accent text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
              <Clock size={12} />
              Próximamente
            </div>
            <h3 className="font-display text-2xl font-bold uppercase mb-2">Drop #2 — Collab</h3>
            <p className="text-kako-muted mb-6">
              Colaboración especial con artistas locales. Piezas únicas numeradas.
            </p>
            <div className="flex items-center gap-2 text-sm text-kako-muted">
              <Bell size={14} />
              <span>Fecha a confirmar</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-kako-muted mb-4">¿Querés ser el primero en enterarte?</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Seguinos en Instagram
          </a>
        </div>
      </div>
    </main>
  );
}
