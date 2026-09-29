"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Plus,
  Search,
  Target,
} from "lucide-react";
import { useLanguage } from "@/components/language-context";

type RecommendationStatus =
  | "In Progress"
  | "Approved"
  | "Under Review"
  | "New";

type RecommendationType =
  | "High Impact"
  | "Curriculum"
  | "Retention"
  | "Regional";

type Recommendation = {
  id: string;
  title: string;
  type: RecommendationType;
  status: RecommendationStatus;
  evidence: string;
  authority: string;
  recommendationType: string;
  action: string;
};

const recommendations: Recommendation[] = [
  {
    id: "REC-01",
    title: "Direct Expansion of Cloud & Linux Capacity",
    type: "High Impact",
    status: "In Progress",
    evidence:
      "High employer demand (8,500) vs certified supply (2,100). Deficit of 6,400 skilled personnel in Pune & MMR clusters.",
    authority: "Joint Director (Technical Skilling)",
    recommendationType: "Capacity Expansion",
    action:
      "Expand cloud and Linux training capacity in high-demand Pune and MMR clusters.",
  },
  {
    id: "REC-02",
    title:
      "Curriculum Revamp: Sunset Basic DTP, Launch Generative Automation",
    type: "Curriculum",
    status: "Approved",
    evidence:
      "Desktop Publishing shows 4,200 candidate surplus with <28% placement outcome.",
    authority: "Curriculum Review Board (MSSDS)",
    recommendationType: "Curriculum",
    action:
      "Review low-demand curriculum capacity and introduce generative automation-oriented training.",
  },
  {
    id: "REC-03",
    title: "Mandatory Industry Stipend Floor for Urban Relocation",
    type: "Retention",
    status: "Under Review",
    evidence:
      "Non-placement survey indicates 28.6% attrition due to sub-subsistence urban wages (₹12,000/mo in MMR/Pune).",
    authority: "Labour & Industry Liaison Bureau",
    recommendationType: "Retention",
    action:
      "Review a minimum industry stipend floor for trainees relocating to higher-cost urban employment clusters.",
  },
  {
    id: "REC-04",
    title: "Targeted District Interventions for Solapur & Sambhajinagar",
    type: "Regional",
    status: "New",
    evidence:
      "Employment rates lag statewide average by >11 percentage points due to lack of local anchor employers.",
    authority: "District Skill Development Committees",
    recommendationType: "Regional",
    action:
      "Develop district-specific employer partnerships and targeted interventions for local placement opportunities.",
  },
];

const statusStyles: Record<RecommendationStatus, string> = {
  "In Progress": "border-blue-200 bg-blue-50 text-blue-700",
  Approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Under Review": "border-amber-200 bg-amber-50 text-amber-700",
  New: "border-slate-200 bg-slate-100 text-slate-700",
};

const typeStyles: Record<RecommendationType, string> = {
  "High Impact": "bg-blue-50 text-blue-700",
  Curriculum: "bg-slate-100 text-slate-700",
  Retention: "bg-amber-50 text-amber-700",
  Regional: "bg-violet-50 text-violet-700",
};

const statusLabels: Record<
  RecommendationStatus,
  { en: string; mr: string }
> = {
  "In Progress": {
    en: "In Progress",
    mr: "प्रगतीपथावर",
  },
  Approved: {
    en: "Approved",
    mr: "मंजूर",
  },
  "Under Review": {
    en: "Under Review",
    mr: "पुनरावलोकनाधीन",
  },
  New: {
    en: "New",
    mr: "नवीन",
  },
};

const typeLabels: Record<RecommendationType, { en: string; mr: string }> = {
  "High Impact": {
    en: "High Impact",
    mr: "उच्च प्रभाव",
  },
  Curriculum: {
    en: "Curriculum",
    mr: "अभ्यासक्रम",
  },
  Retention: {
    en: "Retention",
    mr: "टिकाव",
  },
  Regional: {
    en: "Regional",
    mr: "प्रादेशिक",
  },
};

