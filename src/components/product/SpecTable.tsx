import type { Product } from "@/data/products";

export function SpecTable({ product }: { product: Product }) {
  const rows: [string, string][] = [
    ["Модел", product.modelCode],
    ["Мощност охлаждане", product.powerCool],
    ["Мощност отопление", product.powerHeat],
    ["Капацитет (BTU)", `${product.btu.toLocaleString("bg-BG")} BTU`],
    ["Препоръчителна площ", `${product.area} м²`],
    ["Енергиен клас охлаждане / отопление", `${product.energyClassCool} / ${product.energyClassHeat}`],
    ["SEER / SCOP", `${product.seer} / ${product.scop}`],
    ["Ниво на шум (вътр. тяло)", `${product.noise} dB`],
    ["Размери вътрешно тяло", product.dimensionsIndoor],
    ["Размери външно тяло", product.dimensionsOutdoor],
    ["Работна външна температура", product.workingTemp],
    ["Захранване", product.voltage],
    ["Хладилен агент", product.refrigerant],
    ["Wi-Fi управление", product.wifi ? "Да" : "Не"],
    ["Гаранция", product.warranty],
  ];
  return (
    <div className="overflow-hidden border border-border">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={k} className={i % 2 === 0 ? "bg-secondary/50" : "bg-card"}>
              <td className="w-1/2 px-5 py-3 text-muted-foreground">{k}</td>
              <td className="px-5 py-3 font-semibold">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
