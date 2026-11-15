import { GiftCertificatePage } from "@/app/_components/GiftCertificatePage";
import { buildPublicPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPublicPageMetadata("ru", "certificate");

export default function Page() {
  return <GiftCertificatePage language="ru" />;
}
