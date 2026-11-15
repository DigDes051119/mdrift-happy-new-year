import type { Metadata } from "next";
import { LocalizedLandingPage } from "@/app/_components/LocalizedLandingPage";
import { buildPublicPageMetadata } from "@/shared/lib/seo";

export const metadata: Metadata = buildPublicPageMetadata("ru");

export default function RussianHomePage() {
  return <LocalizedLandingPage language="ru" />;
}
