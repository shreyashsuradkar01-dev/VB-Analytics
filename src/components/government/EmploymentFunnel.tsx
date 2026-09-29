"use client";

import { useLanguage } from "@/components/language-context";
import type { GovernmentFilters } from "./IntelligenceFilters";

type EmploymentFunnelProps = {
  filters: GovernmentFilters;
  isFiltered: boolean;
};

const baseStages = [
  {
    number: "1.",
    translationKey: "government.funnel.enrolled",
    value: "245,000",
    percentage: "100%",
    width: "100%",
    color: "bg-[#263f5a]",
  },
  {
    number: "2.",
    translationKey: "government.funnel.trainingCompleted",
    value: "198,000",
    percentage: "80.8%",
    width: "80.8%",
    color: "bg-[#355875]",
  },
  {
    number: "3.",
    translationKey: "government.funnel.certified",
    value: "176,000",
    percentage: "71.8%",
    width: "71.8%",
    color: "bg-[#50718f]",
  },
  {
    number: "4.",
    translationKey: "government.funnel.placed",
    value: "121,000",
    percentage: "49.4%",
    width: "49.4%",
    color: "bg-emerald-600",
  },
  {
    number: "5.",
    translationKey: "government.funnel.retention",
    value: "82,280",
    percentage: "33.5%",
    width: "33.5%",
    color: "bg-emerald-700",
  },
  {
    number: "6.",
    translationKey: "government.funnel.sustainable",
    value: "59,290",
    percentage: "24.2%",
    width: "24.2%",
    color: "bg-[#e88300]",
  },
];

const filteredStages = [
  {
    number: "1.",
    translationKey: "government.funnel.enrolled",
    value: "82,400",
    percentage: "100%",
    width: "100%",
    color: "bg-[#263f5a]",
  },
  {
    number: "2.",
    translationKey: "government.funnel.trainingCompleted",
    value: "68,900",
    percentage: "83.6%",
    width: "83.6%",
    color: "bg-[#355875]",
  },
  {
    number: "3.",
    translationKey: "government.funnel.certified",
    value: "61,300",
    percentage: "74.4%",
    width: "74.4%",
    color: "bg-[#50718f]",
  },
  {
    number: "4.",
    translationKey: "government.funnel.placed",
    value: "43,700",
    percentage: "53.0%",
    width: "53%",
    color: "bg-emerald-600",
  },
  {
    number: "5.",
    translationKey: "government.funnel.retention",
    value: "28,760",
    percentage: "34.9%",
    width: "34.9%",
    color: "bg-emerald-700",
  },
  {
    number: "6.",
    translationKey: "government.funnel.sustainable",
    value: "20,410",
    percentage: "24.8%",
    width: "24.8%",
    color: "bg-[#e88300]",
  },
];

export default function EmploymentFunnel({
  isFiltered,
}: EmploymentFunnelProps) {
  const { language, t } = useLanguage();

  const stages = isFiltered ? filteredStages : baseStages;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[17px] font-extrabold text-[#111d35]">
            {language === "mr"
              ? "दीर्घकालीन कौशल्य व रोजगार प्रवाह"
              : "Longitudinal Skilling & Employment Funnel"}
          </h2>

          <p className="mt-1 text-[13px] text-slate-500">
            {language === "mr"
              ? "नोंदणीपासून १२ महिन्यांच्या रोजगार टिकावापर्यंत लाभार्थ्यांच्या संक्रमणाचा मागोवा"
              : "Beneficiary transition from enrollment through 12-month retention"}
          </p>
        </div>

        <span className="text-[12px] text-slate-400">
          {isFiltered
            ? language === "mr"
              ? "फिल्टर केलेला प्रोटोटाइप गट"
              : "Filtered Prototype Cohort"
            : language === "mr"
              ? "गट FY25"
              : "Cohort FY25"}
        </span>
      </div>

      <div className="mt-7 space-y-4">
        {stages.map((stage) => (
          <div key={stage.number}>
            <div className="mb-2 flex items-center justify-between text-[13px] font-semibold text-[#17233a]">
              <span className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${stage.color}`}
                />

                {stage.number} {t(stage.translationKey)}
              </span>

              <span>
                {stage.value} ({stage.percentage})
              </span>
            </div>

            <div className="h-7 overflow-hidden rounded-md bg-[#eef2f6]">
              <div
                className={`flex h-full items-center justify-end rounded-md px-3 text-[11px] font-semibold text-white ${stage.color}`}
                style={{ width: stage.width }}
              >
                {stage.percentage}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-[13px] leading-5 text-slate-600">
        <strong className="text-[#17233a]">
          {t("government.analysis.policyDropoff")}:
        </strong>{" "}

        {language === "mr" ? (
          <>
            सर्वाधिक रूपांतरणातील घट{" "}
            <strong>
              {isFiltered
                ? "प्रमाणित (61.3k)"
                : "प्रमाणित (176k)"}
            </strong>{" "}
            आणि{" "}
            <strong>
              {isFiltered
                ? "नियुक्त (43.7k)"
                : "नियुक्त (121k)"}
            </strong>{" "}
            यांच्यामध्ये दिसून येते.{" "}

            {isFiltered ? "17,600" : "55,000"} प्रमाणित उमेदवार
            ९० दिवसांच्या आत नियुक्त झालेले नाहीत.
          </>
        ) : (
          <>
            The sharpest conversion contraction occurs between{" "}

            <strong>
              {isFiltered
                ? "Certified (61.3k)"
                : "Certified (176k)"}
            </strong>{" "}

            and{" "}

            <strong>
              {isFiltered
                ? "Placed (43.7k)"
                : "Placed (121k)"}
            </strong>
            , with{" "}

            {isFiltered ? "17,600" : "55,000"} certified candidates
            unplaced within 90 days.
          </>
        )}

        <span className="mt-2 block text-[11px] text-slate-400">
          {language === "mr"
            ? "निवडलेल्या फिल्टर स्थितीसाठी प्रोटोटाइप / सिम्युलेटेड विश्लेषण."
            : "Prototype / simulated insight for the selected filter state."}
        </span>
      </div>
    </section>
  );
}