import hero from "@/assets/hero.jpg";
import catInverter from "@/assets/cat-inverter.jpg";
import catFloor from "@/assets/cat-floor.jpg";
import catDuct from "@/assets/cat-duct.jpg";
import catCassette from "@/assets/cat-cassette.jpg";
import catColumn from "@/assets/cat-column.jpg";
import catMultisplit from "@/assets/cat-multisplit.jpg";
import catHeatpump from "@/assets/cat-heatpump.jpg";
import catCeilingFloor from "@/assets/cat-ceilingfloor.jpg";
import catDesigner from "@/assets/cat-designer.jpg";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";
import consoleFront from "@/assets/toshiba/console-front.jpg";
import consoleSlant from "@/assets/toshiba/console-slant.jpg";
import consoleSlant1 from "@/assets/toshiba/console-slant1.jpg";
import consoleOpen from "@/assets/toshiba/console-open.jpg";
import mhiSrfZs from "@/assets/mitsubishi-heavy/srf-zs.webp";
import mhiConsoleFront from "@/assets/mitsubishi-heavy/console-front.webp";
import mhiConsoleSide from "@/assets/mitsubishi-heavy/console-side.webp";

export const heroImage = hero;

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  { slug: "inverter", name: "Инверторни климатици", description: "Енергоспестяващи стенни системи", image: catInverter },
  { slug: "floor", name: "Подови климатици", description: "За дома и работни пространства", image: catFloor },
  { slug: "duct", name: "Канални климатици", description: "Скрит монтаж в окачен таван", image: catDuct },
  { slug: "cassette", name: "Касетъчни климатици", description: "Таванни тела за офиси и магазини", image: catCassette },
  { slug: "column", name: "Колонни климатици", description: "Висока мощност за големи помещения", image: catColumn },
  { slug: "multisplit", name: "Мултисплит системи", description: "Едно външно, няколко вътрешни тела", image: catMultisplit },
  { slug: "heatpump", name: "Термопомпи", description: "Отопление, охлаждане и БГВ", image: catHeatpump },
  { slug: "ceiling-floor", name: "Подово-таванни", description: "Универсални тела с двойно монтиране", image: catCeilingFloor },
  { slug: "designer", name: "Дизайнерски климатици", description: "Премиум серии с уникален дизайн", image: catDesigner },
];

export type Review = {
  author: string;
  date: string;
  rating: number;
  text: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  sku: string;
  modelCode: string;
  category: string;
  price: number;
  oldPrice?: number;
  btu: number;
  powerCool: string;
  powerHeat: string;
  energyClassCool: string;
  energyClassHeat: string;
  scop: string;
  seer: string;
  area: number;
  noise: number;
  refrigerant: string;
  voltage: string;
  dimensionsIndoor: string;
  dimensionsOutdoor: string;
  workingTemp: string;
  warranty: string;
  wifi: boolean;
  isNew: boolean;
  installationIncluded: boolean;
  likes: number;
  rating: number;
  reviewCount: number;
  features: string[];
  recommendation: string;
  description: string;
  images: string[];
  reviews: Review[];
};

export const STANDARD_INSTALL_PRICE = 391; // ~200 EUR

const baseReviews: Review[] = [
  { author: "Иван П.", date: "12.05.2024", rating: 5, text: "Изключителен климатик! Тих е и охлажда много бързо. Монтажът беше професионален." },
  { author: "Мария С.", date: "03.04.2024", rating: 5, text: "Купих го за спалнята – почти не се чува нощем. Препоръчвам!" },
  { author: "Георги Т.", date: "21.03.2024", rating: 4, text: "Добро съотношение цена/качество. Доставката беше навреме." },
];

const standardFeatures = [
  "Wi-Fi управление през мобилно приложение",
  "Самопочистваща се функция на изпарителя",
  "Йонизатор и пречистване на въздуха",
  "Режим Sleep с регулиране на температурата",
  "Турбо режим за бързо охлаждане",
];

// Real Toshiba Console (floor) products from manufacturer datasheet
const toshibaImages = [consoleFront, consoleSlant, consoleSlant1, consoleOpen];
const mhiImages = [mhiConsoleSide, mhiConsoleFront, mhiSrfZs];

const toshibaFeatures = [
  "Bi-flow технология – двупосочен въздушен поток",
  "Опционално Wi-Fi управление (RB-N105S-G)",
  "Регулиране силата на дисплея",
  "Специално покритие на топлообменника, намаляващо полепване на прах",
  "Функция „Топъл под“ – отопление само отдолу",
  "Редуциране на шума на външното тяло в нощен режим",
  "Тръбен път: мин. 2 м / макс. 20 м",
];

