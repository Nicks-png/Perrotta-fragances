'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, volume: string) => void;
  updateQuantity: (productId: string, volume: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.volume === item.volume
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.volume === item.volume
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
        get().openCart();
      },

      removeItem: (productId, volume) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.volume === volume)
          ),
        }));
      },

      updateQuantity: (productId, volume, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, volume);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.volume === volume
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'perrotta-cart',
    }
  )
);
