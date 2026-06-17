import { Link } from "@tanstack/react-router";
import { categories } from "@/data/products";
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

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            to="/category/$slug"
            params={{ slug: cat.slug }}
            className="group relative flex aspect-[16/11] flex-col justify-end overflow-hidden bg-card p-6 transition-colors"
          >
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              width={800}
              height={600}
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent transition-opacity group-hover:from-primary/90 group-hover:via-primary/30" />
            <div className="relative text-background">
              <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-widest text-background/70">
                0{i + 1}
              </span>
              <h3 className="text-lg font-bold leading-tight">{cat.name}</h3>
              <p className="mt-1 text-xs text-background/70">{cat.description}</p>
            </div>
            <ArrowUpRight className="absolute right-5 top-5 size-5 text-background opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}
