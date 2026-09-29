"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useLanguage,
  type Language,
} from "@/components/language-context";

export default function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const changeLanguage = (value: Language) => {
    setLanguage(value);
  };

  return (
    <header className="vb-login-header">
      {/* =====================================================
          BRAND
      ===================================================== */}

      <div className="vb-login-brand">
        {/* GOVERNMENT EMBLEMS */}
        <div className="vb-government-emblems">
          {/* Government of India */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            alt="Government of India"
            className="vb-india-emblem"
          />

          {/* Maharashtra Government Seal */}
          <img
            src="/images/maharashtra-emblem.png"
            alt="Government of Maharashtra seal"
            className="vb-maharashtra-emblem"
          />
        </div>

        {/* Divider */}
        <div className="vb-login-divider" />

        {/* Government of Maharashtra */}
        <div className="vb-maharashtra-text">
          {language === "mr" ? (
            <>
              महाराष्ट्र
              <br />
              शासन
            </>
          ) : (
            <>
              GOVERNMENT OF
              <br />
              MAHARASHTRA
            </>
          )}
        </div>

        {/* Divider */}
        <div className="vb-login-divider" />

        {/* Smart India Hackathon */}
        <img
          src="/images/smart-india-hackathon-logo.png"
          alt="Smart India Hackathon 2026"
          className="vb-sih-logo"
        />
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="vb-login-nav">
        <Link
          href="/"
          className={pathname === "/" ? "active" : ""}
        >
          {language === "mr"
            ? "मुख्यपृष्ठ"
            : "HOME"}
        </Link>

        <Link
          href="/faqs"
          className={pathname === "/faqs" ? "active" : ""}
        >
          {language === "mr"
            ? "सामान्य प्रश्न"
            : "FAQS"}
        </Link>

        <Link
          href="/about"
          className={pathname === "/about" ? "active" : ""}
        >
          {language === "mr"
            ? "टीमबद्दल"
            : "ABOUT TEAM"}
        </Link>
      </nav>

      {/* =====================================================
          LANGUAGE
      ===================================================== */}

      <div className="vb-login-language">
        <button
          type="button"
          className={language === "en" ? "active" : ""}
          onClick={() => changeLanguage("en")}
          aria-label={t("language.english")}
        >
          English
        </button>

        <button
          type="button"
          className={language === "mr" ? "active" : ""}
          onClick={() => changeLanguage("mr")}
          aria-label={t("language.marathi")}
        >
          मराठी
        </button>
      </div>
    </header>
  );
}