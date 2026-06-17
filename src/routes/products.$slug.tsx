import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, ShoppingCart, Check, Star, Wrench } from "lucide-react";
import { getProduct, related, formatBGN, getCategory, STANDARD_INSTALL_PRICE } from "@/data/products";
import { useCart } from "@/lib/cart";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SpecTable } from "@/components/product/SpecTable";
import { Reviews } from "@/components/product/Reviews";
import { InstallDelivery } from "@/components/product/InstallDelivery";
import { ProductCard } from "@/components/product/ProductCard";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.name} — ${formatBGN(p.price)} | GoClimaHome` },
        { name: "description", content: `${p.brand} ${p.name} – ${p.btu.toLocaleString("bg-BG")} BTU, енергиен клас ${p.energyClassCool}. Безплатна доставка и монтаж до 3 дни.` },
        { property: "og:title", content: `${p.name} — GoClimaHome` },
        { property: "og:description", content: p.description.slice(0, 160) },
        { property: "og:image", content: p.images[0] },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: p.images[0] },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const cat = getCategory(product.category);
  const rel = related(product);
  const [withInstall, setWithInstall] = useState(false);
  const total = product.price + (!product.installationIncluded && withInstall ? STANDARD_INSTALL_PRICE : 0);
  const { addItem, openCart } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Начало</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-foreground">Каталог</Link>
        {cat && (
          <>
            <span>/</span>
            <Link to="/category/$slug" params={{ slug: cat.slug }} className="hover:text-foreground">{cat.name}</Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{product.brand}</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight">{product.name}</h1>
          <p className="mt-1 text-xs text-muted-foreground">Арт. №: {product.sku}</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-4 ${i < Math.round(product.rating) ? "fill-current" : "text-border"}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} · {product.reviewCount} отзива
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-4 border-y border-border py-6">
            <span className="text-4xl font-extrabold text-primary">{formatBGN(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatBGN(product.oldPrice)}</span>
            )}
            {product.oldPrice && (
              <span className="rounded-sm bg-destructive px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-destructive-foreground">
                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["BTU", product.btu.toLocaleString("bg-BG")],
              ["Клас", product.energyClassCool],
              ["Площ", `${product.area} м²`],
            ].map(([k, v]) => (
              <div key={k} className="border border-border bg-card p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{k}</p>
                <p className="mt-1 text-lg font-extrabold">{v}</p>
              </div>
            ))}
          </div>

          <ul className="mt-6 space-y-2 text-sm">
            {product.features.slice(0, 4).map((f: string) => (
              <li key={f} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <Wrench className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Монтаж</p>
                {product.installationIncluded ? (
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    Стандартен монтаж <span className="text-primary">включен в цената</span>
                  </p>
                ) : (
                  <>
                    <select
                      value={withInstall ? "std" : "none"}
                      onChange={(e) => setWithInstall(e.target.value === "std")}
                      className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    >
                      <option value="none">Без монтаж</option>
                      <option value="std">Стандартен монтаж (+{formatBGN(STANDARD_INSTALL_PRICE)})</option>
                    </select>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Стандартен монтаж до 3 л.м. тръбен път от сертифициран техник.
                    </p>
                  </>
                )}
              </div>
            </div>
            {!product.installationIncluded && withInstall && (
              <p className="mt-3 border-t border-border pt-3 text-sm">
                Общо: <span className="text-lg font-extrabold text-primary">{formatBGN(total)}</span>
              </p>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                addItem({ product, withInstall });
                toast.success("Добавено в количката", { description: product.name });
                openCart();
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              <ShoppingCart className="size-4" /> Добави в количката
            </button>
            <button
              onClick={() => toast("Добавено в любими", { description: product.name })}
              className="grid place-items-center rounded-md border border-border bg-card px-5 transition-colors hover:border-primary hover:text-primary"
            >
              <Heart className="size-5" />
            </button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            ♥ {product.likes.toLocaleString("bg-BG")} харесвания · Безплатна доставка над 500 €
          </p>
        </div>
      </div>

      <div className="mt-20 space-y-12">
        <section>
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Описание</h2>
          <p className="max-w-3xl text-muted-foreground leading-relaxed">{product.description}</p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Технически характеристики</h2>
          <SpecTable product={product} />
        </section>
        <Reviews rating={product.rating} count={product.reviewCount} reviews={product.reviews} />
        <section className="rounded-xl border border-border bg-muted/30 p-6 lg:p-8">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight">Доставка и монтаж</h2>
          <InstallDelivery />
        </section>
      </div>

      {rel.length > 0 && (
        <section className="mt-20 border-t border-border pt-12">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight">Подобни продукти</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rel.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
