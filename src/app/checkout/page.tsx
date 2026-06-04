'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { CreditCard, Truck, User, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<'info' | 'shipping' | 'payment' | 'success'>('info');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      // Guardar pedido
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            size: item.size,
            quantity: item.quantity,
            price: item.product.price,
          })),
          total: getTotalPrice(),
        }),
      });

      // Armar mensaje de WhatsApp con el pedido
      const itemsList = items.map((item) =>
        `• ${item.product.name} (${item.size}) x${item.quantity} - ${formatPrice(item.product.price * item.quantity)}`
      ).join('\n');

      const msg = `*--- NUEVO PEDIDO BA REPS ---*\n\n` +
        `*Nombre:* ${formData.name}\n` +
        `*Tel:* ${formData.phone}\n` +
        `*Direccion:* ${formData.address}, ${formData.city} (${formData.zip})\n\n` +
        `*Productos:*\n${itemsList}\n\n` +
        `*TOTAL: ${formatPrice(getTotalPrice())}*\n\n` +
        `Quiero confirmar mi pedido.`;

      const waNumber = '5491161242741'; // Tu número de WhatsApp
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

      clearCart();
      setStep('success');

      // Abrir WhatsApp en nueva pestaña
      window.open(waUrl, '_blank');
    } catch {
      alert('Error al procesar el pedido. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle size={64} className="mx-auto text-green-400 mb-6" />
        <h1 className="font-display text-4xl font-bold mb-4">¡Pedido Enviado!</h1>
        <p className="text-kako-muted mb-2">
          Gracias <span className="text-kako-white font-bold">{formData.name}</span>.
        </p>
        <p className="text-kako-muted mb-4">
          Se abrió WhatsApp con los detalles de tu pedido. Enviá el mensaje para confirmar.
        </p>
        <p className="text-xs text-kako-muted mb-8">
          ⚠️ El pedido se confirma recién cuando nos contestemos por WhatsApp y coordinemos el pago.
        </p>
        <a href="/catalogo" className="btn-primary">Seguir comprando</a>
      </div>
    );
  }

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
    { id: 'payment' as const, label: 'Confirmar', icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-28 pb-12">
      <h1 className="font-display text-4xl font-bold uppercase mb-2">Checkout</h1>
      <p className="text-kako-muted text-sm mb-8">Completá tus datos para finalizar el pedido</p>

      {/* Steps indicator */}
      <div className="flex items-center mb-10 overflow-x-auto pb-2">
        {steps.map((s, i) => {
          const isCompleted = i < currentStepIndex;
          const isCurrent = i === currentStepIndex;
          return (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => {
                  if (i <= currentStepIndex) setStep(s.id);
                }}
                disabled={i > currentStepIndex}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm uppercase tracking-wider transition-all rounded disabled:cursor-not-allowed ${
                  isCurrent
                    ? 'text-kako-accent bg-kako-accent/10 border border-kako-accent/30'
                    : isCompleted
                    ? 'text-green-400'
                    : 'text-kako-muted'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                  isCurrent ? 'border-kako-accent text-kako-accent' : isCompleted ? 'border-green-400 bg-green-400 text-black' : 'border-kako-border text-kako-muted'
                }`}>
                  {isCompleted ? '✓' : i + 1}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`w-8 h-px mx-1 ${isCompleted ? 'bg-green-400' : 'bg-kako-border'}`} />
              )}
            </div>
          );
        })}
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
                <h2 className="font-display text-xl font-bold uppercase mb-4">Confirmar pedido</h2>
                <div className="bg-kako-black border border-kako-border p-5 space-y-2 text-sm mb-4">
                  <p><span className="text-kako-muted">Nombre:</span> {formData.name}</p>
                  <p><span className="text-kako-muted">WhatsApp:</span> {formData.phone}</p>
                  <p><span className="text-kako-muted">Email:</span> {formData.email}</p>
                  <p><span className="text-kako-muted">Envío a:</span> {formData.address}, {formData.city} ({formData.zip})</p>
                </div>
                <div className="bg-kako-black/50 border border-kako-border p-4 text-center text-sm text-kako-muted">
                  <CreditCard size={32} className="mx-auto mb-2 text-green-400" />
                  <p className="text-kako-white font-bold mb-1">Pago por WhatsApp</p>
                  <p>Al confirmar se abre WhatsApp con tu pedido. Coordinamos pago y entrega ahí.</p>
                  <p className="text-xs mt-2 text-yellow-400">⚠️ No se descuenta stock hasta confirmar por chat</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-4 disabled:opacity-50"
                >
                  {loading ? 'Procesando...' : 'Confirmar Pedido'}
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
