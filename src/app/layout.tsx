import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'KakoBuy Imports',
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
        <main className="pt-20">{children}</main>
        <CartDrawer />
        <footer className="border-t border-kako-border mt-20 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-display text-2xl tracking-wider text-kako-accent text-glow">
              KAKO
            </p>
            <p className="text-kako-muted text-sm mt-2">
              Streetwear importado · Buenos Aires, Argentina
            </p>
            <p className="text-kako-muted text-xs mt-4">
              © {new Date().getFullYear()} KAKO. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
