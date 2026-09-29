"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  GraduationCap,
  IndianRupee,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { useLanguage } from "@/components/language-context";

type Lang = "en" | "mr";

const copy = {
  en: {
    title: "Training Provider Dashboard",
    subtitle: "Monitor training delivery, certification, placement and employment outcomes.",
    prototype: "SIH 2026 Prototype",
    overview: "Provider Overview",
    overviewSub: "Outcome intelligence for your active training batches",
    activeTrainees: "Active Trainees",
    completed: "Training Completed",
    certified: "Certified",
    placed: "Placed / Employed",
    placementRate: "Placement Rate",
    verifiedOutcomes: "Verified Outcomes",
    pendingVerification: "Pending Verification",
    avgWage: "Average Start Wage",
    activeBatches: "Active Training Batches",
    viewAll: "View all",
    batch: "Batch",
    course: "Course / Program",
    enrolled: "Enrolled",
    completedCol: "Completed",
    certifiedCol: "Certified",
    placedCol: "Placed",
    status: "Status",
    actions: "Actions",
    viewDetails: "View details",
    outcomeVerification: "Outcome Verification",
    outcomeSub: "Review placement and employment signals before they enter the longitudinal record.",
    employerConfirmed: "Employer Confirmed",
    candidateConfirmed: "Candidate Confirmed",
    providerReported: "Provider Reported",
    pending: "Pending",
    disputed: "Disputed",
    verificationQueue: "Verification Queue",
    verificationSub: "Records requiring provider review",
    review: "Review",
    recentActivity: "Recent Activity",
    activitySub: "Latest actions recorded in your provider account",
    completedAgo: "completed",
    verifiedAgo: "verified",
    updatedAgo: "updated",
    daysAgo: "days ago",
    hoursAgo: "hours ago",
    minutesAgo: "minutes ago",
    quickActions: "Quick Actions",
    manageBatches: "Manage Batches",
    submitOutcomes: "Submit Outcomes",
    certification: "Certification Records",
    reports: "Outcome Reports",
    dataQuality: "Data Quality",
    dataQualitySub: "Keep trainee and employment records complete and traceable.",
    completeness: "Record Completeness",
    identityMatched: "Identity Matched",
    employmentLinked: "Employment Linked",
    auditReady: "Audit Ready",
    footer: "Prototype developed by VB Innovators for Smart India Hackathon 2026.",
    demoData: "All figures shown are simulated prototype data for demonstration.",
    running: "Running",
    reviewStatus: "Under Review",
    high: "High",
    medium: "Medium",
    low: "Low",
    searchPlaceholder: "Search batch or course...",
  },
  mr: {
    title: "प्रशिक्षण संस्था डॅशबोर्ड",
    subtitle: "प्रशिक्षण, प्रमाणन, प्लेसमेंट आणि रोजगार परिणामांचे निरीक्षण करा.",
    prototype: "SIH 2026 प्रोटोटाइप",
    overview: "संस्था आढावा",
    overviewSub: "सक्रिय प्रशिक्षण बॅचसाठी परिणामविषयक माहिती",
    activeTrainees: "सक्रिय प्रशिक्षणार्थी",
    completed: "प्रशिक्षण पूर्ण",
    certified: "प्रमाणित",
    placed: "प्लेसमेंट / रोजगार",
    placementRate: "प्लेसमेंट दर",
    verifiedOutcomes: "सत्यापित परिणाम",
    pendingVerification: "सत्यापन प्रलंबित",
    avgWage: "सरासरी प्रारंभिक वेतन",
    activeBatches: "सक्रिय प्रशिक्षण बॅच",
    viewAll: "सर्व पहा",
    batch: "बॅच",
    course: "कोर्स / कार्यक्रम",
    enrolled: "नोंदणी",
    completedCol: "पूर्ण",
    certifiedCol: "प्रमाणित",
    placedCol: "प्लेसमेंट",
    status: "स्थिती",
    actions: "कृती",
    viewDetails: "तपशील पहा",
    outcomeVerification: "परिणाम सत्यापन",
    outcomeSub: "दीर्घकालीन नोंदीमध्ये जोडण्यापूर्वी प्लेसमेंट आणि रोजगार संकेत तपासा.",
    employerConfirmed: "नियोक्त्याने पुष्टी केली",
    candidateConfirmed: "उमेदवाराने पुष्टी केली",
    providerReported: "संस्थेने नोंदवले",
    pending: "प्रलंबित",
    disputed: "वादग्रस्त",
    verificationQueue: "सत्यापन रांग",
    verificationSub: "संस्थेच्या पुनरावलोकनाची आवश्यकता असलेल्या नोंदी",
    review: "पुनरावलोकन",
    recentActivity: "अलीकडील क्रिया",
    activitySub: "संस्थेच्या खात्यातील अलीकडील नोंदी",
    completedAgo: "पूर्ण केले",
    verifiedAgo: "सत्यापित केले",
    updatedAgo: "अद्ययावत केले",
    daysAgo: "दिवसांपूर्वी",
    hoursAgo: "तासांपूर्वी",
    minutesAgo: "मिनिटांपूर्वी",
    quickActions: "जलद कृती",
    manageBatches: "बॅच व्यवस्थापन",
    submitOutcomes: "परिणाम नोंदवा",
    certification: "प्रमाणन नोंदी",
    reports: "परिणाम अहवाल",
    dataQuality: "डेटा गुणवत्ता",
    dataQualitySub: "प्रशिक्षणार्थी आणि रोजगार नोंदी पूर्ण व ट्रेस करण्यायोग्य ठेवा.",
    completeness: "नोंद पूर्णता",
    identityMatched: "ओळख जुळलेली",
    employmentLinked: "रोजगार जोडलेला",
    auditReady: "ऑडिटसाठी तयार",
    footer: "Smart India Hackathon 2026 साठी VB Innovators ने विकसित केलेला प्रोटोटाइप.",
    demoData: "दाखवलेले सर्व आकडे प्रात्यक्षिकासाठी सिम्युलेटेड प्रोटोटाइप डेटा आहेत.",
    running: "सुरू",
    reviewStatus: "पुनरावलोकनाधीन",
    high: "उच्च",
    medium: "मध्यम",
    low: "कमी",
    searchPlaceholder: "बॅच किंवा कोर्स शोधा...",
  },
} satisfies Record<Lang, Record<string, string>>;

