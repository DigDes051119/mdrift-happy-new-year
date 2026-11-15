import { ImageResponse } from "next/og";
import { siteConfig, type SiteLanguage } from "@/shared/config/site";

export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";

export function createSocialImage(language: SiteLanguage) {
  const strapline =
    language === "ru"
      ? "ДРИФТ · КОНТРОЛЬ · BMW M"
      : "DRIFT · CONTROL · BMW M";

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          color: "#f2f2f0",
          background:
            "radial-gradient(circle at 85% 20%, #15233b 0%, #07080b 36%, #030303 72%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-30px",
            bottom: "-230px",
            display: "flex",
            color: "#141820",
            fontSize: "660px",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          M
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "25px",
            fontWeight: 800,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "52px",
              height: "52px",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              background:
                "linear-gradient(135deg, #0066b1 0%, #1d4d9b 48%, #ea4043 49%, #ea4043 100%)",
              fontSize: "31px",
            }}
          >
            M
          </div>
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "980px",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <div
            style={{
              color: "#ea4043",
              fontSize: "20px",
              fontWeight: 800,
              letterSpacing: "5px",
              textTransform: "uppercase",
            }}
          >
            {language === "ru" ? "ШКОЛА УПРАВЛЕНИЯ" : "DRIVER TRAINING"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "78px",
              fontWeight: 900,
              letterSpacing: "-5px",
              lineHeight: 0.94,
              textTransform: "uppercase",
            }}
          >
            {strapline}
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
