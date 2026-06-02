import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'BA Reps',
  description: 'Ropa urbana importada. Estilo callejero, calidad premium.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-kako-black text-kako-white font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
        <footer className="border-t border-kako-border mt-20 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="font-display text-3xl tracking-wider text-kako-accent text-glow mb-2">BA REPS</p>
                <p className="text-kako-muted text-sm">Streetwear importado de calidad premium. Buenos Aires, Argentina.</p>
              </div>
              <div>
                <h4 className="font-display font-bold uppercase text-sm mb-3">Links</h4>
                <div className="flex flex-col gap-2 text-sm text-kako-muted">
                  <a href="/catalogo" className="hover:text-kako-accent transition-colors">Catálogo</a>
                  <a href="/drops" className="hover:text-kako-accent transition-colors">Drops</a>
                  <a href="/nosotros" className="hover:text-kako-accent transition-colors">Nosotros</a>
                </div>
              </div>
              <div>
                <h4 className="font-display font-bold uppercase text-sm mb-3">Contacto</h4>
                <div className="flex flex-col gap-2 text-sm text-kako-muted">
                  <span>📩 @bareps_</span>
                  <span>💬 WhatsApp disponible</span>
                  <span>📍 Buenos Aires, AR</span>
                </div>
              </div>
            </div>
            <div className="border-t border-kako-border pt-6 text-center">
              <p className="text-kako-muted text-xs">
                © {new Date().getFullYear()} BA Reps. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
