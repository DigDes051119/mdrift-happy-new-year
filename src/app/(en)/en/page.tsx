import type { Metadata } from "next";
import { LocalizedLandingPage } from "@/app/_components/LocalizedLandingPage";
import { buildPublicPageMetadata } from "@/shared/lib/seo";

export const metadata: Metadata = buildPublicPageMetadata("en");

export default function EnglishHomePage() {
  return <LocalizedLandingPage language="en" />;
}
