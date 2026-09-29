"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

import LogoutButton from "@/components/LogoutButton";
import {
  getDemoOutcome,
  subscribeDemoOutcome,
  verifyDemoEmployment,
  type DemoEmploymentOutcome,
} from "@/data/demo-outcome-store";
import { useLanguage } from "@/components/language-context";

const verificationRecords = [
  {
    id: "VER-9041",
    candidate: "Rahul Suresh Shinde",
    traineeId: "VB-10452",
    program: "MSSDS Advanced Tech Track",
    role: "Junior Cloud Associate",
    joining: "01 Sep 2026",
    wage: "₹3.8 LPA",
    status: "Pending",
  },
  {
    id: "VER-9042",
    candidate: "Pooja Vilas Deshmukh",
    traineeId: "VB-10928",
    program: "CM Employment Training",
    role: "Quality Inspector - EV Assembly",
    joining: "15 Aug 2026",
    wage: "₹3.2 LPA",
    status: "Pending",
  },
];

const recentActivity = [
  {
    title: "Employment record submitted",
    description: "New placement outcome requires employer verification.",
    time: "2 hours ago",
    type: "pending",
  },
  {
    title: "Candidate outcome confirmed",
    description: "Employment record successfully reconciled with trainee data.",
    time: "Yesterday",
    type: "success",
  },
  {
    title: "Verification request received",
    description: "MSSDS placement record is awaiting employer action.",
    time: "2 days ago",
    type: "info",
  },
];

const activityTranslations: Record<string, { en: string; mr: string }> = {
  "Employment record submitted": {
    en: "Employment record submitted",
    mr: "रोजगार नोंद सादर केली",
  },
  "New placement outcome requires employer verification.": {
    en: "New placement outcome requires employer verification.",
    mr: "नवीन रोजगार परिणामासाठी नियोक्ता पडताळणी आवश्यक आहे.",
  },
  "Candidate outcome confirmed": {
    en: "Candidate outcome confirmed",
    mr: "उमेदवाराचा रोजगार परिणाम निश्चित झाला",
  },
  "Employment record successfully reconciled with trainee data.": {
    en: "Employment record successfully reconciled with trainee data.",
    mr: "रोजगार नोंद प्रशिक्षणार्थीच्या डेटासह यशस्वीपणे जुळवली गेली.",
  },
  "Verification request received": {
    en: "Verification request received",
    mr: "पडताळणी विनंती प्राप्त झाली",
  },
  "MSSDS placement record is awaiting employer action.": {
    en: "MSSDS placement record is awaiting employer action.",
    mr: "MSSDS रोजगार नोंद नियोक्त्याच्या कारवाईची प्रतीक्षा करत आहे.",
  },
};

