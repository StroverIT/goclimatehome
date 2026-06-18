import { Link } from "@tanstack/react-router";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Категории</p>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Разгледайте по тип</h2>
        </div>
        <Link to="/products" className="hidden text-sm font-semibold text-muted-foreground hover:text-foreground md:inline-flex md:items-center md:gap-1">
          Всички продукти <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => {
          const isLastOdd = i === categories.length - 1 && categories.length % 2 !== 0;

          return (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className={cn(
                "group relative flex aspect-[2/1] flex-col justify-end overflow-hidden bg-card md:aspect-[16/11]",
                isLastOdd && "md:col-span-2 md:aspect-[2/1] lg:col-span-1 lg:aspect-[16/11]",
              )}
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                width={800}
                height={600}
                className={cn(
                  "absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105",
                  isLastOdd && "object-bottom lg:object-center",
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 transition-opacity group-hover:from-primary/90 group-hover:via-primary/40 group-hover:to-primary/10" />
              <div className="relative px-4 pb-4 pt-10 text-white drop-shadow-sm md:px-6 md:pb-6 md:pt-12">
                <span className="mb-1.5 inline-block text-[10px] font-bold uppercase tracking-widest text-white/75 md:mb-2">
                  0{i + 1}
                </span>
                <h3 className="text-base font-bold leading-snug md:text-lg">{cat.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/85 md:text-sm">{cat.description}</p>
              </div>
              <ArrowUpRight className="absolute right-4 top-4 size-5 text-white opacity-0 transition-opacity group-hover:opacity-100 md:right-5 md:top-5" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
