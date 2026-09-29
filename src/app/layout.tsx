import type { Metadata } from "next";
import "./globals.css";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { LanguageProvider } from "@/components/language-context";

export const metadata: Metadata = {
  title: "VB Analytics",
  description: "From Training to Sustainable Employment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <div className="vb-login-page">
            <SiteHeader />

            {children}

            <SiteFooter />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}