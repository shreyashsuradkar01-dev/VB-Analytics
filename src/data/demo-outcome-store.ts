export type DemoEmploymentStatus = "Pending Verification" | "Employer Verified";

export type DemoEmploymentOutcome = {
  traineeId: string;
  candidate: string;
  employer: string;
  role: string;
  wage: string;
  joining: string;
  location: string;
  status: DemoEmploymentStatus;
  submittedAt: string;
  verifiedAt?: string;
};

const STORAGE_KEY = "vb-demo-employment-outcome";
const EVENT_NAME = "vb-employment-outcome-updated";

export const initialDemoEmploymentOutcome: DemoEmploymentOutcome = {
  traineeId: "VB-10452",
  candidate: "Rahul Suresh Shinde",
  employer: "Tata Technologies Ltd",
  role: "Junior Cloud Associate",
  wage: "₹3.8 LPA",
  joining: "01 Sep 2026",
  location: "Hinjawadi, Pune",
  status: "Pending Verification",
  submittedAt: "01 Sep 2026",
};

export function getDemoOutcome(): DemoEmploymentOutcome {
  if (typeof window === "undefined") return initialDemoEmploymentOutcome;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialDemoEmploymentOutcome)
      );
      return initialDemoEmploymentOutcome;
    }
    return JSON.parse(raw) as DemoEmploymentOutcome;
  } catch {
    return initialDemoEmploymentOutcome;
  }
}

export function saveDemoOutcome(
  outcome: DemoEmploymentOutcome
): DemoEmploymentOutcome {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(outcome));
    window.dispatchEvent(new Event(EVENT_NAME));
  }
  return outcome;
}

export function submitDemoEmployment() {
  return saveDemoOutcome({
    ...getDemoOutcome(),
    status: "Pending Verification",
    submittedAt: new Date().toLocaleString("en-IN"),
    verifiedAt: undefined,
  });
}

export function verifyDemoEmployment() {
  return saveDemoOutcome({
    ...getDemoOutcome(),
    status: "Employer Verified",
    verifiedAt: new Date().toLocaleString("en-IN"),
  });
}

export function subscribeDemoOutcome(
  callback: (outcome: DemoEmploymentOutcome) => void
) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback(getDemoOutcome());
  };

  const handleCustom = () => callback(getDemoOutcome());

  window.addEventListener("storage", handleStorage);
  window.addEventListener(EVENT_NAME, handleCustom);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(EVENT_NAME, handleCustom);
  };
}
