"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-context";

type District = {
  name: string;
  beneficiaries: number;
  completed: number;
  certified: number;
  placed: number;
  empRate: string;
  retention: string;
  wage: string;
  gap: string;
};

const districts: District[] = [
  {
    name: "Pune",
    beneficiaries: 38500,
    completed: 32400,
    certified: 29800,
    placed: 22400,
    empRate: "75.2%",
    retention: "74.5%",
    wage: "₹4.2 LPA",
    gap: "Cybersecurity / Cloud",
  },
  {
    name: "Nagpur",
    beneficiaries: 24100,
    completed: 19800,
    certified: 17400,
    placed: 11800,
    empRate: "67.8%",
    retention: "71.0%",
    wage: "₹3.5 LPA",
    gap: "Automotive Mechatronics",
  },
  {
    name: "Nashik",
    beneficiaries: 22800,
    completed: 18500,
    certified: 16200,
    placed: 11100,
    empRate: "68.5%",
    retention: "69.2%",
    wage: "₹3.6 LPA",
    gap: "Solar & Clean Tech",
  },
  {
    name: "Mumbai Suburban",
    beneficiaries: 42000,
    completed: 34900,
    certified: 31200,
    placed: 23100,
    empRate: "74.0%",
    retention: "65.8%",
    wage: "₹4.6 LPA",
    gap: "Fullstack Development",
  },
  {
    name: "Chhatrapati Sambhajinagar",
    beneficiaries: 19400,
    completed: 15200,
    certified: 13300,
    placed: 7900,
    empRate: "59.4%",
    retention: "62.0%",
    wage: "₹3.2 LPA",
    gap: "Battery Tech / EV Assembly",
  },
  {
    name: "Thane",
    beneficiaries: 26500,
    completed: 21800,
    certified: 19500,
    placed: 13900,
    empRate: "71.3%",
    retention: "67.0%",
    wage: "₹3.9 LPA",
    gap: "Logistics Automation",
  },
  {
    name: "Kolhapur",
    beneficiaries: 16200,
    completed: 13100,
    certified: 11600,
    placed: 6900,
    empRate: "59.5%",
    retention: "64.1%",
    wage: "₹3.1 LPA",
    gap: "CNC Machining",
  },
  {
    name: "Solapur",
    beneficiaries: 14500,
    completed: 11200,
    certified: 9800,
    placed: 5200,
    empRate: "53.1%",
    retention: "58.0%",
    wage: "₹2.8 LPA",
    gap: "Textile Modernization",
  },
];

const quickDistricts = [
  "Pune",
  "Nagpur",
  "Nashik",
  "Mumbai Suburban",
  "Thane",
  "Solapur",
];

const districtNamesMr: Record<string, string> = {
  Pune: "पुणे",
  Nagpur: "नागपूर",
  Nashik: "नाशिक",
  "Mumbai Suburban": "मुंबई उपनगर",
  "Chhatrapati Sambhajinagar": "छत्रपती संभाजीनगर",
  Thane: "ठाणे",
  Kolhapur: "कोल्हापूर",
  Solapur: "सोलापूर",
};

