export function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-kako-black via-transparent to-kako-black z-10" />
      
      {/* Placeholder background - reemplazar con imagen real */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-40" />
      
      {/* Grid overlay for streetwear vibe */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,45,85,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,85,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <h1 className="font-display text-6xl md:text-9xl font-bold tracking-wider mb-4">
          <span className="text-glow">KAKO</span>
        </h1>
        <p className="text-lg md:text-xl text-kako-muted uppercase tracking-[0.3em] mb-8">
          Streetwear Importado
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/catalogo" className="btn-primary">
            Ver Catálogo
          </a>
          <a href="/drops" className="btn-outline">
            Próximos Drops
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-kako-accent mx-auto" />
        <p className="text-xs uppercase tracking-widest text-kako-muted mt-2">Scroll</p>
      </div>
    </section>
  );
}
