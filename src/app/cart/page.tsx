"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import ConfirmModal from "@/components/ConfirmModal";
import { useToast } from "@/context/ToastContext";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import QuantitySelector from "@/components/QuantitySelector";
import Link from "next/link";

export default function CarritoPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { showToast } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleClearCart = () => {
    clearCart();
    showToast("Carrito vaciado");
    setShowConfirm(false);
  };

  const handleCheckout = async () => {
    console.log("iniciando pago");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart }),
    });

    const data = await res.json();

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

  const handleApplyCoupon = () => {
    // Lógica de ejemplo (podés cambiarlo a tu gusto)
    if (coupon.toLowerCase() === "descuento10") {
      setDiscount(10); // 10 USD de descuento
      setCouponMessage("Cupón aplicado: -$10");
    } else if (coupon.toLowerCase() === "freeenvio") {
      setDiscount(0);
      setCouponMessage("Cupón de envío gratis (no aplica descuento)");
    } else {
      setDiscount(0);
      setCouponMessage("Cupón no válido");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {cart.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-200">
          El carrito está vacío.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* 🛒 Lista de productos */}
          <div className="md:col-span-2 space-y-6 p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <Link href={`/product/${item.slug.current}`}>
                  <Image
                    src={urlFor(item.images[0]).url()}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="w-20 h-20 object-cover rounded"
                  />
                </Link>
                <div className="flex-1">
                  <Link href={`/product/${item.slug.current}`}>
                    <h2 className="font-semibold mb-4">{item.title}</h2>
                  </Link>

                  <QuantitySelector
                    quantity={item.quantity}
                    setQuantity={(val) => updateQuantity(item._id, val)}
                    stock={50} // o item.stock si lo tenés en la data
                  />
                </div>
                <p className="text-md font-semibold text-neutral-800 dark:text-neutral-200 mr-6">
                  ${item.price}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:underline text-sm cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {/* 💳 Resumen de compra */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 h-fit">
            <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-neutral-100">
              Resumen de compra
            </h2>

            <div className="flex justify-between mb-2 text-sm text-gray-700 dark:text-neutral-300">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between mb-2 text-sm text-green-700 dark:text-neutral-300">
                <span>Descuento</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between mb-4 text-sm text-gray-700 dark:text-neutral-300">
              <span>Envío</span>
              <span>$0.00</span>
            </div>

            <div className="flex justify-between mb-6 font-bold text-slate-900 dark:text-neutral-100 ">
              <span>Total</span>
              <span>${(total - discount).toFixed(2)}</span>
            </div>

            <div className="mb-10">
              <input
                type="text"
                placeholder="Código de cupón"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-full border px-3 py-2 rounded text-sm mb-2"
              />
              <button
                onClick={handleApplyCoupon}
                className="w-full text-sm bg-indigo-700 hover:bg-indigo-900 text-white py-2 rounded cursor-pointer"
              >
                Aplicar cupón
              </button>
              {couponMessage && (
                <p className="mt-2 text-xs text-gray-600">{couponMessage}</p>
              )}
            </div>

            <button
              onClick={handleCheckout}
              className="w-full border border-gray-500 bg-slate-800 text-white dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 py-2 rounded hover:bg-indigo-900 cursor-pointer"
            >
              Ir al pago
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full mt-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400 dark:text-neutral-100 text-sm py-2 rounded cursor-pointer"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleClearCart}
        onCancel={() => setShowConfirm(false)}
      >
        ¿Estás seguro que querés vaciar el carrito?
      </ConfirmModal>
    </div>
  );
}
