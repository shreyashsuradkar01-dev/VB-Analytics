"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-context";

type SkillGap = {
  skill: string;
  cat: "IT" | "Manufacturing" | "Green";
  demand: number;
  supply: number;
  gap: string;
  districts: string;
  action: string;
};

const skillGaps: SkillGap[] = [
  {
    skill: "Cloud Infrastructure & AWS",
    cat: "IT",
    demand: 8500,
    supply: 2100,
    gap: "HIGH (75%)",
    districts: "Pune, Mumbai",
    action: "Expand MSSDS Cloud lab capacity",
  },
  {
    skill: "Cybersecurity Defense",
    cat: "IT",
    demand: 6200,
    supply: 1400,
    gap: "HIGH (77%)",
    districts: "Pune, Nagpur",
    action: "Incentivize Tier-1 security bootcamps",
  },
  {
    skill: "Python / Data Analytics",
    cat: "IT",
    demand: 5900,
    supply: 5000,
    gap: "LOW (15%)",
    districts: "Statewide",
    action: "Maintain current quota",
  },
  {
    skill: "EV Mechatronics & BMS",
    cat: "Manufacturing",
    demand: 4800,
    supply: 600,
    gap: "HIGH (87%)",
    districts: "Chh. Sambhajinagar, Pune",
    action: "Fund OEM-partnered co-op apprenticeships",
  },
  {
    skill: "CNC 5-Axis Precision Milling",
    cat: "Manufacturing",
    demand: 3900,
    supply: 1800,
    gap: "MEDIUM (54%)",
    districts: "Kolhapur, Nashik",
    action: "Upgrade ITI machine tools",
  },
  {
    skill: "Rooftop Solar Integration",
    cat: "Green",
    demand: 4200,
    supply: 2200,
    gap: "MEDIUM (48%)",
    districts: "Nashik, Nagpur, Solapur",
    action: "Align with PM Surya Ghar scheme",
  },
];

const categories = ["ALL", "IT", "Manufacturing", "Green"] as const;

const skillNamesMr: Record<string, string> = {
  "Cloud Infrastructure & AWS": "क्लाउड इन्फ्रास्ट्रक्चर व AWS",
  "Cybersecurity Defense": "सायबरसुरक्षा संरक्षण",
  "Python / Data Analytics": "Python / डेटा अॅनालिटिक्स",
  "EV Mechatronics & BMS": "EV मेकॅट्रॉनिक्स व BMS",
  "CNC 5-Axis Precision Milling": "CNC 5-अॅक्सिस प्रिसिजन मिलिंग",
  "Rooftop Solar Integration": "रूफटॉप सौर एकत्रीकरण",
};

const districtNamesMr: Record<string, string> = {
  "Pune, Mumbai": "पुणे, मुंबई",
  "Pune, Nagpur": "पुणे, नागपूर",
  Statewide: "संपूर्ण राज्य",
  "Chh. Sambhajinagar, Pune": "छ. संभाजीनगर, पुणे",
  "Kolhapur, Nashik": "कोल्हापूर, नाशिक",
  "Nashik, Nagpur, Solapur": "नाशिक, नागपूर, सोलापूर",
};

