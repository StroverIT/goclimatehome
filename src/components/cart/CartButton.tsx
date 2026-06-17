import { useRef } from "react";
import { ShoppingCart } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCart } from "@/lib/cart";

gsap.registerPlugin(useGSAP);

export function CartButton() {
  const { itemCount, openCart } = useCart();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP(() => {}, { scope: buttonRef });

  useGSAP(
    () => {
      if (!badgeRef.current || itemCount === 0) return;
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2.4)" },
      );
    },
    { scope: buttonRef, dependencies: [itemCount], revertOnUpdate: true },
  );

  const handleClick = contextSafe(() => {
    if (!buttonRef.current) return;
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.92 },
      { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.6)" },
    );
    openCart();
  });

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={`Количка${itemCount > 0 ? `, ${itemCount} артикула` : ""}`}
      className="relative grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm shadow-primary/30 transition-colors hover:bg-primary-dark"
    >
      <ShoppingCart className="size-4" />
      {itemCount > 0 && (
        <span
          ref={badgeRef}
          className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-bold leading-5 text-background"
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}
