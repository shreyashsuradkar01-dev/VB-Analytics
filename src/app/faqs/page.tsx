"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/language-context";

const faqEnglish = [
  {
    question: "What is VB Analytics?",
    answer:
      "VB Analytics is a longitudinal skilling and employment intelligence platform designed to connect training outcomes with employment, retention and skill-demand data.",
  },
  {
    question: "What problem does it solve?",
    answer:
      "It helps track what happens to trainees after training, identify skill gaps and support evidence-based decisions.",
  },
  {
    question: "Who can use the platform?",
    answer:
      "Government officials, trainees, employers and training providers can use role-specific parts of the platform.",
  },
  {
    question: "Is this a live government system?",
    answer:
      "No. This is an SIH prototype using simulated data and demonstration workflows.",
  },
];

const faqMarathi = [
  {
    question: "VB Analytics म्हणजे काय?",
    answer:
      "VB Analytics हे प्रशिक्षणानंतरच्या रोजगार, टिकाव आणि कौशल्याच्या मागणीशी संबंधित परिणामांचा मागोवा घेण्यासाठी तयार केलेले स्किलिंग आणि रोजगार इंटेलिजन्स प्लॅटफॉर्म आहे.",
  },
  {
    question: "हे कोणती समस्या सोडवते?",
    answer:
      "प्रशिक्षणानंतर प्रशिक्षणार्थ्यांचे काय झाले याचा मागोवा घेणे, कौशल्यातील तफावत ओळखणे आणि माहितीच्या आधारे निर्णय घेण्यास हे मदत करते.",
  },
  {
    question: "हे प्लॅटफॉर्म कोण वापरू शकते?",
    answer:
      "सरकारी अधिकारी, प्रशिक्षणार्थी, नियोक्ते आणि प्रशिक्षण संस्था त्यांच्या संबंधित भूमिकेनुसार प्लॅटफॉर्म वापरू शकतात.",
  },
  {
    question: "ही थेट सरकारी प्रणाली आहे का?",
    answer:
      "नाही. हे Smart India Hackathon चे प्रोटोटाइप असून यामध्ये प्रात्यक्षिकासाठी सिम्युलेटेड डेटा आणि डेमो वर्कफ्लो वापरले आहेत.",
  },
];

export default function FAQsPage() {
  const { language } = useLanguage();

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = language === "mr"
    ? faqMarathi
    : faqEnglish;

  return (
    <main className="min-h-[calc(100vh-134px)] bg-slate-50 px-5 py-12">

      <div className="mx-auto max-w-4xl">

        {/* HERO */}
        <section className="text-center">

          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-[#102a56]">
            Smart India Hackathon 2026
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[#102a56] md:text-5xl">
            {language === "mr"
              ? "सामान्य प्रश्न"
              : "Frequently Asked Questions"}
          </h1>

          <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-[#f5a400]" />

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            {language === "mr"
              ? "VB Analytics बद्दल वारंवार विचारले जाणारे प्रश्न."
              : "Common questions about VB Analytics and the prototype."}
          </p>

        </section>

        {/* FAQ LIST */}
        <section className="mt-10 space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >

                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(
                      isOpen ? null : index
                    )
                  }
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                >

                  <span className="font-bold text-[#102a56]">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />

                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </div>
                )}

              </div>
            );
          })}

        </section>

      </div>

    </main>
  );
}