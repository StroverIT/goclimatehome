import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-5 text-xl font-extrabold tracking-tight">
            GoClima<span className="text-primary">Home</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-background/60">
            Лидер в климатизацията и отоплението в България. Прецизни решения за вашия дом и бизнес от 2008 г.
          </p>
        </div>
        <div>
          <h6 className="mb-6 text-xs font-bold uppercase tracking-widest">Продукти</h6>
          <ul className="space-y-3 text-sm text-background/60">
            <li><Link to="/products" className="hover:text-background">Всички климатици</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "inverter" }} className="hover:text-background">Инверторни</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "heatpump" }} className="hover:text-background">Термопомпи</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "designer" }} className="hover:text-background">Дизайнерски</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="mb-6 text-xs font-bold uppercase tracking-widest">Услуги</h6>
          <ul className="space-y-3 text-sm text-background/60">
            <li>Професионален монтаж</li>
            <li>Гаранционен сервиз</li>
            <li>Профилактика</li>
            <li>Безплатна консултация</li>
          </ul>
        </div>
        <div>
          <h6 className="mb-6 text-xs font-bold uppercase tracking-widest">Контакти</h6>
          <ul className="space-y-3 text-sm text-background/60">
            <li>гр. София, бул. България 110</li>
            <li>0700 12 345</li>
            <li>office@goclimahome.bg</li>
            <li>Пон–Съб: 09:00 – 19:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-[11px] uppercase tracking-widest text-background/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} GoClimaHome ЕООД. Всички права запазени.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background">Поверителност</a>
            <a href="#" className="hover:text-background">Общи условия</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
