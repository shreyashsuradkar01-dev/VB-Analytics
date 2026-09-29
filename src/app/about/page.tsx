"use client";

import { useLanguage } from "@/components/language-context";

export default function AboutPage() {
  const { language } = useLanguage();

  const marathi = language === "mr";

  return (
    <main className="min-h-[calc(100vh-134px)] bg-slate-50 px-5 py-12">

      <div className="mx-auto max-w-5xl">

        {/* HERO */}
        <section className="text-center">

          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-[#102a56]">
            Smart India Hackathon 2026
          </div>

          <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-[#102a56]">
            <span className="text-[#f59e0b]">
              VB
            </span>{" "}
            Innovators
          </h1>

          <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-[#f5a400]" />

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600">
            {marathi
              ? "VB Analytics च्या मागे असलेली टीम — प्रशिक्षणापासून शाश्वत रोजगारापर्यंतच्या परिणामांचा मागोवा घेण्यासाठी तयार केलेले स्किलिंग आणि रोजगार इंटेलिजन्स सोल्यूशन."
              : "The team behind VB Analytics — a longitudinal skilling and employment intelligence solution focused on tracking outcomes from training to sustainable employment."}
          </p>

        </section>

        {/* TEAM */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">

          <h2 className="text-2xl font-extrabold text-[#102a56]">
            {marathi ? "आमची टीम" : "Our Team"}
          </h2>

          <p className="mt-4 leading-7 text-slate-600">

            <strong className="text-[#102a56]">
              VB Innovators
            </strong>{" "}

            {marathi
              ? "ही VB Analytics मागील टीम आहे. Smart India Hackathon 2026 साठी स्किलिंग परिणाम, रोजगाराचा प्रभाव आणि कौशल्यातील तफावत मोजण्यासाठी हा प्रोटोटाइप विकसित केला जात आहे."
              : "is the team behind VB Analytics, our Smart India Hackathon 2026 prototype for improving the measurement of skilling outcomes, employment impact and skill gaps."}

          </p>

          <div className="mt-8 grid gap-5">

  <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-6">

    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#102a56] text-lg font-extrabold text-white">
      VB
    </div>

    <h3 className="mt-4 text-lg font-bold text-[#102a56]">
      VB Innovators
    </h3>

    <p className="mt-1 text-sm font-semibold text-blue-600">
      {marathi
        ? "Smart India Hackathon 2026 टीम"
        : "Smart India Hackathon 2026 Team"}
    </p>

    <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
      {marathi
        ? "रोजगार परिणामांचा मागोवा, कौशल्य इंटेलिजन्स आणि स्किलिंग प्रभाव मोजण्यासाठी तंत्रज्ञानाधारित सोल्यूशन विकसित करणारी टीम."
        : "A technology-focused team developing solutions for employment outcome tracking, skill intelligence and skilling impact measurement."}
    </p>

  </div>

</div>
          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-slate-600">
            {marathi
              ? "टीम सदस्यांची वैयक्तिक माहिती येथे प्रदर्शित केलेली नाही."
              : "Team member identities are intentionally kept private."}
          </div>

        </section>

        {/* SIH PROBLEM */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">

          <h2 className="text-2xl font-extrabold text-[#102a56]">
            Smart India Hackathon 2026
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {marathi
                  ? "समस्या विधान ID"
                  : "Problem Statement ID"}
              </p>

              <p className="mt-2 text-xl font-extrabold text-[#102a56]">
                SIH26135
              </p>

            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {marathi
                  ? "समस्या विधान"
                  : "Problem Statement"}
              </p>

              <p className="mt-2 text-sm font-semibold leading-6 text-[#102a56]">
                {marathi
                  ? "रोजगार परिणाम, कौशल्यातील तफावत आणि स्किलिंग उपक्रमांचा प्रभाव यांचा मागोवा घेण्यात येणाऱ्या अडचणी."
                  : "Difficulties in tracking employment outcomes, skill gaps, and the impact of skilling initiatives."}
              </p>

            </div>

          </div>

          <p className="mt-6 leading-7 text-slate-600">
            {marathi
              ? "VB Analytics हा दीर्घकालीन रोजगार परिणामांचा मागोवा, कौशल्यातील तफावत, विविध स्रोतांमधून परिणाम पडताळणी आणि धोरणात्मक विश्लेषणाद्वारे या समस्येवर उपाय सुचवणारा प्रोटोटाइप आहे."
              : "VB Analytics is presented as a prototype solution addressing this problem through longitudinal employment outcome tracking, skill-gap intelligence, multi-source outcome verification and policy-oriented impact analysis."}
          </p>

        </section>

      </div>

    </main>
  );
}