"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  date: string; // ISO string
  total: number;
  status: string;
  items: {
    productId: string;
    title: string;
    quantity: number;
    price: number;
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simular fetch pedidos
    const fetchOrders = async () => {
      try {
        // Aquí deberías llamar a tu API o backend para obtener los pedidos del usuario
        // Por ahora simulo con datos dummy
        const data: Order[] = [
          {
            id: "order1",
            date: "2025-06-20T14:30:00Z",
            total: 150.5,
            status: "Delivered",
            items: [
              {
                productId: "p1",
                title: "Zapatillas deportivas",
                quantity: 1,
                price: 100,
              },
              { productId: "p2", title: "Camiseta", quantity: 2, price: 25.25 },
            ],
          },
          {
            id: "order2",
            date: "2025-05-10T11:00:00Z",
            total: 80,
            status: "Processing",
            items: [
              { productId: "p3", title: "Mochila", quantity: 1, price: 80 },
            ],
          },
        ];
        setOrders(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando pedidos...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error cargando pedidos.</p>
    );
  if (orders.length === 0)
    return <p className="text-center mt-10">No hay pedidos.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-800 rounded-md shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-6">Mis pedidos</h1>
      <ul className="space-y-6">
        {orders.map((order) => (
          <li
            key={order.id}
            className="border border-gray-300 dark:border-gray-700 rounded-md p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-semibold">Pedido ID:</span> {order.id}
              </div>
              <div>
                <span className="font-semibold">Estado:</span>{" "}
                <span
                  className={`${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Processing"
                        ? "text-yellow-500"
                        : "text-red-600"
                  } font-semibold`}
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Fecha:</span>{" "}
              {new Date(order.date).toLocaleDateString()}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Total:</span> $
              {order.total.toFixed(2)}
            </div>
            <div>
              <span className="font-semibold">Productos:</span>
              <ul className="list-disc list-inside mt-1">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.title} x {item.quantity} - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
