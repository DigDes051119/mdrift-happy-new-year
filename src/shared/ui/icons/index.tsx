import type { SVGProps } from "react";

/**
 * Inline SVG glyphs. Kept as components (not <img>/icon font) so they inherit
 * `currentColor`, cost no extra request, and never fall back to the platform
 * emoji rendering that plain "↗"/"✕" text characters get on iOS.
 *
 * Source: Lucide (ISC).
 */
type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

const strokeIconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...strokeIconProps} {...props}>
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...strokeIconProps} {...props}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...strokeIconProps} {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
