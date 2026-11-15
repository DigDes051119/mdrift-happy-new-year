export type TelegramDraftSection = {
  readonly label: string;
  readonly value: string;
  readonly icon?: string;
};

export type TelegramDraftOptions = {
  readonly title?: string;
  readonly introduction: string;
  readonly sections: readonly TelegramDraftSection[];
};

const telegramUsername = /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/u;

function normalizeDraftText(value: string): string {
  return value.replace(/\r\n?/gu, "\n").trim();
}

export function createTelegramDraft(
  introductionOrOptions: string | TelegramDraftOptions,
  legacySections?: readonly TelegramDraftSection[],
): string {
  let title: string | undefined;
  let introduction = "";
  let sections: readonly TelegramDraftSection[] = [];

  if (typeof introductionOrOptions === "string") {
    introduction = introductionOrOptions;
    sections = legacySections || [];
  } else {
    title = introductionOrOptions.title;
    introduction = introductionOrOptions.introduction;
    sections = introductionOrOptions.sections;
  }

  const parts: string[] = [];

  if (title) {
    parts.push(normalizeDraftText(title));
  }

  if (introduction) {
    parts.push(normalizeDraftText(introduction));
  }

  if (sections.length > 0) {
    const formattedSections = sections
      .map(({ label, value, icon }) => {
        const prefix = icon ? `${icon} ` : "";
        const cleanValue = normalizeDraftText(value) || "—";
        return `${prefix}${normalizeDraftText(label)}: ${cleanValue}`;
      })
      .join("\n");
    parts.push(formattedSections);
  }

  return parts.join("\n\n");
}

export function createTelegramChatLink(
  username: string,
  draft: string,
): string {
  const normalizedUsername = username.trim().replace(/^@/u, "");
  const normalizedDraft = normalizeDraftText(draft);

  if (!telegramUsername.test(normalizedUsername) || !normalizedDraft) {
    throw new Error("telegram_chat_link_invalid");
  }

  return `https://t.me/${normalizedUsername}?text=${encodeURIComponent(normalizedDraft)}`;
}

export function openTelegramChat(username: string, draft: string): void {
  window.open(
    createTelegramChatLink(username, draft),
    "_blank",
    "noopener,noreferrer",
  );
}
