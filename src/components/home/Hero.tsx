import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Tag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import heroImg from "@/assets/hero.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const image = imageRef.current;
      const overlay = overlayRef.current;
      const content = contentRef.current;
      const heading = headingRef.current;
      const subtext = subtextRef.current;
      const actions = actionsRef.current;

      if (!section || !image || !content) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from([heading, subtext, actions].filter(Boolean), {
          y: 48,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        });

        gsap.fromTo(
          image,
          { scale: 1.18, yPercent: 0 },
          {
            scale: 1.05,
            yPercent: -14,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );

        if (overlay) {
          gsap.fromTo(
            overlay,
            { opacity: 1 },
            {
              opacity: 0.55,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        }

        gsap.to(content, {
          y: -72,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([heading, subtext, actions], { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-foreground">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          ref={imageRef}
          src={heroImg}
          alt="Модерна дневна с климатик"
          width={1024}
          height={576}
          className="absolute inset-0 size-full object-cover object-right opacity-55"
        />
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground via-foreground/70 to-transparent"
      />
      <div
        ref={contentRef}
        className="mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-6 py-24 text-background"
      >
        <h1
          ref={headingRef}
          className="max-w-3xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
        >
          Топла зима. <span className="text-primary">Хладно лято</span>
        </h1>
        <p
          ref={subtextRef}
          className="mt-6 max-w-xl text-pretty text-base text-background/70 md:text-lg"
        >
          Над 200 модела от водещите световни марки, професионален монтаж за 72 часа и
          60 месеца гаранция.
        </p>
        <div ref={actionsRef} className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            Купи сега <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-md border border-background/20 bg-background/5 px-6 py-4 text-sm font-bold text-background backdrop-blur transition-colors hover:bg-background/10"
          >
            <Tag className="size-4" /> Летни оферти
          </Link>
        </div>
      </div>
    </section>
  );
}
