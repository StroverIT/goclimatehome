import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories, formatBGN } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Каталог климатици — GoClimaHome" },
      { name: "description", content: "Разгледайте пълния каталог климатици и термопомпи. Филтрирайте по категория, марка, мощност и цена." },
      { property: "og:title", content: "Каталог климатици — GoClimaHome" },
      { property: "og:description", content: "Всички климатици от водещите световни марки на едно място." },
    ],
  }),
  component: ProductsPage,
});

const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
const sorts = [
  { id: "new", label: "Най-нови" },
  { id: "asc", label: "Цена ↑" },
  { id: "desc", label: "Цена ↓" },
  { id: "liked", label: "Най-харесвани" },
];

const sizeRanges = [
  { id: "s", label: "До 9 000 BTU", min: 0, max: 9000 },
  { id: "m", label: "12 000 BTU", min: 9001, max: 14000 },
  { id: "l", label: "18 000 BTU", min: 14001, max: 20000 },
  { id: "xl", label: "24 000 BTU", min: 20001, max: 30000 },
  { id: "xxl", label: "36 000+ BTU", min: 30001, max: 999999 },
];

function ProductsPage() {
  const [cat, setCat] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [sort, setSort] = useState("new");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [onlyInstall, setOnlyInstall] = useState(false);
  const [size, setSize] = useState<string>("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    const r = sizeRanges.find((x) => x.id === size);
    let l = products.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!brand || p.brand === brand) &&
        p.price <= maxPrice &&
        (!onlyPromo || !!p.oldPrice) &&
        (!onlyInstall || p.installationIncluded) &&
        (!r || (p.btu >= r.min && p.btu <= r.max)),
    );
    if (sort === "asc") l = [...l].sort((a, b) => a.price - b.price);
    else if (sort === "desc") l = [...l].sort((a, b) => b.price - a.price);
    else if (sort === "liked") l = [...l].sort((a, b) => b.likes - a.likes);
    else l = [...l].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return l;
  }, [cat, brand, sort, maxPrice, onlyPromo, onlyInstall, size]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Начало</Link>
        <span>/</span>
        <span className="text-foreground">Каталог</span>
      </nav>
      <header className="mb-6 border-b border-border pb-6 sm:mb-10 sm:pb-8">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl">Каталог климатици</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{list.length} продукта · Безплатна доставка над 500 €</p>
      </header>

      <div className="lg:hidden mb-4 flex gap-2">
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex-1 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold"
        >
          {filtersOpen ? "Скрий филтрите" : "Покажи филтрите"}
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="flex-1 rounded-md border border-border bg-card px-3 py-2.5 text-sm font-semibold"
        >
          {sorts.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
        <aside className={`${filtersOpen ? "block" : "hidden"} space-y-8 lg:block`}>
          <FilterGroup title="Категория">
            <button
              onClick={() => setCat("")}
              className={`block w-full text-left text-sm py-1.5 ${!cat ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              Всички
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCat(c.slug)}
                className={`block w-full text-left text-sm py-1.5 ${cat === c.slug ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {c.name}
              </button>
            ))}
          </FilterGroup>

          <FilterGroup title="Оферти">
            <label className="flex cursor-pointer items-center gap-2 py-1.5 text-sm">
              <input
                type="checkbox"
                checked={onlyPromo}
                onChange={(e) => setOnlyPromo(e.target.checked)}
                className="size-4 accent-primary"
              />
              <span className={onlyPromo ? "font-bold text-primary" : "text-muted-foreground"}>
                Само в промоция
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 py-1.5 text-sm">
              <input
                type="checkbox"
                checked={onlyInstall}
                onChange={(e) => setOnlyInstall(e.target.checked)}
                className="size-4 accent-primary"
              />
              <span className={onlyInstall ? "font-bold text-primary" : "text-muted-foreground"}>
                С включен монтаж
              </span>
            </label>
          </FilterGroup>

          <FilterGroup title="Размер (мощност)">
            <button
              onClick={() => setSize("")}
              className={`block w-full text-left text-sm py-1.5 ${!size ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              Всички размери
            </button>
            {sizeRanges.map((r) => (
              <button
                key={r.id}
                onClick={() => setSize(r.id)}
                className={`block w-full text-left text-sm py-1.5 ${size === r.id ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {r.label}
              </button>
            ))}
          </FilterGroup>

          <FilterGroup title="Марка">
            <button
              onClick={() => setBrand("")}
              className={`block w-full text-left text-sm py-1.5 ${!brand ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              Всички марки
            </button>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`block w-full text-left text-sm py-1.5 ${brand === b ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {b}
              </button>
            ))}
          </FilterGroup>

          <FilterGroup title="Максимална цена">
            <input
              type="range"
              min={1000}
              max={15000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="mt-2 text-sm font-semibold text-primary">до {formatBGN(maxPrice)}</p>
          </FilterGroup>
        </aside>

        <div>
          <div className="mb-6 hidden flex-wrap items-center justify-between gap-3 border border-border bg-card px-4 py-3 lg:flex">
            <span className="text-sm text-muted-foreground">Сортиране:</span>
            <div className="flex flex-wrap gap-2">
              {sorts.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSort(s.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    sort === s.id ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-border"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {list.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">Няма продукти, отговарящи на филтрите.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-foreground">{title}</h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
