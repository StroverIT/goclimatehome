import { Link } from "@tanstack/react-router";
import { ArrowRight, Tag } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-foreground">
      <img
        src={heroImg}
        alt="Модерна дневна с климатик"
        width={1024}
        height={576}
        className="absolute inset-0 -z-10 size-full object-cover object-right opacity-55"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground via-foreground/70 to-transparent" />
      <div className="mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-6 py-24 text-background">
        <h1 className="max-w-3xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          Топла зима. <span className="text-primary">Хладно лято</span>
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base text-background/70 md:text-lg">
          Над 200 модела от водещите световни марки, професионален монтаж за 72 часа и
          60 месеца гаранция.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            Купи сега <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-md border border-background/20 bg-background/5 px-6 py-4 text-sm font-bold text-background backdrop-blur transition-colors hover:bg-background/10"
          >
            <Tag className="size-4" /> Летни оферти
          </Link>
        </div>
      </div>
    </section>
  );
}
