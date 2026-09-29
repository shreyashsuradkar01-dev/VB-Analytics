"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Fingerprint,
  Search,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";
import { useLanguage } from "@/components/language-context";

type QualityMetric = {
  label: string;
  value: string;
  count: string;
  description: string;
};

type DuplicateCase = {
  primaryId: string;
  secondaryId: string;
  candidate: string;
  matchScore: string;
  reason: string;
  action: string;
};

const qualityMetrics: QualityMetric[] = [
  {
    label: "Missing Employment Records",
    value: "12.4%",
    count: "30,380",
    description: "Employment outcomes requiring follow-up",
  },
  {
    label: "Unverified Employer Claims",
    value: "7.2%",
    count: "8,712",
    description: "Employer-reported outcomes awaiting validation",
  },
  {
    label: "Cross-Scheme Duplicate Candidates",
    value: "1.8%",
    count: "4,410",
    description: "Potential duplicate identities across schemes",
  },
  {
    label: "Outdated Mobile / Contact Info",
    value: "9.4%",
    count: "23,030",
    description: "Records requiring contact refresh",
  },
];

const duplicateCases: DuplicateCase[] = [
  {
    primaryId: "VB-10452",
    secondaryId: "VB-09941",
    candidate: "Rahul S. Shinde",
    matchScore: "98.4%",
    reason:
      "Same Aadhaar vault hash, duplicate enrollment in MSSDS (2025) and PMKVY (2026).",
    action: "Pending Merge",
  },
  {
    primaryId: "VB-12104",
    secondaryId: "VB-18820",
    candidate: "Anita Mohan Jadhav",
    matchScore: "94.1%",
    reason:
      "Identical phone hash & mother name, concurrent stipend claim in CMEGP & MSSDS.",
    action: "Pending Merge",
  },
];

