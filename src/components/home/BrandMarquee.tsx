import brand1 from "@/assets/brands/1.png";
import brand2 from "@/assets/brands/2.png";
import brand3 from "@/assets/brands/3.png";
import brand4 from "@/assets/brands/4.png";
import brand5 from "@/assets/brands/5.png";
import brand6 from "@/assets/brands/6.png";
import brand7 from "@/assets/brands/7.png";
import brand8 from "@/assets/brands/8.png";
import brand9 from "@/assets/brands/9.png";
import brand10 from "@/assets/brands/10.png";
import brand11 from "@/assets/brands/11.png";
import brand12 from "@/assets/brands/12.png";
import brand13 from "@/assets/brands/13.png";
import brand14 from "@/assets/brands/14.png";
import brand15 from "@/assets/brands/15.png";

const brands = [
  { name: "Daikin", logo: brand1 },
  { name: "Mitsubishi Electric", logo: brand2 },
  { name: "LG", logo: brand3 },
  { name: "Samsung", logo: brand4 },
  { name: "Panasonic", logo: brand5 },
  { name: "Fujitsu", logo: brand6 },
  { name: "Hitachi", logo: brand7 },
  { name: "Toshiba", logo: brand8 },
  { name: "Bosch", logo: brand9 },
  { name: "Midea", logo: brand10 },
  { name: "Gree", logo: brand11 },
  { name: "Haier", logo: brand12 },
  { name: "Hisense", logo: brand13 },
  { name: "York", logo: brand14 },
  { name: "Trane", logo: brand15 },
] as const;

function BrandItem({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      className="flex h-9 w-24 shrink-0 items-center justify-center sm:h-10 sm:w-28 md:h-11 md:w-32"
      aria-hidden
    >
      <img
        src={logo}
        alt=""
        className="h-full w-full object-contain object-center opacity-55 grayscale transition-opacity hover:opacity-80"
        loading="lazy"
        draggable={false}
      />
      <span className="sr-only">{name}</span>
    </div>
  );
}

export function BrandMarquee() {
  return (
    <section
      aria-label="Водещи марки климатици"
      className="relative border-y border-border bg-background py-8 md:py-10"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent md:w-24" />

      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 px-6 motion-reduce:animate-none md:gap-14 md:px-8">
          {brands.map(({ name, logo }) => (
            <BrandItem key={`marquee-a-${name}`} name={name} logo={logo} />
          ))}
          {brands.map(({ name, logo }) => (
            <BrandItem key={`marquee-b-${name}`} name={name} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
