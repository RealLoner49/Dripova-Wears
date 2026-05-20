import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabase";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { openAuth } = useAuth();

  const [cart, setCart] = useState([]);

  const [toast, setToast] = useState("");

  function showToast(text) {
    setToast(text);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  async function addToCart(product) {
    const { data } =
      await supabase.auth.getSession();

    const currentSession = data?.session;

    if (!currentSession?.user) {
      openAuth("login");

      return false;
    }

    setCart((items) => {
      const existing = items.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );
      }

      return [
        ...items,
        {
          ...product,
          qty: 1,
        },
      ];
    });

    showToast(
      `${product.name} added to cart.`
    );

    return true;
  }

  function removeFromCart(id) {
    setCart((items) =>
      items.filter((item) => item.id !== id)
    );

    showToast("Product removed from cart.");
  }

  const total = cart.reduce((sum, item) => {
    return (
      sum +
      Number(item.price || 0) * item.qty
    );
  }, 0);

  const count = cart.reduce((sum, item) => {
    return sum + item.qty;
  }, 0);

  const value = useMemo(
    () => ({
      cart,
      count,
      total,
      addToCart,
      removeFromCart,
    }),
    [cart, count, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};