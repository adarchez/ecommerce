"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export default function WishlistButton() {
  const [isWished, setIsWished] = useState(false);

  const toggleWishlist = () => {
    setIsWished((prev) => !prev);
    // Aquí podrías guardar en localStorage, context o enviar a backend
  };

  return (
    <button
      onClick={toggleWishlist}
      className="mt-4 inline-flex items-center gap-2 text-sm text-pink-600 hover:underline transition"
    >
      <Heart
        className={`w-5 h-5 ${
          isWished ? "fill-pink-500 stroke-pink-500" : "text-gray-400"
        }`}
      />
      {isWished ? "En tu lista de favoritos" : "Agregar a favoritos"}
    </button>
  );
}
