"use client";

import React, { useState, useId } from "react";
import {
  createTelegramDraft,
  openTelegramChat,
  TelegramConsentField,
} from "@/features/telegram-contact";
import { emitPublicAnalyticsEvent } from "@/shared/lib/analytics";
import { siteConfig } from "@/shared/config/site";
import { useLanguage } from "@/shared/lib/i18n/LanguageContext";
import { ModalShell } from "@/shared/ui/modal";
import { CustomDropdown } from "@/shared/ui/dropdown/CustomDropdown";

interface MClubModalProps {
  onClose: () => void;
}

export function MClubModal({ onClose }: MClubModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("BMW M4 (G82 / G83 / F82 / F83)");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const { lang } = useLanguage();
  const isRu = lang === "ru";
  const [city, setCity] = useState(isRu ? "Москва" : "Moscow");
  const titleId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent) return;

    const draft = createTelegramDraft({
      title: isRu
        ? "🔥 ВСТУПЛЕНИЕ В M-COMMUNITY • M DRIFT SCHOOL"
        : "🔥 JOIN M-COMMUNITY • M DRIFT SCHOOL",
      introduction: isRu
        ? "Здравствуйте! Хочу вступить в закрытое сообщество M-Community."
        : "Hello! I would like to join the M-Community.",
      sections: [
        {
          icon: "🏎",
          label: isRu ? "Автомобиль" : "Car",
          value: carModel,
        },
        {
          icon: "👤",
          label: isRu ? "Имя" : "Name",
          value: name,
        },
        {
          icon: "📞",
          label: isRu ? "Телефон" : "Phone",
          value: phone,
        },
        {
          icon: "📍",
          label: isRu ? "Город" : "City",
          value: city,
        },
      ],
    });

    emitPublicAnalyticsEvent({
      name: "lead_intent",
      locale: lang,
      formType: "community",
    });
    openTelegramChat(siteConfig.telegramContactUsername, draft);
  };

  const CAR_OPTIONS = [
    "BMW M2 (G87 / F87)",
    "BMW M3 (G80 / F80 / E92 / E46)",
    "BMW M4 (G82 / G83 / F82 / F83)",
    "BMW M5 (G90 / F90 / F10 / E60)",
    "BMW M6 (F13 / E63 / F12 / E64 / F06)",
    "BMW M8 (F91 / F92 / F93)",
    isRu ? "Другая модель / планирую покупку" : "Other model / planning purchase",
  ];

  return (
    <ModalShell
      labelledById={titleId}
      onClose={onClose}
      closeLabel={isRu ? "Закрыть" : "Close"}
      panelWidthClassName="max-w-5xl xl:max-w-6xl"
    >
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#ea4043]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#ea4043]/5 rounded-full blur-3xl pointer-events-none" />

      <form onSubmit={handleSubmit} className="ym-hide-content relative z-10 w-full">
        <fieldset className="contents">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-3 pr-4">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-[#ea4043] font-bold block">
                  {isRu ? "// ЗАКРЫТЫЙ КЛУБ • M-COMMUNITY" : "// EXCLUSIVE CLUB • M-COMMUNITY"}
                </span>
                <h3
                  id={titleId}
                  className="text-3xl sm:text-4xl xl:text-5xl font-bold uppercase tracking-tight text-white leading-tight"
                >
                  {isRu ? "ВСТУПИТЬ В КЛУБ" : "JOIN M-COMMUNITY"}
                  <span className="text-gradient-red">.</span>
                </h3>
                <p className="text-sm sm:text-base text-[#a0a0a8] font-normal leading-relaxed">
                  {isRu
                    ? "Приватное сообщество владельцев BMW M и выпускников M Drift School. Общение, обмен опытом, контактами и помощь друг другу — только внутри клуба."
                    : "Private community for BMW M owners and M Drift School graduates. Networking, experience exchange, contacts, and mutual support — strictly within the club."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1c1c24] via-[#111117] to-[#08080c] border border-white/20 relative overflow-hidden shadow-2xl space-y-3">
                <div className="text-sm sm:text-base font-bold uppercase tracking-wider text-white flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ea4043]" />
                  <span>{isRu ? "Привилегии резидентов M-Community" : "Resident Privileges"}</span>
                </div>
                <p className="text-sm sm:text-base text-[#b5b5bd] leading-relaxed">
                  {isRu
                    ? "Приоритетный доступ на трек-дни Москвы (ADM Raceway, Moscow Raceway), закрытый чат владельцев M-серии, клубные скидки на обслуживание и спортивную резину."
                    : "Priority access to Moscow track days, private M-owner chat, exclusive service and tire discounts."}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-[#b5b5bd] flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0066b1] shrink-0" />
                <span>
                  {isRu
                    ? "Членство бесплатное. Заявки проходят верификацию."
                    : "Complimentary membership. Verified by club admin."}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <span className="block text-sm sm:text-base uppercase tracking-wider text-white font-bold">
                  {isRu ? "1. Выбор автомобиля" : "1. Select Car"}
                </span>
                <CustomDropdown
                  label={isRu ? "Ваш автомобиль" : "Your Car"}
                  value={carModel}
                  options={CAR_OPTIONS.map((c) => ({ id: c, label: c }))}
                  onChange={(val) => setCarModel(val)}
                />
              </div>

              <div className="space-y-4">
                <span className="block text-sm sm:text-base uppercase tracking-wider text-white font-bold">
                  {isRu ? "2. Контактные данные" : "2. Contact Information"}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`${titleId}-name`}
                      className="block text-xs uppercase tracking-wider text-[#a0a0a8] font-bold mb-1.5"
                    >
                      {isRu ? "Имя и Фамилия *" : "Full Name *"}
                    </label>
                    <input
                      id={`${titleId}-name`}
                      name="name"
                      autoComplete="name"
                      type="text"
                      required
                      maxLength={100}
                      placeholder={isRu ? "Александр" : "Alex"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/[0.04] hover:bg-white/[0.07] focus:bg-white/[0.08] border border-white/15 focus:border-[#ea4043] rounded-xl px-4.5 py-3.5 text-white text-sm sm:text-base placeholder:text-[#55555c] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`${titleId}-phone`}
                      className="block text-xs uppercase tracking-wider text-[#a0a0a8] font-bold mb-1.5"
                    >
                      {isRu ? "Ваш телефон *" : "Phone *"}
                    </label>
                    <input
                      id={`${titleId}-phone`}
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                      required
                      minLength={7}
                      maxLength={32}
                      pattern="[+0-9().\s-]+"
                      placeholder="+7 (999) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/[0.04] hover:bg-white/[0.07] focus:bg-white/[0.08] border border-white/15 focus:border-[#ea4043] rounded-xl px-4.5 py-3.5 text-white text-sm sm:text-base placeholder:text-[#55555c] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`${titleId}-city`}
                    className="block text-xs uppercase tracking-wider text-[#a0a0a8] font-bold mb-1.5"
                  >
                    {isRu ? "Город" : "City"}
                  </label>
                  <input
                    id={`${titleId}-city`}
                    name="city"
                    autoComplete="address-level2"
                    type="text"
                    maxLength={100}
                    placeholder={isRu ? "Москва" : "Moscow"}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white/[0.04] hover:bg-white/[0.07] focus:bg-white/[0.08] border border-white/15 focus:border-[#ea4043] rounded-xl px-4.5 py-3.5 text-white text-sm sm:text-base placeholder:text-[#55555c] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <TelegramConsentField
                  id={`${titleId}-privacy-consent`}
                  checked={privacyConsent}
                  onChange={setPrivacyConsent}
                />
                <button
                  type="submit"
                  className="w-full py-4.5 sm:py-5 px-8 bg-[#ea4043] hover:bg-white text-white hover:text-black font-bold uppercase tracking-[0.14em] text-sm sm:text-base rounded-xl transition-all duration-300 shadow-[0_0_35px_rgba(234,64,67,0.35)] cursor-pointer select-none flex items-center justify-center gap-2 group"
                >
                  <span>{isRu ? "Продолжить в Telegram" : "Continue in Telegram"}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <p className="text-xs text-[#8e8e93] text-center">
                  {isRu
                    ? "Откроем чат с Андреем и подставим выбранные данные. Сообщение отправится только после вашего подтверждения в Telegram."
                    : "We will open Andrey's chat with your selected details. The message is sent only after you confirm it in Telegram."}
                </p>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </ModalShell>
  );
}