const toshibaDescription =
  "Страхотен климатик за подов монтаж. Ползата в режим на отопление е огромна пред високо-стенните тела – можете да постигнете значителен комфорт. Работата му е безупречна; поради подовия монтаж има значително по-добри енергийни показатели. Подходящ за монтаж на мястото на радиатор, под прозорец или на стена. Климатикът има голям дебит на въздуха и при правилен подбор според помещението клиентите остават доволни.";

const mhiFeatures = [
  "Двоен въздушен поток – отгоре и отдолу в отоплителен режим",
  "Микрокомпютърно обезскрежаване",
  "Защита от деца",
  "Опционално Wi-Fi управление (WF-RAC)",
  "Bi-flow конзола за подов или стенен монтаж",
];

const mhiDescription =
  "Страхотен климатик за подов монтаж. Ползата в режим на отопление е огромна пред високо-стенните тела – можете да постигнете значителен комфорт. Работата му е безупречна; поради подовия монтаж има значително по-добри енергийни показатели. Подходящ за монтаж на мястото на радиатор, под прозорец или на стена. Климатикът има голям дебит на въздуха и при правилен подбор според помещението клиентите остават доволни.";

export const products: Product[] = [
  {
    id: "1",
    slug: "toshiba-console-ras-b10j2fvg",
    name: "Toshiba Bi-flow Конзола 10 (2.5 kW)",
    brand: "Toshiba",
    sku: "TOSH-CONSOLE-10",
    modelCode: "RAS-B10J2FVG-E1 / RAS-10P2AVSG-E",
    category: "floor",
    price: 2890,
    oldPrice: 3190,
    btu: 9000,
    powerCool: "1,0–3,20 (2,50) kW",
    powerHeat: "0,85–4,40 (3,20) kW",
    energyClassCool: "A++",
    energyClassHeat: "A++",
    scop: "4,70",
    seer: "7,20",
    area: 25,
    noise: 28,
    refrigerant: "R32",
    voltage: "230 V / 50 Hz / 1 Ph",
    dimensionsIndoor: "600 × 700 × 220 mm",
    dimensionsOutdoor: "550 × 780 × 290 mm",
    workingTemp: "-20 °C до +24 °C",
    warranty: "2 години",
    wifi: false,
    isNew: true,
    installationIncluded: true,
    likes: 1240,
    rating: 4.8,
    reviewCount: 42,
    features: toshibaFeatures,
    recommendation: "Перфектен за отопление със завишено усещане за комфорт.",
    description: toshibaDescription,
    images: toshibaImages,
    reviews: baseReviews,
  },
  {
    id: "2",
    slug: "toshiba-console-ras-b13j2fvg",
    name: "Toshiba Bi-flow Конзола 13 (3.5 kW)",
    brand: "Toshiba",
    sku: "TOSH-CONSOLE-13",
    modelCode: "RAS-B13J2FVG-E1 / RAS-13P2AVSG-E",
    category: "floor",
    price: 3290,
    btu: 12000,
    powerCool: "1,05–4,10 (3,50) kW",
    powerHeat: "1,00–5,00 (4,20) kW",
    energyClassCool: "A++",
    energyClassHeat: "A++",
    scop: "4,70",
    seer: "7,00",
    area: 35,
    noise: 29,
    refrigerant: "R32",
    voltage: "230 V / 50 Hz / 1 Ph",
    dimensionsIndoor: "600 × 700 × 220 mm",
    dimensionsOutdoor: "550 × 780 × 290 mm",
    workingTemp: "-20 °C до +24 °C",
    warranty: "2 години",
    wifi: false,
    isNew: true,
    installationIncluded: true,
    likes: 980,
    rating: 4.7,
    reviewCount: 31,
    features: toshibaFeatures,
    recommendation: "Перфектен за отопление със завишено усещане за комфорт.",
    description:
      "По-мощната версия на Toshiba Bi-flow Console с 3,5 kW охлаждане и 4,2 kW отопление – подходяща за дневни и помещения до 35 м². " + toshibaDescription,
    images: toshibaImages,
    reviews: baseReviews,
  },
  {
    id: "19",
    slug: "mitsubishi-heavy-srf25-zs-w",
    name: "Mitsubishi Heavy Bi-flow Конзола 25 (2.5 kW)",
    brand: "Mitsubishi Heavy",
    sku: "MHI-SRF25-ZS",
    modelCode: "SRF25ZS-W / SRC25ZS-W",
    category: "floor",
    price: 1435,
    btu: 9000,
    powerCool: "0,90–3,10 (2,50) kW",
    powerHeat: "0,80–3,70 (2,90) kW",
    energyClassCool: "A++",
    energyClassHeat: "A+",
    scop: "4,00",
    seer: "7,40",
    area: 25,
    noise: 28,
    refrigerant: "R32",
    voltage: "230 V / 50 Hz / 1 Ph",
    dimensionsIndoor: "600 × 860 × 238 mm",
    dimensionsOutdoor: "595 × 780 × 290 mm",
    workingTemp: "-15 °C до +24 °C",
    warranty: "2 години",
    wifi: true,
    isNew: true,
    installationIncluded: false,
    likes: 640,
    rating: 4.7,
    reviewCount: 18,
    features: mhiFeatures,
    recommendation: "Перфектен за отопление със завишено усещане за комфорт.",
    description: mhiDescription,
    images: mhiImages,
    reviews: baseReviews,
  },
  {
    id: "20",
    slug: "mitsubishi-heavy-srf35-zs-w",
    name: "Mitsubishi Heavy Bi-flow Конзола 35 (3.5 kW)",
    brand: "Mitsubishi Heavy",
    sku: "MHI-SRF35-ZS",
    modelCode: "SRF35ZS-W / SRC35ZS-W",
    category: "floor",
    price: 1575,
    btu: 12000,
    powerCool: "0,90–4,10 (3,50) kW",
    powerHeat: "0,80–5,20 (4,50) kW",
    energyClassCool: "A++",
    energyClassHeat: "A++",
    scop: "4,70",
    seer: "8,10",
    area: 35,
    noise: 29,
    refrigerant: "R32",
    voltage: "230 V / 50 Hz / 1 Ph",
    dimensionsIndoor: "600 × 860 × 238 mm",
    dimensionsOutdoor: "595 × 780 × 290 mm",
    workingTemp: "-15 °C до +24 °C",
    warranty: "2 години",
    wifi: true,
    isNew: true,
    installationIncluded: false,
    likes: 820,
    rating: 4.8,
    reviewCount: 24,
    features: mhiFeatures,
    recommendation: "Перфектен за отопление със завишено усещане за комфорт.",
    description: mhiDescription,
    images: mhiImages,
    reviews: baseReviews,
  },
  {
    id: "21",
    slug: "mitsubishi-heavy-srf50-zsx-w",
    name: "Mitsubishi Heavy Bi-flow Конзола 50 (5.0 kW)",
    brand: "Mitsubishi Heavy",
    sku: "MHI-SRF50-ZSX",
    modelCode: "SRF50ZSX-W / SRC50ZSX-W",
    category: "floor",
    price: 2209,
    btu: 18000,
    powerCool: "1,10–5,60 (5,00) kW",
    powerHeat: "0,80–7,40 (6,00) kW",
    energyClassCool: "A++",
    energyClassHeat: "A++",
    scop: "4,60",
    seer: "7,50",
    area: 50,
    noise: 30,
    refrigerant: "R32",
    voltage: "230 V / 50 Hz / 1 Ph",
    dimensionsIndoor: "600 × 860 × 238 mm",
    dimensionsOutdoor: "640 × 800 × 290 mm",
    workingTemp: "-20 °C до +24 °C",
    warranty: "2 години",
    wifi: true,
    isNew: true,
    installationIncluded: false,
    likes: 710,
    rating: 4.8,
    reviewCount: 21,
    features: [
      ...mhiFeatures,
      "Хиперинверторно външно тяло за по-висока ефективност",
    ],
    recommendation: "Перфектен за отопление със завишено усещане за комфорт.",
    description: mhiDescription,
    images: mhiImages,
    reviews: baseReviews,
  },
];

