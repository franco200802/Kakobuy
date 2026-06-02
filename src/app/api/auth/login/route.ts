import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Credenciales admin - en producción usar Supabase Auth
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ropakako.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kako2024admin';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validar inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Verificar credenciales
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Crear session token simple (en producción usar JWT o Supabase Auth)
    const sessionToken = Buffer.from(
      JSON.stringify({ email, role: 'admin', exp: Date.now() + 8 * 60 * 60 * 1000 })
    ).toString('base64');

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60, // 8 horas
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
