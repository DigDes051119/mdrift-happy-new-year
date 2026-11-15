import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import type { SiteLanguage } from "@/shared/config/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

type LocalizedRootLayoutProps = {
  children: ReactNode;
  language: SiteLanguage;
};

export function LocalizedRootLayout({
  children,
  language,
}: LocalizedRootLayoutProps) {
  const languageTag = language === "ru" ? "ru" : "en";

  return (
    <html lang={languageTag} className={`dark ${inter.variable}`}>
      <body className="antialiased bg-[#040404] text-[#f5f5f7]">
        {children}
      </body>
    </html>
  );
}
