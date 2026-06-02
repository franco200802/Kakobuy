'use client';

import { useState } from 'react';
import { Calculator, DollarSign, Truck, Percent, Package } from 'lucide-react';

/**
 * Calculadora de Importaciones integrada en el Admin Panel.
 * Contenedor #compras-container - preparado para integrar tu código base existente.
 * Las variables CSS --bg, --card, --accent se heredan del tema global.
 */
export function ImportCalculator() {
  const [dolarRate, setDolarRate] = useState(1450);
  const [productCostUSD, setProductCostUSD] = useState(0);
  const [shippingMode, setShippingMode] = useState<'manual' | 'weight'>('weight');
  const [shippingUSD, setShippingUSD] = useState(0);
  const [weightKg, setWeightKg] = useState(0.5);
  const [shippingRatePerKg, setShippingRatePerKg] = useState(12); // USD por kg (promedio agente)
  const [quantity, setQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState(50); // % impuestos/tasas locales
  const [marginPercent, setMarginPercent] = useState(100); // % ganancia deseada
  const [nationalShippingUSD, setNationalShippingUSD] = useState(0.97); // flete nacional China

  // Cálculos
  const effectiveShippingUSD = shippingMode === 'weight'
    ? weightKg * shippingRatePerKg * quantity
    : shippingUSD;
  const productCostARS = productCostUSD * dolarRate;
  const nationalShippingARS = nationalShippingUSD * dolarRate;
  const shippingPerUnit = (effectiveShippingUSD * dolarRate) / (quantity || 1);
  const subtotalPerUnit = productCostARS + nationalShippingARS + shippingPerUnit;
  const taxesPerUnit = subtotalPerUnit * (taxRate / 100);
  const totalCostPerUnit = subtotalPerUnit + taxesPerUnit;
  const suggestedPrice = totalCostPerUnit * (1 + marginPercent / 100);
  const profitPerUnit = suggestedPrice - totalCostPerUnit;

  const formatARS = (value: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div id="compras-container" className="space-y-6">
      {/* Header */}
      <div className="bg-kako-card border border-kako-border p-6">
        <div className="flex items-center gap-3 mb-2">
          <Calculator size={24} className="text-kako-accent" />
          <h2 className="font-display text-2xl font-bold uppercase">Calculadora de Importaciones</h2>
        </div>
        <p className="text-kako-muted text-sm">
          Calculá el costo real por unidad y definí tu precio de venta óptimo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs Panel */}
        <div className="bg-kako-card border border-kako-border p-6 space-y-5">
          <h3 className="font-display text-lg font-bold uppercase flex items-center gap-2">
            <DollarSign size={18} className="text-kako-neon" />
            Datos de Compra
          </h3>

          {/* Cotización dólar */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">
              Cotización USD/ARS
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-kako-muted text-sm">$</span>
              <input
                type="number"
                value={dolarRate}
                onChange={(e) => setDolarRate(Number(e.target.value))}
                className="w-full bg-kako-black border border-kako-border pl-8 pr-4 py-3 text-sm focus:border-kako-accent focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Costo producto USD */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">
              Costo producto (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-kako-muted text-sm">U$D</span>
              <input
                type="number"
                step="0.01"
                value={productCostUSD || ''}
                onChange={(e) => setProductCostUSD(Number(e.target.value))}
                className="w-full bg-kako-black border border-kako-border pl-12 pr-4 py-3 text-sm focus:border-kako-accent focus:outline-none transition-colors"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Envío internacional */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-wider text-kako-muted">
              <Truck size={12} className="inline mr-1" />
              Flete nacional China (USD por unidad)
            </label>
            <input
              type="number"
              step="0.01"
              value={nationalShippingUSD || ''}
              onChange={(e) => setNationalShippingUSD(Number(e.target.value))}
              className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none transition-colors"
              placeholder="0.97"
            />

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShippingMode('weight')}
                className={`flex-1 py-2 text-xs uppercase font-bold border transition-colors ${shippingMode === 'weight' ? 'border-kako-accent text-kako-accent bg-kako-accent/10' : 'border-kako-border text-kako-muted'}`}
              >
                Por Peso (kg)
              </button>
              <button
                onClick={() => setShippingMode('manual')}
                className={`flex-1 py-2 text-xs uppercase font-bold border transition-colors ${shippingMode === 'manual' ? 'border-kako-accent text-kako-accent bg-kako-accent/10' : 'border-kako-border text-kako-muted'}`}
              >
                Manual (USD)
              </button>
            </div>

            {shippingMode === 'weight' ? (
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">
                    Peso por unidad (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={weightKg || ''}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none transition-colors"
                    placeholder="0.5"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">
                    Tarifa USD/kg
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={shippingRatePerKg || ''}
                    onChange={(e) => setShippingRatePerKg(Number(e.target.value))}
                    className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none transition-colors"
                    placeholder="12"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">
                  Envío internacional total (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingUSD || ''}
                  onChange={(e) => setShippingUSD(Number(e.target.value))}
                  className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>
            )}
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">
              <Package size={12} className="inline mr-1" />
              Cantidad de unidades
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Impuestos */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">
              <Percent size={12} className="inline mr-1" />
              Impuestos y tasas locales (%)
            </label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none transition-colors"
            />
            <p className="text-xs text-kako-muted mt-1">Incluye IVA, percepción AFIP, tasa correo, etc.</p>
          </div>

          {/* Margen */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">
              Margen de ganancia deseado (%)
            </label>
            <input
              type="range"
              min="20"
              max="300"
              value={marginPercent}
              onChange={(e) => setMarginPercent(Number(e.target.value))}
              className="w-full accent-kako-accent"
            />
            <div className="flex justify-between text-xs text-kako-muted mt-1">
              <span>20%</span>
              <span className="text-kako-accent font-bold">{marginPercent}%</span>
              <span>300%</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-kako-card border border-kako-border p-6 space-y-5">
          <h3 className="font-display text-lg font-bold uppercase flex items-center gap-2">
            <TrendingUp size={18} className="text-kako-electric" />
            Desglose por Unidad
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-kako-border">
              <span className="text-sm text-kako-muted">Costo producto</span>
              <span className="font-mono text-sm">{formatARS(productCostARS)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-kako-border">
              <span className="text-sm text-kako-muted">Flete nacional China</span>
              <span className="font-mono text-sm">{formatARS(nationalShippingARS)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-kako-border">
              <span className="text-sm text-kako-muted">
                Envío intl. por unidad {shippingMode === 'weight' ? `(${weightKg}kg × $${shippingRatePerKg}/kg)` : ''}
              </span>
              <span className="font-mono text-sm">{formatARS(shippingPerUnit)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-kako-border">
              <span className="text-sm text-kako-muted">Subtotal</span>
              <span className="font-mono text-sm">{formatARS(subtotalPerUnit)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-kako-border">
              <span className="text-sm text-kako-muted">Impuestos ({taxRate}%)</span>
              <span className="font-mono text-sm text-red-400">{formatARS(taxesPerUnit)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b-2 border-kako-accent">
              <span className="text-sm font-bold uppercase">Costo total/unidad</span>
              <span className="font-mono font-bold text-lg">{formatARS(totalCostPerUnit)}</span>
            </div>
          </div>

          {/* Precio sugerido */}
          <div className="bg-kako-black border-2 border-kako-accent p-5 neon-border">
            <p className="text-xs uppercase tracking-wider text-kako-muted mb-1">
              Precio de venta sugerido
            </p>
            <p className="font-display text-3xl font-bold text-kako-accent">
              {formatARS(suggestedPrice)}
            </p>
            <p className="text-sm text-green-400 mt-2">
              Ganancia: {formatARS(profitPerUnit)} por unidad
            </p>
          </div>

          {/* Resumen batch */}
          {quantity > 1 && (
            <div className="bg-kako-black/50 border border-kako-border p-4">
              <p className="text-xs uppercase tracking-wider text-kako-muted mb-3">
                Resumen del lote ({quantity} unidades)
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-kako-muted">Inversión total</span>
                  <span className="font-mono">{formatARS(totalCostPerUnit * quantity)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-kako-muted">Facturación estimada</span>
                  <span className="font-mono">{formatARS(suggestedPrice * quantity)}</span>
                </div>
                <div className="flex justify-between font-bold text-green-400">
                  <span>Ganancia total</span>
                  <span className="font-mono">{formatARS(profitPerUnit * quantity)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Exportar ícono de lucide para evitar un import separado arriba
function TrendingUp({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
