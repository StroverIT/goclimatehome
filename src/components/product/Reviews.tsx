import { Star } from "lucide-react";
import type { Review } from "@/data/products";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < Math.round(rating) ? "fill-current" : "text-border"}`} />
      ))}
    </div>
  );
}

export function Reviews({ rating, count, reviews }: { rating: number; count: number; reviews: Review[] }) {
  return (
    <section>
      <div className="mb-8 flex flex-col items-start gap-2 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight">Отзиви на клиенти</h3>
          <p className="mt-1 text-sm text-muted-foreground">{count} отзива · средна оценка {rating.toFixed(1)} / 5</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-extrabold text-primary">{rating.toFixed(1)}</span>
          <Stars rating={rating} />
        </div>
      </div>
      <ul className="space-y-6">
        {reviews.map((r, i) => (
          <li key={i} className="border-b border-border pb-6 last:border-none">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-primary/10 font-bold text-primary">
                  {r.author[0]}
                </div>
                <div>
                  <p className="font-semibold">{r.author}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
