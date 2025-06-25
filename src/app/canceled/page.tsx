import Link from "next/link";

export default function CanceledPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Pago cancelado</h1>
      <p className="text-lg text-gray-700">
        No se completó tu compra. Podés intentarlo de nuevo.
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
