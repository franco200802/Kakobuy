'use client';

import { Clock, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

const DROP_DATE = new Date('2026-07-02T18:00:00-03:00'); // 2 de julio 2026, 18hs ARG

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

  return (
    <main className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold uppercase mb-4">
            Próximo <span className="text-kako-accent">Drop</span>
          </h1>
          <p className="text-kako-muted max-w-xl mx-auto">
            Lanzamiento exclusivo con stock limitado. Seguinos en redes para no perderte nada.
          </p>
        </div>

        {/* Drop Card */}
        <div className="bg-kako-card border border-kako-border rounded-sm p-10 relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-kako-accent/20 text-kako-accent text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
            <Clock size={12} />
            Próximamente
          </div>
          <h3 className="font-display text-3xl font-bold uppercase mb-2">Drop #1 — Summer &apos;26</h3>
          <p className="text-kako-muted mb-8">
            Nueva colección de remeras y shorts para el verano. Diseños exclusivos que no se repiten. Stock ultra limitado.
          </p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Días', value: days },
              { label: 'Horas', value: hours },
              { label: 'Min', value: minutes },
              { label: 'Seg', value: seconds },
            ].map((item) => (
              <div key={item.label} className="text-center bg-kako-bg border border-kako-border rounded-sm py-4">
                <span className="font-display text-3xl md:text-4xl font-bold text-kako-accent">
                  {String(item.value).padStart(2, '0')}
                </span>
                <p className="text-kako-muted text-xs uppercase mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-kako-muted">
            <Bell size={14} />
            <span>2 de julio, 2026 — 18:00 hs</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-kako-muted mb-4">¿Querés ser el primero en enterarte?</p>
          <a
            href="https://instagram.com/bareps_"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Seguinos en Instagram
          </a>
        </div>
      </div>
    </main>
  );
}
