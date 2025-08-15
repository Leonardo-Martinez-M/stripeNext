"use client";

import { ROUTES } from "../app/routes";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  onBuy?: (id: string) => void;
};

export default function ProductCard({ id, name, price, image, onBuy }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
      <img src={image} alt={name} className="w-32 h-32 object-cover rounded" />
      <h2 className="font-bold text-lg mt-2">{name}</h2>
      <p className="text-gray-600">${price}</p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onBuy && onBuy(id)}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
