export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  cost?: number; // costo real para admin
  images: string[];
  sizes: string[];
  category: string;
  stock: number;
  featured: boolean;
  slug: string;
  weight?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}
