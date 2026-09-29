"use client";

import { useState } from "react";
import {
  Award,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";
import { useLanguage } from "@/components/language-context";

type Program = {
  name: string;
  enrolled: number;
  completion: number;
  certified: number;
  placed: number;
  retention6: number;
  retention12: number;
  wage: string;
  wageGrowth: number;
  score: number;
};

type Provider = {
  name: string;
  hq: string;
  volume: number;
  certification: number;
  placement: number;
  retention6: number;
  ctc: string;
  status: string;
};

const programs: Program[] = [
  {
    name: "MSSDS Advanced Tech Track (Cloud & AI)",
    enrolled: 32000,
    completion: 84.2,
    certified: 91.0,
    placed: 74.5,
    retention6: 72.0,
    retention12: 58.0,
    wage: "₹4.4 LPA",
    wageGrowth: 24,
    score: 92,
  },
  {
    name: "Pramod Mahajan Kaushalya Vikas (PMKVY-MH)",
    enrolled: 84000,
    completion: 81.0,
    certified: 87.5,
    placed: 61.0,
    retention6: 68.0,
    retention12: 49.0,
    wage: "₹3.4 LPA",
    wageGrowth: 18,
    score: 84,
  },
  {
    name: "CM Employment Training Scheme (CMEGP)",
    enrolled: 68000,
    completion: 79.5,
    certified: 86.0,
    placed: 54.2,
    retention6: 63.5,
    retention12: 44.0,
    wage: "₹3.0 LPA",
    wageGrowth: 15,
    score: 76,
  },
  {
    name: "State Dual Apprenticeship Scheme",
    enrolled: 61000,
    completion: 88.0,
    certified: 94.0,
    placed: 82.0,
    retention6: 84.0,
    retention12: 71.0,
    wage: "₹3.9 LPA",
    wageGrowth: 28,
    score: 96,
  },
];

const providers: Provider[] = [
  {
    name: "Maharashtra Skill Development Institute",
    hq: "Pune",
    volume: 18400,
    certification: 92.4,
    placement: 78.2,
    retention6: 76.0,
    ctc: "₹4.2 LPA",
    status: "Accredited Tier-1",
  },
  {
    name: "Sahyadri Technical Vocational Society",
    hq: "Nashik",
    volume: 14200,
    certification: 89.1,
    placement: 71.0,
    retention6: 69.5,
    ctc: "₹3.6 LPA",
    status: "Accredited Tier-1",
  },
  {
    name: "Vidarbha Engineering Skilling Trust",
    hq: "Nagpur",
    volume: 12800,
    certification: 86.4,
    placement: 64.5,
    retention6: 62.0,
    ctc: "₹3.3 LPA",
    status: "Under Review",
  },
  {
    name: "Marathwada Precision Works Center",
    hq: "Chh. Sambhajinagar",
    volume: 9400,
    certification: 83.0,
    placement: 58.0,
    retention6: 59.0,
    ctc: "₹3.1 LPA",
    status: "Under Audit",
  },
];

function Percentage({ value }: { value: number }) {
  return (
    <span className="font-mono font-semibold text-slate-800">
      {value.toFixed(1)}%
    </span>
  );
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <span className="inline-flex rounded-md bg-[#e7eef8] px-2 py-1 font-mono text-[10px] font-bold text-[#365b91]">
      {score}/100
    </span>
  );
}

