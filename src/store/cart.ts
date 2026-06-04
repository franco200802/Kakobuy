'use client';

import { create } from 'zustand';
import { Product, CartItem } from '@/types';

// Lazy import to avoid circular dependency with Toast
let showToastFn: ((msg: string) => void) | null = null;
function getShowToast() {
  if (!showToastFn) {
    import('@/components/ui/Toast').then((mod) => {
      showToastFn = mod.showToast;
    });
  }
  return showToastFn;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, size) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          isOpen: true,
        };
      }

      return {
        items: [...state.items, { product, quantity: 1, size }],
        isOpen: true,
      };
    });
    // Fire toast notification
    const toast = getShowToast();
    if (toast) toast(`${product.name} agregado al carrito`);
  },

  removeItem: (productId, size) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.product.id === productId && item.size === size)
      ),
    }));
  },

  updateQuantity: (productId, size, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));
