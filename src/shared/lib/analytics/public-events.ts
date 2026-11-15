import type { BookingProgramId } from "@/entities/program";
import type { Language } from "@/shared/lib/i18n/types";

export type PublicAnalyticsEvent = {
  name: "lead_intent";
  locale: Language;
  formType: "training" | "certificate" | "community" | "partnership";
  programId?: BookingProgramId;
};

const EVENT_NAME = "mdrift:analytics";

export const emitPublicAnalyticsEvent = (event: PublicAnalyticsEvent): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<PublicAnalyticsEvent>(EVENT_NAME, { detail: event }),
  );
};
