import type { Metadata } from "next";
import { LegalPlaceholderPage } from "@/app/_components/LegalPlaceholderPage";
import { buildLegalMetadata } from "@/shared/lib/seo";

export const metadata: Metadata = buildLegalMetadata("ru", "terms");

export default function RussianTermsPage() {
  return <LegalPlaceholderPage language="ru" document="terms" />;
}