export default function ProgramImpact() {
  const { language } = useLanguage();
  const isMarathi = language === "mr";

  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [firstProgram, setFirstProgram] = useState(0);
  const [secondProgram, setSecondProgram] = useState(3);

  const first = programs[firstProgram];
  const second = programs[secondProgram];

  const totalEnrolled = programs.reduce(
    (sum, program) => sum + program.enrolled,
    0
  );

  const averagePlacement =
    programs.reduce((sum, program) => sum + program.placed, 0) /
    programs.length;

  const averageRetention =
    programs.reduce((sum, program) => sum + program.retention6, 0) /
    programs.length;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#365b91]">
            {isMarathi ? "कार्यक्रम प्रभाव" : "Program Impact"}
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
            {isMarathi
              ? "कार्यक्रम प्रभाव व दीर्घकालीन मॅट्रिक्स"
              : "Program Impact & Longitudinal Matrix"}
          </h2>

          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            {isMarathi
              ? "नोंदणीपासून प्रमाणन, नियुक्ती, रोजगार टिकाव आणि वेतन वाढीपर्यंत सर्वसमावेशक परिणाम निर्देशक."
              : "Comprehensive outcome metrics from intake through certification, placement, retention and wage progression."}
          </p>
        </div>

        <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold tracking-wide text-slate-500">
          {isMarathi ? "प्रोटोटाइप डेटासेट" : "PROTOTYPE DATASET"}
        </span>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              {isMarathi ? "कार्यक्रम गट" : "Program Cohort"}
            </span>

            <Users className="h-4 w-4 text-[#365b91]" />
          </div>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalEnrolled.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {isMarathi
              ? "मोजल्या गेलेल्या कार्यक्रमांमधील नोंदणी"
              : "Enrolled across tracked programs"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              {isMarathi ? "सरासरी नियुक्ती" : "Avg Placement"}
            </span>

            <GraduationCap className="h-4 w-4 text-[#365b91]" />
          </div>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {averagePlacement.toFixed(1)}%
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {isMarathi
              ? "चार मोजल्या गेलेल्या कार्यक्रमांमध्ये"
              : "Across four tracked programs"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              {isMarathi ? "सरासरी ६ महिन्यांचा टिकाव" : "Avg 6-Mo Retention"}
            </span>

            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {averageRetention.toFixed(1)}%
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {isMarathi
              ? "दीर्घकालीन रोजगार निर्देशक"
              : "Longitudinal employment signal"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              {isMarathi ? "परिणाम परिमाणे" : "Outcome Dimensions"}
            </span>

            <TrendingUp className="h-4 w-4 text-[#365b91]" />
          </div>

          <p className="mt-2 text-2xl font-bold text-slate-900">10</p>

          <p className="mt-1 text-xs text-slate-500">
            {isMarathi ? "नोंदणी → वेतन वाढ" : "Intake → wage progression"}
          </p>
        </div>
      </div>

      {/* Program matrix */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {isMarathi
                ? "प्रशिक्षण कार्यक्रम दीर्घकालीन कामगिरी मॅट्रिक्स"
                : "Training Program Longitudinal Performance Matrix"}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {isMarathi
                ? "नोंदणीपासून १२ महिन्यांच्या वेतन वाढीपर्यंत सर्वसमावेशक परिणाम निर्देशक."
                : "Comprehensive outcome metrics from intake to 12-month wage appreciation."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setComparisonOpen((open) => !open)}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#365b91] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#294a79]"
          >
            {comparisonOpen ? (
              <>
                {isMarathi ? "तुलना लपवा" : "Hide Comparison"}
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                {isMarathi
                  ? "समोरासमोर तुलना"
                  : "Side-by-Side Comparison"}
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700">
                <th className="px-3 py-2.5 text-left font-semibold">
                  {isMarathi ? "कार्यक्रम / योजना" : "Program / Scheme"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "नोंदणी" : "Enrolled"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "पूर्णता" : "Completion"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "प्रमाणित" : "Certified"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "नियुक्त" : "Placed"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "६ महिन्यांचा टिकाव" : "6-Mo Retention"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "१२ महिन्यांचा टिकाव" : "12-Mo Retention"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "सरासरी प्रारंभिक वेतन" : "Avg Start Wage"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "वेतन वाढ" : "Wage Growth"}
                </th>

                <th className="px-3 py-2.5 text-center font-semibold">
                  {isMarathi ? "गुण" : "Score"}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {programs.map((program) => (
                <tr
                  key={program.name}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-3 py-3 font-semibold text-slate-900">
                    {program.name}
                  </td>

                  <td className="px-3 py-3 text-right font-mono text-slate-700">
                    {program.enrolled.toLocaleString("en-IN")}
                  </td>

                  <td className="px-3 py-3 text-right">
                    <Percentage value={program.completion} />
                  </td>

                  <td className="px-3 py-3 text-right">
                    <Percentage value={program.certified} />
                  </td>

                  <td className="px-3 py-3 text-right font-mono font-bold text-[#365b91]">
                    {program.placed.toFixed(1)}%
                  </td>

                  <td className="px-3 py-3 text-right">
                    <span className="font-mono font-semibold text-emerald-700">
                      {program.retention6.toFixed(1)}%
                    </span>
                  </td>

                  <td className="px-3 py-3 text-right">
                    <Percentage value={program.retention12} />
                  </td>

                  <td className="px-3 py-3 text-right font-mono font-semibold text-slate-800">
                    {program.wage}
                  </td>

                  <td className="px-3 py-3 text-right">
                    <span className="font-mono font-bold text-emerald-600">
                      +{program.wageGrowth}%
                    </span>
                  </td>

                  <td className="px-3 py-3 text-center">
                    <ScoreBadge score={program.score} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Comparison */}
        {comparisonOpen && (
          <div className="mt-5 rounded-xl border border-[#d8e1ee] bg-[#f8fafc] p-4">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <label
                  htmlFor="program-one"
                  className="mb-1.5 block text-xs font-semibold text-slate-600"
                >
                  {isMarathi ? "कार्यक्रम A" : "Program A"}
                </label>

                <select
                  id="program-one"
                  value={firstProgram}
                  onChange={(event) =>
                    setFirstProgram(Number(event.target.value))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#365b91]"
                >
                  {programs.map((program, index) => (
                    <option key={program.name} value={index}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hidden pb-2 text-xs font-bold text-slate-400 md:block">
                VS
              </div>

              <div className="flex-1">
                <label
                  htmlFor="program-two"
                  className="mb-1.5 block text-xs font-semibold text-slate-600"
                >
                  {isMarathi ? "कार्यक्रम B" : "Program B"}
                </label>

                <select
                  id="program-two"
                  value={secondProgram}
                  onChange={(event) =>
                    setSecondProgram(Number(event.target.value))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#365b91]"
                >
                  {programs.map((program, index) => (
                    <option key={program.name} value={index}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <ComparisonCard program={first} />
              <ComparisonCard program={second} />
            </div>
          </div>
        )}
      </div>

      {/* Provider accountability */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-900">
            {isMarathi
              ? "मान्यताप्राप्त प्रशिक्षण प्रदाता उत्तरदायित्व निर्देशांक"
              : "Accredited Training Provider Accountability Index"}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {isMarathi
              ? "केवळ प्रशिक्षण बॅच पूर्ण करण्याच्या संख्येपलीकडे प्रदात्यांचे संतुलित मूल्यमापन."
              : "Balanced scorecard evaluating providers beyond mere batch completion volume."}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700">
                <th className="px-3 py-2.5 text-left font-semibold">
                  {isMarathi ? "प्रदाता संस्था" : "Provider Organization"}
                </th>

                <th className="px-3 py-2.5 text-left font-semibold">
                  {isMarathi ? "मुख्यालय" : "Headquarters"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "प्रशिक्षित संख्या" : "Trained Vol"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "प्रमाणन दर" : "Cert Rate"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "नियुक्ती दर" : "Placement Rate"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "६ महिन्यांचा टिकाव" : "6-Mo Retention"}
                </th>

                <th className="px-3 py-2.5 text-right font-semibold">
                  {isMarathi ? "सरासरी नियुक्ती CTC" : "Avg Placement CTC"}
                </th>

                <th className="px-3 py-2.5 text-center font-semibold">
                  {isMarathi ? "ऑडिट स्थिती" : "Audit Status"}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {providers.map((provider) => (
                <tr
                  key={provider.name}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-3 py-3 font-semibold text-slate-900">
                    {provider.name}
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    {provider.hq}
                  </td>

                  <td className="px-3 py-3 text-right font-mono text-slate-700">
                    {provider.volume.toLocaleString("en-IN")}
                  </td>

                  <td className="px-3 py-3 text-right">
                    <Percentage value={provider.certification} />
                  </td>

                  <td className="px-3 py-3 text-right">
                    <span className="font-mono font-bold text-[#365b91]">
                      {provider.placement.toFixed(1)}%
                    </span>
                  </td>

                  <td className="px-3 py-3 text-right">
                    <span className="font-mono font-semibold text-emerald-700">
                      {provider.retention6.toFixed(1)}%
                    </span>
                  </td>

                  <td className="px-3 py-3 text-right font-mono font-semibold text-slate-800">
                    {provider.ctc}
                  </td>

                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-flex rounded-md px-2 py-1 text-[10px] font-bold ${
                        provider.status === "Accredited Tier-1"
                          ? "bg-emerald-50 text-emerald-700"
                          : provider.status === "Under Review"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {isMarathi
                        ? provider.status === "Accredited Tier-1"
                          ? "मान्यताप्राप्त स्तर-१"
                          : provider.status === "Under Review"
                            ? "पुनरावलोकनाधीन"
                            : "ऑडिट अंतर्गत"
                        : provider.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Longitudinal interpretation */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InsightCard
          icon={<Award className="h-4 w-4" />}
          title={
            isMarathi ? "प्रमाणन निर्देशक" : "Certification Signal"
          }
          text={
            isMarathi
              ? "प्रमाणन दर प्रशिक्षण पूर्णता आणि रोजगार नियुक्ती यांच्यामधील मध्यम परिणाम दर्शवतात."
              : "Certification rates provide an intermediate outcome between training completion and employment placement."
          }
        />

        <InsightCard
          icon={<Building2 className="h-4 w-4" />}
          title={
            isMarathi ? "रोजगार निर्देशक" : "Employment Signal"
          }
          text={
            isMarathi
              ? "नियुक्ती आणि सहा महिन्यांचा रोजगार टिकाव यामुळे प्रशिक्षणार्थीने केवळ अभ्यासक्रम पूर्ण केला आहे की नाही यापलीकडे मोजमाप करता येते."
              : "Placement and six-month retention extend measurement beyond whether a trainee simply completed a course."
          }
        />

        <InsightCard
          icon={<TrendingUp className="h-4 w-4" />}
          title={
            isMarathi ? "दीर्घकालीन निर्देशक" : "Longitudinal Signal"
          }
          text={
            isMarathi
              ? "१२ महिन्यांचा रोजगार टिकाव आणि वेतन वाढ रोजगाराच्या दीर्घकालीन टिकाऊपणाचे निर्देशक प्रदान करतात."
              : "Twelve-month retention and wage growth provide longer-term indicators of employment sustainability."
          }
        />
      </div>
    </section>
  );
}

function ComparisonCard({ program }: { program: Program }) {
  const { language } = useLanguage();
  const isMarathi = language === "mr";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h4 className="text-sm font-bold text-slate-900">
        {program.name}
      </h4>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric
          label={isMarathi ? "पूर्णता" : "Completion"}
          value={`${program.completion.toFixed(1)}%`}
        />

        <Metric
          label={isMarathi ? "प्रमाणित" : "Certified"}
          value={`${program.certified.toFixed(1)}%`}
        />

        <Metric
          label={isMarathi ? "नियुक्त" : "Placed"}
          value={`${program.placed.toFixed(1)}%`}
        />

        <Metric
          label={isMarathi ? "६ महिन्यांचा टिकाव" : "6-Mo Retention"}
          value={`${program.retention6.toFixed(1)}%`}
        />

        <Metric
          label={isMarathi ? "१२ महिन्यांचा टिकाव" : "12-Mo Retention"}
          value={`${program.retention12.toFixed(1)}%`}
        />

        <Metric
          label={isMarathi ? "सरासरी प्रारंभिक वेतन" : "Avg Start Wage"}
          value={program.wage}
        />

        <Metric
          label={isMarathi ? "वेतन वाढ" : "Wage Growth"}
          value={`+${program.wageGrowth}%`}
        />

        <Metric
          label={isMarathi ? "प्रभाव गुण" : "Impact Score"}
          value={`${program.score}/100`}
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-mono text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function InsightCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e7eef8] text-[#365b91]">
        {icon}
      </div>

      <h3 className="mt-3 text-sm font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}