"use client";

import { Download, ChevronDown } from "lucide-react";
import {
  useLanguage,
  type Language,
} from "@/components/language-context";

export type GovernmentFilters = {
  district: string;
  sector: string;
  program: string;
  employmentType: string;
  gender: string;
};

export const defaultFilters: GovernmentFilters = {
  district: "All 36 Districts",
  sector: "All Industries",
  program: "All Schemes",
  employmentType: "All Outflow Types",
  gender: "All Beneficiaries",
};

type IntelligenceFiltersProps = {
  filters: GovernmentFilters;
  onFiltersChange: (filters: GovernmentFilters) => void;
};

const filterOptions = {
  district: [
    "All 36 Districts",
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Thane",
  ],
  sector: [
    "All Industries",
    "IT & ITES",
    "Manufacturing",
    "Healthcare",
    "Construction",
    "Retail & Services",
  ],
  program: [
    "All Schemes",
    "State Skill Development",
    "PMKVY",
    "Apprenticeship",
    "Industry Partnership",
  ],
  employmentType: [
    "All Outflow Types",
    "Wage Employment",
    "Self Employment",
    "Apprenticeship",
  ],
  gender: [
    "All Beneficiaries",
    "Male",
    "Female",
  ],
};

const optionTranslations: Record<
  Language,
  Record<string, string>
> = {
  en: {
    "All 36 Districts": "All 36 Districts",
    Mumbai: "Mumbai",
    Pune: "Pune",
    Nagpur: "Nagpur",
    Nashik: "Nashik",
    Thane: "Thane",

    "All Industries": "All Industries",
    "IT & ITES": "IT & ITES",
    Manufacturing: "Manufacturing",
    Healthcare: "Healthcare",
    Construction: "Construction",
    "Retail & Services": "Retail & Services",

    "All Schemes": "All Schemes",
    "State Skill Development": "State Skill Development",
    PMKVY: "PMKVY",
    Apprenticeship: "Apprenticeship",
    "Industry Partnership": "Industry Partnership",

    "All Outflow Types": "All Outflow Types",
    "Wage Employment": "Wage Employment",
    "Self Employment": "Self Employment",

    "All Beneficiaries": "All Beneficiaries",
    Male: "Male",
    Female: "Female",
  },

  mr: {
    "All 36 Districts": "सर्व ३६ जिल्हे",
    Mumbai: "मुंबई",
    Pune: "पुणे",
    Nagpur: "नागपूर",
    Nashik: "नाशिक",
    Thane: "ठाणे",

    "All Industries": "सर्व उद्योग",
    "IT & ITES": "IT आणि ITES",
    Manufacturing: "उत्पादन उद्योग",
    Healthcare: "आरोग्यसेवा",
    Construction: "बांधकाम",
    "Retail & Services": "किरकोळ व सेवा",

    "All Schemes": "सर्व योजना",
    "State Skill Development":
      "राज्य कौशल्य विकास",
    PMKVY: "PMKVY",
    Apprenticeship: "शिकाऊ उमेदवारी",
    "Industry Partnership":
      "उद्योग भागीदारी",

    "All Outflow Types": "सर्व रोजगार प्रकार",
    "Wage Employment": "वेतन रोजगार",
    "Self Employment": "स्वयंरोजगार",

    "All Beneficiaries": "सर्व लाभार्थी",
    Male: "पुरुष",
    Female: "महिला",
  },
};

const labels = {
  district: "government.filters.district",
  sector: "government.filters.sector",
  program: "government.filters.program",
  employmentType: "government.filters.employmentType",
  gender: "government.filters.gender",
} as const;