export default function DataQuality() {
  const { language } = useLanguage();
  const isMarathi = language === "mr";

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Pending Merge">("All");
  const [scanComplete, setScanComplete] = useState(false);

  const filteredCases = useMemo(() => {
    const query = search.trim().toLowerCase();

    return duplicateCases.filter((item) => {
      const matchesSearch =
        !query ||
        [
          item.primaryId,
          item.secondaryId,
          item.candidate,
          item.matchScore,
          item.reason,
          item.action,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        filter === "All" || item.action === "Pending Merge";

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const text = {
    eyebrow: isMarathi ? "डेटा अखंडता" : "Data Integrity",
    title: isMarathi
      ? "डेटा गुणवत्ता आणि ओळख सातत्य"
      : "Data Quality & Identity Continuity",
    description: isMarathi
      ? "डेटा पूर्णता, ओळख सातत्य, पडताळणी स्थिती आणि आढळलेल्या डेटा-गुणवत्ता समस्यांचे निरीक्षण करा."
      : "Monitor repository completeness, identity continuity, verification status and detected data-quality issues.",
    prototypeDataset: isMarathi ? "प्रोटोटाइप डेटासेट" : "Prototype Dataset",

    missingEmployment: isMarathi
      ? "गहाळ रोजगार नोंदी"
      : "Missing Employment Records",
    missingEmploymentDescription: isMarathi
      ? "पुढील पडताळणी आवश्यक असलेले रोजगार परिणाम"
      : "Employment outcomes requiring follow-up",

    unverifiedEmployer: isMarathi
      ? "अपडताळलेले नियोक्ता दावे"
      : "Unverified Employer Claims",
    unverifiedEmployerDescription: isMarathi
      ? "पडताळणीची प्रतीक्षा असलेले नियोक्ता-नोंदवलेले परिणाम"
      : "Employer-reported outcomes awaiting validation",

    duplicateCandidates: isMarathi
      ? "योजना-आधारित डुप्लिकेट उमेदवार"
      : "Cross-Scheme Duplicate Candidates",
    duplicateCandidatesDescription: isMarathi
      ? "विविध योजनांमधील संभाव्य डुप्लिकेट ओळखी"
      : "Potential duplicate identities across schemes",

    outdatedContact: isMarathi
      ? "जुनी मोबाईल / संपर्क माहिती"
      : "Outdated Mobile / Contact Info",
    outdatedContactDescription: isMarathi
      ? "संपर्क माहिती अद्ययावत करणे आवश्यक असलेल्या नोंदी"
      : "Records requiring contact refresh",

    records: isMarathi ? "नोंदी" : "records",

    repositoryHealth: isMarathi ? "रिपॉझिटरी आरोग्य" : "Repository Health",
    netVerifiedHealth: isMarathi
      ? "निव्वळ पडताळलेल्या रिपॉझिटरीचे आरोग्य"
      : "Net verified repository health",
    verifiedUsable: isMarathi
      ? "पडताळलेल्या / वापरण्यायोग्य नोंदी"
      : "Verified / usable records",

    integrityScan: isMarathi
      ? "डेटा अखंडता स्कॅन"
      : "Data Integrity Scan",
    integrityDescription: isMarathi
      ? "डुप्लिकेट ओळखी आणि दीर्घकालीन नोंदीतील विसंगतींसाठी प्रात्यक्षिक स्कॅन चालवा."
      : "Run a demonstration scan for duplicate identities and longitudinal record anomalies.",
    runScan: isMarathi
      ? "अखंडता स्कॅन चालवा"
      : "Run Integrity Scan",
    scanComplete: isMarathi ? "स्कॅन पूर्ण" : "Scan Complete",
    scanCompletedMessage: isMarathi
      ? "प्रात्यक्षिक स्कॅन पूर्ण झाला. 2 संभाव्य डुप्लिकेट ओळख नोंदींचे पुनरावलोकन आवश्यक आहे."
      : "Demonstration scan completed. 2 potential duplicate identity records require review.",

    identityContinuity: isMarathi
      ? "ओळख सातत्य"
      : "Identity Continuity",
    identityDescription: isMarathi
      ? "संपूर्ण कौशल्य-विकास प्रवासात दीर्घकालीन परिणाम नोंद कायम ठेवा."
      : "Maintain a longitudinal outcome record across the full skilling journey.",

    trainee: isMarathi ? "प्रशिक्षणार्थी" : "Trainee",
    consentIdentity: isMarathi ? "संमती आणि ओळख" : "Consent & identity",

    training: isMarathi ? "प्रशिक्षण" : "Training",
    enrollmentAttendance: isMarathi
      ? "नोंदणी आणि उपस्थिती"
      : "Enrollment & attendance",

    certification: isMarathi ? "प्रमाणपत्र" : "Certification",
    assessmentOutcome: isMarathi
      ? "मूल्यांकन परिणाम"
      : "Assessment outcome",

    employment: isMarathi ? "रोजगार" : "Employment",
    placementSignal: isMarathi ? "नियुक्ती संकेत" : "Placement signal",

    retention: isMarathi ? "रोजगार टिकाव" : "Retention",
    retentionOutcome: isMarathi
      ? "६ / १२ महिन्यांचा परिणाम"
      : "6 / 12 month outcome",

    duplicateReview: isMarathi
      ? "डुप्लिकेट ओळख आणि विसंगती पुनरावलोकन"
      : "Duplicate Identity & Anomaly Review",
    duplicateDescription: isMarathi
      ? "ओळख जुळणी संकेतांद्वारे आढळलेले संभाव्य योजना-आधारित डुप्लिकेट उमेदवार."
      : "Potential cross-scheme duplicate candidates detected by identity matching signals.",

    all: isMarathi ? "सर्व" : "All",
    pendingMerge: isMarathi ? "विलिनीकरण प्रलंबित" : "Pending Merge",

    searchPlaceholder: isMarathi
      ? "उमेदवार, ID, जुळणी गुण किंवा कारण शोधा..."
      : "Search candidate, ID, match score or reason...",

    candidateIds: isMarathi ? "उमेदवार IDs" : "Candidate IDs",
    candidate: isMarathi ? "उमेदवार" : "Candidate",
    match: isMarathi ? "जुळणी" : "Match",
    detectionReason: isMarathi ? "शोधण्याचे कारण" : "Detection Reason",
    action: isMarathi ? "कृती" : "Action",

    noMatchingCases: isMarathi
      ? "जुळणाऱ्या ओळख नोंदी आढळल्या नाहीत."
      : "No matching identity cases found.",

    secondaryId: isMarathi ? "दुय्यम ID:" : "Secondary ID:",
    reason: isMarathi ? "कारण:" : "Reason:",

    multiSourceVerification: isMarathi
      ? "बहु-स्रोत परिणाम पडताळणी"
      : "Multi-Source Outcome Verification",
    multiSourceDescription: isMarathi
      ? "एकाच स्वयं-अहवालावर अवलंबून न राहता अनेक संमती-आधारित स्रोतांमधील परिणाम नोंदींची पडताळणी आणि ताळमेळ साधता येतो."
      : "Outcome records can be reconciled across multiple consented sources rather than relying on a single self-report.",

    traineeOutcome: isMarathi
      ? "स्वयं-नोंदवलेला रोजगार आणि टिकावाचा परिणाम."
      : "Self-reported employment and retention outcome.",

    provider: isMarathi ? "प्रशिक्षण संस्था" : "Training Provider",
    providerOutcome: isMarathi
      ? "प्रमाणपत्र, प्रशिक्षण पूर्णता आणि नियुक्ती संकेत."
      : "Certification, completion and placement signals.",

    employer: isMarathi ? "नियोक्ता" : "Employer",
    employerOutcome: isMarathi
      ? "रोजगार, रुजू होण्याची तारीख, भूमिका आणि वेतन पडताळणी."
      : "Employment, joining date, role and wage validation.",

    government: isMarathi ? "शासन" : "Government",
    governmentOutcome: isMarathi
      ? "ताळमेळ, निरीक्षण आणि एकत्रित बुद्धिमत्ता."
      : "Reconciliation, monitoring and aggregate intelligence.",

    prototypeNotice: isMarathi ? "प्रोटोटाइप सूचना:" : "Prototype notice:",
    prototypeNoticeText: isMarathi
      ? "येथे दर्शविलेली ओळख जुळणी, पडताळणी संकेत आणि रिपॉझिटरी आरोग्य ही प्रस्तावित डेटा-गुणवत्ता कार्यप्रवाह स्पष्ट करण्यासाठी तयार केलेल्या प्रात्यक्षिक नोंदी आहेत."
      : "Identity matching, verification signals and repository health shown here are demonstration records designed to illustrate the proposed data-quality workflow.",
  };

  const metricLabels = [
    {
      label: text.missingEmployment,
      value: "12.4%",
      count: "30,380",
      description: text.missingEmploymentDescription,
    },
    {
      label: text.unverifiedEmployer,
      value: "7.2%",
      count: "8,712",
      description: text.unverifiedEmployerDescription,
    },
    {
      label: text.duplicateCandidates,
      value: "1.8%",
      count: "4,410",
      description: text.duplicateCandidatesDescription,
    },
    {
      label: text.outdatedContact,
      value: "9.4%",
      count: "23,030",
      description: text.outdatedContactDescription,
    },
  ];

  const continuitySteps = [
    {
      title: text.trainee,
      text: text.consentIdentity,
    },
    {
      title: text.training,
      text: text.enrollmentAttendance,
    },
    {
      title: text.certification,
      text: text.assessmentOutcome,
    },
    {
      title: text.employment,
      text: text.placementSignal,
    },
    {
      title: text.retention,
      text: text.retentionOutcome,
    },
  ];

  const verificationSources = [
    {
      title: text.trainee,
      text: text.traineeOutcome,
      icon: Users,
    },
    {
      title: text.provider,
      text: text.providerOutcome,
      icon: CheckCircle2,
    },
    {
      title: text.employer,
      text: text.employerOutcome,
      icon: UserRoundCheck,
    },
    {
      title: text.government,
      text: text.governmentOutcome,
      icon: ShieldCheck,
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
        {metricLabels.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="max-w-[190px] text-[12px] font-semibold leading-5 text-slate-500">
                {metric.label}
              </p>

              <AlertTriangle className="h-4 w-4 shrink-0 text-[#c47716]" />
            </div>

            <p className="mt-4 text-[28px] font-semibold text-[#17233a]">
              {metric.value}
            </p>

            <p className="mt-1 text-[11px] font-medium text-slate-500">
              {metric.count} {text.records}
            </p>

            <p className="mt-2 text-[10px] leading-4 text-slate-400">
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      {/* Repository health + scan */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.35fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6d87a7]">
                {text.repositoryHealth}
              </p>

              <p className="mt-3 text-[42px] font-semibold tracking-[-0.04em] text-[#17233a]">
                91.6%
              </p>

              <p className="mt-1 text-[12px] text-slate-500">
                {text.netVerifiedHealth}
              </p>
            </div>

            <div className="rounded-full bg-emerald-50 p-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: "91.6%" }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
            <span>{text.verifiedUsable}</span>
            <span>91.6%</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-[#17233a]">
                {text.integrityScan}
              </h3>

              <p className="mt-1 text-[12px] leading-5 text-slate-500">
                {text.integrityDescription}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setScanComplete(true)}
              className="inline-flex w-fit items-center gap-2 rounded-md bg-[#14304d] px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-[#0f263d]"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {scanComplete ? text.scanComplete : text.runScan}
            </button>
          </div>

          {scanComplete && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />

              <p className="text-[11px] leading-5 text-emerald-800">
                {text.scanCompletedMessage}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Identity continuity */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h3 className="text-[16px] font-bold text-[#17233a]">
            {text.identityContinuity}
          </h3>

          <p className="mt-1 text-[12px] text-slate-500">
            {text.identityDescription}
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {continuitySteps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-white p-2 shadow-sm">
                    {index === 0 ? (
                      <Fingerprint className="h-4 w-4 text-[#2f5f9f]" />
                    ) : index === 4 ? (
                      <UserRoundCheck className="h-4 w-4 text-[#2f5f9f]" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-[#2f5f9f]" />
                    )}
                  </div>

                  <span className="text-[13px] font-bold text-[#17233a]">
                    {step.title}
                  </span>
                </div>

                <p className="mt-3 text-[10px] leading-4 text-slate-500">
                  {step.text}
                </p>
              </div>

              {index < 4 && (
                <div className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-slate-300 bg-white md:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Duplicate identity section */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-[16px] font-bold text-[#17233a]">
              {text.duplicateReview}
            </h3>

            <p className="mt-1 text-[12px] text-slate-500">
              {text.duplicateDescription}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter("All")}
              className={`rounded-md px-3 py-1.5 text-[10px] font-semibold ${
                filter === "All"
                  ? "bg-[#14304d] text-white"
                  : "border border-slate-200 bg-white text-slate-500"
              }`}
            >
              {text.all}
            </button>

            <button
              type="button"
              onClick={() => setFilter("Pending Merge")}
              className={`rounded-md px-3 py-1.5 text-[10px] font-semibold ${
                filter === "Pending Merge"
                  ? "bg-[#14304d] text-white"
                  : "border border-slate-200 bg-white text-slate-500"
              }`}
            >
              {text.pendingMerge}
            </button>
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
        <div className="mt-5 hidden overflow-hidden rounded-xl border border-slate-200 md:block">
          <div className="grid grid-cols-[1.05fr_1.15fr_0.8fr_1.7fr_0.8fr] bg-slate-50 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
            <span>{text.candidateIds}</span>
            <span>{text.candidate}</span>
            <span>{text.match}</span>
            <span>{text.detectionReason}</span>
            <span>{text.action}</span>
          </div>

          {filteredCases.map((item) => (
            <div
              key={`${item.primaryId}-${item.secondaryId}`}
              className="grid grid-cols-[1.05fr_1.15fr_0.8fr_1.7fr_0.8fr] items-center border-t border-slate-200 px-4 py-4"
            >
              <div>
                <p className="font-mono text-[10px] font-semibold text-[#23558f]">
                  {item.primaryId}
                </p>
                <p className="mt-1 font-mono text-[10px] text-slate-400">
                  {item.secondaryId}
                </p>
              </div>

              <p className="text-[11px] font-semibold text-[#17233a]">
                {item.candidate}
              </p>

              <div>
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                  {item.matchScore}
                </span>
              </div>

              <p className="pr-5 text-[10px] leading-4 text-slate-500">
                {item.reason}
              </p>

              <span className="w-fit rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-[9px] font-semibold text-amber-700">
                {isMarathi ? "विलिनीकरण प्रलंबित" : item.action}
              </span>
            </div>
          ))}

          {filteredCases.length === 0 && (
            <div className="border-t border-slate-200 px-4 py-10 text-center text-[12px] text-slate-500">
              {text.noMatchingCases}
            </div>
          )}
        </div>

        {/* Mobile cards */}
        <div className="mt-4 space-y-3 md:hidden">
          {filteredCases.map((item) => (
            <div
              key={`${item.primaryId}-${item.secondaryId}`}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] font-semibold text-[#23558f]">
                    {item.primaryId}
                  </p>

                  <p className="mt-1 text-[12px] font-bold text-[#17233a]">
                    {item.candidate}
                  </p>
                </div>

                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-semibold text-amber-700">
                  {item.matchScore}
                </span>
              </div>

              <p className="mt-3 text-[10px] leading-4 text-slate-500">
                <span className="font-semibold text-slate-700">
                  {text.secondaryId}
                </span>{" "}
                {item.secondaryId}
              </p>

              <p className="mt-2 text-[10px] leading-4 text-slate-500">
                <span className="font-semibold text-slate-700">
                  {text.reason}
                </span>{" "}
                {item.reason}
              </p>

              <span className="mt-3 inline-flex rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-[9px] font-semibold text-amber-700">
                {isMarathi ? "विलिनीकरण प्रलंबित" : item.action}
              </span>
            </div>
          ))}

          {filteredCases.length === 0 && (
            <div className="py-8 text-center text-[12px] text-slate-500">
              {text.noMatchingCases}
            </div>
          )}
        </div>
      </div>

      {/* Verification source model */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h3 className="text-[16px] font-bold text-[#17233a]">
            {text.multiSourceVerification}
          </h3>

          <p className="mt-1 text-[12px] text-slate-500">
            {text.multiSourceDescription}
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {verificationSources.map((source, index) => {
            const Icon = source.icon;

            return (
              <div
                key={source.title}
                className="relative rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-white p-2 shadow-sm">
                    <Icon className="h-4 w-4 text-[#2f5f9f]" />
                  </div>

                  <p className="text-[13px] font-bold text-[#17233a]">
                    {source.title}
                  </p>
                </div>

                <p className="mt-3 text-[10px] leading-4 text-slate-500">
                  {source.text}
                </p>

                {index < 3 && (
                  <div className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-slate-300 bg-white md:block" />
                )}
              </div>
            );
          })}
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