import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "bow_boutique_cart_v1";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2200);
  }

  function addToCart(product, customization = {}, qty = 1) {
    // Unique by product + customization signature
    const signature = JSON.stringify(customization || {});
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.productId === product.id && x.signature === signature);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          customization,
          signature,
          qty,
        },
      ];
    });
    showToast("Added to cart ✨");
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function setQty(id, qty) {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x))
    );
  }

  function clearCart() {
    setItems([]);
    showToast("Cart cleared");
  }

  const totals = useMemo(() => {
    const count = items.reduce((a, b) => a + b.qty, 0);
    const subtotal = items.reduce((a, b) => a + b.qty * b.price, 0);
    return { count, subtotal };
  }, [items]);

  const value = {
    items,
    totals,
    addToCart,
    removeItem,
    setQty,
    clearCart,
    toast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}