export default function IntelligenceFilters({
  filters,
  onFiltersChange,
}: IntelligenceFiltersProps) {
  const { language, t } = useLanguage();

  const updateFilter = (
    key: keyof GovernmentFilters,
    value: string
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onFiltersChange(defaultFilters);
  };

  const exportDossier = () => {
    const rows = [
      ["VB Analytics - Prototype Intelligence Dossier"],
      ["Dataset", "Prototype / Demo Dataset"],
      [],
      ["Filter", "Selected Value"],
      ["District", filters.district],
      ["Sector / Industry", filters.sector],
      ["Program", filters.program],
      ["Employment Type", filters.employmentType],
      ["Gender", filters.gender],
      [],
      [
        "Note",
        "Values are simulated prototype data for SIH 2026 demonstration.",
      ],
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) =>
            `"${String(cell).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download =
      "vb-analytics-prototype-dossier.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const renderSelect = (
    key: keyof GovernmentFilters
  ) => (
    <div key={key} className="min-w-0">
      <label className="mb-1.5 block text-[11px] font-semibold tracking-wide text-slate-500">
        {t(labels[key])}
      </label>

      <div className="relative">
        <select
          value={filters[key]}
          onChange={(event) =>
            updateFilter(key, event.target.value)
          }
          className="h-[36px] w-full appearance-none rounded-lg border border-slate-300 bg-slate-50 px-3 pr-9 text-[13px] font-medium text-[#17233a] outline-none transition focus:border-[#132f54] focus:ring-2 focus:ring-[#132f54]/10"
        >
          {filterOptions[key].map((option) => (
            <option key={option} value={option}>
              {optionTranslations[language][option] ??
                option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </div>
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold text-[#101d35]">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

            {language === "mr"
              ? "महाराष्ट्र कौशल्य व रोजगार माहिती विश्लेषण"
              : "Maharashtra Skilling & Employment Intelligence"}
          </h2>

          <p className="mt-1 text-[13px] text-slate-500">
            {language === "mr"
              ? "३६ जिल्हे आणि ८ प्राधान्य क्षेत्रांमधील दीर्घकालीन रोजगार परिणामांचा मागोवा"
              : "Longitudinal outcome tracking across 36 districts and 8 sector priority clusters"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-[13px] text-slate-600">
            {language === "mr"
              ? "अहवाल कालावधी:"
              : "Reporting Cycle:"}

            <span className="ml-2 font-bold text-[#17233a]">
              FY 2025 – 2026
            </span>

            <span className="ml-1">
              {language === "mr"
                ? "(एप्रिल २०२५ – मार्च २०२६)"
                : "(April 2025 – March 2026)"}
            </span>

            <ChevronDown
              className="ml-2 inline-block"
              size={15}
            />
          </div>

          <button
            type="button"
            onClick={exportDossier}
            className="flex items-center gap-2 rounded-lg bg-[#132f54] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#0d2340]"
          >
            <Download size={15} />

            {t("government.filters.export")}
          </button>
        </div>
      </div>

      <div className="my-4 h-px bg-slate-100" />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {renderSelect("district")}
        {renderSelect("sector")}
        {renderSelect("program")}
        {renderSelect("employmentType")}
        {renderSelect("gender")}

        <div className="flex items-end">
          <button
            type="button"
            onClick={resetFilters}
            className="h-[36px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 text-[13px] font-semibold text-[#27364e] transition hover:bg-slate-100"
          >
            {t("government.filters.reset")}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          <span className="font-bold text-[#27364e]">
            {t("government.filters.activeCriteria")}:
          </span>

          <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-slate-600">
            {optionTranslations[language][filters.district] ??
              filters.district}
          </span>

          <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-slate-600">
            {language === "mr"
              ? "FY २०२५-२६"
              : "FY 2025-26"}
          </span>

          <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-slate-600">
            {optionTranslations[language][filters.sector] ??
              filters.sector}
          </span>
        </div>

        <span className="text-[12px] font-bold text-emerald-700">
          {language === "mr"
            ? "प्रोटोटाइप डेटा गुणवत्ता तपासणी"
            : "Prototype Data Quality Check"}
        </span>
      </div>
    </section>
  );
}