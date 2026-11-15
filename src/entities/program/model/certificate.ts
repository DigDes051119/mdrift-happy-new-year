type PresetPlanId =
  | "first-touch"
  | "asphalt-start"
  | "pro-progress"
  | "mastery-control";

type PlanConfigBase = {
  readonly titleRu: string;
  readonly titleEn: string;
  readonly subtitleRu: string;
  readonly subtitleEn: string;
  readonly badgeRu: string;
  readonly badgeEn: string;
  readonly price: number;
};

type PlanConfig = PlanConfigBase & ({
  readonly id: PresetPlanId;
  readonly isCustom?: false;
} | {
  readonly id: "custom";
  readonly isCustom: true;
});

export const CERTIFICATE_PLANS: readonly PlanConfig[] = [
  {
    id: "first-touch",
    titleRu: "First Touch",
    titleEn: "First Touch",
    subtitleRu: "Скольжение на мокром пластике",
    subtitleEn: "Wet plastic drift induction",
    badgeRu: "1 ЧАС",
    badgeEn: "1 HOUR",
    price: 30000,
  },
  {
    id: "asphalt-start",
    titleRu: "Asphalt Start",
    titleEn: "Asphalt Start",
    subtitleRu: "Первый занос, базовые восьмерки",
    subtitleEn: "First asphalt drift & 8s",
    badgeRu: "1 ЧАС",
    badgeEn: "1 HOUR",
    price: 40000,
  },
  {
    id: "pro-progress",
    titleRu: "Pro Progress",
    titleEn: "Pro Progress",
    subtitleRu: "Интенсив: мокрый + сухой асфальт",
    subtitleEn: "Intensive: wet + dry circuit",
    badgeRu: "2 ЧАСА // ТОП",
    badgeEn: "2 HOURS // TOP",
    price: 70000,
  },
  {
    id: "mastery-control",
    titleRu: "Mastery Control",
    titleEn: "Mastery Control",
    subtitleRu: "Продвинутый курс: полный контроль",
    subtitleEn: "Advanced high-speed mastery",
    badgeRu: "4 ЧАСА // PRO",
    badgeEn: "4 HOURS // PRO",
    price: 140000,
  },
  {
    id: "custom",
    titleRu: "Свой номинал",
    titleEn: "Custom Amount",
    subtitleRu: "Сумма на выбор от 30 000 ₽",
    subtitleEn: "Custom amount from 30 000 ₽",
    badgeRu: "НА ВЫБОР",
    badgeEn: "CUSTOM",
    price: 50000,
    isCustom: true,
  },
];

export function formatRubles(amount: number): string {
  return `${amount.toLocaleString("ru-RU")} ₽`;
}
