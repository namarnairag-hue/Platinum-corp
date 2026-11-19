import { useEffect, useState } from 'react';
import { stores, type Product, type Store } from '@/data/catalog';

export type CartLine = {
  productId: string;
  storeId: string;
  qty: number;
};

export type CartEntry = CartLine & { product: Product; store: Store };

export type Order = {
  id: string;
  customerName: string;
  lines: { storeName: string; productName: string; qty: number; price: number }[];
  total: number;
  createdAt: string;
};

const CART_KEY = 'platinum-cart';
const ORDERS_KEY = 'platinum-orders';

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>(() => readJSON<CartLine[]>(CART_KEY, []));

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines]);

  const setQty = (productId: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.productId !== productId);
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) => (l.productId === productId ? { ...l, qty } : l));
      }
      const store = stores.find((s) => s.products.some((p) => p.id === productId));
      if (!store) return prev;
      return [...prev, { productId, storeId: store.id, qty }];
    });
  };

  const getQty = (productId: string) =>
    lines.find((l) => l.productId === productId)?.qty ?? 0;

  const clear = () => setLines([]);

  const entries: CartEntry[] = lines.flatMap((l) => {
    const store = stores.find((s) => s.id === l.storeId);
    const product = store?.products.find((p) => p.id === l.productId);
    if (!store || !product) return [];
    return [{ ...l, product, store }];
  });

  const total = entries.reduce((sum, e) => sum + e.product.price * e.qty, 0);
  const count = entries.reduce((sum, e) => sum + e.qty, 0);

  return { lines, entries, total, count, setQty, getQty, clear };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(() => readJSON<Order[]>(ORDERS_KEY, []));

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = (customerName: string, entries: CartEntry[], total: number) => {
    const order: Order = {
      id: 'PC-' + Date.now().toString(36).toUpperCase(),
      customerName,
      lines: entries.map((e) => ({
        storeName: e.store.name,
        productName: e.product.name,
        qty: e.qty,
        price: e.product.price,
      })),
      total,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  return { orders, addOrder };
}
