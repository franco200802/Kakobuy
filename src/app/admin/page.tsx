'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Credenciales inválidas');
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold tracking-wider text-glow">BA REPS</h1>
          <p className="text-kako-muted text-sm mt-2 uppercase tracking-widest">Admin Panel</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-kako-card border border-kako-border p-8 space-y-6"
        >
          <div className="flex justify-center">
            <div className="w-12 h-12 border-2 border-kako-accent flex items-center justify-center">
              <Lock size={20} className="text-kako-accent" />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none transition-colors"
              placeholder="Tu usuario"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-kako-muted mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-kako-black border border-kako-border px-4 py-3 text-sm focus:border-kako-accent focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
