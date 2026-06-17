import { createFileRoute, Link } from "@tanstack/react-router";
import { CategoryGrid } from "@/components/home/CategoryGrid";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Каталог по категории — GoClimaHome" },
      {
        name: "description",
        content:
          "Разгледайте климатици и термопомпи по тип: инверторни, подови, канални, касетъчни, термопомпи и дизайнерски модели.",
      },
      { property: "og:title", content: "Каталог по категории — GoClimaHome" },
      {
        property: "og:description",
        content: "Изберете категория и намерете идеалния климатик за вашето помещение.",
      },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Начало
          </Link>
          <span>/</span>
          <span className="text-foreground">Каталог</span>
        </nav>
      </div>
      <CategoryGrid />
    </>
  );
}
