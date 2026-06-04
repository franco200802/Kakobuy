export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden grain">
      {/* Background layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-kako-black via-kako-black/60 to-kako-black z-10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-kako-accent/[0.03] via-transparent to-kako-electric/[0.02] z-10" />
      
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,45,85,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,85,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-kako-accent/[0.04] rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/3 right-1/5 w-[400px] h-[400px] bg-kako-electric/[0.03] rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-purple-500/[0.02] rounded-full blur-[60px] animate-float" style={{ animationDelay: '4s' }} />

      {/* Radial vignette */}
      <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, #0a0a0a 75%)' }} />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="inline-block text-[10px] md:text-xs uppercase tracking-[0.5em] text-kako-accent/90 border border-kako-accent/20 px-5 py-2.5 mb-8 animate-fade-in-up glass-accent rounded-full">
            ✦ Streetwear Importado — Buenos Aires ✦
          </span>
        </div>
        
        <h1 className="font-display text-8xl md:text-[12rem] font-bold tracking-wider mb-0 leading-[0.85]">
          <span className="text-glow animate-pulse-neon gradient-text">BA</span>
        </h1>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[0.3em] text-kako-white/60 mb-6 -mt-2">
          REPS
        </h2>
        
        <p className="text-sm md:text-base text-kako-muted max-w-md mx-auto mb-12 leading-relaxed">
          Las mejores prendas urbanas del mundo, directo a tu puerta. <span className="text-kako-white/80">Sin intermediarios.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="/catalogo" className="btn-primary text-base md:text-lg px-10 py-4 rounded-sm">
            Comprar Ahora
          </a>
          <a href="/drops" className="btn-outline text-base md:text-lg px-10 py-4 rounded-sm">
            Próximos Drops
          </a>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 md:gap-12 text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <p className="font-display text-3xl md:text-4xl font-bold gradient-text">100+</p>
            <p className="text-[10px] md:text-xs text-kako-muted uppercase tracking-widest mt-1">Envíos</p>
          </div>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-kako-border to-transparent" />
          <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <p className="font-display text-3xl md:text-4xl font-bold gradient-text">4.9★</p>
            <p className="text-[10px] md:text-xs text-kako-muted uppercase tracking-widest mt-1">Rating</p>
          </div>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-kako-border to-transparent" />
          <div className="animate-fade-in-up" style={{ animationDelay: '700ms' }}>
            <p className="font-display text-3xl md:text-4xl font-bold gradient-text">24hs</p>
            <p className="text-[10px] md:text-xs text-kako-muted uppercase tracking-widest mt-1">Despacho</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <span className="text-[10px] uppercase tracking-[0.3em] text-kako-muted/60 mb-3">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-kako-accent/80 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
