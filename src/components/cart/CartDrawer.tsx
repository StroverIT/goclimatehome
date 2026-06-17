import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { formatBGN } from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal, itemCount } =
    useCart();

  const [isClosing, setIsClosing] = useState(false);
  const isVisible = isOpen || isClosing;

  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const getAnimatedNodes = () => {
    const nodes: HTMLElement[] = [];
    if (headerRef.current) nodes.push(headerRef.current);
    if (contentRef.current) nodes.push(contentRef.current);
    if (footerRef.current) nodes.push(footerRef.current);
    return nodes;
  };

  const { contextSafe } = useGSAP(() => {
    gsap.set(containerRef.current, { visibility: "hidden", pointerEvents: "none" });
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { xPercent: 100 });
  }, { scope: containerRef });

  const playOpen = contextSafe(() => {
    const container = containerRef.current;
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!container || !backdrop || !panel) return;

    timelineRef.current?.kill();
    gsap.set(container, { visibility: "visible", pointerEvents: "auto" });

    const nodes = getAnimatedNodes();

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(backdrop, { opacity: 1 });
      gsap.set(panel, { xPercent: 0 });
      gsap.set(nodes, { opacity: 1, x: 0, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(nodes, { opacity: 0, x: 24 });
      gsap.set(headerRef.current, { y: -12 });
      if (footerRef.current) gsap.set(footerRef.current, { y: 20 });

      const tl = gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(
          panel,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.45, ease: "power3.out" },
          "<",
        )
        .to(
          headerRef.current,
          { opacity: 1, x: 0, y: 0, duration: 0.32 },
          "-=0.22",
        )
        .to(
          contentRef.current,
          { opacity: 1, x: 0, duration: 0.34 },
          "-=0.2",
        );

      if (footerRef.current) {
        tl.to(footerRef.current, { opacity: 1, x: 0, y: 0, duration: 0.32 }, "-=0.18");
      }

      timelineRef.current = tl;
    });
  });

  const playClose = contextSafe((onComplete: () => void) => {
    const container = containerRef.current;
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!container || !backdrop || !panel) {
      onComplete();
      return;
    }

    timelineRef.current?.kill();
    const nodes = getAnimatedNodes();

    const finish = () => {
      gsap.set(container, { visibility: "hidden", pointerEvents: "none" });
      onComplete();
    };

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(panel, { xPercent: 100 });
      gsap.set(nodes, { opacity: 0 });
      mm.revert();
      finish();
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.in" },
        onComplete: () => {
          mm.revert();
          finish();
        },
      });

      tl.to(contentRef.current, { opacity: 0, x: 20, duration: 0.22 })
        .to(headerRef.current, { opacity: 0, y: -10, duration: 0.2 }, "<0.04");

      if (footerRef.current) {
        tl.to(footerRef.current, { opacity: 0, y: 16, duration: 0.2 }, "<");
      }

      tl.to(panel, { xPercent: 100, duration: 0.4, ease: "power3.in" }, "-=0.06").to(
        backdrop,
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        "<0.1",
      );

      timelineRef.current = tl;
    });
  });

  const requestClose = contextSafe(() => {
    if (!isOpen || isClosing) return;
    setIsClosing(true);
    playClose(() => {
      closeCart();
      setIsClosing(false);
    });
  });

  useGSAP(
    () => {
      if (isOpen) playOpen();
    },
    { scope: containerRef, dependencies: [isOpen] },
  );

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, requestClose]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-60 invisible pointer-events-none"
      aria-hidden={!isVisible}
    >
      <button
        ref={backdropRef}
        type="button"
        aria-label="Затвори количката"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
        onClick={requestClose}
        tabIndex={isVisible ? 0 : -1}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Количка"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl shadow-primary/10"
      >
        <div
          ref={headerRef}
          className="flex items-center justify-between border-b border-border px-6 py-5"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Вашата поръчка
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight">
              Количка
              {itemCount > 0 && (
                <span className="ml-2 text-base font-bold text-primary">({itemCount})</span>
              )}
            </h2>
          </div>
          <button
            type="button"
            onClick={requestClose}
            className="grid size-10 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Затвори"
          >
            <X className="size-4" />
          </button>
        </div>

        <div ref={contentRef} className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
              <div className="grid size-16 place-items-center rounded-full bg-secondary text-muted-foreground">
                <ShoppingBag className="size-7" />
              </div>
              <p className="mt-5 text-lg font-bold">Количката е празна</p>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Разгледайте каталога и добавете климатици за бърза поръчка.
              </p>
              <Link
                to="/products"
                onClick={requestClose}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                Към каталога
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const unitPrice = item.price + (item.withInstall ? item.installPrice : 0);
                return (
                  <li
                    key={item.id}
                    data-cart-item
                    className="flex gap-4 border border-border bg-card p-3"
                  >
                    <Link
                      to="/products/$slug"
                      params={{ slug: item.slug }}
                      onClick={requestClose}
                      className="relative size-20 shrink-0 overflow-hidden bg-secondary"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-full object-cover"
                        width={80}
                        height={80}
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {item.brand}
                      </p>
                      <Link
                        to="/products/$slug"
                        params={{ slug: item.slug }}
                        onClick={requestClose}
                        className="line-clamp-2 text-sm font-bold leading-snug hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      {item.withInstall && (
                        <p className="mt-1 text-[10px] font-semibold text-primary">
                          + стандартен монтаж
                        </p>
                      )}
                      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                        <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
                          <button
                            type="button"
                            aria-label="Намали количество"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="grid size-7 place-items-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-6 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Увеличи количество"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="grid size-7 place-items-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-extrabold text-primary">
                            {formatBGN(unitPrice * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[10px] text-muted-foreground">
                              {formatBGN(unitPrice)} / бр.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Премахни от количката"
                      onClick={() => removeItem(item.id)}
                      className="grid size-8 shrink-0 place-items-center self-start rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div
            ref={footerRef}
            className="border-t border-border bg-card/60 px-6 py-5 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Междинна сума</span>
              <span className="text-2xl font-extrabold text-primary">{formatBGN(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Доставката се изчислява при финализиране на поръчката.
            </p>
            <button
              type="button"
              className={cn(
                "mt-5 w-full rounded-md bg-primary py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark",
              )}
            >
              Продължи към плащане
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
