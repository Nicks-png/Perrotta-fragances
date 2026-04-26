'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Order } from '@/types';

interface AuthStore {
  user: User | null;
  orders: Order[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addOrder: (order: Order) => void;
}

const DEMO_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Admin Perrotta',
    email: 'admin@perrotta.com',
    isAdmin: true,
    password: '123456',
  },
  {
    id: '2',
    name: 'Cliente Demo',
    email: 'cliente@demo.com',
    isAdmin: false,
    password: '123456',
  },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      orders: [],
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const found = DEMO_USERS.find(
          (u) => u.email === email && u.password === password
        );
        if (found) {
          const { password: _, ...user } = found;
          set({ user, isLoading: false });
          return true;
        }
        set({ isLoading: false });
        return false;
      },

      register: async (name, email, password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const newUser: User = {
          id: Math.random().toString(36).slice(2),
          name,
          email,
          isAdmin: false,
        };
        set({ user: newUser, isLoading: false });
        return true;
      },

      logout: () => set({ user: null }),

      addOrder: (order) => {
        set((state) => ({ orders: [order, ...state.orders] }));
      },
    }),
    {
      name: 'perrotta-auth',
    }
  )
);