const skillGapMr: Record<string, string> = {
  "Cybersecurity / Cloud": "सायबरसुरक्षा / क्लाउड",
  "Automotive Mechatronics": "ऑटोमोटिव्ह मेकॅट्रॉनिक्स",
  "Solar & Clean Tech": "सौर व स्वच्छ तंत्रज्ञान",
  "Fullstack Development": "फुलस्टॅक डेव्हलपमेंट",
  "Battery Tech / EV Assembly": "बॅटरी तंत्रज्ञान / EV असेंब्ली",
  "Logistics Automation": "लॉजिस्टिक्स ऑटोमेशन",
  "CNC Machining": "CNC मशीनिंग",
  "Textile Modernization": "कापड उद्योग आधुनिकीकरण",
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export default function DistrictIntelligence() {
  const { language } = useLanguage();
  const isMarathi = language === "mr";

  const [selectedDistrict, setSelectedDistrict] = useState("Pune");

  const selected = useMemo(
    () =>
      districts.find((district) => district.name === selectedDistrict) ??
      districts[0],
    [selectedDistrict],
  );

  const completionRate = (
    (selected.completed / selected.beneficiaries) *
    100
  ).toFixed(1);

  const certificationRate = (
    (selected.certified / selected.completed) *
    100
  ).toFixed(1);

  const placementRate = (
    (selected.placed / selected.certified) *
    100
  ).toFixed(1);

  const displayDistrictName = (name: string) =>
    isMarathi ? districtNamesMr[name] ?? name : name;

  const displaySkillGap = (gap: string) =>
    isMarathi ? skillGapMr[gap] ?? gap : gap;

  return (
    <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">
            {isMarathi
              ? "महाराष्ट्र जिल्हा रोजगार व कौशल्य कामगिरी"
              : "Maharashtra District Employment & Skill Performance"}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {isMarathi
              ? "तपशीलवार रोजगार प्रवाह, वेतन आणि प्रमुख कौशल्यातील तफावत पाहण्यासाठी कोणत्याही जिल्ह्यावर क्लिक करा."
              : "Click any district to inspect granular employment funnel, wages, and dominant skill gaps."}
          </p>
        </div>

        <span className="w-fit rounded-md border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-700">
          {isMarathi ? "प्रोटोटाइप डेटासेट" : "PROTOTYPE DATASET"}
        </span>
      </div>

      {/* QUICK DISTRICT SELECTORS */}
      <div className="mt-4 flex flex-wrap gap-2">
        {quickDistricts.map((districtName) => {
          const active = selectedDistrict === districtName;

          return (
            <button
              key={districtName}
              type="button"
              onClick={() => setSelectedDistrict(districtName)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "border-[#102a56] bg-[#102a56] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-[#102a56]"
              }`}
            >
              {displayDistrictName(districtName)}
            </button>
          );
        })}
      </div>

      {/* DISTRICT SPOTLIGHT */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
              {isMarathi ? "जिल्हा आढावा" : "District Spotlight"}
            </p>

            <h3 className="mt-1 text-xl font-extrabold text-[#102a56]">
              {displayDistrictName(selected.name)}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {isMarathi ? "प्रमुख कौशल्यातील तफावत:" : "Primary skill gap:"}{" "}
              <span className="font-semibold text-slate-700">
                {displaySkillGap(selected.gap)}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <p className="text-[10px] font-semibold uppercase text-slate-400">
                {isMarathi ? "लाभार्थी" : "Beneficiaries"}
              </p>

              <p className="mt-1 text-lg font-extrabold text-[#102a56]">
                {formatNumber(selected.beneficiaries)}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <p className="text-[10px] font-semibold uppercase text-slate-400">
                {isMarathi ? "रोजगार" : "Employment"}
              </p>

              <p className="mt-1 text-lg font-extrabold text-emerald-700">
                {selected.empRate}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <p className="text-[10px] font-semibold uppercase text-slate-400">
                {isMarathi ? "६ महिन्यांचा टिकाव" : "6-Mo Retention"}
              </p>

              <p className="mt-1 text-lg font-extrabold text-[#102a56]">
                {selected.retention}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <p className="text-[10px] font-semibold uppercase text-slate-400">
                {isMarathi ? "प्रारंभिक वेतन" : "Start Wage"}
              </p>

              <p className="mt-1 text-lg font-extrabold text-[#102a56]">
                {selected.wage}
              </p>
            </div>
          </div>
        </div>

        {/* MINI FUNNEL */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <div className="mb-1 flex justify-between text-[10px] font-semibold text-slate-500">
              <span>
                {isMarathi ? "प्रशिक्षण पूर्ण" : "Training Completed"}
              </span>

              <span>{completionRate}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#102a56]"
                style={{ width: `${completionRate}%` }}
              />
            </div>

            <p className="mt-1 text-[10px] text-slate-400">
              {formatNumber(selected.completed)}{" "}
              {isMarathi ? "उमेदवार" : "candidates"}
            </p>
          </div>

          <div>
            <div className="mb-1 flex justify-between text-[10px] font-semibold text-slate-500">
              <span>{isMarathi ? "प्रमाणन" : "Certification"}</span>

              <span>{certificationRate}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-emerald-600"
                style={{ width: `${certificationRate}%` }}
              />
            </div>

            <p className="mt-1 text-[10px] text-slate-400">
              {formatNumber(selected.certified)}{" "}
              {isMarathi ? "प्रमाणित" : "certified"}
            </p>
          </div>

          <div>
            <div className="mb-1 flex justify-between text-[10px] font-semibold text-slate-500">
              <span>
                {isMarathi ? "प्रमाणित → नियुक्त" : "Certified → Placed"}
              </span>

              <span>{placementRate}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-amber-600"
                style={{ width: `${placementRate}%` }}
              />
            </div>

            <p className="mt-1 text-[10px] text-slate-400">
              {formatNumber(selected.placed)}{" "}
              {isMarathi ? "नियुक्त" : "placed"}
            </p>
          </div>
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {isMarathi ? "जिल्हा तुलना" : "District Comparison"}
            </h3>

            <p className="mt-1 text-[11px] text-slate-500">
              {isMarathi
                ? "निवडलेल्या प्रोटोटाइप जिल्ह्यांमधील रोजगार आणि टिकाव निर्देशक."
                : "Employment and retention indicators across selected prototype districts."}
            </p>
          </div>

          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
            {districts.length} {isMarathi ? "जिल्हे" : "districts"}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[1050px] border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700">
                <th className="px-3 py-3 text-left font-bold">
                  {isMarathi ? "जिल्हा" : "District"}
                </th>

                <th className="px-3 py-3 text-right font-bold">
                  {isMarathi ? "लाभार्थी" : "Beneficiaries"}
                </th>

                <th className="px-3 py-3 text-right font-bold">
                  {isMarathi ? "पूर्ण" : "Completed"}
                </th>

                <th className="px-3 py-3 text-right font-bold">
                  {isMarathi ? "प्रमाणित" : "Certified"}
                </th>

                <th className="px-3 py-3 text-right font-bold">
                  {isMarathi ? "नियुक्त" : "Placed"}
                </th>

                <th className="px-3 py-3 text-right font-bold">
                  {isMarathi ? "रोजगार दर" : "Emp. Rate"}
                </th>

                <th className="px-3 py-3 text-right font-bold">
                  {isMarathi ? "६ महिन्यांचा टिकाव" : "6-Mo Ret."}
                </th>

                <th className="px-3 py-3 text-right font-bold">
                  {isMarathi ? "सरासरी प्रारंभिक वेतन" : "Avg Start Wage"}
                </th>

                <th className="px-3 py-3 text-left font-bold">
                  {isMarathi ? "प्रमुख कौशल्य तफावत" : "Primary Skill Gap"}
                </th>

                <th className="px-3 py-3 text-center font-bold">
                  {isMarathi ? "कृती" : "Action"}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {districts.map((district) => {
                const active = district.name === selectedDistrict;

                return (
                  <tr
                    key={district.name}
                    className={`transition-colors ${
                      active
                        ? "bg-blue-50/60"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => setSelectedDistrict(district.name)}
                        className="text-left font-bold text-[#102a56] hover:underline"
                      >
                        {displayDistrictName(district.name)}
                      </button>
                    </td>

                    <td className="px-3 py-3 text-right text-slate-600">
                      {formatNumber(district.beneficiaries)}
                    </td>

                    <td className="px-3 py-3 text-right text-slate-600">
                      {formatNumber(district.completed)}
                    </td>

                    <td className="px-3 py-3 text-right text-slate-600">
                      {formatNumber(district.certified)}
                    </td>

                    <td className="px-3 py-3 text-right font-semibold text-slate-700">
                      {formatNumber(district.placed)}
                    </td>

                    <td className="px-3 py-3 text-right font-semibold text-emerald-700">
                      {district.empRate}
                    </td>

                    <td className="px-3 py-3 text-right text-slate-700">
                      {district.retention}
                    </td>

                    <td className="px-3 py-3 text-right font-semibold text-slate-700">
                      {district.wage}
                    </td>

                    <td className="px-3 py-3 text-slate-600">
                      {displaySkillGap(district.gap)}
                    </td>

                    <td className="px-3 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedDistrict(district.name)}
                        className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-[#102a56] hover:border-[#102a56]"
                      >
                        {isMarathi ? "तपासा" : "Inspect"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}