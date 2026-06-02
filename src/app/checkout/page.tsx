'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { CreditCard, Truck, User } from 'lucide-react';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<'info' | 'shipping' | 'payment'>('info');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se integraría Mercado Pago
    // const preference = await fetch('/api/payments/create', { ... });
    alert('Integración con Mercado Pago pendiente. Orden registrada.');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Carrito vacío</h1>
        <p className="text-kako-muted mb-8">No hay productos para checkout.</p>
        <a href="/catalogo" className="btn-primary">
          Ir al catálogo
        </a>
      </div>
    );
  }

  const steps = [
    { id: 'info' as const, label: 'Datos', icon: User },
    { id: 'shipping' as const, label: 'Envío', icon: Truck },
    { id: 'payment' as const, label: 'Pago', icon: CreditCard },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-bold uppercase mb-8">Checkout</h1>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <button
              onClick={() => setStep(s.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-wider transition-all ${
                step === s.id
                  ? 'text-kako-accent border-b-2 border-kako-accent'
                  : 'text-kako-muted'
              }`}
            >
              <s.icon size={16} />
              {s.label}
            </button>
            {i < steps.length - 1 && (
              <div className="w-8 h-px bg-kako-border mx-2" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-kako-card border border-kako-border p-6 space-y-5">
            {step === 'info' && (
              <>
                <h2 className="font-display text-xl font-bold uppercase mb-4">Tus datos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">Nombre completo</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">Teléfono</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none"
                  />
                </div>
                <button type="button" onClick={() => setStep('shipping')} className="btn-primary">
                  Continuar
                </button>
              </>
            )}

            {step === 'shipping' && (
              <>
                <h2 className="font-display text-xl font-bold uppercase mb-4">Dirección de envío</h2>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">Dirección</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">Ciudad</label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">Código Postal</label>
                    <input
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none"
                    />
                  </div>
                </div>
                <button type="button" onClick={() => setStep('payment')} className="btn-primary">
                  Continuar al pago
                </button>
              </>
            )}

            {step === 'payment' && (
              <>
                <h2 className="font-display text-xl font-bold uppercase mb-4">Método de pago</h2>
                <div className="bg-kako-black border-2 border-dashed border-kako-border p-8 text-center">
                  <CreditCard size={48} className="mx-auto text-kako-muted mb-4" />
                  <p className="text-kako-muted text-sm mb-2">
                    Integración con Mercado Pago
                  </p>
                  <p className="text-xs text-kako-muted">
                    El botón de pago de MP se renderiza aquí via SDK.
                  </p>
                </div>
                <button type="submit" className="btn-primary w-full mt-4">
                  Confirmar Pedido
                </button>
              </>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-kako-card border border-kako-border p-6 h-fit sticky top-24">
          <h3 className="font-display text-lg font-bold uppercase mb-4">Resumen</h3>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-kako-muted truncate max-w-[60%]">
                  {item.product.name} x{item.quantity}
                </span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-kako-border pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-kako-accent font-display text-xl">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
