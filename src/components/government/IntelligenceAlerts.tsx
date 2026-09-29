"use client";

import { useLanguage } from "@/components/language-context";

const alerts = [
  {
    typeKey: "government.alerts.skillGap.type",
    typeEnglish: "SKILL GAP ALERT",
    titleKey: "government.alerts.skillGap.title",
    titleEnglish: "Cybersecurity & Cloud Compute Deficit",
    location: "Pune & Chh. Sambhajinagar",
    locationMr: "पुणे व छ. संभाजीनगर",
    descriptionKey: "government.alerts.skillGap.description",
    descriptionEnglish:
      "Employer demand is 3.4x higher than available candidate supply. Certified candidates in basic IT are failing technical screening.",
    style: "yellow",
  },
  {
    typeKey: "government.alerts.programIntegrity.type",
    typeEnglish: "PROGRAM INTEGRITY",
    titleKey: "government.alerts.programIntegrity.title",
    titleEnglish: "High Completion, Low Retention Paradox",
    location: "MSSDS Track B",
    locationMr: "MSSDS ट्रॅक B",
    descriptionKey: "government.alerts.programIntegrity.description",
    descriptionEnglish:
      "Program B shows a 92% certification rate, but 6-month employment retention remains significantly lower.",
    style: "red",
  },
  {
    typeKey: "government.alerts.apprenticeship.type",
    typeEnglish: "APPRENTICESHIP CONVERSION",
    titleKey: "government.alerts.apprenticeship.title",
    titleEnglish: "Automotive Mechatronics High Retainer",
    location: "Nashik & Nagpur",
    locationMr: "नाशिक व नागपूर",
    descriptionKey: "government.alerts.apprenticeship.description",
    descriptionEnglish:
      "Apprenticeship tracks demonstrated strong full-time conversion with improved starting salaries.",
    style: "green",
  },
];

export default function IntelligenceAlerts() {
  const { language, t } = useLanguage();

  return (
    <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[16px] font-extrabold text-[#111d35]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#263f5a]" />

          <span>
            {language === "mr"
              ? "पुराव्यावर आधारित बुद्धिमत्ता सूचना"
              : "Grounded Evidence-Based Intelligence Alerts"}
          </span>
        </h2>

        <span className="text-[12px] font-mono text-slate-500">
          {language === "mr"
            ? "अल्गोरिदमिक विश्वासार्हता: 94.2% (केवळ निर्धारक डेटा)"
            : "Algorithmic Confidence: 94.2% (Deterministic Data Only)"}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        {alerts.map((alert) => (
          <div
            key={alert.titleEnglish}
            className={`rounded-xl border p-4 ${
              alert.style === "yellow"
                ? "border-amber-200 bg-amber-50/40"
                : alert.style === "red"
                  ? "border-red-200 bg-red-50/30"
                  : "border-emerald-200 bg-emerald-50/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`rounded-md px-2 py-1 text-[10px] font-extrabold ${
                  alert.style === "yellow"
                    ? "bg-amber-100 text-amber-800"
                    : alert.style === "red"
                      ? "bg-red-100 text-red-800"
                      : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {t(alert.typeKey)}
              </span>

              <span className="text-[11px] font-mono text-slate-500">
                {language === "mr" ? alert.locationMr : alert.location}
              </span>
            </div>

            <h3 className="mt-4 text-[14px] font-extrabold text-[#17233a]">
              {t(alert.titleKey)}
            </h3>

            <p className="mt-2 text-[12px] leading-5 text-slate-600">
              {t(alert.descriptionKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}