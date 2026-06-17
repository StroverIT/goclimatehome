import { useState, type MouseEvent } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="order-2 flex gap-3 md:order-1 md:flex-col">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`size-20 shrink-0 overflow-hidden border bg-card transition-colors ${
              active === i ? "border-primary" : "border-border hover:border-primary/40"
            }`}
          >
            <img src={src} alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>

      <div
        onMouseMove={onMove}
        onMouseLeave={() => setPos(null)}
        className="relative order-1 aspect-square flex-1 overflow-hidden border border-border bg-card md:order-2"
      >
        <img
          src={images[active]}
          alt={alt}
          className="size-full object-cover transition-transform duration-200 md:object-contain md:p-8"
          style={
            pos
              ? { transform: "scale(2)", transformOrigin: `${pos.x}% ${pos.y}%` }
              : undefined
          }
        />
      </div>
    </div>
  );
}
