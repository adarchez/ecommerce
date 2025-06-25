"use client";

import { Star } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Review = {
  reviewerName: string;
  comment: string;
  rating: number;
  date: string;
};

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-200">Aún no hay reseñas.</p>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
        Customer Reviews
      </h3>
      {reviews.map((review, i) => (
        <div
          key={i}
          className="border border-gray-100 p-4 rounded-md bg-white shadow-md dark:bg-neutral-600 dark:border-gray-700 dark:text-neutral-100"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="font-medium">{review.reviewerName}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(review.date), "PPP", { locale: es })}
            </span>
          </div>
          <div className="flex items-center text-yellow-500 mb-2">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 stroke-yellow-500"
              />
            ))}
          </div>
          <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
