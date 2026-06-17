import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductSwiper } from "@/components/home/ProductSwiper";
import { latest, mostLiked } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GoClimaHome — Климатици, термопомпи и мултисплит системи" },
      { name: "description", content: "Топ климатици с безплатна доставка, експресен монтаж и 60 месеца гаранция. Инверторни, подови, канални, касетъчни, термопомпи и дизайнерски модели." },
      { property: "og:title", content: "GoClimaHome — Топ климатици и термопомпи" },
      { property: "og:description", content: "Хладно лято с топ климатици. Над 200 модела от водещите световни марки." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductSwiper eyebrow="Най-нови" title="Току-що добавени" products={latest()} />
      <div className="bg-secondary/40">
        <ProductSwiper
          eyebrow="Най-харесвани"
          title="Любимците на клиентите"
          products={mostLiked()}
          showLikes
          className="pb-8"
        />
      </div>
    </>
  );
}