export default function EmployerDashboard() {
  const { language } = useLanguage();
  const isMarathi = language === "mr";

  const tx = (english: string, marathi: string) =>
    isMarathi ? marathi : english;

  const [employmentOutcome, setEmploymentOutcome] =
    useState<DemoEmploymentOutcome>(getDemoOutcome());

  useEffect(() => subscribeDemoOutcome(setEmploymentOutcome), []);

  const dynamicVerificationRecords = useMemo(
    () =>
      verificationRecords.map((record) =>
        record.traineeId === employmentOutcome.traineeId
          ? {
              ...record,
              candidate: employmentOutcome.candidate,
              role: employmentOutcome.role,
              joining: employmentOutcome.joining,
              wage: employmentOutcome.wage,
              status:
                employmentOutcome.status === "Employer Verified"
                  ? "Verified"
                  : "Pending",
            }
          : record
      ),
    [employmentOutcome]
  );

  const pendingCount = dynamicVerificationRecords.filter(
    (record) => record.status === "Pending"
  ).length;

  const handleVerify = (traineeId: string) => {
    if (traineeId !== employmentOutcome.traineeId) {
      alert(
        tx(
          "This demo verification is linked to the trainee employment record submitted from the Trainee Dashboard.",
          "ही डेमो पडताळणी प्रशिक्षणार्थी डॅशबोर्डवरून सादर केलेल्या रोजगार नोंदीशी जोडलेली आहे."
        )
      );
      return;
    }

    verifyDemoEmployment();

    alert(
      tx(
        "Employment outcome verified successfully.",
        "रोजगाराची माहिती यशस्वीरित्या सत्यापित झाली."
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb]">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1769aa]">
              <Building2 size={17} />
              {tx("Employer Portal", "नियोक्ता पोर्टल")}
            </div>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#102a56]">
              {tx(
                "Welcome back, Tata Technologies",
                "Tata Technologies मध्ये पुन्हा स्वागत आहे"
              )}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {tx(
                "Verify employment outcomes, confirm candidate records, and help maintain reliable longitudinal skilling data.",
                "रोजगार परिणामांची पडताळणी करा, उमेदवाराच्या नोंदी निश्चित करा आणि विश्वासार्ह दीर्घकालीन कौशल्य डेटा राखण्यास मदत करा."
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {tx("Organization ID", "संस्था ID")}
              </p>

              <p className="mt-1 text-sm font-bold text-[#102a56]">TT-PUN</p>
            </div>

            <LogoutButton />
          </div>
        </div>

        {/* Prototype notice */}
        <div className="mt-7 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <ShieldCheck
            className="mt-0.5 shrink-0 text-[#1769aa]"
            size={18}
          />

          <div>
            <p className="text-sm font-semibold text-[#102a56]">
              {tx(
                "Prototype employer workspace",
                "प्रोटोटाइप नियोक्ता कार्यक्षेत्र"
              )}
            </p>

            <p className="mt-0.5 text-xs leading-5 text-slate-600">
              {tx(
                "This demonstration uses prototype records to show the intended employment-verification workflow.",
                "हे प्रात्यक्षिक अपेक्षित रोजगार-पडताळणी कार्यप्रवाह दाखवण्यासाठी प्रोटोटाइप नोंदी वापरते."
              )}
            </p>
          </div>
        </div>

        {/* KPI cards */}
        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {tx("Verification Queue", "पडताळणी रांग")}
              </p>

              <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                <Clock3 size={18} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-extrabold text-[#102a56]">
              {pendingCount}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {tx(
                "Employment records awaiting review",
                "पुनरावलोकनाच्या प्रतीक्षेत असलेल्या रोजगार नोंदी"
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {tx("Verified Outcomes", "पडताळलेले परिणाम")}
              </p>

              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <BadgeCheck size={18} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-extrabold text-[#102a56]">
              {employmentOutcome.status === "Employer Verified" ? "43" : "42"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {tx(
                "Candidate placements confirmed",
                "निश्चित केलेल्या उमेदवार रोजगार नोंदी"
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {tx("Active Employees", "सक्रिय कर्मचारी")}
              </p>

              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Users size={18} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-extrabold text-[#102a56]">
              {employmentOutcome.status === "Employer Verified" ? "43" : "42"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {tx(
                "Confirmed active placement records",
                "निश्चित सक्रिय रोजगार नोंदी"
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {tx("Records This Month", "या महिन्यातील नोंदी")}
              </p>

              <div className="rounded-lg bg-violet-50 p-2 text-violet-600">
                <FileCheck2 size={18} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-extrabold text-[#102a56]">18</p>

            <p className="mt-1 text-xs text-slate-500">
              {tx("Employment signals received", "प्राप्त रोजगार संकेत")}
            </p>
          </div>
        </section>

        {/* Verification queue */}
        <section className="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="text-[#1769aa]" size={20} />

                <h2 className="text-lg font-bold text-[#102a56]">
                  {tx(
                    "Employment Verification Queue",
                    "रोजगार पडताळणी रांग"
                  )}
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {tx(
                  "Review and validate employment records submitted through the skilling outcome network.",
                  "कौशल्य परिणाम नेटवर्कद्वारे सादर केलेल्या रोजगार नोंदींचे पुनरावलोकन व पडताळणी करा."
                )}
              </p>
            </div>

            <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
              <Search size={16} className="text-slate-400" />

              <input
                type="text"
                placeholder={tx("Search candidate...", "उमेदवार शोधा...")}
                className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {dynamicVerificationRecords.map((record) => (
              <div
                key={record.id}
                className="p-5 transition hover:bg-slate-50/70"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-[#102a56]">
                        {record.candidate}
                      </h3>

                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
                        {record.traineeId}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          record.status === "Verified"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {record.status === "Verified"
                          ? tx("Verified", "सत्यापित")
                          : tx(
                              "Verification Pending",
                              "पडताळणी प्रलंबित"
                            )}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      {record.program}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {tx("Role", "भूमिका")}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {record.role}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {tx("Joining Date", "रुजू होण्याची तारीख")}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {record.joining}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {tx("Starting Wage", "प्रारंभिक वेतन")}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {record.wage}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {tx("Verification ID", "पडताळणी ID")}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {record.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      {tx("Review", "पुनरावलोकन")}
                    </button>

                    <button
                      type="button"
                      disabled={record.status === "Verified"}
                      onClick={() => handleVerify(record.traineeId)}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition ${
                        record.status === "Verified"
                          ? "cursor-default bg-emerald-600"
                          : "bg-[#102a56] hover:bg-[#0b2042]"
                      }`}
                    >
                      <CheckCircle2 size={16} />

                      {record.status === "Verified"
                        ? tx("Verified", "सत्यापित")
                        : tx("Verify", "पडताळणी करा")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Employer workflow */}
        <section className="mt-7 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#1769aa]">
              <BriefcaseBusiness size={20} />
            </div>

            <h3 className="mt-4 font-bold text-[#102a56]">
              {tx(
                "Submit Employment Outcome",
                "रोजगार परिणाम सादर करा"
              )}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {tx(
                "Record joining date, role, employment type, and starting wage when onboarding a skilling-program candidate.",
                "कौशल्य कार्यक्रमातील उमेदवाराला रुजू करताना रुजू होण्याची तारीख, भूमिका, रोजगार प्रकार आणि प्रारंभिक वेतन नोंदवा."
              )}
            </p>

            <button
              type="button"
              className="mt-4 text-sm font-bold text-[#1769aa] hover:underline"
            >
              {tx("Add employment record →", "रोजगार नोंद जोडा →")}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <BadgeCheck size={20} />
            </div>

            <h3 className="mt-4 font-bold text-[#102a56]">
              {tx(
                "Verify Candidate Records",
                "उमेदवाराच्या नोंदी पडताळा"
              )}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {tx(
                "Confirm whether the reported candidate is employed by your organization and validate the submitted employment details.",
                "नोंदवलेला उमेदवार आपल्या संस्थेत कार्यरत आहे का ते निश्चित करा आणि सादर केलेल्या रोजगार तपशीलांची पडताळणी करा."
              )}
            </p>

            <button
              type="button"
              className="mt-4 text-sm font-bold text-[#1769aa] hover:underline"
            >
              {tx(
                "Open verification queue →",
                "पडताळणी रांग उघडा →"
              )}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <ShieldCheck size={20} />
            </div>

            <h3 className="mt-4 font-bold text-[#102a56]">
              {tx(
                "Outcome Data Integrity",
                "परिणाम डेटा अखंडता"
              )}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {tx(
                "Employer verification creates an independent signal that can be reconciled with trainee and training-provider records.",
                "नियोक्ता पडताळणी स्वतंत्र संकेत तयार करते, जो प्रशिक्षणार्थी आणि प्रशिक्षण प्रदात्याच्या नोंदींसह जुळवता येतो."
              )}
            </p>

            <button
              type="button"
              className="mt-4 text-sm font-bold text-[#1769aa] hover:underline"
            >
              {tx(
                "View verification history →",
                "पडताळणी इतिहास पहा →"
              )}
            </button>
          </div>
        </section>

        {/* Recent activity */}
        <section className="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-lg font-bold text-[#102a56]">
              {tx("Recent Activity", "अलीकडील क्रियाकलाप")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {tx(
                "Recent employer-side actions in the outcome verification workflow.",
                "रोजगार परिणाम पडताळणी कार्यप्रवाहातील अलीकडील नियोक्ता-कडील क्रिया."
              )}
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivity.map((activity) => (
              <div
                key={
                  activityTranslations[activity.title]?.[language] ??
                  activity.title
                }
                className="flex gap-4 p-5"
              >
                <div
                  className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                    activity.type === "success"
                      ? "bg-emerald-500"
                      : activity.type === "pending"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                  }`}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <p className="text-sm font-semibold text-[#102a56]">
                      {activityTranslations[activity.title]?.[language] ??
                        activity.title}
                    </p>

                    <span className="text-xs text-slate-400">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {activityTranslations[activity.description]?.[language] ??
                      activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-8 border-t border-slate-200 py-6 text-center">
          <p className="text-xs text-slate-400">
            {tx(
              "VB Analytics · Prototype Employer Workspace · VB Innovators · Smart India Hackathon 2026",
              "VB Analytics · प्रोटोटाइप नियोक्ता कार्यक्षेत्र · VB Innovators · Smart India Hackathon 2026"
            )}
          </p>
        </div>
      </div>
    </main>
  );
}