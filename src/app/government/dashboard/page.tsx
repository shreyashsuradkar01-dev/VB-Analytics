// CURRENT GOVERNMENT DASHBOARD WITH CROSS-DASHBOARD DEMO DEPENDENCY
// Replace the existing src/app/government/dashboard/page.tsx with this file.

"use client";

import { useEffect, useMemo, useState } from "react";
import GovernmentHeader from "@/components/government/GovernmentHeader";
import IntelligenceFilters, {
  type GovernmentFilters,
  defaultFilters,
} from "@/components/government/IntelligenceFilters";
import GovernmentKpis from "@/components/government/GovernmentKpis";
import GovernmentTabs, {
  type GovernmentTab,
} from "@/components/government/GovernmentTabs";
import EmploymentFunnel from "@/components/government/EmploymentFunnel";
import RetentionWageChart from "@/components/government/RetentionWageChart";
import IntelligenceAlerts from "@/components/government/IntelligenceAlerts";
import DistrictIntelligence from "@/components/government/DistrictIntelligence";
import SkillGapIntelligence from "@/components/government/SkillGapIntelligence";
import AttritionAnalysis from "@/components/government/AttritionAnalysis";
import ProgramImpact from "@/components/government/ProgramImpact";
import PolicyRecommendations from "@/components/government/PolicyRecommendations";
import DataQuality from "@/components/government/DataQuality";
import AuditTrail from "@/components/government/AuditTrail";
import {
  getDemoOutcome,
  subscribeDemoOutcome,
  type DemoEmploymentOutcome,
} from "@/data/demo-outcome-store";

export default function GovernmentDashboard() {
  const [activeTab, setActiveTab] =
    useState<GovernmentTab>("executive");

  const [filters, setFilters] =
    useState<GovernmentFilters>(defaultFilters);

  const [employmentOutcome, setEmploymentOutcome] =
    useState<DemoEmploymentOutcome>(getDemoOutcome());

  useEffect(() => subscribeDemoOutcome(setEmploymentOutcome), []);

  const isFiltered = useMemo(
    () =>
      filters.district !== defaultFilters.district ||
      filters.sector !== defaultFilters.sector ||
      filters.program !== defaultFilters.program ||
      filters.employmentType !== defaultFilters.employmentType ||
      filters.gender !== defaultFilters.gender,
    [filters]
  );

  return (
    <main className="min-h-screen bg-[#f4f7fa] text-[#13233f]">
      <GovernmentHeader />

      <div className="mx-auto max-w-[1435px] px-6 py-6">

        <IntelligenceFilters
          filters={filters}
          onFiltersChange={setFilters}
        />

        <GovernmentKpis
          filters={filters}
          isFiltered={isFiltered}
        />

        <GovernmentTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "executive" && (
          <>
            <div className="mt-7 grid grid-cols-1 gap-7 xl:grid-cols-[1.35fr_0.95fr]">

              <EmploymentFunnel
                filters={filters}
                isFiltered={isFiltered}
              />

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold leading-tight text-[#102a56]">
                      Longitudinal Retention & Wage Drift
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Tracking cohort starting wages vs 6 & 12 months
                      progression
                    </p>
                  </div>

                  <span className="shrink-0 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {isFiltered ? "Filtered Prototype" : "+20.6% Wage Growth"}
                  </span>
                </div>

                <div className="mt-6">
                  <RetentionWageChart />
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4">
                  <div className="rounded-lg bg-slate-50 px-3 py-3 text-center">
                    <p className="text-xs text-slate-500">
                      3-Month Ret.
                    </p>

                    <p className="mt-1 text-lg font-extrabold text-[#102a56]">
                      {isFiltered ? "80.1%" : "82.4%"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 px-3 py-3 text-center">
                    <p className="text-xs text-slate-500">
                      6-Month Ret.
                    </p>

                    <p className="mt-1 text-lg font-extrabold text-[#102a56]">
                      {isFiltered ? "65.8%" : "68.0%"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 px-3 py-3 text-center">
                    <p className="text-xs text-slate-500">
                      12-Month Ret.
                    </p>

                    <p className="mt-1 text-lg font-extrabold text-[#102a56]">
                      {isFiltered ? "47.2%" : "49.0%"}
                    </p>
                  </div>
                </div>

                {isFiltered && (
                  <p className="mt-4 text-[11px] text-slate-400">
                    Simulated response for the selected prototype filters.
                  </p>
                )}
              </section>
            </div>

            <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1769aa]">
                      Cross-Dashboard Verification
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        employmentOutcome.status === "Employer Verified"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {employmentOutcome.status === "Employer Verified"
                        ? "Employer Verified"
                        : "Pending Verification"}
                    </span>
                  </div>

                  <h2 className="mt-2 text-lg font-extrabold text-[#102a56]">
                    {employmentOutcome.candidate} · {employmentOutcome.traineeId}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {employmentOutcome.role} at {employmentOutcome.employer} ·{" "}
                    {employmentOutcome.wage} · Joining {employmentOutcome.joining}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Verification Source
                  </p>
                  <p className="mt-1 font-bold text-[#102a56]">
                    Trainee submission → Employer verification
                  </p>
                  {employmentOutcome.verifiedAt && (
                    <p className="mt-1 text-[11px] text-emerald-700">
                      Verified: {employmentOutcome.verifiedAt}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <IntelligenceAlerts />
          </>
        )}

        {activeTab === "district" ? (
          <DistrictIntelligence />
        ) : activeTab === "skills" ? (
          <SkillGapIntelligence />
        ) : activeTab === "attrition" ? (
          <AttritionAnalysis />
        ) : activeTab === "impact" ? (
          <ProgramImpact />
        ) : activeTab === "policy" ? (
          <PolicyRecommendations />
        ) : activeTab === "dataquality" ? (
          <DataQuality />
        ) : activeTab === "audit" ? (
          <AuditTrail />
        ) : null}
      </div>
    </main>
  );
}
