import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Product = {
  _id: string;
  title: string;
  price: number;
  slug: { current: string };
  description?: string;
  images?: SanityImageSource[];
  category?: string;
  stock?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  rating?: number;
  returnPolicy?: string;
  reviews?: {
    reviewerName: string;
    reviewerEmail: string;
    comment: string;
    rating: number;
    date: string;
  }[];
};
