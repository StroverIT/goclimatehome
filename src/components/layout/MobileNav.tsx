import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { categories } from "@/data/products";

gsap.registerPlugin(useGSAP);

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const isVisible = isOpen || isClosing;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const getNavItems = () =>
    navRef.current?.querySelectorAll<HTMLElement>("[data-nav-item]") ?? [];

  const { contextSafe } = useGSAP(() => {
    if (!portalTarget || !containerRef.current) return;
    gsap.set(containerRef.current, { visibility: "hidden", pointerEvents: "none" });
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { xPercent: 100 });
  }, { scope: containerRef, dependencies: [portalTarget] });

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const playOpen = contextSafe(() => {
    const container = containerRef.current;
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!container || !backdrop || !panel) return;

    timelineRef.current?.kill();
    gsap.set(container, { visibility: "visible", pointerEvents: "auto" });

    const navItems = getNavItems();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(backdrop, { opacity: 1 });
      gsap.set(panel, { xPercent: 0 });
      gsap.set([headerRef.current, ...navItems, footerRef.current], { opacity: 1, x: 0, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(headerRef.current, { opacity: 0, x: 24, y: -12 });
      gsap.set(navItems, { opacity: 0, x: 28 });
      gsap.set(footerRef.current, { opacity: 0, y: 20 });

      const tl = gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(
          panel,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.45, ease: "power3.out" },
          "<",
        )
        .to(headerRef.current, { opacity: 1, x: 0, y: 0, duration: 0.32 }, "-=0.22")
        .to(navItems, { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }, "-=0.18")
        .to(footerRef.current, { opacity: 1, y: 0, duration: 0.28 }, "-=0.12");

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
    const navItems = getNavItems();

    const finish = () => {
      gsap.set(container, { visibility: "hidden", pointerEvents: "none" });
      onComplete();
    };

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(panel, { xPercent: 100 });
      gsap.set([headerRef.current, ...navItems, footerRef.current], { opacity: 0 });
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

      tl.to(navItems, { opacity: 0, x: 20, duration: 0.18, stagger: 0.03 })
        .to(headerRef.current, { opacity: 0, y: -10, duration: 0.2 }, "<0.04")
        .to(footerRef.current, { opacity: 0, y: 16, duration: 0.2 }, "<")
        .to(panel, { xPercent: 100, duration: 0.4, ease: "power3.in" }, "-=0.06")
        .to(backdrop, { opacity: 0, duration: 0.3, ease: "power2.in" }, "<0.1");

      timelineRef.current = tl;
    });
  });

  const requestOpen = contextSafe(() => {
    if (isOpen || isClosing) return;
    if (triggerRef.current) {
      gsap.fromTo(
        triggerRef.current,
        { scale: 0.92 },
        { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.6)" },
      );
    }
    setIsOpen(true);
  });

  const requestClose = contextSafe(() => {
    if (!isOpen || isClosing) return;
    setIsClosing(true);
    playClose(() => {
      setIsOpen(false);
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
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={requestOpen}
        className="grid size-10 place-items-center rounded-full bg-secondary text-foreground md:hidden"
        aria-label="Отвори меню"
        aria-expanded={isOpen}
      >
        <Menu className="size-4" />
      </button>

      {portalTarget
        ? createPortal(
            <div
              ref={containerRef}
              className="fixed inset-0 z-60 invisible pointer-events-none md:hidden"
              aria-hidden={!isVisible}
            >
              <button
                ref={backdropRef}
                type="button"
                aria-label="Затвори менюто"
                className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
                onClick={requestClose}
                tabIndex={isVisible ? 0 : -1}
              />

              <aside
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Каталог"
                className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border bg-background shadow-2xl shadow-primary/10"
              >
                <div ref={headerRef} className="border-b border-border px-6 pb-4 pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Навигация
                      </p>
                      <h2 className="mt-1 text-xl font-extrabold tracking-tight">Каталог</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Изберете тип климатик</p>
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
                </div>

                <nav ref={navRef} className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
                  <Link
                    to="/catalog"
                    data-nav-item
                    onClick={requestClose}
                    className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-bold text-primary transition-colors hover:bg-secondary"
                  >
                    Всички категории
                    <ChevronRight className="size-4" />
                  </Link>

                  <div data-nav-item className="my-2 border-t border-border" />

                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to="/category/$slug"
                      params={{ slug: cat.slug }}
                      data-nav-item
                      onClick={requestClose}
                      className="flex items-center justify-between rounded-md px-3 py-3 transition-colors hover:bg-secondary"
                    >
                      <div>
                        <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{cat.description}</p>
                      </div>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    </Link>
                  ))}
                </nav>

                <div ref={footerRef} className="border-t border-border px-6 py-5">
                  <Link
                    to="/products"
                    onClick={requestClose}
                    className="block text-center text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Всички продукти
                  </Link>
                </div>
              </aside>
            </div>,
            portalTarget,
          )
        : null}
    </>
  );
}
