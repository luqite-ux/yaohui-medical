"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        <Image
          src={selected}
          alt={`${productName} product view`}
          width={900}
          height={680}
          priority
          unoptimized
        />
      </div>
      {images.length > 1 ? (
        <div className="product-gallery-thumbnails" aria-label={`${productName} image gallery`}>
          {images.map((image, index) => (
            <button
              className={image === selected ? "is-active" : ""}
              type="button"
              key={image}
              aria-label={`View ${productName} image ${index + 1}`}
              aria-pressed={image === selected}
              onClick={() => setSelected(image)}
            >
              <Image src={image} alt="" width={160} height={120} unoptimized />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