export default function PolicyRecommendations() {
  const { language, t } = useLanguage();

  const isMarathi = language === "mr";

  const [selectedId, setSelectedId] = useState("REC-03");
  const [search, setSearch] = useState("");

  const filteredRecommendations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return recommendations;
    }

    return recommendations.filter((item) =>
      [
        item.id,
        item.title,
        item.type,
        item.status,
        item.evidence,
        item.authority,
        item.recommendationType,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  const selected =
    recommendations.find((item) => item.id === selectedId) ??
    filteredRecommendations[0] ??
    recommendations[0];

  const inProgress = recommendations.filter(
    (item) => item.status === "In Progress",
  ).length;

  const approved = recommendations.filter(
    (item) => item.status === "Approved",
  ).length;

  const underReview = recommendations.filter(
    (item) => item.status === "Under Review",
  ).length;

  const newRecommendations = recommendations.filter(
    (item) => item.status === "New",
  ).length;

  const getStatusLabel = (status: RecommendationStatus) =>
    isMarathi ? statusLabels[status].mr : statusLabels[status].en;

  const getTypeLabel = (type: RecommendationType) =>
    isMarathi ? typeLabels[type].mr : typeLabels[type].en;

  const labels = {
    eyebrow: isMarathi ? "निर्णय सहाय्य" : "Decision Support",
    title: isMarathi ? "धोरणात्मक शिफारसी" : "Policy Recommendations",
    description: isMarathi
      ? "रोजगार, कौशल्य-अंतर, रोजगार टिकाव आणि जिल्हानिहाय संकेतांचे परीक्षण करून पुनरावलोकनासाठी हस्तक्षेप क्षेत्रे निश्चित करा."
      : "Convert employment, skill-gap, retention and district signals into traceable intervention areas for review.",
    prototypeDataset: isMarathi ? "प्रोटोटाइप डेटासेट" : "Prototype Dataset",

    inProgress: isMarathi ? "प्रगतीपथावर" : "In Progress",
    activeRecommendation: isMarathi
      ? "सक्रिय शिफारस"
      : "Active recommendation",

    approved: isMarathi ? "मंजूर" : "Approved",
    approvedIntervention: isMarathi
      ? "मंजूर हस्तक्षेप"
      : "Approved intervention",

    underReview: isMarathi ? "पुनरावलोकनाधीन" : "Under Review",
    awaitingReview: isMarathi ? "पुनरावलोकनाची प्रतीक्षा" : "Awaiting review",

    new: isMarathi ? "नवीन" : "New",
    newInterventionArea: isMarathi
      ? "नवीन हस्तक्षेप क्षेत्र"
      : "New intervention area",

    searchPlaceholder: isMarathi
      ? "शिफारसी, कारणे, जबाबदार अधिकारी शोधा..."
      : "Search recommendations, reasons, assignees...",

    trackerTitle: isMarathi
      ? "धोरण शिफारस व कृती ट्रॅकर"
      : "Policy Recommendation & Action Tracker",

    trackerDescription: isMarathi
      ? "पडताळलेल्या कौशल्य-विकास डेटावर आधारित पुराव्याशी जोडलेल्या धोरणात्मक शिफारसी."
      : "Evidence-linked strategic recommendations derived from verified skilling telemetry.",

    draftIntervention: isMarathi
      ? "हस्तक्षेप मसुदा तयार करा"
      : "Draft Intervention",

    evidence: isMarathi ? "पुरावा" : "Evidence",
    assigned: isMarathi ? "जबाबदारी:" : "Assigned:",
    approve: isMarathi ? "मंजूर करा" : "Approve",
    track: isMarathi ? "ट्रॅक करा" : "Track",

    noRecommendations: isMarathi
      ? "तुमच्या शोधाशी जुळणाऱ्या शिफारसी आढळल्या नाहीत."
      : "No recommendations match your search.",

    registerTitle: isMarathi
      ? "हस्तक्षेप शिफारस नोंदणी"
      : "Intervention Recommendation Register",

    registerDescription: isMarathi
      ? "प्रत्येक शिफारस प्रोटोटाइप डेटासेटमधील दस्तऐवजीकृत परिणाम संकेताशी जोडलेली आहे."
      : "Each recommendation is linked to a documented outcome signal in the prototype dataset.",

    evidenceTrigger: isMarathi
      ? "पुरावा / ट्रिगर"
      : "Evidence / Trigger",

    assignedAuthority: isMarathi
      ? "जबाबदार प्राधिकरण"
      : "Assigned Authority",

    recommendationType: isMarathi
      ? "शिफारसीचा प्रकार"
      : "Recommendation Type",

    proposedAction: isMarathi
      ? "प्रस्तावित कृती"
      : "Proposed Action",

    decisionTrail: isMarathi
      ? "निर्णयाचा मागोवा"
      : "Decision Trail",

    signalDetected: isMarathi ? "संकेत आढळला" : "Signal detected",
    signalDetectedText: isMarathi
      ? "परिणाम बुद्धिमत्ता हस्तक्षेपाचे क्षेत्र ओळखते."
      : "Outcome intelligence identifies an intervention area.",

    recommendationGenerated: isMarathi
      ? "शिफारस तयार झाली"
      : "Recommendation generated",

    recommendationGeneratedText: isMarathi
      ? "संकेताचे दस्तऐवजीकृत धोरणात्मक कृतीत रूपांतर केले जाते."
      : "The signal is translated into a documented policy action.",

    authorityReview: isMarathi
      ? "प्राधिकरण पुनरावलोकन"
      : "Authority review",

    authorityReviewText: isMarathi
      ? "जबाबदार प्राधिकरण व्यवहार्यता आणि पुराव्याचे पुनरावलोकन करते."
      : "Assigned authority reviews feasibility and evidence.",

    implementationTracking: isMarathi
      ? "अंमलबजावणी ट्रॅकिंग"
      : "Implementation tracking",

    implementationTrackingText: isMarathi
      ? "शिफारस नोंदणीद्वारे स्थितीचा मागोवा घेता येतो."
      : "Status can be followed through the recommendation register.",

    pipelineTitle: isMarathi
      ? "पुराव्यापासून कृतीपर्यंतचा प्रवाह"
      : "Evidence-to-Action Pipeline",

    pipelineDescription: isMarathi
      ? "VB Analytics दीर्घकालीन परिणाम संकेतांचे रूपांतर ट्रेस करण्यायोग्य धोरणात्मक कार्यप्रवाहात कसे करते."
      : "How VB Analytics converts longitudinal outcome signals into a traceable policy workflow.",

    detect: isMarathi ? "ओळखा" : "Detect",
    detectText: isMarathi
      ? "मोजता येणारा रोजगार, कौशल्य किंवा टिकावाचा संकेत ओळखा."
      : "Identify a measurable employment, skill or retention signal.",

    diagnose: isMarathi ? "निदान करा" : "Diagnose",
    diagnoseText: isMarathi
      ? "संकेताला जिल्हा, समूह, कार्यक्रम किंवा कौशल्य-अंतराच्या डेटाशी जोडा."
      : "Connect the signal to district, cohort, program or skill-gap data.",

    recommend: isMarathi ? "शिफारस करा" : "Recommend",
    recommendText: isMarathi
      ? "जबाबदार प्राधिकरणासह दस्तऐवजीकृत हस्तक्षेप तयार करा."
      : "Create a documented intervention with an accountable authority.",

    trackPipeline: isMarathi ? "मागोवा घ्या" : "Track",
    trackText: isMarathi
      ? "अंमलबजावणी पुनरावलोकनासाठी शिफारसीची स्थिती कायम ठेवा."
      : "Maintain recommendation status for implementation review.",

    prototypeNotice: isMarathi ? "प्रोटोटाइप सूचना:" : "Prototype notice:",
    prototypeNoticeText: isMarathi
      ? "येथे दर्शविलेल्या शिफारसी प्रात्यक्षिक नोंदी आहेत. VB Analytics परिणाम बुद्धिमत्तेचे ट्रेस करण्यायोग्य हस्तक्षेप कार्यप्रवाहात रूपांतर कसे करू शकते हे दाखवण्यासाठी त्यांची रचना करण्यात आली आहे."
      : "Recommendations shown here are demonstration records designed to illustrate how VB Analytics can translate outcome intelligence into traceable intervention workflows.",
  };

  return (
    <section className="mt-8 pb-12">
      {/* Page heading */}
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1d4f91]">
            {labels.eyebrow}
          </p>

          <h2 className="mt-2 text-[25px] font-bold tracking-[-0.02em] text-[#17233a]">
            {labels.title}
          </h2>

          <p className="mt-1 max-w-3xl text-[13px] leading-6 text-slate-500">
            {labels.description}
          </p>
        </div>

        <span className="w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
          {labels.prototypeDataset}
        </span>
      </div>

      {/* KPI cards */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[12px] font-semibold text-slate-500">
              {labels.inProgress}
            </p>
            <Target className="h-4 w-4 text-[#2f5f9f]" />
          </div>

          <p className="mt-4 text-[28px] font-semibold text-[#17233a]">
            {inProgress}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            {labels.activeRecommendation}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[12px] font-semibold text-slate-500">
              {labels.approved}
            </p>
            <CheckCircle2 className="h-4 w-4 text-[#2f5f9f]" />
          </div>

          <p className="mt-4 text-[28px] font-semibold text-[#17233a]">
            {approved}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            {labels.approvedIntervention}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[12px] font-semibold text-slate-500">
              {labels.underReview}
            </p>
            <Clock3 className="h-4 w-4 text-[#2f5f9f]" />
          </div>

          <p className="mt-4 text-[28px] font-semibold text-[#17233a]">
            {underReview}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            {labels.awaitingReview}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[12px] font-semibold text-slate-500">
              {labels.new}
            </p>
            <Target className="h-4 w-4 text-[#2f5f9f]" />
          </div>

          <p className="mt-4 text-[28px] font-semibold text-[#17233a]">
            {newRecommendations}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            {labels.newInterventionArea}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full bg-transparent text-[12px] text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* HTML-style recommendation cards */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-1 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-[16px] font-bold text-[#17233a]">
              {labels.trackerTitle}
            </h3>

            <p className="mt-1 text-[12px] text-slate-500">
              {labels.trackerDescription}
            </p>
          </div>

          <button
            type="button"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-md bg-[#14304d] px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-[#0f263d] md:mt-0"
          >
            <Plus className="h-3.5 w-3.5" />
            {labels.draftIntervention}
          </button>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {filteredRecommendations.map((item) => {
            const active = selected?.id === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`group text-left rounded-xl border p-5 transition ${
                  active
                    ? "border-[#9bb9df] bg-[#f8fbff] shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-md bg-[#e8eef5] px-2.5 py-1 font-mono text-[10px] font-bold tracking-wide text-[#173553]">
                    {item.id}
                  </span>

                  <span
                    className={`rounded-md border px-2.5 py-1 text-[10px] font-semibold ${statusStyles[item.status]}`}
                  >
                    {getStatusLabel(item.status)}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-[14px] font-bold leading-5 text-[#17233a]">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-[12px] leading-5 text-slate-600">
                    <span className="font-semibold">{labels.evidence}:</span>{" "}
                    {item.evidence}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[11px] text-slate-500">
                    {labels.assigned}{" "}
                    <span className="font-semibold text-[#17233a]">
                      {item.authority}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#059669] px-3 py-1.5 text-[10px] font-semibold text-white">
                      {labels.approve}
                    </span>

                    <span className="rounded-md bg-[#253d59] px-3 py-1.5 text-[10px] font-semibold text-white">
                      {labels.track}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="py-12 text-center text-[13px] text-slate-500">
            {labels.noRecommendations}
          </div>
        )}
      </div>

      {/* Selected recommendation detail */}
      {selected && (
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          {/* Register */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-[16px] font-bold text-[#17233a]">
                {labels.registerTitle}
              </h3>

              <p className="mt-1 text-[12px] text-slate-500">
                {labels.registerDescription}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {filteredRecommendations.map((item) => {
                const active = selected.id === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-[#9bb9df] bg-[#f7faff]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-semibold text-[#23558f]">
                          {item.id}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${typeStyles[item.type]}`}
                        >
                          {getTypeLabel(item.type)}
                        </span>
                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold ${statusStyles[item.status]}`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </div>

                    <h4 className="mt-3 text-[14px] font-bold text-[#17233a]">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {item.evidence}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-semibold text-[#23558f]">
                  {selected.id}
                </p>

                <h3 className="mt-2 text-[20px] font-bold leading-7 text-[#17233a]">
                  {selected.title}
                </h3>
              </div>

              <span
                className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-semibold ${statusStyles[selected.status]}`}
              >
                {getStatusLabel(selected.status)}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6d87a7]">
                  <FileCheck2 className="h-4 w-4" />
                  {labels.evidenceTrigger}
                </div>

                <p className="mt-3 text-[12px] leading-5 text-slate-600">
                  {selected.evidence}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6d87a7]">
                  <FileCheck2 className="h-4 w-4" />
                  {labels.assignedAuthority}
                </div>

                <p className="mt-3 text-[12px] text-slate-600">
                  {selected.authority}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6d87a7]">
                  <Target className="h-4 w-4" />
                  {labels.recommendationType}
                </div>

                <p className="mt-3 text-[12px] text-slate-600">
                  {selected.recommendationType}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#f7faff] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6d87a7]">
                  {labels.proposedAction}
                </p>

                <p className="mt-3 text-[12px] leading-5 text-slate-600">
                  {selected.action}
                </p>
              </div>
            </div>

            {/* Decision trail */}
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6d87a7]">
                {labels.decisionTrail}
              </p>

              <div className="mt-4 space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#35639a]" />
                  <div>
                    <p className="text-[12px] font-semibold text-[#17233a]">
                      {labels.signalDetected}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {labels.signalDetectedText}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#35639a]" />
                  <div>
                    <p className="text-[12px] font-semibold text-[#17233a]">
                      {labels.recommendationGenerated}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {labels.recommendationGeneratedText}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#35639a]" />
                  <div>
                    <p className="text-[12px] font-semibold text-[#17233a]">
                      {labels.authorityReview}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {labels.authorityReviewText}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-300" />
                  <div>
                    <p className="text-[12px] font-semibold text-slate-400">
                      {labels.implementationTracking}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {labels.implementationTrackingText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Evidence-to-action pipeline */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h3 className="text-[16px] font-bold text-[#17233a]">
            {labels.pipelineTitle}
          </h3>

          <p className="mt-1 text-[12px] text-slate-500">
            {labels.pipelineDescription}
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              number: "01",
              title: labels.detect,
              text: labels.detectText,
            },
            {
              number: "02",
              title: labels.diagnose,
              text: labels.diagnoseText,
            },
            {
              number: "03",
              title: labels.recommend,
              text: labels.recommendText,
            },
            {
              number: "04",
              title: labels.trackPipeline,
              text: labels.trackText,
            },
          ].map((step, index) => (
            <div
              key={step.number}
              className="relative rounded-xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="font-mono text-[11px] font-bold text-[#23558f]">
                {step.number}
              </p>

              <h4 className="mt-3 text-[15px] font-bold text-[#17233a]">
                {step.title}
              </h4>

              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                {step.text}
              </p>

              {index < 3 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 bg-white text-slate-300 xl:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prototype notice */}
      <div className="mt-5 rounded-lg border border-[#dce5f0] bg-[#f8fbff] px-4 py-3">
        <p className="text-[11px] leading-5 text-slate-500">
          <span className="font-semibold text-[#173553]">
            {labels.prototypeNotice}
          </span>{" "}
          {labels.prototypeNoticeText}
        </p>
      </div>
    </section>
  );
}