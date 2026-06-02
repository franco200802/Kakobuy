import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'KAKO | Streetwear Imports',
  description: 'Ropa urbana importada. Estilo callejero, calidad premium.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
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
