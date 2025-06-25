"use client";

import { useState } from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder({ projectId, dataset }).image(source);

type ProductGalleryProps = {
  images: SanityImageSource[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="w-full space-y-4">
      {/* Carrusel principal */}
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="rounded-xl"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden group">
              <Image
                src={urlFor(img).width(1000).height(800).url()}
                alt={`${title} ${idx + 1}`}
                width={1000}
                height={800}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-115"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Miniaturas */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        modules={[Thumbs]}
        className="cursor-pointer"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={`thumb-${idx}`} className="!w-24 !h-24">
            <Image
              src={urlFor(img).width(200).height(200).url()}
              alt={`Thumbnail ${idx + 1}`}
              width={200}
              height={200}
              className="object-cover w-full h-full rounded border"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
