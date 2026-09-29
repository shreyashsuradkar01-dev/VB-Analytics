"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  FileCheck2,
  FileText,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useLanguage } from "@/components/language-context";

type AuditRole = "All" | "Gov Official" | "Employer" | "Provider" | "Trainee";

type AuditEvent = {
  date: string;
  time: string;
  actor: string;
  role: Exclude<AuditRole, "All">;
  event: string;
  record: string;
  hash: string;
  icon: "government" | "employer" | "provider" | "trainee";
};

const auditEvents: AuditEvent[] = [
  {
    date: "18 Sep 2026",
    time: "09:14",
    actor: "Government Officer",
    role: "Gov Official",
    event: "Exported Pune District Longitudinal Report",
    record: "District_Pune_FY25.pdf",
    hash: "e3b0c442...881a",
    icon: "government",
  },
  {
    date: "17 Sep 2026",
    time: "16:30",
    actor: "HR Tata Tech",
    role: "Employer",
    event: "Verified Employment Record for VB-10452",
    record: "Outcome_VB10452",
    hash: "5f4dcc3b...772b",
    icon: "employer",
  },
  {
    date: "17 Sep 2026",
    time: "14:15",
    actor: "MSDI Admin",
    role: "Provider",
    event: "Batch Certification Batch #CC-2026-03 finalized",
    record: "Batch_CC03",
    hash: "7c6a9d28...991c",
    icon: "provider",
  },
  {
    date: "16 Sep 2026",
    time: "11:20",
    actor: "Candidate Rahul Shinde",
    role: "Trainee",
    event: "Submitted Employment Outcome Self-Report",
    record: "Record_10452",
    hash: "8b1a9953...cc41",
    icon: "trainee",
  },
];

const roleStyles: Record<Exclude<AuditRole, "All">, string> = {
  "Gov Official": "bg-blue-50 text-blue-700 border-blue-200",
  Employer: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Provider: "bg-violet-50 text-violet-700 border-violet-200",
  Trainee: "bg-amber-50 text-amber-700 border-amber-200",
};

function EventIcon({ type }: { type: AuditEvent["icon"] }) {
  if (type === "government") {
    return <ShieldCheck className="h-4 w-4 text-[#2f5f9f]" />;
  }

  if (type === "employer") {
    return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
  }

  if (type === "provider") {
    return <FileCheck2 className="h-4 w-4 text-violet-600" />;
  }

  return <UserRound className="h-4 w-4 text-amber-600" />;
}

