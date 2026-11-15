import Image from "next/image";
import type { ComponentProps } from "react";
import { MEDIA_ENABLED } from "@/shared/config/media";

type MediaImageProps = ComponentProps<typeof Image> & {
  allowWhenMediaDisabled?: boolean;
};

export function MediaImage({
  allowWhenMediaDisabled = false,
  ...props
}: MediaImageProps) {
  return MEDIA_ENABLED || allowWhenMediaDisabled ? <Image {...props} /> : null;
}