const actionsMr: Record<string, string> = {
  "Expand MSSDS Cloud lab capacity":
    "MSSDS क्लाउड लॅबची क्षमता वाढवा",
  "Incentivize Tier-1 security bootcamps":
    "Tier-1 सुरक्षा बूटकॅम्पसाठी प्रोत्साहन द्या",
  "Maintain current quota":
    "सध्याचा कोटा कायम ठेवा",
  "Fund OEM-partnered co-op apprenticeships":
    "OEM भागीदारीतील सहकारी अप्रेंटिसशिपसाठी निधी द्या",
  "Upgrade ITI machine tools":
    "ITI मशीन टूल्सचे आधुनिकीकरण करा",
  "Align with PM Surya Ghar scheme":
    "PM Surya Ghar योजनेशी संरेखित करा",
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function getGapPercentage(item: SkillGap) {
  return Math.round(((item.demand - item.supply) / item.demand) * 100);
}

function getGapLevel(item: SkillGap) {
  if (item.gap.startsWith("HIGH")) {
    return "high";
  }

  if (item.gap.startsWith("MEDIUM")) {
    return "medium";
  }

  return "low";
}

export default function SkillGapIntelligence() {
  const { language } = useLanguage();
  const isMarathi = language === "mr";

  const [category, setCategory] =
    useState<(typeof categories)[number]>("ALL");

  const filteredSkills = useMemo(() => {
    if (category === "ALL") {
      return skillGaps;
    }

    return skillGaps.filter((item) => item.cat === category);
  }, [category]);

  const totalDemand = filteredSkills.reduce(
    (sum, item) => sum + item.demand,
    0,
  );

  const totalSupply = filteredSkills.reduce(
    (sum, item) => sum + item.supply,
    0,
  );

  const totalGap = totalDemand - totalSupply;

  const highGapCount = filteredSkills.filter(
    (item) => getGapLevel(item) === "high",
  ).length;

  const categoryLabels: Record<(typeof categories)[number], string> = {
    ALL: isMarathi ? "सर्व श्रेणी" : "All Categories",
    IT: "IT",
    Manufacturing: isMarathi ? "उत्पादन" : "Manufacturing",
    Green: isMarathi ? "हरित कौशल्ये" : "Green",
  };

  const displaySkill = (skill: string) =>
    isMarathi ? skillNamesMr[skill] ?? skill : skill;

  const displayDistricts = (districts: string) =>
    isMarathi ? districtNamesMr[districts] ?? districts : districts;

  const displayAction = (action: string) =>
    isMarathi ? actionsMr[action] ?? action : action;

  return (
    <section className="mt-7 space-y-6">
      {/* MAIN HEADER CARD */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              {isMarathi
                ? "कामगार बाजारपेठ माहिती: नियोक्ता मागणी विरुद्ध उमेदवार पुरवठा"
                : "Labour Market Intelligence: Employer Demand vs Candidate Supply"}
            </h2>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-500">
              {isMarathi
                ? "प्रशिक्षित उमेदवारांचा उपलब्ध पुरवठा आणि नियोक्त्यांची मागणी यामधील तफावत दर्शविणारे सिम्युलेटेड विश्लेषण."
                : "Simulated demand-gap analysis showing where employer demand exceeds the available trained candidate supply."}
            </p>
          </div>

          <span className="w-fit shrink-0 rounded-md border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-700">
            {isMarathi ? "प्रोटोटाइप डेटासेट" : "PROTOTYPE DATASET"}
          </span>
        </div>

        {/* CATEGORY FILTER */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            {isMarathi ? "श्रेणी" : "Category"}
          </span>

          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-[#102a56] bg-[#102a56] text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-[#102a56]"
                }`}
              >
                {categoryLabels[item]}
              </button>
            );
          })}
        </div>
      </section>

      {/* SUMMARY CARDS */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            {isMarathi ? "नियोक्ता मागणी" : "Employer Demand"}
          </p>

          <p className="mt-2 text-2xl font-extrabold text-[#102a56]">
            {formatNumber(totalDemand)}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {isMarathi ? "उपलब्ध पदे / मागणी संकेत" : "openings / demand signals"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            {isMarathi ? "उमेदवार पुरवठा" : "Candidate Supply"}
          </p>

          <p className="mt-2 text-2xl font-extrabold text-emerald-700">
            {formatNumber(totalSupply)}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {isMarathi ? "उपलब्ध प्रशिक्षित पुरवठा" : "available trained supply"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            {isMarathi ? "मागणीतील तफावत" : "Demand Gap"}
          </p>

          <p className="mt-2 text-2xl font-extrabold text-amber-700">
            {formatNumber(totalGap)}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {isMarathi ? "मागणी वजा पुरवठा" : "demand minus supply"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            {isMarathi ? "उच्च-तफावत कौशल्ये" : "High-Gap Skills"}
          </p>

          <p className="mt-2 text-2xl font-extrabold text-rose-700">
            {highGapCount}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {isMarathi
              ? "प्रोटोटाइपमध्ये लक्ष देण्याची गरज"
              : "requiring attention in prototype"}
          </p>
        </div>
      </section>

      {/* DEMAND VS SUPPLY VISUALIZATION */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-[#102a56]">
              {isMarathi
                ? "मागणी विरुद्ध उमेदवार पुरवठा"
                : "Demand vs Candidate Supply"}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {isMarathi
                ? "फिल्टर केलेल्या कौशल्य श्रेणींमधील तुलनात्मक स्थिती."
                : "Relative comparison across the filtered skill categories."}
            </p>
          </div>

          <div className="hidden items-center gap-4 text-[10px] font-semibold text-slate-500 sm:flex">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#102a56]" />
              {isMarathi ? "मागणी" : "Demand"}
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
              {isMarathi ? "पुरवठा" : "Supply"}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {filteredSkills.map((item) => {
            const maxValue = Math.max(item.demand, item.supply);
            const demandWidth = (item.demand / maxValue) * 100;
            const supplyWidth = (item.supply / maxValue) * 100;

            return (
              <div key={item.skill}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-bold text-slate-700">
                    {displaySkill(item.skill)}
                  </p>

                  <span className="text-[10px] font-bold text-slate-400">
                    {item.gap}
                  </span>
                </div>

                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-[9px] font-bold uppercase text-slate-400">
                      {isMarathi ? "मागणी" : "Demand"}
                    </span>

                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#102a56]"
                        style={{ width: `${demandWidth}%` }}
                      />
                    </div>

                    <span className="w-14 text-right text-[10px] font-semibold text-slate-600">
                      {formatNumber(item.demand)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-12 text-[9px] font-bold uppercase text-slate-400">
                      {isMarathi ? "पुरवठा" : "Supply"}
                    </span>

                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${supplyWidth}%` }}
                      />
                    </div>

                    <span className="w-14 text-right text-[10px] font-semibold text-slate-600">
                      {formatNumber(item.supply)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SKILL GAP TABLE */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              {isMarathi ? "कौशल्य तफावत मॅट्रिक्स" : "Skill Gap Matrix"}
            </h3>

            <p className="mt-1 text-[11px] text-slate-500">
              {isMarathi
                ? "नियोक्ता मागणी आणि उमेदवार पुरवठ्यामध्ये तफावत असलेली कौशल्ये."
                : "Skills where employer demand and candidate supply diverge."}
            </p>
          </div>

          <span className="w-fit rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
            {filteredSkills.length}{" "}
            {isMarathi ? "कौशल्य संकेत" : "skill signals"}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[1050px] border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700">
                <th className="px-3 py-3 text-left font-bold">
                  {isMarathi ? "कौशल्य" : "Skill"}
                </th>

                <th className="px-3 py-3 text-left font-bold">
                  {isMarathi ? "श्रेणी" : "Category"}
                </th>

                <th className="px-3 py-3 text-right font-bold">
                  {isMarathi ? "मागणी" : "Demand"}
                </th>

                <th className="px-3 py-3 text-right font-bold">
                  {isMarathi ? "पुरवठा" : "Supply"}
                </th>

                <th className="px-3 py-3 text-center font-bold">
                  {isMarathi ? "तफावत" : "Gap"}
                </th>

                <th className="px-3 py-3 text-left font-bold">
                  {isMarathi ? "जिल्हे" : "Districts"}
                </th>

                <th className="px-3 py-3 text-left font-bold">
                  {isMarathi ? "शिफारस केलेली कृती" : "Recommended Action"}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {filteredSkills.map((item) => {
                const level = getGapLevel(item);
                const gapPercentage = getGapPercentage(item);

                return (
                  <tr
                    key={item.skill}
                    className="bg-white transition-colors hover:bg-slate-50"
                  >
                    <td className="px-3 py-4">
                      <p className="font-bold text-[#102a56]">
                        {displaySkill(item.skill)}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                        {item.cat === "Manufacturing"
                          ? isMarathi
                            ? "उत्पादन"
                            : "Manufacturing"
                          : item.cat === "Green"
                            ? isMarathi
                              ? "हरित"
                              : "Green"
                            : "IT"}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-right font-semibold text-slate-700">
                      {formatNumber(item.demand)}
                    </td>

                    <td className="px-3 py-4 text-right font-semibold text-slate-700">
                      {formatNumber(item.supply)}
                    </td>

                    <td className="px-3 py-4 text-center">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          level === "high"
                            ? "bg-rose-50 text-rose-700"
                            : level === "medium"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {gapPercentage}%
                      </span>
                    </td>

                    <td className="px-3 py-4 text-slate-600">
                      {displayDistricts(item.districts)}
                    </td>

                    <td className="max-w-[280px] px-3 py-4 text-slate-600">
                      {displayAction(item.action)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* INTERPRETATION */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#102a56] text-xs font-extrabold text-white">
            VB
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-[#102a56]">
              {isMarathi
                ? "माहिती विश्लेषण"
                : "Intelligence Interpretation"}
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-600">
              {isMarathi
                ? "हा प्रोटोटाइप निवडक तंत्रज्ञान, उत्पादन आणि हरित-कौशल्य श्रेणींमध्ये मागणी व पुरवठ्यातील लक्षणीय तफावत दर्शवितो. या संकेतांचा वापर प्रशिक्षण क्षमता, अभ्यासक्रमाचे संरेखन किंवा नियोक्ता-संलग्न कार्यक्रमांमध्ये पुढील तपासणी आवश्यक असलेली क्षेत्रे ओळखण्यासाठी केला जाऊ शकतो."
                : "The prototype highlights substantial demand-supply gaps in selected technology, manufacturing, and green-skill categories. These signals can be used to identify where training capacity, curriculum alignment, or employer-linked programs may require further investigation."}
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}