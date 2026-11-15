import type { Metadata, Viewport } from "next";
import { LocalizedRootLayout } from "@/app/_components/LocalizedRootLayout";
import { siteConfig } from "@/shared/config/site";
import { MEDIA_ENABLED } from "@/shared/config/media";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url ?? "http://localhost:3000"),
  title: {
    default: siteConfig.locales.en.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.locales.en.description,
  icons: MEDIA_ENABLED ? {
    icon: [
      {
        url: siteConfig.assets.icon192,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: siteConfig.assets.icon512,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: siteConfig.assets.favicon,
    apple: [
      {
        url: siteConfig.assets.appleTouchIcon,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  } : undefined,
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#040404",
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LocalizedRootLayout language="en">{children}</LocalizedRootLayout>;
}
