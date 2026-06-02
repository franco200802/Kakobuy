import { NextRequest, NextResponse } from 'next/server';

// Preparado para Mercado Pago SDK
// import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function POST(request: NextRequest) {
  try {
    const { items, payer } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items requeridos' },
        { status: 400 }
      );
    }

    // TODO: Descomentar cuando se configure MP_ACCESS_TOKEN
    /*
    const client = new MercadoPagoConfig({ 
      accessToken: process.env.MP_ACCESS_TOKEN! 
    });

    const preference = new Preference(client);
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
          success: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
          failure: `${process.env.NEXT_PUBLIC_URL}/checkout/failure`,
          pending: `${process.env.NEXT_PUBLIC_URL}/checkout/pending`,
        },
        auto_return: 'approved',
      },
    });

    return NextResponse.json({ 
      preferenceId: result.id,
      initPoint: result.init_point 
    });
    */

    // Respuesta placeholder
    return NextResponse.json({
      message: 'Mercado Pago integration ready - configure MP_ACCESS_TOKEN',
      preferenceId: 'placeholder_' + Date.now(),
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al crear preferencia de pago' },
      { status: 500 }
    );
  }
}
