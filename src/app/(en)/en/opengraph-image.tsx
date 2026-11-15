import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/app/_components/create-social-image";

export const alt = "M Drift School — BMW M driver training";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return createSocialImage("en");
}
