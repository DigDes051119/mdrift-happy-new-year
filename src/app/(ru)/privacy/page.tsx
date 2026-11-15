import type { Metadata } from "next";
import { LegalPlaceholderPage } from "@/app/_components/LegalPlaceholderPage";
import { buildLegalMetadata } from "@/shared/lib/seo";

export const metadata: Metadata = buildLegalMetadata("ru", "privacy");

export default function RussianPrivacyPage() {
  return <LegalPlaceholderPage language="ru" document="privacy" />;
}
