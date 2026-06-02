import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

async function ensureFile() {
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.mkdir(path.dirname(ORDERS_FILE), { recursive: true });
    await fs.writeFile(ORDERS_FILE, '[]');
  }
}

async function getOrders() {
  await ensureFile();
  const data = await fs.readFile(ORDERS_FILE, 'utf-8');
  return JSON.parse(data);
}

async function saveOrder(order: any) {
  const orders = await getOrders();
  orders.push(order);
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
  return order;
}

// GET - obtener todos los pedidos (para admin)
export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

// POST - crear un nuevo pedido
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, total } = body;

    if (!customer || !items || items.length === 0) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const order = {
      id: 'ORD-' + Date.now(),
      date: new Date().toISOString(),
      status: 'pendiente',
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        zip: customer.zip,
      },
      items: items.map((item: any) => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
    };

    await saveOrder(order);

    return NextResponse.json({ success: true, order });
  } catch {
    return NextResponse.json({ error: 'Error al guardar pedido' }, { status: 500 });
  }
}
