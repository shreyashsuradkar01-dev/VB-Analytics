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

        <div className="vb-product-badge">
          {marathi
            ? "स्मार्ट इंडिया हॅकाथॉन २०२६"
            : "Smart India Hackathon 2026"}
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

        <small>
          {marathi
            ? "तुमच्या क्रेडेन्शियल्ससह प्लॅटफॉर्मवर प्रवेश करा"
            : "Access the platform with your credentials"}
        </small>

      </div>


      {/* =====================================================
          LOGIN CARD
      ===================================================== */}

      <LoginCard />

    </main>
  );
}