// Other categories — adapted with realistic specs to match the Toshiba reference
const otherDefaults = {
  energyClassCool: "A++",
  energyClassHeat: "A++",
  refrigerant: "R32",
  voltage: "230 V / 50 Hz / 1 Ph",
  workingTemp: "-15 °C до +43 °C",
  warranty: "3 години",
  wifi: true,
};

type Seed = {
  slug: string; name: string; brand: string; sku: string; modelCode: string;
  category: string; price: number; oldPrice?: number; btu: number;
  powerCool: string; powerHeat: string; scop: string; seer: string;
  area: number; noise: number; dimensionsIndoor: string; dimensionsOutdoor: string;
  isNew?: boolean; likes: number; image: string; recommendation: string;
};

const otherSeeds: Seed[] = [
  { slug: "daikin-perfera-ftxm35r", name: "Daikin Perfera FTXM35R", brand: "Daikin", sku: "DAI-PERFERA-12", modelCode: "FTXM35R / RXM35R",
    category: "inverter", price: 2450, oldPrice: 2780, btu: 12000, powerCool: "1,30–5,00 (3,50) kW", powerHeat: "1,30–6,00 (4,00) kW",
    scop: "5,10", seer: "8,65", area: 34, noise: 19, dimensionsIndoor: "295 × 919 × 272 mm", dimensionsOutdoor: "550 × 765 × 285 mm",
    isNew: true, likes: 1240, image: prod1, recommendation: "Тих и енергоспестяващ – препоръчва се за спалня." },
  { slug: "mitsubishi-msz-ln35", name: "Mitsubishi MSZ-LN35VG2", brand: "Mitsubishi Electric", sku: "MIT-LN35-12", modelCode: "MSZ-LN35VG2 / MUZ-LN35VG2",
    category: "designer", price: 3290, btu: 12000, powerCool: "1,40–5,40 (3,50) kW", powerHeat: "1,40–6,30 (4,00) kW",
    scop: "5,10", seer: "8,60", area: 34, noise: 19, dimensionsIndoor: "305 × 890 × 233 mm", dimensionsOutdoor: "550 × 800 × 285 mm",
    isNew: true, likes: 982, image: prod2, recommendation: "Премиум дизайн в 4 цвята – за модерни интериори." },
  { slug: "samsung-windfree-elite", name: "Samsung Wind-Free Elite AR12", brand: "Samsung", sku: "SAM-WF-12", modelCode: "AR12TXFCAWKNEU",
    category: "inverter", price: 2190, oldPrice: 2390, btu: 12000, powerCool: "1,00–5,00 (3,50) kW", powerHeat: "0,90–6,30 (4,00) kW",
    scop: "4,60", seer: "8,50", area: 34, noise: 21, dimensionsIndoor: "299 × 1055 × 215 mm", dimensionsOutdoor: "548 × 790 × 285 mm",
    likes: 856, image: prod3, recommendation: "Wind-Free режим без директно духане – комфорт без течение." },
  { slug: "toshiba-shorai-edge-13", name: "Toshiba Shorai Edge 13", brand: "Toshiba", sku: "TOSH-SHORAI-13", modelCode: "RAS-B13G3KVSG-E / RAS-13J2AVSG-E1",
    category: "designer", price: 2790, btu: 12000, powerCool: "0,68–4,40 (3,50) kW", powerHeat: "0,77–5,80 (4,20) kW",
    scop: "5,10", seer: "8,60", area: 34, noise: 21, dimensionsIndoor: "293 × 798 × 230 mm", dimensionsOutdoor: "550 × 780 × 290 mm",
    isNew: true, likes: 1102, image: prod4, recommendation: "Хибриден инвертор Magnetic Reluctance с висока сезонна ефективност." },
  { slug: "gree-amber-nordic-18", name: "Gree Amber Nordic 18", brand: "Gree", sku: "GREE-AMB-18", modelCode: "GWH18YE-S6DBA2A",
    category: "heatpump", price: 3650, btu: 18000, powerCool: "0,80–6,80 (5,30) kW", powerHeat: "0,90–8,00 (6,30) kW",
    scop: "4,60", seer: "7,30", area: 52, noise: 32, dimensionsIndoor: "330 × 1080 × 232 mm", dimensionsOutdoor: "700 × 955 × 396 mm",
    likes: 740, image: prod1, recommendation: "Северна серия с отопление до -30 °C – подходяща за планински райони." },
  { slug: "panasonic-etherea-9", name: "Panasonic Etherea CS-Z25", brand: "Panasonic", sku: "PAN-ETH-9", modelCode: "CS-Z25XKEW / CU-Z25XKE",
    category: "inverter", price: 1890, btu: 9000, powerCool: "0,85–3,00 (2,50) kW", powerHeat: "0,85–4,80 (3,40) kW",
    scop: "5,10", seer: "8,50", area: 25, noise: 19, dimensionsIndoor: "295 × 870 × 255 mm", dimensionsOutdoor: "542 × 780 × 289 mm",
    likes: 612, image: prod2, recommendation: "nanoe™ X пречистване на въздуха – премахва вируси и алергени." },
  { slug: "fujitsu-nocria-x-12", name: "Fujitsu Nocria X 12", brand: "Fujitsu", sku: "FUJ-NOC-12", modelCode: "ASYG12KXCA / AOYG12KXCA",
    category: "designer", price: 3450, btu: 12000, powerCool: "0,80–5,30 (3,40) kW", powerHeat: "0,80–7,90 (4,20) kW",
    scop: "5,20", seer: "9,40", area: 33, noise: 19, dimensionsIndoor: "320 × 990 × 250 mm", dimensionsOutdoor: "620 × 790 × 290 mm",
    isNew: true, likes: 920, image: prod3, recommendation: "Двойни вентилатори за дълбоко отопление в ъглите на стаята." },
  { slug: "midea-cassette-36", name: "Midea Касетъчен 36 000 BTU", brand: "Midea", sku: "MID-CAS-36", modelCode: "MCD-36HRFN8 / MOU-36HFN8",
    category: "cassette", price: 2890, btu: 36000, powerCool: "10,55 kW", powerHeat: "11,72 kW",
    scop: "4,00", seer: "6,10", area: 100, noise: 42, dimensionsIndoor: "245 × 840 × 840 mm", dimensionsOutdoor: "1310 × 940 × 350 mm",
    likes: 320, image: prod1, recommendation: "За офиси, заведения и магазини с окачен таван." },
  { slug: "daikin-canal-fba60a", name: "Daikin Канален FBA60A", brand: "Daikin", sku: "DAI-FBA-60", modelCode: "FBA60A9 / RZAG60A",
    category: "duct", price: 4290, btu: 24000, powerCool: "6,00 kW", powerHeat: "7,00 kW",
    scop: "4,20", seer: "6,80", area: 70, noise: 30, dimensionsIndoor: "245 × 1100 × 800 mm", dimensionsOutdoor: "990 × 940 × 320 mm",
    likes: 280, image: prod2, recommendation: "Невидим монтаж – само решетки в таванното пространство." },
  { slug: "lg-floor-uq24", name: "LG Floor Standing UQ24", brand: "LG", sku: "LG-UQ-24", modelCode: "UQ24F.NB0 / UUC1.U40",
    category: "floor", price: 2650, btu: 24000, powerCool: "7,00 kW", powerHeat: "8,00 kW",
    scop: "4,00", seer: "6,30", area: 70, noise: 38, dimensionsIndoor: "1840 × 600 × 350 mm", dimensionsOutdoor: "830 × 950 × 330 mm",
    isNew: true, likes: 410, image: prod3, recommendation: "Колонен подов модел за големи дневни и магазини." },
  { slug: "gree-column-48", name: "Gree Колонен 48 000 BTU", brand: "Gree", sku: "GREE-COL-48", modelCode: "GVH48AL-K6DNC2A",
    category: "column", price: 4890, btu: 48000, powerCool: "14,00 kW", powerHeat: "15,50 kW",
    scop: "3,80", seer: "5,90", area: 140, noise: 48, dimensionsIndoor: "1950 × 600 × 390 mm", dimensionsOutdoor: "1430 × 990 × 426 mm",
    likes: 350, image: prod1, recommendation: "Висока мощност за зали, ресторанти и шоуруми." },
  { slug: "daikin-multi-3mxm52", name: "Daikin Multi 3MXM52N", brand: "Daikin", sku: "DAI-MULTI-52", modelCode: "3MXM52N9",
    category: "multisplit", price: 5290, btu: 18000, powerCool: "5,20 kW", powerHeat: "6,80 kW",
    scop: "4,40", seer: "7,40", area: 52, noise: 47, dimensionsIndoor: "Според вътрешни тела", dimensionsOutdoor: "735 × 825 × 300 mm",
    isNew: true, likes: 590, image: prod2, recommendation: "Едно външно тяло за до 3 стаи – спестява място на фасадата." },
  { slug: "mitsubishi-ecodan-12", name: "Mitsubishi Термопомпа Ecodan 12 kW", brand: "Mitsubishi Electric", sku: "MIT-ECO-12", modelCode: "PUHZ-SW120YAA / EHST20C",
    category: "heatpump", price: 12900, oldPrice: 14200, btu: 41000, powerCool: "12,00 kW", powerHeat: "12,00 kW",
    scop: "4,30", seer: "5,80", area: 180, noise: 49, dimensionsIndoor: "1600 × 530 × 695 mm (хидромодул)", dimensionsOutdoor: "1338 × 1050 × 330 mm",
    likes: 470, image: prod3, recommendation: "Въздух–вода термопомпа за отопление, охлаждане и БГВ." },
  { slug: "toshiba-cf-18", name: "Toshiba Подово-таванен 18", brand: "Toshiba", sku: "TOSH-CF-18", modelCode: "RAV-RM561CTP-E / RAV-GM561ATP-E",
    category: "ceiling-floor", price: 3490, btu: 18000, powerCool: "5,00 kW", powerHeat: "6,00 kW",
    scop: "4,10", seer: "6,50", area: 50, noise: 36, dimensionsIndoor: "210 × 1050 × 690 mm", dimensionsOutdoor: "630 × 800 × 300 mm",
    likes: 240, image: prod4, recommendation: "Монтаж на под или таван по избор – универсален за всеки интериор." },
  { slug: "samsung-cassette-wf-12", name: "Samsung Касетъчен Wind-Free 12", brand: "Samsung", sku: "SAM-CAS-12", modelCode: "AC035RN4DKG / AC035RXADKG",
    category: "cassette", price: 3190, btu: 12000, powerCool: "3,50 kW", powerHeat: "4,00 kW",
    scop: "4,20", seer: "7,00", area: 35, noise: 30, dimensionsIndoor: "245 × 840 × 840 mm", dimensionsOutdoor: "548 × 790 × 285 mm",
    isNew: true, likes: 380, image: prod3, recommendation: "Wind-Free 360° – мек въздушен поток без течение." },
  { slug: "panasonic-multi-cu-2z", name: "Panasonic Multi CU-2Z50TBE", brand: "Panasonic", sku: "PAN-MULTI-50", modelCode: "CU-2Z50TBE",
    category: "multisplit", price: 4590, btu: 14000, powerCool: "5,00 kW", powerHeat: "6,80 kW",
    scop: "4,60", seer: "7,80", area: 50, noise: 46, dimensionsIndoor: "Според вътрешни тела", dimensionsOutdoor: "619 × 824 × 299 mm",
    likes: 320, image: prod2, recommendation: "Компактно външно тяло за 2 вътрешни – подходящо за апартаменти." },
];

