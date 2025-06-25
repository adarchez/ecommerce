"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ExitoPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/order?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
          setLoading(false);
        });
    }
  }, [sessionId]);

  if (loading) return <p className="text-center py-10">Cargando pedido...</p>;

  if (!order)
    return (
      <div className="text-center py-10 text-red-600 font-bold">
        No se encontró el pedido.
      </div>
    );

  return (
    <div className="max-w-xl mx-auto py-12 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        ¡Gracias por tu compra!
      </h1>
      <p className="text-gray-700 mb-6">
        Tu pedido se procesó correctamente. Te enviamos el recibo por email.
      </p>

      <h2 className="text-xl font-semibold mb-4">Resumen del pedido:</h2>
      <ul className="mb-6 text-left">
        {order.line_items?.data?.map((item: any) => (
          <li key={item.id} className="mb-2">
            {item.quantity} × {item.description} –{" "}
            <span className="font-bold">
              ${(item.amount_total / 100).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-lg font-semibold">
        Total pagado:{" "}
        <span className="text-indigo-600">
          ${(order.amount_total / 100).toFixed(2)}
        </span>
      </p>

      <Link
        href="/"
        className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        <span>Volver a la tienda</span>
      </Link>
    </div>
  );
}
