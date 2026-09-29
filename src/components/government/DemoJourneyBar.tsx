"use client";

import {
  ChevronRight,
  X,
} from "lucide-react";

export default function DemoJourneyBar() {
  return (
    <div className="border-b border-[#f1d58a] bg-[#fff8e8]">
      <div className="mx-auto flex h-[55px] max-w-[1435px] items-center justify-between px-6">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          <span className="rounded-md bg-[#e77c00] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
            SIH Demo Journey
          </span>

          <span className="text-[14px] font-semibold text-[#873b0b]">
            Step 1 of 10: Statewide Baseline (245k Beneficiaries)
          </span>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <span className="text-[13px] text-[#873b0b]">
            Inspect statewide outcomes, funnel, and completion metrics.
          </span>

          <button
            type="button"
            className="rounded-md border border-[#e5c56b] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#27364e]"
          >
            Previous
          </button>

          <button
            type="button"
            className="flex items-center gap-1 rounded-md bg-[#bd5a00] px-3 py-1.5 text-[13px] font-semibold text-white"
          >
            Next Action
            <ChevronRight size={15} />
          </button>

          <button
            type="button"
            aria-label="Close demo journey"
            className="ml-1 text-[#a65b20]"
          >
            <X size={17} />
          </button>

        </div>
      </div>
    </div>
  );
}