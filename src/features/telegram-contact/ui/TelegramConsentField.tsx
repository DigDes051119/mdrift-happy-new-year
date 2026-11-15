"use client";

import { useState } from "react";
import Link from "next/link";
import { getLocalizedPath } from "@/shared/config/site";
import { useLanguage } from "@/shared/lib/i18n/LanguageContext";

type TelegramConsentFieldProps = {
  readonly id: string;
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
};

export function TelegramConsentField({
  id,
  checked,
  onChange,
}: TelegramConsentFieldProps) {
  const [showError, setShowError] = useState(false);
  const { lang, t } = useLanguage();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div className="space-y-1.5">
      <label className="flex items-start gap-3 text-xs sm:text-sm text-[#b5b5bd] leading-relaxed cursor-pointer">
        <input
          id={id}
          type="checkbox"
          required
          checked={checked}
          aria-invalid={showError || undefined}
          aria-describedby={`${hintId}${showError ? ` ${errorId}` : ""}`}
          onInvalid={() => setShowError(true)}
          onChange={(event) => {
            setShowError(false);
            onChange(event.target.checked);
          }}
          className="mt-0.5 size-5 shrink-0 accent-[#ea4043]"
        />
        <span id={hintId}>
          {t.telegramContact.consent}{" "}
          <Link
            href={getLocalizedPath(lang, "privacy")}
            target="_blank"
            className="text-white underline underline-offset-2 hover:text-[#ea4043]"
          >
            {t.footer.privacy}
          </Link>
        </span>
      </label>
      <p id={errorId} role="alert" className="pl-8 text-xs text-[#ff6b6e]">
        {showError ? t.telegramContact.consentRequired : ""}
      </p>
    </div>
  );
}
