import Image from "next/image";
import { BRAND_LOGO_ENABLED } from "@/shared/config/media";
import { siteConfig } from "@/shared/config/site";

type BrandLogoProps = {
  className: string;
  fallbackClassName: string;
  preload?: boolean;
};

export function BrandLogo({
  className,
  fallbackClassName,
  preload = false,
}: BrandLogoProps) {
  return BRAND_LOGO_ENABLED ? (
    <Image
      src={siteConfig.assets.logo}
      alt="M Drift School"
      width={1200}
      height={277}
      preload={preload}
      className={className}
    />
  ) : (
    <span className={fallbackClassName}>M Drift School</span>
  );
}
