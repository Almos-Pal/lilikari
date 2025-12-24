import { MonthlyDate } from "@/types/monthlyDate";

// Helper function to create date for the first day of each month in 2025
const dateForMonth = (month: number, year: number = 2025): Date => {
  return new Date(year, month - 1, 1);
};

export const monthlyDates: MonthlyDate[] = [
  {
    month: 1,
    title: "Korizás",
    subtitle: "Csússzunk bele együtt az évbe",
    description: "Csússzunk bele együtt az évbe",
    availableFrom: dateForMonth(1),
    missions: [
      {
        id: 1,
        text: "egymás korcsolyájáról közeli kép",
      },
      {
        id: 2,
        text: "elmosódott mozgásban lévő kép",
      },
      {
        id: 3,
        text: "szelfi, amikor már elfáradtunk",
      },
    ],
  },
  {
    month: 2,
    title: "Színház",
    subtitle: "Ma este nem mi vagyunk a főszereplők",
    description: "Ma este nem mi vagyunk a főszereplők.",
    availableFrom: dateForMonth(2),
    missions: [
      {
        id: 1,
        text: "jegyek a kezetekben",
      },
      {
        id: 2,
        text: "tükörkép az előcsarnokban",
      },
      {
        id: 3,
        text: '"na ez erős volt"',
      },
    ],
  },
  {
    month: 3,
    title: "Fancy étterem",
    subtitle: "Egy este, amikor kicsit túlöltözzük a hétköznapokat",
    description: "Egy este, amikor kicsit túlöltözzük a hétköznapokat.",
    availableFrom: dateForMonth(3),
    missions: [
      {
        id: 1,
        text: "koccintás",
      },
      {
        id: 2,
        text: "titokban készített fotó egymásról",
      },
      {
        id: 3,
        text: "az étel egy apró részlete",
      },
    ],
  },
  {
    month: 4,
    title: "Nemzeti Botanikus Kert",
    subtitle: "Vácrátót",
    description: "Vácrátót",
    availableFrom: dateForMonth(4),
    missions: [
      {
        id: 1,
        text: "kedvenc növény vagy fa",
      },
      {
        id: 2,
        text: "mi is így nőttünk össze",
      },
      {
        id: 3,
        text: "természetes smink",
      },
    ],
  },
  {
    month: 5,
    title: "Elszökős nap",
    subtitle: "itt vagyunk!",
    description: "itt vagyunk!",
    availableFrom: dateForMonth(5),
    missions: [
      {
        id: 1,
        text: "itt vagyunk!",
      },
      {
        id: 2,
        text: "mi van a batyumban?",
      },
      {
        id: 3,
        text: "mindenhol jó, de legjobb otthon",
      },
    ],
  },
  {
    month: 6,
    title: "Első vonat randi",
    subtitle: "milyen szép a táj",
    description: "milyen szép a táj",
    availableFrom: dateForMonth(6),
    missions: [
      {
        id: 1,
        text: "milyen szép a táj",
      },
      {
        id: 2,
        text: "jó-jó, de hol is vagyunk?",
      },
      {
        id: 3,
        text: "ez a szobor a kedvencem",
      },
    ],
  },
  {
    month: 7,
    title: "Strand",
    subtitle: "ham-nyam pancsoltam",
    description: "ham-nyam pancsoltam",
    availableFrom: dateForMonth(7),
    missions: [
      {
        id: 1,
        text: "ham-nyam pancsoltam",
      },
      {
        id: 2,
        text: "törölköző, papucs, napszemüveg",
      },
      {
        id: 3,
        text: "csurom vizesen",
      },
    ],
  },
  {
    month: 8,
    title: "Szabadtéri mozi",
    subtitle: "popcorn makik",
    description: "popcorn makik",
    availableFrom: dateForMonth(8),
    missions: [
      {
        id: 1,
        text: "popcorn makik",
      },
      {
        id: 2,
        text: "izgatott közönség",
      },
      {
        id: 3,
        text: "hazafelé az éjszakában",
      },
    ],
  },
  {
    month: 9,
    title: "Egy hátizsáknyi randi",
    subtitle: "mindennek a tetején",
    description: "mindennek a tetején",
    availableFrom: dateForMonth(9),
    missions: [
      {
        id: 1,
        text: "mindennek a tetején",
      },
      {
        id: 2,
        text: "a természet szép, de te szebb vagy",
      },
      {
        id: 3,
        text: "mi van a táskámban?",
      },
    ],
  },
  {
    month: 10,
    title: "Titkos küldetés randi",
    subtitle: "???",
    description: "???",
    availableFrom: dateForMonth(10),
    missions: [
      {
        id: 1,
        text: "???",
      },
      {
        id: 2,
        text: "???",
      },
      {
        id: 3,
        text: "???",
      },
    ],
  },
  {
    month: 11,
    title: "Tematikus főzőest",
    subtitle: "kész étel",
    description: "kész étel",
    availableFrom: dateForMonth(11),
    missions: [
      {
        id: 1,
        text: "kész étel",
      },
      {
        id: 2,
        text: "jól lakott pár",
      },
      {
        id: 3,
        text: "szakács asszony és séf úr",
      },
    ],
  },
  {
    month: 12,
    title: "Zárás",
    subtitle: "Ezt az évet együtt csináltuk végig",
    description: "Ezt az évet együtt csináltuk végig.",
    availableFrom: dateForMonth(12),
    missions: [
      {
        id: 1,
        text: "Egy nagy kép vagy collage",
      },
    ],
  },
];

export const monthNames = [
  "Január",
  "Február",
  "Március",
  "Április",
  "Május",
  "Június",
  "Július",
  "Augusztus",
  "Szeptember",
  "Október",
  "November",
  "December",
];
