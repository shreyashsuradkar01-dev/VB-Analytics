"use client";

import {
  Bell,
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { useLanguage } from "@/components/language-context";

export default function GovernmentHeader() {
  const { language, t } = useLanguage();

  return (
    <header className="border-t-2 border-[#102a56] bg-white">
      <div className="mx-auto flex h-[82px] max-w-[1435px] items-center justify-between px-6">

        {/* LEFT BRAND */}
        <div className="flex items-center gap-4">

          {/* VB LOGO */}
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[10px] bg-[#102a56]">
            <span className="text-[18px] font-black tracking-tight">
              <span className="text-[#f5a400]">V</span>
              <span className="text-white">B</span>
            </span>
          </div>

          {/* BRAND TEXT */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[25px] font-extrabold leading-none text-[#101d35]">
                VB Analytics
              </h1>

              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-[#102a56]">
                {t("government.header.state")}
              </span>
            </div>

            <p className="mt-1 text-[13px] text-slate-500">
              {language === "mr" ? (
                <>
                  व्यावसायिक, कौशल्य व रोजगार विश्लेषण प्लॅटफॉर्म —
                  <span className="ml-1 italic">
                    प्रशिक्षणापासून शाश्वत रोजगारापर्यंत
                  </span>
                </>
              ) : (
                <>
                  Vocational, Skills &amp; Employment Analytics Platform —
                  <span className="ml-1 italic">
                    From Training to Sustainable Employment
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* DIVIDER */}
          <div className="h-10 w-px bg-slate-200" />


          {/* NOTIFICATION */}
          <button
            type="button"
            aria-label={t("government.header.notifications")}
            className="relative flex h-9 w-9 items-center justify-center text-slate-500 transition hover:text-[#102a56]"
          >
            <Bell size={21} />

            <span className="absolute right-[4px] top-[4px] h-[7px] w-[7px] rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}