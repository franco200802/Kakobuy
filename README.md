# RopaKako - KAKO Streetwear E-Commerce

## Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS (Dark Mode)
- **Backend/DB:** Supabase (Auth + PostgreSQL + Storage)
- **Estado:** Zustand (carrito)
- **Pagos:** Mercado Pago SDK
- **Tipografía:** Inter + Oswald (Google Fonts)

## Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout raíz con navbar + footer
│   ├── page.tsx            # Home (hero + featured)
│   ├── globals.css         # Estilos globales + Tailwind
│   ├── catalogo/
│   │   └── page.tsx        # Catálogo con filtros
│   ├── checkout/
│   │   └── page.tsx        # Proceso de compra
│   ├── admin/
│   │   ├── page.tsx        # Login admin
│   │   └── dashboard/
│   │       └── page.tsx    # Dashboard (inventario + calculadora)
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   └── logout/route.ts
│       └── payments/
│           └── create/route.ts
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   └── FeaturedProducts.tsx
│   ├── products/
│   │   └── ProductCard.tsx
│   ├── cart/
│   │   └── CartDrawer.tsx
│   └── admin/
│       └── ImportCalculator.tsx
├── store/
│   └── cart.ts             # Zustand store
├── lib/
│   ├── supabase.ts
│   └── mock-data.ts
├── types/
│   └── index.ts
└── middleware.ts           # Protección rutas admin
```

## Setup

```bash
cd RopaKako
npm install
cp .env.local.example .env.local
# Completar variables de entorno
npm run dev
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home con hero y productos destacados |
| `/catalogo` | Catálogo completo con filtros por categoría |
| `/checkout` | Proceso de compra (3 pasos) |
| `/admin` | Login administrador |
| `/admin/dashboard` | Panel admin (protegido) |

## Admin Panel

- **Email:** admin@ropakako.com (configurable en `.env.local`)
- **Password:** kako2024admin (configurable en `.env.local`)

### Features:
1. **Gestión de Precios:** Tabla editable inline
2. **Calculadora de Importaciones:** Calcula costo real por unidad considerando dólar, envío, impuestos
3. **Estadísticas:** (próximamente)

## Integrar Calculadora Existente

El componente `ImportCalculator` usa el contenedor `#compras-container` y respeta las variables CSS `--bg`, `--card`, `--accent`. Para migrar tu calculadora HTML/CSS/JS existente:

1. Colocá tu HTML dentro del `<div id="compras-container">` en el componente
2. Las variables CSS se heredan automáticamente del tema global
3. Si necesitás JS vanilla, usá `useEffect` para inicializar

## Mercado Pago

La integración está preparada en `/api/payments/create`. Para activar:

1. Obtener credenciales en [developers.mercadopago.com](https://developers.mercadopago.com)
2. Configurar `MP_ACCESS_TOKEN` y `NEXT_PUBLIC_MP_PUBLIC_KEY`
3. Descomentar el código en la API route
