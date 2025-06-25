import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import ReviewList from "@/components/ReviewList";
import { Star } from "lucide-react";
import WishlistButton from "@/components/WishlistButton";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images?: any;
  rating: number;
  category: string;
  slug: { current: string };
};

const POST_QUERY = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  title,
  description,
  price,
  images,
  slug,
  rating,
  category,
  reviews[]{
    reviewerName,
    comment,
    rating,
    date
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await client.fetch<Product>(
    POST_QUERY,
    { slug: params.slug },
    options
  );

  if (!product) return notFound();

  return (
    <div>
      <Link
        href="/"
        className="hover:underline col-span-2 text-slate-900 dark:text-slate-200 mb-4"
      >
        ← Back to products
      </Link>
      <div className="bg-neutral-100 dark:bg-neutral-900 rounded grid md:grid-cols-2 gap-5 p-6 mt-2 shadow-md">
        {product.images && product.images.length > 0 && (
          <ProductGallery images={product.images} title={product.title} />
        )}

        <div>
          <h1 className="text-3xl font-bold mb-2 text-neutral-800 dark:text-neutral-100">
            {product.title}
          </h1>
          <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">
            {product.category}
          </p>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(product.rating)
                    ? "fill-yellow-500 stroke-yellow-500"
                    : "stroke-gray-400"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <p className="text-2xl font-semibold text-slate-800 mt-4 mb-4 dark:text-slate-200">
            ${product.price}
          </p>
          <p className="mb-6 text-gray-700 dark:text-gray-400">
            {product.description}
          </p>

          <AddToCartButton
            product={{
              _id: product._id,
              title: product.title,
              price: product.price,
              images: product.images,
              slug: product.slug,
            }}
          />
          <WishlistButton />
        </div>
        <div className="md:col-span-2">
          <ReviewList reviews={product.reviews || []} />
        </div>
      </div>
    </div>
  );
}

// Generación de rutas estáticas
export async function generateStaticParams() {
  const query = `*[_type == "product"]{ slug }`;
  const products = await client.fetch<{ slug: { current: string } }[]>(query);

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}
