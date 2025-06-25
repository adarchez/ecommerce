"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useSearchParams } from "next/navigation";
import ProductSkeleton from "@/components/ProductSkeleton";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  slug: { current: string };
  images?: any | null;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"]{
          _id,
          title,
          description,
          price,
          images,
          slug,
          rating,
          reviews,
          category,
          stock,
          warrantyInformation,
          shippingInformation,
          availabilityStatus,
          returnPolicy
        }`;
        const data = await client.fetch<Product[]>(query);
        const formattedProducts = data.map((product) => ({
          ...product,
          // Usamos la primera imagen del array para mostrar en la card
          image: product.images?.[0]
            ? urlFor(product.images[0]).width(400).height(400).url()
            : null,
        }));
        setProducts(formattedProducts);
        setFiltered(formattedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const searchTerm = searchParams.get("search")?.toLowerCase() || "";
    if (!searchTerm) {
      setFiltered(products);
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    setFiltered(filteredProducts);
  }, [searchParams, products]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-fr px-4 py-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (error) return <p>Error loading products.</p>;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-fr">
        <AnimatePresence mode="sync">
          {filtered.map((product, i) => (
            <motion.div
              key={product._id}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
