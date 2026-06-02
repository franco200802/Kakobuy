import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function POST(request: NextRequest) {
  try {
    const { items, payer } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Items requeridos' }, { status: 400 });
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken || accessToken === 'placeholder') {
      // Modo sin MP: solo confirmar pedido
      return NextResponse.json({
        mode: 'direct',
        message: 'Pedido confirmado (pago a coordinar)',
      });
    }

    // Modo Mercado Pago activo
    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://kakobuy.vercel.app';

    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'ARS',
        })),
        payer: {
          name: payer.name,
          email: payer.email,
        },
        back_urls: {
          success: `${siteUrl}/checkout/success`,
          failure: `${siteUrl}/checkout/failure`,
          pending: `${siteUrl}/checkout/pending`,
        },
        auto_return: 'approved',
      },
    });

    return NextResponse.json({
      mode: 'mercadopago',
      preferenceId: result.id,
      initPoint: result.init_point,
    });
  } catch (error: any) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Error al crear preferencia de pago' },
      { status: 500 }
    );
  }
}
