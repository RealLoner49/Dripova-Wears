import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  async function fetchProducts() {
    setLoadingProducts(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);

      setProducts([]);
    } else {
      setProducts(data || []);
    }

    setLoadingProducts(false);
  }

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel("products-live-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
        },
        fetchProducts
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function addProduct(payload) {
    const { error } = await supabase
      .from("products")
      .insert([payload]);

    if (error) {
      throw error;
    }

    await fetchProducts();
  }

  async function updateProduct(id, payload) {
    const { error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id);

    if (error) {
      throw error;
    }

    await fetchProducts();
  }

  async function deleteProduct(id) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    await fetchProducts();
  }

  const value = useMemo(
    () => ({
      products,

      loadingProducts,

      fetchProducts,

      addProduct,

      updateProduct,

      deleteProduct,
    }),

    [products, loadingProducts]
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  return useContext(ProductContext);
};