"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-context";
import {
  Check,
  CheckCircle2,
  QrCode,
  XCircle,
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import {
  getDemoOutcome,
  submitDemoEmployment,
  subscribeDemoOutcome,
  type DemoEmploymentOutcome,
} from "@/data/demo-outcome-store";
type TraineeTab = "passport" | "update" | "followups" | "consent";

export default function TraineeDashboard() {
  const { language } = useLanguage();
  const isMarathi = language === "mr";

  const tx = (english: string, marathi: string) =>
    isMarathi ? marathi : english;
  const [activeTab, setActiveTab] = useState<TraineeTab>("passport");
  const [employmentState, setEmploymentState] = useState("Employed");
  const [submitted, setSubmitted] = useState(false);
  const [followupDone, setFollowupDone] = useState(false);
  const [consentWithdrawn, setConsentWithdrawn] = useState(false);
  const [employmentOutcome, setEmploymentOutcome] =
    useState<DemoEmploymentOutcome>(getDemoOutcome());

  useEffect(() => subscribeDemoOutcome(setEmploymentOutcome), []);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Trainee Header */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
  <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 pb-4 md:flex-row md:items-center">
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#102a56] font-mono text-xl font-bold text-white shadow-sm">
        VB
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-lg font-bold text-slate-900">
            Rahul Suresh Shinde
          </h1>

          <span className="flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
            <Check size={12} />
            Identity Verified
          </span>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>
            Candidate ID:{" "}
            <strong className="font-mono text-slate-800">
              VB-10452
            </strong>
          </span>

          <span>•</span>

          <span>
            District:{" "}
            <strong className="text-slate-800">Pune</strong>
          </span>

          <span>•</span>

          <span>
            Education:{" "}
            <strong className="text-slate-800">
              Diploma in Computer Engineering
            </strong>
          </span>

          <span>•</span>

          <span className="font-medium text-emerald-700">
            Phone: +91 98****4120 (Verified)
          </span>
        </div>
      </div>
    </div>

    <div className="text-left md:text-right">
      <span className="block text-[10px] font-semibold uppercase text-slate-400">
        Current Employment Status
      </span>

      <span
  className={`mt-1 inline-block rounded-md border px-3 py-1 text-xs font-bold ${
    employmentOutcome.status === "Employer Verified"
      ? "border-emerald-300 bg-emerald-100 text-emerald-900"
      : "border-amber-300 bg-amber-100 text-amber-900"
  }`}
>
  {employmentOutcome.status === "Employer Verified"
    ? tx("Employer Verified / Employed", "नियोक्ता सत्यापित / रोजगारित")
    : tx(
        "Pending Employer Verification / Employed",
        "नियोक्ता पडताळणी प्रलंबित / रोजगारित"
      )}
</span>

      <div className="mt-2 flex md:justify-end">
        <LogoutButton />
      </div>
    </div>
  </div>

  {/* Original HTML Trainee Subnav */}
  <div className="mt-4 overflow-x-auto border-b border-slate-200">
            <div className="flex min-w-max gap-6 text-xs font-semibold">
              <TabButton
                active={activeTab === "passport"}
                onClick={() => setActiveTab("passport")}
              >
                {tx("Digital Skill Passport", "डिजिटल कौशल्य पासपोर्ट")}
              </TabButton>

              <TabButton
                active={activeTab === "update"}
                onClick={() => setActiveTab("update")}
              >
                {tx("Report / Update Employment Outcome", "रोजगार स्थिती नोंदवा / अद्यतनित करा")}
              </TabButton>

              <TabButton
                active={activeTab === "followups"}
                onClick={() => setActiveTab("followups")}
                indicator
              >
                {tx("Longitudinal Surveys", "दीर्घकालीन सर्वेक्षणे")}
              </TabButton>

              <TabButton
                active={activeTab === "consent"}
                onClick={() => setActiveTab("consent")}
              >
                {tx("Consent & Privacy Controls", "संमती व गोपनीयता नियंत्रण")}
              </TabButton>
            </div>
          </div>
        </section>

        {/* ============================================================
            TAB 1 — DIGITAL SKILL PASSPORT
        ============================================================ */}
        {activeTab === "passport" && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* LEFT */}
            <div className="space-y-6 lg:col-span-2">
              {/* Training Credentials */}
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-sm font-bold text-slate-900">
                  {tx('Completed Skilling & Certifications', 'पूर्ण केलेले कौशल्य प्रशिक्षण व प्रमाणपत्रे')}
                </h2>

                <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                        MSSDS Advanced Tech Track
                      </span>

                      <h3 className="mt-1 text-sm font-bold text-slate-900">
                        Cloud Computing & Linux Systems Administration
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Provider:{" "}
                        <span className="font-medium text-slate-800">
                          Maharashtra Skill Development Institute, Pune
                        </span>
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 font-mono text-xs font-bold text-emerald-700">
                        Grade: A+ (91%)
                      </span>

                      <span className="mt-1 block text-[10px] text-slate-400">
                        {tx('Certified: July 2026', 'प्रमाणित: जुलै २०२६')}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-2">
                    <span className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                      {tx('Assessed Competencies:', 'मूल्यांकन केलेली कौशल्ये:')}
                    </span>

                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "AWS Infrastructure",
                        "Linux Shell Scripting",
                        "Docker Containers",
                        "Network Security",
                        "Python Automation",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="rounded border border-slate-300 bg-white px-2.5 py-0.5 font-mono text-[11px] text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Employment Timeline */}
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-5 text-sm font-bold text-slate-900">
                  {tx('Employment Journey & Longitudinal Milestones', 'रोजगार प्रवास व दीर्घकालीन टप्पे')}
                </h2>

                <ol className="relative ml-3 space-y-6 border-l border-slate-300">
                  <TimelineItem
                    number="1"
                    title={tx('Training Completed & Assessed', 'प्रशिक्षण पूर्ण व मूल्यांकन झाले')}
                    date="June 2026"
                    color="bg-[#102a56]"
                  >
                    {tx('Completed 480 instructional hours in Cloud & Networking.', 'क्लाउड व नेटवर्किंगमध्ये ४८० तासांचे प्रशिक्षण पूर्ण केले.')}
                    {tx('National Skill Qualification Framework (NSQF) Level 5.', 'National Skill Qualification Framework (NSQF) स्तर ५.')}
                  </TimelineItem>

                  <TimelineItem
                    number="2"
                    title={tx('State Certificate Issued', 'राज्य प्रमाणपत्र जारी')}
                    date="July 2026"
                    color="bg-emerald-600"
                  >
                    Certificate #MH-SKILL-2026-9941 recorded in the
                    demonstration DigiLocker integration.
                  </TimelineItem>

                  <TimelineItem
                    number="3"
                    title={tx('Employment Commenced: Tata Technologies Ltd', 'रोजगार सुरू: Tata Technologies Ltd')}
                    date="September 2026"
                    color="bg-emerald-700"
                  >
                    Role: Junior Cloud Associate • Starting CTC: ₹3,80,000 /
                    year • Location: Hinjawadi, Pune.
                    <span className="mt-2 inline-block rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      {tx('Employer Verified ✓', 'नियोक्त्याने सत्यापित ✓')}
                    </span>
                  </TimelineItem>

                  <TimelineItem
                    number="4"
                    title={tx('Scheduled 6-Month Retention Survey', '६ महिन्यांचा रोजगार टिकाव सर्वेक्षण नियोजित')}
                    date="March 2027"
                    color="bg-amber-600"
                    last
                  >
                    Automated check-in to track job satisfaction, wage
                    increment, and retention persistence.
                  </TimelineItem>
                </ol>
              </section>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* QR Passport */}
              <section className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {tx('Cryptographic Passport Pass', 'क्रिप्टोग्राफिक पासपोर्ट पास')}
                </span>

                <div className="mx-auto flex h-36 w-36 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-100 p-2">
                  <QrCode size={86} className="text-[#102a56]" />

                  <span className="mt-1 font-mono text-[9px] text-slate-500">
                    {tx('SCAN FOR VERIFICATION', 'पडताळणीसाठी स्कॅन करा')}
                  </span>
                </div>

                <div className="mt-3 text-xs">
                  <span className="block font-semibold text-slate-800">
                    {tx('UID Proxy Token:', 'UID प्रॉक्सी टोकन:')}
                  </span>

                  <span className="font-mono text-[11px] text-slate-500">
                    8812-****-3310 (Vault Secured)
                  </span>
                </div>
              </section>

              {/* Identity Continuity */}
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-xs font-bold text-slate-900">
                  {tx('Contact & Identity Continuity Status', 'संपर्क व ओळख सातत्य स्थिती')}
                </h3>

                <p className="mb-3 text-xs text-slate-500">
                  Keeps your certifications and employment history linked even
                  if you change phone numbers or districts.
                </p>

                <div className="space-y-2 text-xs">
                  <InfoRow
                    label={tx('Primary Mobile', 'प्राथमिक मोबाईल')}
                    value="+91 98****4120"
                  />

                  <InfoRow
                    label={tx('Alternate Contact', 'पर्यायी संपर्क')}
                    value="+91 94****1902"
                  />

                  <InfoRow
                    label={tx('Registered Email', 'नोंदणीकृत ईमेल')}
                    value="r***@outlook.com"
                  />

                  <InfoRow
                    label={tx('Duplicate Check', 'डुप्लिकेट तपासणी')}
                    value="Clean (0 Collisions)"
                    success
                    last
                  />
                </div>

                <button
                  type="button"
                  className="mt-3 w-full rounded border border-slate-200 bg-slate-50 py-1.5 text-xs font-semibold text-[#102a56] transition hover:bg-slate-100"
                >
                  {tx('Update Alternate Contact', 'पर्यायी संपर्क अद्यतनित करा')}
                </button>
              </section>
            </div>
          </div>
        )}

        {/* ============================================================
            TAB 2 — EMPLOYMENT OUTCOME
        ============================================================ */}
        {activeTab === "update" && (
          <section className="mx-auto mt-6 max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">
                Submit / Update Employment Status
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Accurately reporting your career status allows the government
                to evaluate program impact and allocate support.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-slate-700">
                  {tx('Current Employment State *', 'सध्याची रोजगार स्थिती *')}
                </label>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    "Employed",
                    "Self-Employed",
                    "Apprentice",
                    "Seeking",
                  ].map((state) => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => setEmploymentState(state)}
                      className={`rounded-lg border p-2.5 text-left font-semibold transition ${
                        employmentState === state
                          ? "border-[#102a56] bg-blue-50 text-[#102a56]"
                          : "border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {state === "Employed"
                        ? "Employed (Wage)"
                        : state === "Self-Employed"
                          ? "Self-Employed"
                          : state === "Apprentice"
                            ? "Apprentice"
                            : "Seeking Job"}
                    </button>
                  ))}
                </div>
              </div>

              {employmentState === "Employed" && (
                <div className="space-y-3 pt-2">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <FormField
                      label={tx('Employer / Company Name *', 'नियोक्ता / कंपनीचे नाव *')}
                      value="Tata Technologies Ltd"
                    />

                    <FormField
                      label={tx('Designation / Job Role *', 'पद / नोकरीची भूमिका *')}
                      value="Junior Cloud Associate"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <FormField
                      label={tx('Annual CTC / Wage Band *', 'वार्षिक CTC / वेतन श्रेणी *')}
                      value="₹3.5 - 4.5 LPA"
                    />

                    <FormField
                      label={tx('Joining Date *', 'रुजू होण्याची तारीख *')}
                      value="01 Sep 2026"
                    />

                    <FormField
                      label={tx('Work Location *', 'कामाचे ठिकाण *')}
                      value="Hinjawadi, Pune"
                    />
                  </div>
                </div>
              )}

              {employmentState === "Seeking" && (
                <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3.5">
                  <label className="mb-1 block font-bold text-amber-900">
                    {tx('What is the primary factor preventing employment? *', 'रोजगार मिळण्यास मुख्य अडथळा कोणता आहे? *')}
                  </label>

                  <select className="w-full rounded-md border border-amber-300 bg-white p-2 text-slate-800">
                    <option>
                      Technical skill gap (Could not clear technical
                      assessment)
                    </option>
                    <option>
                      Location constraints (Relocation outside home district
                      not feasible)
                    </option>
                    <option>
                      Salary mismatch (Offered salary insufficient for urban
                      accommodation)
                    </option>
                    <option>{tx('Communication / Interview barriers', 'संवाद / मुलाखत अडथळे')}</option>
                    <option>{tx('No suitable vacancies in my district', 'माझ्या जिल्ह्यात योग्य रिक्त जागा नाहीत')}</option>
                    <option>{tx('Opting for further education / higher studies', 'पुढील शिक्षण / उच्च शिक्षण निवडत आहे')}</option>
                  </select>
                </div>
              )}

              <div className="flex flex-col justify-between gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center">
                <span className="text-[11px] text-slate-500">
                  {tx('Will be routed to employer verification queue', 'नियोक्ता पडताळणी रांगेत पाठवले जाईल')}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    submitDemoEmployment();
                    setSubmitted(true);
                  }}
                  className="rounded-md bg-[#102a56] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0b2042]"
                >
                  {tx('Save & Submit Outcome', 'जतन करा व स्थिती सादर करा')}
                </button>
              </div>

              {submitted && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 size={16} />
                  {tx('Employment outcome submitted to the verification workflow.', 'रोजगार स्थिती पडताळणी प्रक्रियेत सादर केली आहे.')}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ============================================================
            TAB 3 — LONGITUDINAL FOLLOWUPS
        ============================================================ */}
        {activeTab === "followups" && (
          <section className="mx-auto mt-6 max-w-3xl space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Longitudinal Follow-up Surveys (Post-Training)
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Automated career continuity tracking at 30, 90, 180, and
                365-day marks.
              </p>
            </div>

            {/* 30 Day */}
            <div className="flex flex-col justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-emerald-900">
                    {tx('30-Day Transition Survey', '३० दिवसांचे संक्रमण सर्वेक्षण')}
                  </span>

                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                    {tx('Responded ✓', 'प्रतिसाद दिला ✓')}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-600">
                  Confirmed placement interview attendance at Tata
                  Technologies Ltd.
                </p>
              </div>

              <span className="font-mono text-[11px] text-slate-400">
                Aug 2026
              </span>
            </div>

            {/* 90 Day */}
            <div className="space-y-3 rounded-lg border border-amber-300 bg-amber-50 p-4">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-amber-900">
                    {tx('90-Day Employment Confirmation (ACTION REQUIRED)', '९० दिवसांची रोजगार पुष्टी (कृती आवश्यक)')}
                  </span>

                  <span className="animate-pulse rounded bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                    {tx('Due Today', 'आज अंतिम तारीख')}
                  </span>
                </div>

                <span className="font-mono text-[11px] text-amber-800">
                  Sept 2026
                </span>
              </div>

              <p className="text-xs text-slate-700">
                &quot;We would like to understand your current employment
                satisfaction and whether you are still working with your
                reported employer.&quot;
              </p>

              <div className="flex flex-col gap-2 border-t border-amber-200 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setFollowupDone(true)}
                  className="rounded bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-800"
                >
                  {tx('Yes, Still Employed & Retained', 'होय, अजूनही रोजगारित व टिकून आहे')}
                </button>

                <button
                  type="button"
                  onClick={() => setFollowupDone(true)}
                  className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {tx('No, Left Position', 'नाही, नोकरी सोडली')}
                </button>
              </div>

              {followupDone && (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 size={14} />
                  {tx('Follow-up response recorded.', 'फॉलो-अप प्रतिसाद नोंदवला आहे.')}
                </div>
              )}
            </div>

            {/* 180 Day */}
            <div className="flex flex-col justify-between gap-3 rounded-lg border border-slate-200 p-4 opacity-60 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-bold text-slate-700">
                  {tx('180-Day Wage Progression & Retention Review', '१८० दिवसांचे वेतन प्रगती व रोजगार टिकाव पुनरावलोकन')}
                </span>

                <p className="mt-0.5 text-xs text-slate-500">
                  Automated SMS/WhatsApp survey will dispatch to verified
                  mobile.
                </p>
              </div>

              <span className="font-mono text-[11px] text-slate-400">
                Scheduled: Dec 2026
              </span>
            </div>
          </section>
        )}

        {/* ============================================================
            TAB 4 — CONSENT & PRIVACY
        ============================================================ */}
        {activeTab === "consent" && (
          <section className="mx-auto mt-6 max-w-3xl space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">
                Consent & Privacy Management
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Manage consent for outcome tracking, longitudinal follow-ups,
                wage analytics, and employer verification matching.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <ConsentRow
                title={tx('State Employment Tracking & Retention Analytics', 'राज्य रोजगार ट्रॅकिंग व रोजगार टिकाव विश्लेषण')}
                description={tx('Permits inclusion of your anonymized outcome in longitudinal dashboards.', 'तुमची अनामित रोजगार स्थिती दीर्घकालीन डॅशबोर्डमध्ये समाविष्ट करण्यास परवानगी देते.')}
              />

              <ConsentRow
                title={tx('Longitudinal Follow-up Notifications', 'दीर्घकालीन फॉलो-अप सूचना')}
                description={tx('Consent to receive SMS, WhatsApp, and email check-ins regarding career status.', 'रोजगार स्थितीबाबत SMS, WhatsApp आणि ईमेल तपासणी संदेश प्राप्त करण्यास संमती.')}
              />

              <ConsentRow
                title={tx('Salary Range Disclosure to Authorized Researchers', 'अधिकृत संशोधकांना वेतन श्रेणी उघड करणे')}
                description={tx('Allows aggregated wage progression research. Individual personal salary figures are not publicly displayed.', 'एकत्रित वेतन प्रगती संशोधनास परवानगी देते. वैयक्तिक वेतन आकडे सार्वजनिकपणे प्रदर्शित केले जात नाहीत.')}
              />

              <ConsentRow
                title={tx('Employer Verification Matching', 'नियोक्ता पडताळणी जुळणी')}
                description={tx('Allows registered verified employers to confirm your employment tenure.', 'नोंदणीकृत सत्यापित नियोक्त्यांना तुमचा रोजगार कालावधी पुष्टी करण्यास परवानगी देते.')}
              />
            </div>

            <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs sm:flex-row">
              <div>
                <strong className="block font-bold text-red-900">
                  {tx('Withdrawal of Consent', 'संमती मागे घेणे')}
                </strong>

                <p className="mt-1 text-[11px] leading-5 text-red-700">
                  Withdrawing consent halts future automated check-ins and
                  removes the trainee from the applicable demonstration
                  outcome-tracking workflows.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setConsentWithdrawn(true)}
                className="shrink-0 rounded bg-red-700 px-3 py-1.5 font-semibold text-white transition hover:bg-red-800"
              >
                Withdraw All Consent
              </button>
            </div>

            {consentWithdrawn && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-800">
                <XCircle size={16} />
                Consent withdrawal recorded in this prototype.
              </div>
            )}
          </section>
        )}

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-200 py-5 text-center">
          <div className="flex flex-col items-center justify-center gap-1 text-xs text-slate-500 sm:flex-row">
            <span className="font-bold text-slate-700">VB Analytics</span>
            <span className="hidden sm:inline">•</span>
            <span>{tx('Vocational, Skills & Employment Analytics Platform', 'व्यावसायिक, कौशल्य व रोजगार विश्लेषण प्लॅटफॉर्म')}</span>
          </div>

          <p className="mt-1 text-[11px] text-slate-400">
            Prototype developed by VB Innovators for Smart India Hackathon
            2026 • Privacy By Design
          </p>
        </footer>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                  */
/* -------------------------------------------------------------------------- */

function TabButton({
  children,
  active,
  indicator,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  indicator?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-1 whitespace-nowrap border-b-2 pb-2 transition ${
        active
          ? "border-[#102a56] font-bold text-[#102a56]"
          : "border-transparent text-slate-500 hover:text-slate-800"
      }`}
    >
      {children}

      {indicator && (
        <span className="h-2 w-2 rounded-full bg-red-500" />
      )}
    </button>
  );
}

