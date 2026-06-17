import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCategory, getByCategory } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category, products: getByCategory(params.slug) };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category;
    if (!c) return {};
    return {
      meta: [
        { title: `${c.name} — GoClimaHome` },
        { name: "description", content: `${c.name}: ${c.description}. Разгледайте всички модели с безплатна доставка и 60 месеца гаранция.` },
        { property: "og:title", content: `${c.name} — GoClimaHome` },
        { property: "og:description", content: c.description },
        { property: "og:image", content: c.image },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData();
  return (
    <div>
      <header className="relative isolate overflow-hidden bg-foreground text-background">
        <img src={category.image} alt={category.name} className="absolute inset-0 -z-10 size-full object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground via-foreground/70 to-foreground/20" />
        <div className="mx-auto max-w-7xl px-6 py-20">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-background/70">
            <Link to="/" className="hover:text-background">Начало</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-background">Каталог</Link>
            <span>/</span>
            <span className="text-background">{category.name}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Категория</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-xl text-background/70">{category.description}</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="mb-8 text-sm text-muted-foreground">{products.length} продукта</p>
        {products.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            Скоро тук ще намерите продукти от тази категория.{" "}
            <Link to="/products" className="font-semibold text-primary hover:underline">Виж целия каталог</Link>
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p: import("@/data/products").Product) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