export default function AuditTrail() {
  const { language } = useLanguage();
  const isMarathi = language === "mr";

  const [search, setSearch] = useState("");
  const [role, setRole] = useState<AuditRole>("All");

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return auditEvents.filter((item) => {
      const matchesRole = role === "All" || item.role === role;

      const matchesSearch =
        !query ||
        [
          item.date,
          item.time,
          item.actor,
          item.role,
          item.event,
          item.record,
          item.hash,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesRole && matchesSearch;
    });
  }, [role, search]);

  const governmentEvents = auditEvents.filter(
    (item) => item.role === "Gov Official",
  ).length;

  const employerEvents = auditEvents.filter(
    (item) => item.role === "Employer",
  ).length;

  const traineeEvents = auditEvents.filter(
    (item) => item.role === "Trainee",
  ).length;

  const text = {
    eyebrow: isMarathi ? "ऑडिट आणि ट्रेसिबिलिटी" : "Audit & Traceability",

    title: isMarathi ? "ऑडिट ट्रेल" : "Audit Trail",

    description: isMarathi
      ? "परिणाम पडताळणी घटना, नोंदीतील बदल, स्रोत आणि शासनाच्या अहवालाशी संबंधित क्रियांचा आढावा घ्या."
      : "Review outcome verification events, record changes, source attribution and government reporting activity.",

    prototypeDataset: isMarathi ? "प्रोटोटाइप डेटासेट" : "Prototype Dataset",

    totalAuditEvents: isMarathi
      ? "एकूण ऑडिट घटना"
      : "Total Audit Events",

    demonstrationRecords: isMarathi
      ? "प्रात्यक्षिक नोंदी"
      : "Demonstration records",

    governmentActions: isMarathi
      ? "शासकीय कृती"
      : "Government Actions",

    governmentActivity: isMarathi
      ? "शासकीय क्रियाकलाप"
      : "Government activity",

    employerEvents: isMarathi
      ? "नियोक्ता घटना"
      : "Employer Events",

    employmentVerification: isMarathi
      ? "रोजगार पडताळणी"
      : "Employment verification",

    traineeEvents: isMarathi
      ? "प्रशिक्षणार्थी घटना"
      : "Trainee Events",

    selfReportedOutcomes: isMarathi
      ? "स्वयं-नोंदवलेले परिणाम"
      : "Self-reported outcomes",

    auditActivity: isMarathi ? "ऑडिट क्रियाकलाप" : "Audit Activity",

    auditActivityDescription: isMarathi
      ? "प्रत्येक महत्त्वाची परिणाम घटना संबंधित वापरकर्ता, स्रोत नोंद आणि ट्रेस करण्यायोग्य इव्हेंट हॅशशी जोडली जाऊ शकते."
      : "Every important outcome event can be associated with an actor, source record and traceable event hash.",

    all: isMarathi ? "सर्व" : "All",
    govOfficial: isMarathi ? "शासकीय अधिकारी" : "Gov Official",
    employer: isMarathi ? "नियोक्ता" : "Employer",
    provider: isMarathi ? "प्रशिक्षण संस्था" : "Provider",
    trainee: isMarathi ? "प्रशिक्षणार्थी" : "Trainee",

    searchPlaceholder: isMarathi
      ? "वापरकर्ता, घटना, नोंद किंवा हॅश शोधा..."
      : "Search actor, event, record or hash...",

    date: isMarathi ? "दिनांक" : "Date",
    actor: isMarathi ? "वापरकर्ता" : "Actor",
    role: isMarathi ? "भूमिका" : "Role",
    auditEvent: isMarathi ? "ऑडिट घटना" : "Audit Event",
    record: isMarathi ? "नोंद" : "Record",
    eventHash: isMarathi ? "इव्हेंट हॅश" : "Event Hash",

    noAuditEvents: isMarathi
      ? "तुमच्या शोधाशी जुळणाऱ्या ऑडिट घटना आढळल्या नाहीत."
      : "No audit events match your search.",

    traceabilityModel: isMarathi
      ? "ट्रेसिबिलिटी मॉडेल"
      : "Traceability Model",

    traceabilityDescription: isMarathi
      ? "प्रत्येक महत्त्वाचा परिणाम बदल त्याच्या स्रोताशी आणि पडताळणी घटनेशी जोडा."
      : "Connect every material outcome change to its source and verification event.",

    source: isMarathi ? "स्रोत" : "Source",
    sourceText: isMarathi
      ? "प्रशिक्षणार्थी, प्रशिक्षण संस्था, नियोक्ता किंवा शासनाकडून आलेली माहिती."
      : "Trainee, provider, employer or government input.",

    event: isMarathi ? "घटना" : "Event",
    eventText: isMarathi
      ? "नवीन परिणाम, पडताळणी किंवा नोंद कृती."
      : "A new outcome, verification or record action.",

    verification: isMarathi ? "पडताळणी" : "Verification",
    verificationText: isMarathi
      ? "स्रोताची नोंद आणि ताळमेळाची स्थिती."
      : "Source attribution and reconciliation status.",

    longitudinalRecord: isMarathi
      ? "दीर्घकालीन नोंद"
      : "Record",

    longitudinalRecordText: isMarathi
      ? "उमेदवाराच्या दीर्घकालीन परिणामाची नोंद."
      : "Longitudinal candidate outcome record.",

    audit: isMarathi ? "ऑडिट" : "Audit",
    auditText: isMarathi
      ? "पुनरावलोकनासाठी ट्रेस करण्यायोग्य घटनांचा इतिहास."
      : "Traceable event history for review.",

    verificationActivity: isMarathi
      ? "पडताळणी क्रियाकलाप"
      : "Verification Activity",

    verificationActivityDescription: isMarathi
      ? "नियोक्ता आणि प्रशिक्षणार्थी घटना रोजगार परिणामांच्या ताळमेळासाठी ट्रेस करण्यायोग्य पुरावे देतात."
      : "Employer and trainee events provide traceable evidence for employment outcome reconciliation.",

    employmentVerificationRecorded: isMarathi
      ? "रोजगार पडताळणी घटना नोंदवली"
      : "Employment verification event recorded",

    employerConfirmation: isMarathi
      ? "नियोक्त्याची पुष्टी उमेदवार VB-10452 शी जोडलेली आहे."
      : "Employer confirmation is associated with candidate VB-10452.",

    governmentReportingActivity: isMarathi
      ? "शासकीय अहवाल क्रियाकलाप"
      : "Government Reporting Activity",

    governmentReportingDescription: isMarathi
      ? "शासकीय वापरकर्ते निर्यात केलेले अहवाल आणि विश्लेषणात्मक कृती मूळ ऑडिट घटनेपर्यंत ट्रेस करू शकतात."
      : "Government users can trace exported reports and analytical actions back to the underlying audit event.",

    districtReportExport: isMarathi
      ? "जिल्हा अहवाल निर्यात नोंदवली"
      : "District report export recorded",

    puneReportExport: isMarathi
      ? "पुणे दीर्घकालीन अहवालाची निर्यात शासकीय ऑडिट घटनेशी जोडलेली आहे."
      : "Pune longitudinal report export is associated with a government audit event.",

    prototypeNotice: isMarathi ? "प्रोटोटाइप सूचना:" : "Prototype notice:",

    prototypeNoticeText: isMarathi
      ? "येथे दर्शविलेल्या ऑडिट घटना, वापरकर्ते, नोंदी आणि हॅश ही प्रस्तावित ट्रेसिबिलिटी मॉडेल स्पष्ट करण्यासाठी तयार केलेल्या प्रात्यक्षिक नोंदी आहेत."
      : "Audit events, actors, records and hashes shown here are demonstration records designed to illustrate the proposed traceability model.",

    secondaryRecord: isMarathi ? "नोंद:" : "Record:",
    hash: isMarathi ? "हॅश:" : "Hash:",
  };

  const roleLabels: Record<AuditRole, string> = {
    All: text.all,
    "Gov Official": text.govOfficial,
    Employer: text.employer,
    Provider: text.provider,
    Trainee: text.trainee,
  };

  const traceabilitySteps = [
    {
      number: "01",
      title: text.source,
      description: text.sourceText,
    },
    {
      number: "02",
      title: text.event,
      description: text.eventText,
    },
    {
      number: "03",
      title: text.verification,
      description: text.verificationText,
    },
    {
      number: "04",
      title: text.longitudinalRecord,
      description: text.longitudinalRecordText,
    },
    {
      number: "05",
      title: text.audit,
      description: text.auditText,
    },
  ];

  return (
    <section className="mt-8 pb-12">
      {/* Heading */}
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1d4f91]">
            {text.eyebrow}
          </p>

          <h2 className="mt-2 text-[25px] font-bold tracking-[-0.02em] text-[#17233a]">
            {text.title}
          </h2>

          <p className="mt-1 max-w-3xl text-[13px] leading-6 text-slate-500">
            {text.description}
          </p>
        </div>

        <span className="w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
          {text.prototypeDataset}
        </span>
      </div>

      {/* KPI cards */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[12px] font-semibold text-slate-500">
              {text.totalAuditEvents}
            </p>

            <FileText className="h-4 w-4 text-[#2f5f9f]" />
          </div>

          <p className="mt-4 text-[28px] font-semibold text-[#17233a]">
            {auditEvents.length}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            {text.demonstrationRecords}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[12px] font-semibold text-slate-500">
              {text.governmentActions}
            </p>

            <ShieldCheck className="h-4 w-4 text-[#2f5f9f]" />
          </div>

          <p className="mt-4 text-[28px] font-semibold text-[#17233a]">
            {governmentEvents}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            {text.governmentActivity}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[12px] font-semibold text-slate-500">
              {text.employerEvents}
            </p>

            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>

          <p className="mt-4 text-[28px] font-semibold text-[#17233a]">
            {employerEvents}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            {text.employmentVerification}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[12px] font-semibold text-slate-500">
              {text.traineeEvents}
            </p>

            <UserRound className="h-4 w-4 text-amber-600" />
          </div>

          <p className="mt-4 text-[28px] font-semibold text-[#17233a]">
            {traineeEvents}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            {text.selfReportedOutcomes}
          </p>
        </div>
      </div>

      {/* Audit activity */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h3 className="text-[16px] font-bold text-[#17233a]">
              {text.auditActivity}
            </h3>

            <p className="mt-1 text-[12px] text-slate-500">
              {text.auditActivityDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(
              [
                "All",
                "Gov Official",
                "Employer",
                "Provider",
                "Trainee",
              ] as AuditRole[]
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`rounded-md px-3 py-1.5 text-[10px] font-semibold transition ${
                  role === item
                    ? "bg-[#14304d] text-white"
                    : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                }`}
              >
                {roleLabels[item]}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={text.searchPlaceholder}
            className="w-full bg-transparent text-[12px] text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Desktop table */}
        <div className="mt-5 hidden overflow-hidden rounded-xl border border-slate-200 lg:block">
          <div className="grid grid-cols-[0.95fr_1.15fr_0.8fr_2fr_1.15fr_1fr] bg-slate-50 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
            <span>{text.date}</span>
            <span>{text.actor}</span>
            <span>{text.role}</span>
            <span>{text.auditEvent}</span>
            <span>{text.record}</span>
            <span>{text.eventHash}</span>
          </div>

          {filteredEvents.map((item) => (
            <div
              key={`${item.date}-${item.time}-${item.record}`}
              className="grid grid-cols-[0.95fr_1.15fr_0.8fr_2fr_1.15fr_1fr] items-center border-t border-slate-200 px-4 py-4"
            >
              <div>
                <p className="text-[11px] font-semibold text-[#17233a]">
                  {item.date}
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  {item.time}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-slate-50 p-2">
                  <EventIcon type={item.icon} />
                </div>

                <span className="text-[11px] font-semibold text-[#17233a]">
                  {item.actor}
                </span>
              </div>

              <span
                className={`w-fit rounded-md border px-2.5 py-1 text-[9px] font-semibold ${roleStyles[item.role]}`}
              >
                {roleLabels[item.role]}
              </span>

              <p className="pr-5 text-[11px] leading-5 text-slate-600">
                {item.event}
              </p>

              <p className="font-mono text-[10px] text-[#23558f]">
                {item.record}
              </p>

              <p className="font-mono text-[9px] text-slate-400">
                {item.hash}
              </p>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="border-t border-slate-200 px-4 py-10 text-center text-[12px] text-slate-500">
              {text.noAuditEvents}
            </div>
          )}
        </div>

        {/* Mobile cards */}
        <div className="mt-4 space-y-3 lg:hidden">
          {filteredEvents.map((item) => (
            <div
              key={`${item.date}-${item.time}-${item.record}`}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-slate-50 p-2">
                    <EventIcon type={item.icon} />
                  </div>

                  <div>
                    <p className="text-[12px] font-bold text-[#17233a]">
                      {item.actor}
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {item.date} · {item.time}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-md border px-2 py-1 text-[9px] font-semibold ${roleStyles[item.role]}`}
                >
                  {roleLabels[item.role]}
                </span>
              </div>

              <p className="mt-4 text-[11px] font-semibold leading-5 text-[#17233a]">
                {item.event}
              </p>

              <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3">
                <p className="text-[10px] text-slate-500">
                  <span className="font-semibold text-slate-700">
                    {text.secondaryRecord}
                  </span>{" "}
                  {item.record}
                </p>

                <p className="font-mono text-[9px] text-slate-400">
                  {text.hash} {item.hash}
                </p>
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="py-8 text-center text-[12px] text-slate-500">
              {text.noAuditEvents}
            </div>
          )}
        </div>
      </div>

      {/* Traceability model */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h3 className="text-[16px] font-bold text-[#17233a]">
            {text.traceabilityModel}
          </h3>

          <p className="mt-1 text-[12px] text-slate-500">
            {text.traceabilityDescription}
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {traceabilitySteps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-mono text-[10px] font-bold text-[#23558f]">
                  {step.number}
                </p>

                <h4 className="mt-3 text-[13px] font-bold text-[#17233a]">
                  {step.title}
                </h4>

                <p className="mt-2 text-[10px] leading-4 text-slate-500">
                  {step.description}
                </p>
              </div>

              {index < 4 && (
                <div className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-slate-300 bg-white md:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Activity summary */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />

            <h3 className="text-[15px] font-bold text-[#17233a]">
              {text.verificationActivity}
            </h3>
          </div>

          <p className="mt-3 text-[12px] leading-5 text-slate-500">
            {text.verificationActivityDescription}
          </p>

          <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
            <p className="text-[11px] font-semibold text-emerald-800">
              {text.employmentVerificationRecorded}
            </p>

            <p className="mt-1 text-[10px] leading-4 text-emerald-700">
              {text.employerConfirmation}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#2f5f9f]" />

            <h3 className="text-[15px] font-bold text-[#17233a]">
              {text.governmentReportingActivity}
            </h3>
          </div>

          <p className="mt-3 text-[12px] leading-5 text-slate-500">
            {text.governmentReportingDescription}
          </p>

          <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
            <p className="text-[11px] font-semibold text-blue-800">
              {text.districtReportExport}
            </p>

            <p className="mt-1 text-[10px] leading-4 text-blue-700">
              {text.puneReportExport}
            </p>
          </div>
        </div>
      </div>

      {/* Prototype notice */}
      <div className="mt-5 rounded-lg border border-[#dce5f0] bg-[#f8fbff] px-4 py-3">
        <p className="text-[11px] leading-5 text-slate-500">
          <span className="font-semibold text-[#173553]">
            {text.prototypeNotice}
          </span>{" "}
          {text.prototypeNoticeText}
        </p>
      </div>
    </section>
  );
}