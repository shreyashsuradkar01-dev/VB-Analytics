"use client";

import { useLanguage } from "@/components/language-context";
import type { GovernmentFilters } from "./IntelligenceFilters";

type GovernmentKpisProps = {
  filters: GovernmentFilters;
  isFiltered: boolean;
};

const baseKpis = [
  {
    translationKey: "government.kpi.totalEnrolled",
    value: "245,000",
  },
  {
    translationKey: "government.kpi.completed",
    value: "198,000",
  },
  {
    translationKey: "government.kpi.certified",
    value: "176,000",
  },
  {
    translationKey: "government.kpi.employed",
    value: "121,000",
  },
  {
    translationKey: "government.kpi.employmentRate",
    value: "61.0%",
  },
  {
    translationKey: "government.kpi.retention",
    value: "68.0%",
  },
  {
    translationKey: "government.kpi.avgStartWage",
    value: "₹3.4 LPA",
  },
  {
    translationKey: "government.kpi.currentWage",
    value: "₹4.1 LPA",
  },
];

const filteredKpis = [
  {
    translationKey: "government.kpi.totalEnrolled",
    value: "82,400",
  },
  {
    translationKey: "government.kpi.completed",
    value: "68,900",
  },
  {
    translationKey: "government.kpi.certified",
    value: "61,300",
  },
  {
    translationKey: "government.kpi.employed",
    value: "43,700",
  },
  {
    translationKey: "government.kpi.employmentRate",
    value: "63.4%",
  },
  {
    translationKey: "government.kpi.retention",
    value: "65.8%",
  },
  {
    translationKey: "government.kpi.avgStartWage",
    value: "₹3.6 LPA",
  },
  {
    translationKey: "government.kpi.currentWage",
    value: "₹4.3 LPA",
  },
];

export default function GovernmentKpis({
  isFiltered,
}: GovernmentKpisProps) {
  const { t } = useLanguage();

  const kpis = isFiltered ? filteredKpis : baseKpis;

  return (
    <section className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.translationKey}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-bold text-[#102a56]">
            {t(kpi.translationKey)}
          </p>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            {kpi.translationKey ===
            "government.kpi.totalEnrolled"
              ? "Total Enrolled"
              : kpi.translationKey ===
                "government.kpi.completed"
              ? "Completed"
              : kpi.translationKey ===
                "government.kpi.certified"
              ? "Certified"
              : kpi.translationKey ===
                "government.kpi.employed"
              ? "Employed / Active"
              : kpi.translationKey ===
                "government.kpi.employmentRate"
              ? "Employment Rate"
              : kpi.translationKey ===
                "government.kpi.retention"
              ? "6-Month Retention"
              : kpi.translationKey ===
                "government.kpi.avgStartWage"
              ? "Avg Start Wage"
              : "Current Wage"}
          </p>

          <p className="mt-4 text-2xl font-extrabold tracking-tight text-[#17233a]">
            {kpi.value}
          </p>

          <p className="mt-2 text-[10px] font-medium text-slate-400">
            {isFiltered
              ? t("common.simulatedData")
              : t("common.prototypeDataset")}
          </p>
        </div>
      ))}
    </section>
  );
}