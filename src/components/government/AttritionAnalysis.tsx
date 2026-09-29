"use client";

import {
  AlertTriangle,
  ArrowDownRight,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  MessageSquareWarning,
  TrendingDown,
  Users,
} from "lucide-react";
import { useLanguage } from "@/components/language-context";

const nonPlacementData = [
  {
    reason: "Technical skill gap / Assessment failure",
    pct: 31.2,
    count: 17160,
    icon: AlertTriangle,
    bar: "bg-red-600",
  },
  {
    reason: "Location constraints / Relocation hesitation",
    pct: 21.4,
    count: 11770,
    icon: MapPin,
    bar: "bg-amber-600",
  },
  {
    reason: "Offered wage below living expenses",
    pct: 16.8,
    count: 9240,
    icon: TrendingDown,
    bar: "bg-slate-600",
  },
  {
    reason: "Communication & soft-skill barrier",
    pct: 14.5,
    count: 7975,
    icon: MessageSquareWarning,
    bar: "bg-[#365b91]",
  },
  {
    reason: "Lack of local district vacancies",
    pct: 9.1,
    count: 5005,
    icon: MapPin,
    bar: "bg-slate-400",
  },
  {
    reason: "Opted for higher education / family",
    pct: 7.0,
    count: 3850,
    icon: Users,
    bar: "bg-slate-300",
  },
];

const attritionData = [
  {
    reason: "Low starting salary vs inflation/rent",
    pct: 28.6,
    count: 11090,
    icon: TrendingDown,
    bar: "bg-red-600",
  },
  {
    reason: "Found higher paying wage opportunity",
    pct: 24.2,
    count: 9380,
    icon: BriefcaseBusiness,
    bar: "bg-emerald-600",
  },
  {
    reason: "Workplace relocation / Family constraints",
    pct: 18.5,
    count: 7170,
    icon: MapPin,
    bar: "bg-amber-600",
  },
  {
    reason: "Job role mismatch with training curriculum",
    pct: 14.1,
    count: 5460,
    icon: AlertTriangle,
    bar: "bg-[#365b91]",
  },
  {
    reason: "Contract ended / No absorption",
    pct: 8.8,
    count: 3410,
    icon: Clock3,
    bar: "bg-slate-500",
  },
  {
    reason: "Health / Personal reasons",
    pct: 5.8,
    count: 2240,
    icon: Users,
    bar: "bg-slate-400",
  },
];

const nonPlacementReasonsMr: Record<string, string> = {
  "Technical skill gap / Assessment failure":
    "तांत्रिक कौशल्यातील तफावत / मूल्यांकनात अपयश",
  "Location constraints / Relocation hesitation":
    "स्थानिक मर्यादा / स्थलांतराबाबत संकोच",
  "Offered wage below living expenses":
    "जीवनावश्यक खर्चाच्या तुलनेत कमी वेतन",
  "Communication & soft-skill barrier":
    "संवाद व सॉफ्ट-स्किल अडथळा",
  "Lack of local district vacancies":
    "स्थानिक जिल्ह्यात रिक्त पदांचा अभाव",
  "Opted for higher education / family":
    "उच्च शिक्षण / कुटुंबाला प्राधान्य",
};

const attritionReasonsMr: Record<string, string> = {
  "Low starting salary vs inflation/rent":
    "महागाई / घरभाड्याच्या तुलनेत कमी प्रारंभिक वेतन",
  "Found higher paying wage opportunity":
    "अधिक वेतनाची रोजगार संधी मिळाली",
  "Workplace relocation / Family constraints":
    "कामाच्या ठिकाणाचे स्थलांतर / कौटुंबिक मर्यादा",
  "Job role mismatch with training curriculum":
    "प्रशिक्षण अभ्यासक्रमाशी नोकरीच्या भूमिकेचा मेळ नसणे",
  "Contract ended / No absorption":
    "करार समाप्त / कायमस्वरूपी समावेश नाही",
  "Health / Personal reasons":
    "आरोग्य / वैयक्तिक कारणे",
};

