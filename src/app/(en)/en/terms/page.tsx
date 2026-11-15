import type { Metadata } from "next";
import { LegalPlaceholderPage } from "@/app/_components/LegalPlaceholderPage";
import { buildLegalMetadata } from "@/shared/lib/seo";

export const metadata: Metadata = buildLegalMetadata("en", "terms");

export default function EnglishTermsPage() {
  return <LegalPlaceholderPage language="en" document="terms" />;
}