otherSeeds.forEach((s, i) => {
  products.push({
    id: String(3 + i),
    slug: s.slug,
    name: s.name,
    brand: s.brand,
    sku: s.sku,
    modelCode: s.modelCode,
    category: s.category,
    price: s.price,
    oldPrice: s.oldPrice,
    btu: s.btu,
    powerCool: s.powerCool,
    powerHeat: s.powerHeat,
    energyClassCool: otherDefaults.energyClassCool,
    energyClassHeat: otherDefaults.energyClassHeat,
    scop: s.scop,
    seer: s.seer,
    area: s.area,
    noise: s.noise,
    refrigerant: otherDefaults.refrigerant,
    voltage: otherDefaults.voltage,
    dimensionsIndoor: s.dimensionsIndoor,
    dimensionsOutdoor: s.dimensionsOutdoor,
    workingTemp: otherDefaults.workingTemp,
    warranty: otherDefaults.warranty,
    wifi: otherDefaults.wifi,
    isNew: s.isNew ?? false,
    installationIncluded: s.price >= 3500,
    likes: s.likes,
    rating: 4.5,
    reviewCount: 18 + i * 2,
    features: standardFeatures,
    recommendation: s.recommendation,
    description:
      `${s.brand} ${s.name} е инверторен климатик с хладилен агент ${otherDefaults.refrigerant} и енергиен клас ${otherDefaults.energyClassCool}. Подходящ за помещения до ${s.area} м², с ниско ниво на шум ${s.noise} dB и пълна гаранция ${otherDefaults.warranty}. Включва Wi-Fi управление и широк набор от интелигентни функции за максимален комфорт.`,
    images: [s.image, s.image, s.image],
    reviews: baseReviews,
  });
});

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const latest = () => [...products].sort((a, b) => Number(b.isNew) - Number(a.isNew) || Number(b.id) - Number(a.id)).slice(0, 10);
export const mostLiked = () => [...products].sort((a, b) => b.likes - a.likes).slice(0, 10);
export const related = (p: Product) => products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

export const formatBGN = (n: number) =>
  `${n.toLocaleString("bg-BG", { maximumFractionDigits: 0 })} €`;
