"use client";

import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  if (!wishlist.length) return <p className="p-4">Tu lista está vacía</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {wishlist.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
