# Онлайн магазин за климатици (Bulgarian AC Shop)

Static-data demo shop, fully in Bulgarian, blue trust-focused palette. Design direction: **Architectural precision** (clean blue `hsl(217 91% 60%)`, Inter, bordered category grid, horizontal swipers, prominent CTAs).

## Pages & routes

```
src/routes/
  __root.tsx              -> shared header + footer wrapper
  index.tsx               -> Начало (home)
  products.index.tsx      -> /products — listing (all + filters)
  products.$slug.tsx      -> /products/:slug — detail page
  category.$slug.tsx      -> /category/:slug — filtered listing per category
```

## Home page (/)
1. **Hero banner** — full-bleed image, headline „Хладно лято с топ климатици", CTAs: „Купи сега", „Летни оферти", „Помогни ми да избера".
2. **Категории** — bordered grid of all 9: Инверторни, Подови, Канални, Касетъчни, Колони, Мултисплит системи, Термопомпи, Подово-таванни, Дизайнерски. Each links to `/category/$slug`.
3. **Най-нови** — horizontal swiper of latest products with prev/next buttons.
4. **Най-харесвани** — second swiper showing like counts (♥ 1.2k).
5. Footer with contact + services.

## Listing page (/products, /category/$slug)
- Grid of product cards (image, brand, name, BTU, energy class badge, price in лв., heart icon).
- Left sidebar filters: category, brand, BTU range, energy class, price range (client-side filtering only).
- Sort dropdown (newest, price asc/desc, most liked).

## Detail page (/products/$slug)
- **Gallery** with thumbnails + main image, hover-zoom (CSS transform on cursor position).
- Title, brand, SKU, star rating + review count.
- Price + old price.
- Spec grid: BTU, енергиен клас (cooling/heating), площ, инверторна технология, ниво на шум, хладилен агент.
- Feature checklist.
- CTAs: „Добави в количката", wishlist.
- **Монтаж и доставка** block: монтаж до 3 раб. дни, безплатна доставка над 500 лв., 60 м. гаранция.
- **Отзиви** section: average rating, list of reviews with stars, name, date, text.
- Related products row.

## Data layer
Single file `src/data/products.ts` with:
- `categories` array (slug, name BG, image prompt).
- `products` array (~16 items across categories) with: id, slug, brand, name, category slug, price, oldPrice?, btu, energyClassCool, energyClassHeat, area, noise, refrigerant, isNew, likes, rating, reviewCount, features[], images[], reviews[], description.
- Helpers: `getProduct(slug)`, `getByCategory(slug)`, `latest()`, `mostLiked()`.

## Components
```
src/components/
  layout/Header.tsx           — sticky nav, logo, cart
  layout/Footer.tsx
  home/Hero.tsx
  home/CategoryGrid.tsx
  home/ProductSwiper.tsx      — reusable for "Най-нови" and "Най-харесвани"
  product/ProductCard.tsx
  product/ProductGallery.tsx  — thumbnails + main + cursor-zoom
  product/SpecTable.tsx
  product/Reviews.tsx
  product/InstallDelivery.tsx
  product/Filters.tsx
```

## Design tokens (src/styles.css)
Replace shadcn defaults with the v3 blue palette:
- `--primary: oklch` equivalent of `hsl(217 91% 60%)`
- `--accent: oklch` of `hsl(199 89% 48%)`
- `--background: hsl(210 40% 98%)`
- `--foreground: hsl(222 47% 11%)`
- Inter font via `<link>` in `__root.tsx`.

## Images
Generate ~12 images via `imagegen` (fast tier): hero, 9 category tiles, ~3-4 product hero shots used across products. Keep file count modest; reuse images across similar products to stay efficient.

## Technical notes
- Static data, no Lovable Cloud, no auth, no real cart (cart icon is decorative; "Add to cart" shows a toast via sonner).
- Swipers: native horizontal scroll with `scroll-snap-x` + scroll buttons (no extra library).
- Gallery zoom: pure CSS/React (no library).
- All `<Link>` from `@tanstack/react-router` with `params`, never href interpolation.
- Each route sets its own `head()` with BG title/description/og tags.

## Out of scope
Real checkout, payments, user accounts, persistent likes, admin panel — all explicitly excluded per "static demo data" choice.
