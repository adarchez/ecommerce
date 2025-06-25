// data/products.ts
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Remera Negra",
    slug: "remera-negra",
    price: 1000,
    image: "/products/remera-negra.jpg",
  },
  {
    id: "2",
    name: "Pantalón Jeans",
    price: 2500,
    slug: "pantalon-jeans",
    image: "/products/pantalon-jeans.jpg",
  },
  {
    id: "3",
    name: "Zapatillas Running",
    slug: "zapatillas-running",
    price: 4500,
    image: "/products/zapatillas-running.jpg",
  },
  {
    id: "4",
    name: "Campera Invierno",
    slug: "rcampera-invierno",
    price: 7000,
    image: "/products/campera-invierno.jpg",
  },
];
