export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-kako-black via-kako-black/50 to-kako-black z-10" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,45,85,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,85,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating accent blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kako-accent/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-kako-electric/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <div className="mb-6">
          <span className="inline-block text-xs uppercase tracking-[0.4em] text-kako-accent border border-kako-accent/30 px-4 py-2 mb-6 animate-fade-in-up">
            Streetwear Importado — Buenos Aires
          </span>
        </div>
        <h1 className="font-display text-7xl md:text-[10rem] font-bold tracking-wider mb-2 leading-none">
          <span className="text-glow animate-pulse-neon">BA</span>
        </h1>
        <h2 className="font-display text-2xl md:text-4xl font-bold tracking-wider text-kako-muted mb-2">
          REPS
        </h2>
        <p className="text-base md:text-lg text-kako-muted max-w-md mx-auto mb-10">
          Las mejores prendas urbanas del mundo, directo a tu puerta. Sin intermediarios.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="/catalogo" className="btn-primary text-lg px-8 py-4">
            Comprar Ahora
          </a>
          <a href="/drops" className="btn-outline text-lg px-8 py-4">
            Próximos Drops
          </a>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 md:gap-10 text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <p className="font-display text-2xl md:text-3xl font-bold text-kako-accent">100+</p>
            <p className="text-[10px] md:text-xs text-kako-muted uppercase tracking-wider">Envíos realizados</p>
          </div>
          <div className="w-px h-8 bg-kako-border" />
          <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <p className="font-display text-2xl md:text-3xl font-bold text-kako-accent">4.9★</p>
            <p className="text-[10px] md:text-xs text-kako-muted uppercase tracking-wider">Calificación</p>
          </div>
          <div className="w-px h-8 bg-kako-border" />
          <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <p className="font-display text-2xl md:text-3xl font-bold text-kako-accent">24hs</p>
            <p className="text-[10px] md:text-xs text-kako-muted uppercase tracking-wider">Despacho rápido</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-widest text-kako-muted mb-2">Scroll</span>
        <div className="w-5 h-9 border-2 border-kako-muted/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-kako-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
