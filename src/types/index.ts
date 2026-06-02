export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  category: string;
  stock: number;
  featured: boolean;
  slug: string;
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
