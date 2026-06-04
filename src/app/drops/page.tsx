'use client';

import { Clock, Bell, Instagram, Sparkles, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

const DROP_DATE = new Date('2026-07-02T18:00:00-03:00');

const UPCOMING_ITEMS = [
  { name: 'Hoodie Travis Scott Collab', hint: 'Oversize 450GSM', emoji: '🔥' },
  { name: 'Cargo Pants Industrial', hint: 'Wide-leg, multi-pocket', emoji: '⚡' },
  { name: 'Remera Vintage Wash Pack x2', hint: 'Oversized, heavy cotton', emoji: '🌊' },
  { name: 'Gorra New Era Custom', hint: 'Edición limitada', emoji: '🧢' },
];

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

export default function DropsPage() {
  const { days, hours, minutes, seconds } = useCountdown(DROP_DATE);
  const isLive = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  return (
    <main className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-kako-accent border border-kako-accent/30 px-4 py-2 mb-6">
            <Sparkles size={12} />
            Lanzamientos exclusivos
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-4">
            Próximo <span className="text-kako-accent text-glow">Drop</span>
          </h1>
          <p className="text-kako-muted max-w-xl mx-auto">
            Stock ultra limitado. Una vez que se agotan, no vuelven. Seguinos para no perderte nada.
          </p>
        </div>

        {/* Main Drop Card */}
        <div className="bg-kako-card border border-kako-border rounded-sm relative overflow-hidden">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-kako-accent/40" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-kako-accent/40" />
          
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl md:text-3xl font-bold uppercase">
                Drop #1 — Summer &apos;26
              </h3>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase flex items-center gap-1.5 ${
                isLive 
                  ? 'bg-green-500/20 text-green-400 animate-pulse' 
                  : 'bg-kako-accent/20 text-kako-accent'
              }`}>
                <Clock size={12} />
                {isLive ? 'EN VIVO' : 'Próximamente'}
              </span>
            </div>
            
            <p className="text-kako-muted mb-8 max-w-lg">
              Nueva colección de remeras, hoodies y pantalones para el verano. Diseños exclusivos que no se repiten.
            </p>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-3 md:gap-4 mb-8">
              {[
                { label: 'Días', value: days },
                { label: 'Horas', value: hours },
                { label: 'Min', value: minutes },
                { label: 'Seg', value: seconds },
              ].map((item) => (
                <div key={item.label} className="text-center bg-kako-black border border-kako-border py-4 md:py-6 group hover:border-kako-accent/50 transition-colors">
                  <span className="font-display text-3xl md:text-5xl font-bold text-kako-accent group-hover:text-glow transition-all">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <p className="text-kako-muted text-[10px] md:text-xs uppercase mt-1 tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-kako-muted border-t border-kako-border pt-6">
              <Bell size={14} className="text-kako-accent" />
              <span>2 de julio, 2026 — 18:00 hs (Argentina)</span>
            </div>
          </div>
        </div>

        {/* Preview Items */}
        <div className="mt-12">
          <h3 className="font-display text-xl font-bold uppercase mb-6 flex items-center gap-3">
            <AlertTriangle size={16} className="text-yellow-400" />
            Spoilers del Drop
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {UPCOMING_ITEMS.map((item, i) => (
              <div
                key={i}
                className="bg-kako-card border border-kako-border p-4 flex items-center gap-4 hover:border-kako-accent/40 transition-colors group"
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm group-hover:text-kako-accent transition-colors truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-kako-muted">{item.hint}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-kako-muted border border-kako-border px-2 py-0.5">
                  Soon
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification CTA */}
        <div className="text-center mt-16 bg-gradient-to-b from-kako-card to-kako-black border border-kako-border rounded-sm p-10">
          <Bell size={32} className="mx-auto text-kako-accent mb-4" />
          <h3 className="font-display text-2xl font-bold uppercase mb-2">No te lo pierdas</h3>
          <p className="text-kako-muted mb-6 max-w-md mx-auto text-sm">
            Seguinos en Instagram para activar notificaciones del drop. Los primeros en comprar se llevan envío gratis.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://instagram.com/bareps_"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Instagram size={16} />
              @bareps_
            </a>
            <a
              href="https://wa.me/5491161242741?text=Quiero%20que%20me%20avisen%20del%20próximo%20drop!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              <Bell size={16} />
              Avisame por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
