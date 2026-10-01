"use client";

import LoginCard from "@/components/login-card";
import { useLanguage } from "@/components/language-context";

export default function Home() {
  const { language } = useLanguage();

  const marathi = language === "mr";

  return (
    <main className="vb-login-main">
      {/* =====================================================
          PRODUCT HEADING
      ===================================================== */}

      <div className="vb-product-heading">

        {/* SIH PROTOTYPE BADGE */}
        <div className="vb-product-badge">
          {marathi
            ? "स्मार्ट इंडिया हॅकाथॉन २०२६ — प्रोटोटाइप डेमो"
            : "Smart India Hackathon 2026 — Prototype Demo"}
        </div>

        <h1>
          <span>VB</span> Analytics
        </h1>

        <div className="vb-heading-line" />

        <h2>
          {marathi
            ? "प्रशिक्षणापासून शाश्वत रोजगारापर्यंत"
            : "From Training to Sustainable Employment"}
        </h2>

        <p>
          {marathi
            ? "प्रशिक्षणापासून शाश्वत रोजगारापर्यंतच्या परिणामांचा मागोवा घेण्यासाठी तयार केलेले स्किलिंग आणि रोजगार इंटेलिजन्स प्लॅटफॉर्म."
            : "A longitudinal skilling and employment intelligence platform designed to track outcomes from training to sustainable employment."}
        </p>

        {/* PROTOTYPE DISCLOSURE */}
        <div className="mx-auto mt-4 max-w-2xl rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-center text-sm leading-relaxed text-amber-950 shadow-sm">
          <strong className="block">
            {marathi
              ? "प्रोटोटाइप डेमो — अधिकृत सरकारी पोर्टल नाही"
              : "Prototype Demo — Not an Official Government Portal"}
          </strong>

          <span className="mt-1 block">
            {marathi
              ? "VB Innovators यांनी स्मार्ट इंडिया हॅकाथॉन २०२६ साठी विकसित केलेला विद्यार्थी प्रोटोटाइप. कृपया कोणतीही वास्तविक वैयक्तिक माहिती किंवा पासवर्ड प्रविष्ट करू नका."
              : "Student-developed prototype by VB Innovators for Smart India Hackathon 2026. Do not enter real personal information or passwords."}
          </span>
        </div>

        <small className="mt-3 block">
          {marathi
            ? "प्रोटोटाइप एक्सप्लोर करण्यासाठी दिलेली डेमो क्रेडेन्शियल्स वापरा"
            : "Use the provided demo credentials to explore the prototype"}
        </small>

      </div>

      {/* =====================================================
          LOGIN CARD
      ===================================================== */}

      <LoginCard />

    </main>
  );
}