import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Zap } from "lucide-react";
import type { Product } from "@/data/products";
import { formatBGN } from "@/data/products";

export function ProductCard({ product, showLikes = false }: { product: Product; showLikes?: boolean }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          width={1000}
          height={800}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.installationIncluded && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
            <Zap className="size-3" /> Включен Монтаж
          </span>
        )}
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-background/95 px-3 py-1 text-xs font-bold text-accent shadow-sm backdrop-blur">
          <Heart className="size-3 fill-current" /> {product.likes.toLocaleString("bg-BG")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{product.brand}</p>
        <h4 className="mt-1 line-clamp-2 min-h-[2.6rem] font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h4>
        <div className="mt-4 flex items-center gap-4 border-y border-border py-3 text-xs">
          <div>
            <span className="block text-[10px] uppercase text-muted-foreground">BTU</span>
            <span className="font-bold">{product.btu.toLocaleString("bg-BG")}</span>
          </div>
          <div className="h-6 w-px bg-border" />
          <div>
            <span className="block text-[10px] uppercase text-muted-foreground">Площ</span>
            <span className="font-bold">{product.area} м²</span>
          </div>
          <div className="h-6 w-px bg-border" />
          <div>
            <span className="block text-[10px] uppercase text-muted-foreground">Шум</span>
            <span className="font-bold">{product.noise} dB</span>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            {product.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">{formatBGN(product.oldPrice)}</p>
            )}
            <p className="text-xl font-extrabold text-primary">{formatBGN(product.price)}</p>
          </div>
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-full bg-secondary text-foreground transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25 active:scale-95">
            <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
