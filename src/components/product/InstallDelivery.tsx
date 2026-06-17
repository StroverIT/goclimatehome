import { Wrench, ShieldCheck } from "lucide-react";

export function InstallDelivery() {
  const items = [
    { icon: Wrench, title: "Професионален монтаж", text: "Сертифицирани техници. Стандартен монтаж до 3 работни дни." },
    { icon: ShieldCheck, title: "60 месеца гаранция", text: "Пълно гаранционно покритие и оторизиран сервиз в цялата страна." },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex gap-4 rounded-lg border border-border bg-card p-6">
          <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold leading-snug">{title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
