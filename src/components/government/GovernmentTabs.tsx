"use client";

type GovernmentTab =
  | "executive"
  | "district"
  | "skills"
  | "attrition"
  | "impact"
  | "policy"
  | "dataquality"
  | "audit";

type GovernmentTabsProps = {
  activeTab: GovernmentTab;
  onTabChange: (tab: GovernmentTab) => void;
};

const tabs: {
  id: GovernmentTab;
  label: string;
}[] = [
  {
    id: "executive",
    label: "Executive Summary & Funnel",
  },
  {
    id: "district",
    label: "District Intelligence",
  },
  {
    id: "skills",
    label: "Skill Gap Intelligence",
  },
  {
    id: "attrition",
    label: "Non-Placement & Attrition Analysis",
  },
  {
    id: "impact",
    label: "Program Impact & Longitudinal Matrix",
  },
  {
    id: "policy",
    label: "Policy Recommendations",
  },
  {
    id: "dataquality",
    label: "Data Quality & Identity Continuity",
  },
  {
    id: "audit",
    label: "Audit Trail",
  },
];

export type { GovernmentTab };

export default function GovernmentTabs({
  activeTab,
  onTabChange,
}: GovernmentTabsProps) {
  return (
    <div className="mt-7 overflow-x-auto overflow-y-hidden border-b border-slate-200">
      <div className="flex min-w-max items-center gap-8 pr-10">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative whitespace-nowrap pb-3 text-[13px] font-semibold transition-colors ${
                active
                  ? "text-[#17233a]"
                  : "text-slate-500 hover:text-[#17233a]"
              }`}
            >
              {tab.label}

              {tab.id === "district" && (
                <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-[10px]">
                  36
                </span>
              )}

              {tab.id === "skills" && (
                <span className="ml-2 rounded-full bg-[#fff0c8] px-2 py-0.5 text-[10px] text-[#a65300]">
                  Demand Gap
                </span>
              )}

              {tab.id === "dataquality" && (
                <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700">
                  91.6%
                </span>
              )}

              {active && (
                <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-[#102a56]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}