const batches = [
  {
    id: "CC-2026-03",
    courseEn: "Cloud & AI Advanced Track",
    courseMr: "क्लाउड आणि AI प्रगत प्रशिक्षण",
    enrolled: 420,
    completed: 386,
    certified: 354,
    placed: 264,
    status: "Running",
  },
  {
    id: "EV-2026-02",
    courseEn: "EV Mechatronics & BMS",
    courseMr: "EV मेकॅट्रॉनिक्स आणि BMS",
    enrolled: 310,
    completed: 284,
    certified: 267,
    placed: 219,
    status: "Running",
  },
  {
    id: "DA-2026-01",
    courseEn: "Data Analytics & Python",
    courseMr: "डेटा अॅनालिटिक्स आणि Python",
    enrolled: 275,
    completed: 241,
    certified: 226,
    placed: 158,
    status: "Under Review",
  },
  {
    id: "CY-2025-08",
    courseEn: "Cybersecurity Foundation",
    courseMr: "सायबरसुरक्षा फाउंडेशन",
    enrolled: 198,
    completed: 181,
    certified: 169,
    placed: 137,
    status: "Running",
  },
];

const verificationItems = [
  {
    id: "VB-10452",
    traineeEn: "Rahul S. Shinde",
    traineeMr: "राहुल एस. शिंदे",
    employer: "Tata Technologies",
    roleEn: "Cloud Support Associate",
    roleMr: "क्लाउड सपोर्ट असोसिएट",
    signal: "Employer Confirmed",
    priority: "High",
  },
  {
    id: "VB-12104",
    traineeEn: "Anita Mohan Jadhav",
    traineeMr: "अनिता मोहन जाधव",
    employer: "Tech Mahindra",
    roleEn: "Data Operations Associate",
    roleMr: "डेटा ऑपरेशन्स असोसिएट",
    signal: "Candidate Confirmed",
    priority: "Medium",
  },
  {
    id: "VB-13821",
    traineeEn: "Amit Ramesh Patil",
    traineeMr: "अमित रमेश पाटील",
    employer: "Mahindra & Mahindra",
    roleEn: "EV Service Technician",
    roleMr: "EV सर्व्हिस टेक्निशियन",
    signal: "Provider Reported",
    priority: "Medium",
  },
  {
    id: "VB-14208",
    traineeEn: "Sneha Vijay More",
    traineeMr: "स्नेहा विजय मोरे",
    employer: "Larsen & Toubro",
    roleEn: "Site Operations Trainee",
    roleMr: "साइट ऑपरेशन्स प्रशिक्षणार्थी",
    signal: "Pending",
    priority: "Low",
  },
];

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  progress,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  detail: string;
  progress?: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#173565]">
          <Icon size={20} />
        </div>
        {progress !== undefined && (
          <span className="text-xs font-semibold text-emerald-600">{progress}%</span>
        )}
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-[#173565]">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
      {progress !== undefined && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#173565]"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default function ProviderDashboard() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const c = copy[lang] ?? copy.en;
  const [search, setSearch] = useState("");

  const filteredBatches = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return batches;
    return batches.filter((item) =>
      `${item.id} ${item.courseEn} ${item.courseMr}`.toLowerCase().includes(q),
    );
  }, [search]);

  const totalEnrolled = batches.reduce((sum, b) => sum + b.enrolled, 0);
  const totalCompleted = batches.reduce((sum, b) => sum + b.completed, 0);
  const totalCertified = batches.reduce((sum, b) => sum + b.certified, 0);
  const totalPlaced = batches.reduce((sum, b) => sum + b.placed, 0);
  const placementRate = Math.round((totalPlaced / totalCompleted) * 100);

  const statusLabel = (status: string) =>
    status === "Running" ? c.running : c.reviewStatus;

  const signalLabel = (signal: string) => {
    if (signal === "Employer Confirmed") return c.employerConfirmed;
    if (signal === "Candidate Confirmed") return c.candidateConfirmed;
    if (signal === "Provider Reported") return c.providerReported;
    if (signal === "Disputed") return c.disputed;
    return c.pending;
  };

  const priorityLabel = (priority: string) =>
    priority === "High" ? c.high : priority === "Medium" ? c.medium : c.low;

  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="mx-auto max-w-[1450px] px-6 py-8 lg:px-10">
        <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#173565]/10 px-3 py-1 text-xs font-bold text-[#173565]">
                {c.prototype}
              </span>
              <span className="text-xs text-slate-400">VB Analytics</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#173565] lg:text-4xl">
              {c.title}
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 lg:text-base">
              {c.subtitle}
            </p>
          </div>
          <LogoutButton />
        </div>

        <section className="mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#173565]">{c.overview}</h2>
            <p className="text-sm text-slate-500">{c.overviewSub}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={Users}
              label={c.activeTrainees}
              value={totalEnrolled.toLocaleString("en-IN")}
              detail={`${batches.length} ${c.activeBatches.toLowerCase()}`}
            />
            <MetricCard
              icon={GraduationCap}
              label={c.completed}
              value={totalCompleted.toLocaleString("en-IN")}
              detail={`${Math.round((totalCompleted / totalEnrolled) * 100)}% completion rate`}
              progress={Math.round((totalCompleted / totalEnrolled) * 100)}
            />
            <MetricCard
              icon={Award}
              label={c.certified}
              value={totalCertified.toLocaleString("en-IN")}
              detail={`${Math.round((totalCertified / totalCompleted) * 100)}% of completers`}
              progress={Math.round((totalCertified / totalCompleted) * 100)}
            />
            <MetricCard
              icon={TrendingUp}
              label={c.placed}
              value={totalPlaced.toLocaleString("en-IN")}
              detail={`${placementRate}% of completed trainees`}
              progress={placementRate}
            />
          </div>
        </section>

        <section className="mb-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <ShieldCheck size={21} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{c.verifiedOutcomes}</p>
                <p className="text-2xl font-bold text-[#173565]">748</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500">{c.employerConfirmed}</span>
              <span className="font-semibold text-emerald-600">82%</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                <Clock3 size={21} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{c.pendingVerification}</p>
                <p className="text-2xl font-bold text-[#173565]">47</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              {language === "mr"
                ? "पुनरावलोकनासाठी ४७ रोजगार नोंदी."
                : "47 employment records require review."}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <IndianRupee size={21} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{c.avgWage}</p>
                <p className="text-2xl font-bold text-[#173565]">₹3.8 LPA</p>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <TrendingUp size={13} />
              +18% from previous cohort
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#173565]">{c.activeBatches}</h2>
              <p className="text-sm text-slate-500">
                {language === "mr"
                  ? "बॅचची प्रगती आणि रोजगार परिणाम."
                  : "Track batch progress and employment outcomes."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={c.searchPlaceholder}
                  className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#173565] focus:bg-white"
                />
              </div>
              <button className="hidden items-center gap-1 text-sm font-semibold text-[#173565] sm:flex">
                {c.viewAll} <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">{c.batch}</th>
                  <th className="px-5 py-3">{c.course}</th>
                  <th className="px-5 py-3 text-center">{c.enrolled}</th>
                  <th className="px-5 py-3 text-center">{c.completedCol}</th>
                  <th className="px-5 py-3 text-center">{c.certifiedCol}</th>
                  <th className="px-5 py-3 text-center">{c.placedCol}</th>
                  <th className="px-5 py-3">{c.status}</th>
                  <th className="px-5 py-3 text-right">{c.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBatches.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-semibold text-[#173565]">
                        {item.id}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {language === "mr" ? item.courseMr : item.courseEn}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-center text-sm">{item.enrolled}</td>
                    <td className="px-5 py-4 text-center text-sm">{item.completed}</td>
                    <td className="px-5 py-4 text-center text-sm">{item.certified}</td>
                    <td className="px-5 py-4 text-center text-sm font-semibold text-emerald-700">
                      {item.placed}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.status === "Running"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {statusLabel(item.status)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="inline-flex items-center gap-1 text-sm font-semibold text-[#173565] hover:underline">
                        {c.viewDetails} <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBatches.length === 0 && (
              <div className="p-10 text-center text-sm text-slate-500">
                {language === "mr" ? "कोणतीही बॅच सापडली नाही." : "No matching batches found."}
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <FileCheck2 size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#173565]">{c.outcomeVerification}</h2>
                  <p className="text-sm text-slate-500">{c.outcomeSub}</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {verificationItems.map((item) => (
                <div key={item.id} className="p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#173565]/10 text-sm font-bold text-[#173565]">
                        {item.traineeEn
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          {language === "mr" ? item.traineeMr : item.traineeEn}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-500">
                          {item.id} · {item.employer}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {language === "mr" ? item.roleMr : item.roleEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {signalLabel(item.signal)}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.priority === "High"
                            ? "bg-red-50 text-red-700"
                            : item.priority === "Medium"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {priorityLabel(item.priority)}
                      </span>
                      <button className="rounded-lg bg-[#173565] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#10294f]">
                        {c.review}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-[#173565]">{c.quickActions}</h2>
              <div className="mt-4 grid gap-2">
                {[
                  { icon: BookOpen, label: c.manageBatches },
                  { icon: FileCheck2, label: c.submitOutcomes },
                  { icon: Award, label: c.certification },
                  { icon: BarChart3, label: c.reports },
                ].map(({ icon: ActionIcon, label }) => (
                  <button
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-3 text-left transition hover:border-[#173565]/30 hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-3">
                      <span className="rounded-lg bg-slate-100 p-2 text-[#173565]">
                        <ActionIcon size={17} />
                      </span>
                      <span className="text-sm font-semibold text-slate-700">{label}</span>
                    </span>
                    <ChevronRight size={17} className="text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-[#173565]">{c.dataQuality}</h2>
              <p className="mt-1 text-sm text-slate-500">{c.dataQualitySub}</p>

              <div className="mt-5 space-y-4">
                {[
                  [c.completeness, "94%", 94],
                  [c.identityMatched, "97%", 97],
                  [c.employmentLinked, "88%", 88],
                  [c.auditReady, "91%", 91],
                ].map(([label, value, percent]) => (
                  <div key={String(label)}>
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="font-medium text-slate-600">{label}</span>
                      <span className="font-bold text-[#173565]">{value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#173565]"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#173565]">
                {c.dataQuality} <ChevronRight size={16} />
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-3 text-[#173565]">
                  <Clock3 size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#173565]">{c.recentActivity}</h2>
                  <p className="text-xs text-slate-500">{c.activitySub}</p>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                {[
                  {
                    icon: CheckCircle2,
                    subject: "Batch CC-2026-03",
                    action: c.completedAgo,
                    time: "2",
                    unit: c.hoursAgo,
                  },
                  {
                    icon: ShieldCheck,
                    subject: "VB-10452",
                    action: c.verifiedAgo,
                    time: "4",
                    unit: c.hoursAgo,
                  },
                  {
                    icon: BarChart3,
                    subject: "Outcome report",
                    action: c.updatedAgo,
                    time: "1",
                    unit: c.daysAgo,
                  },
                ].map(({ icon: ActivityIcon, subject, action, time, unit }) => (
                  <div key={subject} className="flex gap-3">
                    <ActivityIcon size={17} className="mt-0.5 shrink-0 text-emerald-600" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-700">{subject}</p>
                      <p className="text-xs text-slate-500">
                        {action} · {time} {unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-8 border-t border-slate-200 pt-5 text-center">
          <p className="text-xs font-medium text-slate-500">{c.footer}</p>
          <p className="mt-1 text-xs text-slate-400">{c.demoData}</p>
        </footer>
      </div>
    </main>
  );
}