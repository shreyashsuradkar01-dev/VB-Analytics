"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "mr";

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    "common.appName": "VB Analytics",
    "common.english": "English",
    "common.marathi": "मराठी",
    "common.logout": "Logout",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.reset": "Reset",
    "common.export": "Export",
    "common.search": "Search",
    "common.viewAll": "View All",
    "common.details": "Details",
    "common.status": "Status",
    "common.date": "Date",
    "common.actions": "Actions",
    "common.noData": "No data available",
    "common.prototype": "Prototype",
    "common.prototypeDataset": "Prototype Dataset",
    "common.simulatedData": "Simulated Prototype Data",

    // Language
    "language.switch": "Language",
    "language.english": "English",
    "language.marathi": "मराठी",

    // Government Header
    "government.header.tagline":
      "Vocational, Skills & Employment Analytics Platform — From Training to Sustainable Employment",
    "government.header.state": "MH-STATE",
    "government.header.demo": "SIH Demo Flow",
    "government.header.notifications": "Notifications",

    // Government Tabs
    "government.tabs.executive":
      "Executive Summary & Funnel",
    "government.tabs.district":
      "District Intelligence",
    "government.tabs.skills":
      "Skill Gap Intelligence",
    "government.tabs.attrition":
      "Non-Placement & Attrition",
    "government.tabs.impact":
      "Program Impact & Longitudinal",
    "government.tabs.policy":
      "Policy Recommendations",
    "government.tabs.dataquality":
      "Data Quality & Identity",
    "government.tabs.audit":
      "Audit Trail",

    // Government KPI
    "government.kpi.totalEnrolled": "Total Enrolled",
    "government.kpi.completed": "Completed",
    "government.kpi.certified": "Certified",
    "government.kpi.employed": "Employed / Active",
    "government.kpi.employmentRate": "Employment Rate",
    "government.kpi.retention": "6-Month Retention",
    "government.kpi.avgStartWage": "Avg Start Wage",
    "government.kpi.currentWage": "Current Wage",

    // Government Filters
    "government.filters.title": "Intelligence Filters",
    "government.filters.district": "District",
    "government.filters.sector": "Sector / Industry",
    "government.filters.program": "Program",
    "government.filters.employmentType": "Employment Type",
    "government.filters.gender": "Gender",
    "government.filters.allDistricts": "All 36 Districts",
    "government.filters.allIndustries": "All Industries",
    "government.filters.allSchemes": "All Schemes",
    "government.filters.allOutflowTypes": "All Outflow Types",
    "government.filters.allBeneficiaries": "All Beneficiaries",
    "government.filters.reset": "Reset Filters",
    "government.filters.export": "Export Dossier",
    "government.filters.activeCriteria": "Active Criteria",
    "government.filters.reportingCycle": "Reporting Cycle",
    "government.filters.dataQuality": "Data Quality Verified",

    // Government Funnel
    "government.funnel.title":
      "Training-to-Employment Funnel",
    "government.funnel.enrolled": "Enrolled",
    "government.funnel.trainingCompleted":
      "Training Completed",
    "government.funnel.certified":
      "Assessed & Certified",
    "government.funnel.placed":
      "Placed / Employed",
    "government.funnel.retention":
      "Confirmed 6-Month Retention",
    "government.funnel.sustainable":
      "12-Month Sustainable Career & Wage Growth",

    // Government Analysis
    "government.analysis.policyDropoff":
      "Policy Critical Drop-off",
    "government.analysis.demandGap":
      "Demand Gap",
    "government.analysis.dataQuality":
      "Data Quality",
    "government.analysis.districts":
      "Districts",
    "government.analysis.alerts":
      "Intelligence Alerts",

    // Verification
    "verification.reported": "Reported",
    "verification.matched": "Matched",
    "verification.employerVerified":
      "Employer Verified",
    "verification.candidateConfirmed":
      "Candidate Confirmed",
    "verification.pending": "Pending",
    "verification.disputed": "Disputed",
    "verification.unknown": "Unknown",

    // Trainee
    "trainee.dashboard": "Trainee Dashboard",
    "trainee.digitalPassport": "Digital Skill Passport",
    "trainee.employmentOutcome":
      "Report / Update Employment Outcome",
    "trainee.surveys": "Longitudinal Surveys",
    "trainee.consent": "Consent & Privacy Controls",

    // Employer
    "employer.dashboard": "Employer Dashboard",
    "employer.portal": "Employer Portal",
    "employer.verifyOutcomes":
      "Verify Employment Outcomes",
    "employer.candidateRecords":
      "Candidate Records",

    // Provider
    "provider.dashboard": "Training Provider Dashboard",
    "provider.welcome":
      "Welcome to VB Analytics",
    "provider.trainingOutcomes":
      "Training Outcomes",
    "provider.trainees": "Trainees",
  },

  mr: {
    // Common
    "common.appName": "व्हीबी अॅनालिटिक्स",
    "common.english": "English",
    "common.marathi": "मराठी",
    "common.logout": "लॉगआउट",
    "common.save": "जतन करा",
    "common.cancel": "रद्द करा",
    "common.reset": "रीसेट करा",
    "common.export": "निर्यात करा",
    "common.search": "शोधा",
    "common.viewAll": "सर्व पहा",
    "common.details": "तपशील",
    "common.status": "स्थिती",
    "common.date": "दिनांक",
    "common.actions": "कृती",
    "common.noData": "डेटा उपलब्ध नाही",
    "common.prototype": "प्रोटोटाइप",
    "common.prototypeDataset": "प्रोटोटाइप डेटासेट",
    "common.simulatedData":
      "सिम्युलेटेड प्रोटोटाइप डेटा",

    // Language
    "language.switch": "भाषा",
    "language.english": "English",
    "language.marathi": "मराठी",

    // Government Header
    "government.header.tagline":
      "व्यावसायिक, कौशल्य व रोजगार विश्लेषण प्लॅटफॉर्म — प्रशिक्षणापासून शाश्वत रोजगारापर्यंत",
    "government.header.state": "MH-STATE",
    "government.header.demo": "SIH डेमो प्रवाह",
    "government.header.notifications": "सूचना",

    // Government Tabs
    "government.tabs.executive":
      "कार्यकारी सारांश आणि रोजगार प्रवाह",
    "government.tabs.district":
      "जिल्हानिहाय माहिती",
    "government.tabs.skills":
      "कौशल्यातील तफावत विश्लेषण",
    "government.tabs.attrition":
      "रोजगार न मिळणे व गळती",
    "government.tabs.impact":
      "कार्यक्रम प्रभाव व दीर्घकालीन विश्लेषण",
    "government.tabs.policy":
      "धोरणात्मक शिफारसी",
    "government.tabs.dataquality":
      "डेटा गुणवत्ता व ओळख सातत्य",
    "government.tabs.audit":
      "ऑडिट नोंद",

    // Government KPI
    "government.kpi.totalEnrolled":
      "एकूण नोंदणी",
    "government.kpi.completed":
      "प्रशिक्षण पूर्ण",
    "government.kpi.certified":
      "प्रमाणित",
    "government.kpi.employed":
      "रोजगारित / सक्रिय",
    "government.kpi.employmentRate":
      "रोजगार दर",
    "government.kpi.retention":
      "६ महिन्यांचा रोजगार टिकाव",
    "government.kpi.avgStartWage":
      "सरासरी प्रारंभिक वेतन",
    "government.kpi.currentWage":
      "सध्याचे वेतन",

    // Government Filters
    "government.filters.title":
      "माहिती विश्लेषण फिल्टर्स",
    "government.filters.district": "जिल्हा",
    "government.filters.sector":
      "क्षेत्र / उद्योग",
    "government.filters.program": "कार्यक्रम",
    "government.filters.employmentType":
      "रोजगार प्रकार",
    "government.filters.gender": "लिंग",
    "government.filters.allDistricts":
      "सर्व ३६ जिल्हे",
    "government.filters.allIndustries":
      "सर्व उद्योग",
    "government.filters.allSchemes":
      "सर्व योजना",
    "government.filters.allOutflowTypes":
      "सर्व रोजगार प्रकार",
    "government.filters.allBeneficiaries":
      "सर्व लाभार्थी",
    "government.filters.reset":
      "फिल्टर्स रीसेट करा",
    "government.filters.export":
      "डॉसियर निर्यात करा",
    "government.filters.activeCriteria":
      "सक्रिय निकष",
    "government.filters.reportingCycle":
      "अहवाल कालावधी",
    "government.filters.dataQuality":
      "डेटा गुणवत्ता सत्यापित",

    // Government Funnel
    "government.funnel.title":
      "प्रशिक्षण ते रोजगार प्रवाह",
    "government.funnel.enrolled": "नोंदणी",
    "government.funnel.trainingCompleted":
      "प्रशिक्षण पूर्ण",
    "government.funnel.certified":
      "मूल्यांकन व प्रमाणित",
    "government.funnel.placed":
      "नियुक्त / रोजगारित",
    "government.funnel.retention":
      "६ महिन्यांचा रोजगार टिकाव पुष्टी",
    "government.funnel.sustainable":
      "१२ महिन्यांची शाश्वत कारकीर्द व वेतनवाढ",

    // Government Analysis
    "government.analysis.policyDropoff":
      "धोरणात्मक महत्त्वाचा टप्पा",
    "government.analysis.demandGap":
      "कौशल्य मागणीतील तफावत",
    "government.analysis.dataQuality":
      "डेटा गुणवत्ता",
    "government.analysis.districts":
      "जिल्हे",
    "government.analysis.alerts":
      "विश्लेषणात्मक सूचना",

    // Verification
    "verification.reported": "नोंदवलेले",
    "verification.matched": "जुळलेले",
    "verification.employerVerified":
      "नियोक्त्याने सत्यापित",
    "verification.candidateConfirmed":
      "उमेदवाराने पुष्टी केलेले",
    "verification.pending": "प्रलंबित",
    "verification.disputed": "विवादित",
    "verification.unknown": "अज्ञात",

    // Trainee
    "trainee.dashboard":
      "प्रशिक्षणार्थी डॅशबोर्ड",
    "trainee.digitalPassport":
      "डिजिटल कौशल्य पासपोर्ट",
    "trainee.employmentOutcome":
      "रोजगार स्थिती नोंदवा / अपडेट करा",
    "trainee.surveys":
      "दीर्घकालीन सर्वेक्षण",
    "trainee.consent":
      "संमती व गोपनीयता नियंत्रण",

    // Employer
    "employer.dashboard":
      "नियोक्ता डॅशबोर्ड",
    "employer.portal":
      "नियोक्ता पोर्टल",
    "employer.verifyOutcomes":
      "रोजगार परिणाम सत्यापित करा",
    "employer.candidateRecords":
      "उमेदवार नोंदी",

    // Provider
    "provider.dashboard":
      "प्रशिक्षण प्रदाता डॅशबोर्ड",
    "provider.welcome":
      "व्हीबी अॅनालिटिक्समध्ये स्वागत आहे",
    "provider.trainingOutcomes":
      "प्रशिक्षण परिणाम",
    "provider.trainees":
      "प्रशिक्षणार्थी",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<
  LanguageContextType | undefined
>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const savedLanguage = localStorage.getItem(
    "vb-language"
  );

  return savedLanguage === "mr" ? "mr" : "en";
}

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>(getInitialLanguage);

  const setLanguage = (value: Language) => {
    setLanguageState(value);
    localStorage.setItem("vb-language", value);
  };

  const t = (key: string): string => {
    return translations[language][key] ??
      translations.en[key] ??
      key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}