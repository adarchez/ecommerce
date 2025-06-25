"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);
  const { toggleWishlist, isWished } = useWishlist();

  const handleAdd = () => {
    addToCart(product);
    showToast("Producto agregado al carrito");
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="p-4 flex flex-col h-full"
    >
      <div className="bg-neutral-100 dark:bg-neutral-800 relative group flex flex-col h-full border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow z-10 hover:bg-pink-100 transition cursor-pointer"
        >
          <Heart
            className={`w-5 h-5 ${isWished(product._id) ? "fill-pink-500 stroke-pink-500" : "text-gray-400"}`}
          />
        </button>
        <Link href={`/product/${product.slug.current}`} className="flex-1">
          <Image
            src={urlFor(product.images[0]).url()}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="mt-2 font-medium text-lg line-clamp-2 text-neutral-800 dark:text-neutral-100">
            {product.title}
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
            {product.category || "Sin categoría"}
          </p>
          <p className="m-1 text-neutral-900 dark:text-neutral-100 font-bold flex items-center justify-between">
            ${product.price}
            {product.rating !== undefined && (
              <span className="flex items-center text-sm text-yellow-600 gap-1">
                <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
                {product.rating.toFixed(1)}
                {product.reviews?.length ? (
                  <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                    ({product.reviews.length} Reviews)
                  </span>
                ) : (
                  <span className="text-neutral-400">(0)</span>
                )}
              </span>
            )}
          </p>
        </Link>

        <button
          onClick={handleAdd}
          className="mt-auto w-full bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-slate-100 py-2 rounded hover:bg-indigo-900 transition cursor-pointer"
        >
          Agregar al carrito
        </button>

        {added && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded shadow-md text-sm">
            ¡Agregado!
          </div>
        )}
      </div>
    </motion.div>
  );
}