function ReasonList({
  items,
  isMarathi,
}: {
  items: typeof nonPlacementData;
  isMarathi: boolean;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const Icon = item.icon;

        const translatedReason =
          isMarathi
            ? items === nonPlacementData
              ? nonPlacementReasonsMr[item.reason]
              : attritionReasonsMr[item.reason]
            : item.reason;

        return (
          <div key={item.reason}>
            <div className="mb-1.5 flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-2">
                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />

                <span className="text-xs font-semibold text-slate-700">
                  {translatedReason}
                </span>
              </div>

              <span className="shrink-0 font-mono text-xs font-semibold text-slate-900">
                {item.pct.toFixed(1)}% (
                {item.count.toLocaleString("en-IN")})
              </span>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${item.bar}`}
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AttritionAnalysis() {
  const { language } = useLanguage();
  const isMarathi = language === "mr";

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#365b91]">
            {isMarathi ? "मूळ कारण विश्लेषण" : "Root Cause Analytics"}
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
            {isMarathi
              ? "नियुक्ती न होणे व कर्मचारी टिकाव विश्लेषण"
              : "Non-Placement & Attrition Analysis"}
          </h2>

          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            {isMarathi
              ? "प्रमाणित प्रशिक्षणार्थींना रोजगार का मिळत नाही आणि नियुक्त झालेल्या कर्मचाऱ्यांपैकी काही पहिले सहा महिने पूर्ण होण्यापूर्वी रोजगार का सोडतात हे ओळखा."
              : "Identify why certified trainees remain unplaced and why placed employees exit employment within the first six months."}
          </p>
        </div>

        <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold tracking-wide text-slate-500">
          {isMarathi ? "प्रोटोटाइप डेटासेट" : "PROTOTYPE DATASET"}
        </span>
      </div>

      {/* Top summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-red-800">
              {isMarathi ? "नियुक्ती न झालेला गट" : "Unplaced Cohort"}
            </span>

            <Users className="h-4 w-4 text-red-600" />
          </div>

          <p className="mt-2 text-2xl font-bold text-red-900">55,000</p>

          <p className="mt-1 text-xs text-red-700">
            {isMarathi
              ? "मोजल्या गेलेल्या कालावधीत नियुक्ती न झालेले प्रमाणित प्रशिक्षणार्थी"
              : "Certified trainees without placement within the tracked window"}
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800">
              {isMarathi ? "सहा महिन्यांची घट" : "Six-Month Drop"}
            </span>

            <ArrowDownRight className="h-4 w-4 text-amber-700" />
          </div>

          <p className="mt-2 text-2xl font-bold text-amber-900">32.0%</p>

          <p className="mt-1 text-xs text-amber-700">
            {isMarathi
              ? "सहा महिन्यांच्या फॉलो-अपपर्यंत नोंदवलेले रोजगारातून बाहेर पडण्याचे प्रमाण"
              : "Placement exits observed by the six-month follow-up point"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              {isMarathi ? "फॉलो-अप कालावधी" : "Follow-up Windows"}
            </span>

            <Clock3 className="h-4 w-4 text-slate-500" />
          </div>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            30 / 90 / 180
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {isMarathi
              ? "प्रमाणनानंतर आणि रोजगारानंतरच्या परिणाम तपासणीचे टप्पे"
              : "Post-certification and post-employment outcome checkpoints"}
          </p>
        </div>
      </div>

      {/* Main diagnostics */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Non-placement */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isMarathi
                    ? "प्रशिक्षणार्थींना नोकऱ्या का मिळत नाहीत?"
                    : "Why Are Trainees Not Getting Jobs?"}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {isMarathi
                    ? "प्रमाणनानंतर ३० आणि ९० दिवसांच्या फॉलो-अपदरम्यान संकलित केलेला सर्वेक्षण अभिप्राय."
                    : "Empirical survey feedback collected during 30 & 90-day post-certification follow-ups."}
                </p>
              </div>

              <span className="w-fit rounded-md border border-red-200 bg-red-50 px-2 py-1 font-mono text-[10px] font-bold text-red-700">
                {isMarathi ? "55,000 नियुक्ती न झालेला गट" : "55,000 UNPLACED COHORT"}
              </span>
            </div>
          </div>

          <ReasonList items={nonPlacementData} isMarathi={isMarathi} />

          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs leading-5 text-slate-600">
              <strong className="text-slate-900">
                {isMarathi ? "मुख्य निरीक्षण:" : "Key Insight:"}
              </strong>{" "}
              {isMarathi ? (
                <>
                  तांत्रिक कौशल्यातील तफावत{" "}
                  <strong className="text-slate-900">(31.2%)</strong> आणि
                  स्थानिक गतिशीलतेच्या मर्यादा{" "}
                  <strong className="text-slate-900">(21.4%)</strong> या
                  प्रोटोटाइप डेटासेटमधील नियुक्ती न होण्याच्या ५२% पेक्षा अधिक
                  कारणांसाठी जबाबदार आहेत.
                </>
              ) : (
                <>
                  Technical Skill Gaps{" "}
                  <strong className="text-slate-900">(31.2%)</strong> and
                  Location Mobility Constraints{" "}
                  <strong className="text-slate-900">(21.4%)</strong> account
                  for more than 52% of non-placement in this prototype dataset.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Attrition */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isMarathi
                    ? "कर्मचारी नियुक्त्या का सोडत आहेत?"
                    : "Why Are Employees Leaving Placements?"}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {isMarathi
                    ? "१८० दिवसांच्या फॉलो-अप मुलाखतींमध्ये नोंदवलेली रोजगारातून बाहेर पडण्याची कारणे."
                    : "Post-employment attrition reasons tracked at 180-day follow-up interviews."}
                </p>
              </div>

              <span className="w-fit rounded-md border border-amber-200 bg-amber-50 px-2 py-1 font-mono text-[10px] font-bold text-amber-800">
                {isMarathi ? "32.0% ६-महिन्यांची घट" : "32.0% 6-MO DROP"}
              </span>
            </div>
          </div>

          <ReasonList items={attritionData} isMarathi={isMarathi} />

          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs leading-5 text-slate-600">
              <strong className="text-slate-900">
                {isMarathi ? "मुख्य निरीक्षण:" : "Key Insight:"}
              </strong>{" "}
              {isMarathi ? (
                <>
                  जीवनावश्यक खर्चाच्या तुलनेत कमी भरपाई{" "}
                  <strong className="text-slate-900">(28.6%)</strong> हे या
                  प्रोटोटाइप डेटासेटमधील रोजगार सोडण्याचे सर्वाधिक नोंदवलेले
                  कारण आहे, विशेषतः पुणे आणि MMR शहरी केंद्रांमध्ये नियुक्त
                  झालेल्या ग्रामीण उमेदवारांसाठी.
                </>
              ) : (
                <>
                  Compensation below cost of living{" "}
                  <strong className="text-slate-900">(28.6%)</strong> is the
                  largest recorded attrition reason in this prototype dataset,
                  particularly for rural candidates placed in Pune and MMR
                  urban centers.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Operational response */}
      <div className="rounded-xl border border-[#d8e1ee] bg-[#f8fafc] p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e7eef8]">
            <AlertTriangle className="h-4 w-4 text-[#365b91]" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {isMarathi
                ? "मूळ कारणापासून हस्तक्षेपापर्यंत"
                : "From Root Cause to Intervention"}
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-600">
              {isMarathi
                ? "या संकेतांचे लक्ष्यित हस्तक्षेपांमध्ये रूपांतर करता येऊ शकते: कौशल्यातील तफावतींसाठी अभ्यासक्रम सुधारणा, जिल्हास्तरीय रिक्त पदांसाठी स्थानिक नियोक्ता सक्रियता, स्थलांतराच्या अडचणींसाठी गतिशीलता सहाय्य आणि लवकर रोजगार सोडण्याचे प्रमाण जास्त असलेल्या ठिकाणी वेतन व भूमिकेचे पुनरावलोकन."
                : "These signals can be converted into targeted interventions: curriculum remediation for skill gaps, local employer mobilisation for district-level vacancy shortages, mobility support for relocation constraints, and wage/role review where early attrition is concentrated."}
            </p>
          </div>
        </div>
      </div>

      {/* Follow-up workflow */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-900">
            {isMarathi
              ? "परिणाम फॉलो-अप कार्यप्रवाह"
              : "Outcome Follow-up Workflow"}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {isMarathi
              ? "प्रोटोटाइप परिणाम-निरीक्षण मॉडेलमध्ये दर्शविलेले फॉलो-अप टप्पे."
              : "Follow-up points represented in the prototype outcome-monitoring model."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="font-mono text-xs font-bold text-[#365b91]">
              DAY 30
            </div>

            <p className="mt-2 text-sm font-semibold text-slate-900">
              {isMarathi ? "नियुक्ती स्थिती" : "Placement Status"}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {isMarathi
                ? "प्रमाणित प्रशिक्षणार्थ्याला नोकरीची संधी मिळाली आहे किंवा त्याने ती स्वीकारली आहे का हे नोंदवा."
                : "Capture whether the certified trainee has received or accepted a job opportunity."}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="font-mono text-xs font-bold text-[#365b91]">
              DAY 90
            </div>

            <p className="mt-2 text-sm font-semibold text-slate-900">
              {isMarathi
                ? "नियुक्ती न होण्याचे निदान"
                : "Non-Placement Diagnosis"}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {isMarathi
                ? "कौशल्यातील विसंगती, गतिशीलता, वेतन, संवाद किंवा स्थानिक रिक्त पदांची उपलब्धता यांसारखे अडथळे नोंदवा."
                : "Record barriers such as skill mismatch, mobility, wages, communication or local vacancy availability."}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="font-mono text-xs font-bold text-[#365b91]">
              DAY 180
            </div>

            <p className="mt-2 text-sm font-semibold text-slate-900">
              {isMarathi
                ? "रोजगार टिकाव व रोजगारातून बाहेर पडणे"
                : "Retention & Attrition"}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {isMarathi
                ? "रोजगार सुरू आहे का याचा मागोवा घ्या आणि रोजगार नोंद संपल्यास त्याचे कारण नोंदवा."
                : "Track whether employment continues and capture the reason when an employment record ends."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}