import type { Metadata } from "next";
import { LegalPlaceholderPage } from "@/app/_components/LegalPlaceholderPage";
import { buildLegalMetadata } from "@/shared/lib/seo";

export const metadata: Metadata = buildLegalMetadata("en", "privacy");

export default function EnglishPrivacyPage() {
  return <LegalPlaceholderPage language="en" document="privacy" />;
}
