"use client";

import Image from "next/image";
import { type PointerEvent, useEffect, useRef, useState } from "react";

export function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [selected, setSelected] = useState(images[0]);
  const [zoomActive, setZoomActive] = useState(false);
  const [fullView, setFullView] = useState(false);
  const zoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fullView) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullView(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [fullView]);

  function updateZoom(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
    if (zoomRef.current) zoomRef.current.style.backgroundPosition = `${x}% ${y}%`;
    setZoomActive(true);
  }

  return (
    <div className="product-gallery">
      {images.length > 1 ? (
        <div className="product-gallery-rail" aria-label={`${productName} image gallery`}>
          {images.map((image, index) => (
            <button
              className={image === selected ? "is-active" : ""}
              type="button"
              key={image}
              aria-label={`View ${productName} image ${index + 1}`}
              aria-pressed={image === selected}
              onClick={() => setSelected(image)}
              onMouseEnter={() => setSelected(image)}
              onFocus={() => setSelected(image)}
            >
              <Image src={image} alt="" width={96} height={96} unoptimized />
            </button>
          ))}
        </div>
      ) : null}

      <div className="product-gallery-stage">
        <button
          className="product-gallery-main"
          type="button"
          aria-label={`Open full view of ${productName}`}
          onClick={() => setFullView(true)}
          onPointerEnter={updateZoom}
          onPointerMove={updateZoom}
          onPointerLeave={() => setZoomActive(false)}
        >
          <Image
            src={selected}
            alt={`${productName} product view`}
            width={1000}
            height={1000}
            priority
            sizes="(max-width: 700px) 92vw, (max-width: 1060px) 70vw, 46vw"
            unoptimized
          />
          <span>Click to see full view</span>
        </button>

        <div
          ref={zoomRef}
          className={`product-gallery-zoom${zoomActive ? " is-active" : ""}`}
          aria-hidden="true"
          style={{ backgroundImage: `url(${JSON.stringify(selected)})` }}
        />
      </div>

      {fullView ? (
        <div className="product-gallery-dialog" role="dialog" aria-modal="true" aria-label={`${productName} full image`} onClick={() => setFullView(false)}>
          <button type="button" className="product-gallery-dialog-close" aria-label="Close full image" onClick={() => setFullView(false)}>×</button>
          <Image src={selected} alt={`${productName} full product view`} width={1600} height={1600} unoptimized onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </div>
  );
}
