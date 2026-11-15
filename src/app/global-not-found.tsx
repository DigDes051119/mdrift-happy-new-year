import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NotFoundPage } from "@/app/_components/NotFoundPage";
import { siteConfig } from "@/shared/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url ?? "http://localhost:3000"),
  title: "404 — страница не найдена | M Drift School",
  description: "Запрошенная страница M Drift School не найдена.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="ru" className={`dark ${inter.variable}`}>
      <body className="bg-[#040404] text-white antialiased">
        <NotFoundPage />
      </body>
    </html>
  );
}
