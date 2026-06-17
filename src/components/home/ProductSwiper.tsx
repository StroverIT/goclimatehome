import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  eyebrow: string;
  products: Product[];
  showLikes?: boolean;
  className?: string;
};

export function ProductSwiper({ title, eyebrow, products, showLikes, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const w = card?.offsetWidth ?? 320;
    el.scrollBy({ left: dir * (w + 24), behavior: "smooth" });
  };
  return (
    <section className={cn("mx-auto max-w-7xl overflow-hidden px-6 py-16", className)}>
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            aria-label="Предишен"
            className="grid size-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Следващ"
            className="grid size-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="hide-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-2"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[300px] shrink-0 snap-start md:w-[320px]">
            <ProductCard product={p} showLikes={showLikes} />
          </div>
        ))}
      </div>
    </section>
  );
}
