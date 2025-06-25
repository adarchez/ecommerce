import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  setQuantity,
  stock = 50,
}: {
  quantity: number;
  setQuantity: (value: number) => void;
  stock?: number;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center border rounded-md overflow-hidden">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val)) setQuantity(Math.min(val, stock));
          }}
          className="w-10 text-center outline-none border-x text-sm no-spinner"
        />
        <button
          onClick={() => setQuantity(Math.min(quantity + 1, stock))}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <span className="text-xs text-gray-500">+{stock} disponibles</span>
    </div>
  );
}
