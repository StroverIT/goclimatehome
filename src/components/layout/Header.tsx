import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { CartButton } from "@/components/cart/CartButton";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-baseline gap-1 text-xl font-extrabold tracking-tight text-primary">
            GoClima<span className="text-foreground">Home</span>
          </Link>
          <nav className="hidden gap-7 text-sm font-medium text-muted-foreground md:flex">
            <Link
              to="/catalog"
              className="transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Каталог
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Поръчки</p>
            <p className="text-sm font-bold text-foreground">0700 12 345</p>
          </div>
          <a
            href="tel:070012345"
            className="grid size-10 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground sm:hidden"
          >
            <Phone className="size-4" />
          </a>
          <CartButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
