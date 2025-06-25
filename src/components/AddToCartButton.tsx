"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Product } from "@/types/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ ...product, quantity: 1 });
    showToast("Producto agregado al carrito");
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="relative">
      <button
        onClick={handleAdd}
        className="bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-slate-100 px-6 py-3 rounded hover:bg-indigo-900 transition cursor-pointer"
      >
        Agregar al carrito
      </button>
      {added && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded shadow-md text-sm">
          ¡Agregado!
        </div>
      )}
    </div>
  );
}