function TimelineItem({
  number,
  title,
  date,
  color,
  children,
  last,
}: {
  number: string;
  title: string;
  date: string;
  color: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <li className={`${last ? "" : "mb-2"} relative ml-6`}>
      <span
        className={`absolute -left-9 flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-white ring-4 ring-white ${color}`}
      >
        {number}
      </span>

      <h3 className="font-bold text-slate-900">{title}</h3>

      <time className="mb-1 block text-[11px] font-normal leading-none text-slate-400">
        {date}
      </time>

      <p className="text-xs leading-5 text-slate-600">{children}</p>
    </li>
  );
}

function InfoRow({
  label,
  value,
  success,
  last,
}: {
  label: string;
  value: string;
  success?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex justify-between gap-3 py-1 ${
        last ? "" : "border-b border-slate-100"
      }`}
    >
      <span className="text-slate-500">{label}</span>

      <span
        className={`font-mono ${
          success ? "font-semibold text-emerald-700" : "text-slate-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function FormField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-1 block font-medium text-slate-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        readOnly
        className="w-full rounded-md border border-slate-300 bg-slate-50 p-2 text-slate-800 outline-none"
      />
    </div>
  );
}

function ConsentRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div>
        <span className="block font-bold text-slate-800">{title}</span>

        <p className="mt-1 text-[11px] leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        defaultChecked
        className="h-4 w-4 shrink-0 accent-[#102a56]"
      />
    </label>
  );
}