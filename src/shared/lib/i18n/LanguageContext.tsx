"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import type { Language } from "./types";
import { translations } from "./translations";

interface LanguageContextValue {
  lang: Language;
  t: typeof translations.ru;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({
  children,
  language,
}: {
  children: ReactNode;
  language: Language;
}) {
  const value: LanguageContextValue = {
    lang: language,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
