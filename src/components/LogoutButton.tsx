"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Prototype logout
    // Clear any demo session data if added later.
    localStorage.removeItem("vb-analytics-role");

    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </button>
  );
}