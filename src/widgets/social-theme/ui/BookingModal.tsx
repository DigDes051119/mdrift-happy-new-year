"use client";

import React, { useState, useId, useMemo } from "react";
import {
  isBookingProgramId,
  type BookingProgramId,
} from "@/entities/program";
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

interface BookingModalProps {
  onClose: () => void;
  initialTariffId?: BookingProgramId;
  initialCarModel?: string;
}

export function BookingModal({
  onClose,
  initialTariffId,
  initialCarModel,
}: BookingModalProps) {
  const [selectedTariff, setSelectedTariff] = useState<BookingProgramId>(
    () => initialTariffId ?? "pro-progress",
  );
  const [carType, setCarType] = useState<"school" | "custom">(() => {
    if (initialCarModel && initialCarModel !== "BMW M3 F80" && !initialCarModel.includes("F80")) {
      return "custom";
    }
    return "school";
  });
  const [customCar, setCustomCar] = useState(() => {
    if (initialCarModel && initialCarModel !== "BMW M3 F80" && !initialCarModel.includes("F80")) {
      return initialCarModel;
    }
    return "";
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const { lang, t } = useLanguage();
  const isRu = lang === "ru";
  const titleId = useId();

  const effectiveCar =
    carType === "school"
      ? "BMW M3 F80"
      : customCar.trim() || (isRu ? "Свой автомобиль" : "Own Car");

  const currentProgramObj = useMemo(() => {
    return t.bookingModal.programs.find((program) => program.id === selectedTariff);
  }, [selectedTariff, t.bookingModal.programs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent || !currentProgramObj) return;
    if (carType === "custom" && !customCar.trim()) return;

    const draft = createTelegramDraft({
      title: isRu
        ? "🏁 ЗАЯВКА НА ТРЕНИРОВКУ • M DRIFT SCHOOL"
        : "🏁 TRAINING BOOKING • M DRIFT SCHOOL",
      introduction: isRu
        ? "Здравствуйте! Хочу записаться на тренировку."
        : "Hello! I would like to book a training session.",
      sections: [
        {
          icon: "⏱",
          label: isRu ? "Программа" : "Program",
          value: currentProgramObj.label,
        },
        {
          icon: "🏎",
          label: isRu ? "Автомобиль" : "Car",
          value: effectiveCar,
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
      ],
    });

    emitPublicAnalyticsEvent({
      name: "lead_intent",
      locale: lang,
      formType: "training",
      programId: selectedTariff,
    });
    openTelegramChat(siteConfig.telegramContactUsername, draft);
  };

  return (
    <ModalShell
      labelledById={titleId}
      onClose={onClose}
      closeLabel={isRu ? "Закрыть" : "Close"}
      panelWidthClassName="max-w-5xl xl:max-w-6xl"
    >
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#ea4043]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#0066b1]/10 rounded-full blur-3xl pointer-events-none" />

      <form onSubmit={handleSubmit} className="ym-hide-content relative z-10 w-full">
        <fieldset className="contents">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-3 pr-4">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-[#ea4043] font-bold block">
                  {isRu ? "// ОНЛАЙН-БРОНИРОВАНИЕ • ADM RACEWAY" : "// ONLINE BOOKING • ADM RACEWAY"}
                </span>
                <h3
                  id={titleId}
                  className="text-3xl sm:text-4xl xl:text-5xl font-bold uppercase tracking-tight text-white leading-tight"
                >
                  {isRu ? "ЗАПИСЬ НА ТРЕНИРОВКУ" : "BOOK TRAINING"}
                  <span className="text-gradient-red">.</span>
                </h3>
                <p className="text-sm sm:text-base text-[#a0a0a8] font-normal leading-relaxed">
                  {isRu
                    ? "Выберите автомобиль и программу. Шеф-инструктор свяжется с вами для согласования даты и времени заезда."
                    : "Select your car and training program. The chief instructor will reach out to schedule your session."}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1c1c24] via-[#111117] to-[#08080c] border border-white/20 relative overflow-hidden shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#ea4043] font-bold">
                    {isRu ? "ВЫБРАННЫЙ СЛОТ" : "SELECTED SLOT"}
                  </span>
                  <span className="text-xs font-mono text-[#a0a0a8] border border-white/15 px-2 py-0.5 rounded bg-black/40">
                    ADM RACEWAY
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-[#8e8e93] uppercase font-bold tracking-wider">
                    {isRu ? "Автомобиль:" : "Car:"}
                  </div>
                  <div className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                    {effectiveCar}
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-white/10">
                  <div className="text-xs text-[#8e8e93] uppercase font-bold tracking-wider">
                    {isRu ? "Программа:" : "Program:"}
                  </div>
                  <div className="text-sm sm:text-base font-medium text-[#d1d1d6] line-clamp-2">
                    {currentProgramObj?.label || selectedTariff}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-[#b5b5bd] flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ea4043] shrink-0" />
                <span>{t.bookingModal.instructorNote}</span>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <span className="block text-sm sm:text-base uppercase tracking-wider text-white font-bold">
                  {isRu ? "1. Параметры тренировки" : "1. Training Parameters"}
                </span>
                  
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  {/* Car Selector with Changer */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#a0a0a8] font-bold mb-1.5">
                      {t.bookingModal.carLabel}
                    </label>

                    {/* Чейнджер: BMW M3 F80 или Свой автомобиль */}
                    <div className="grid grid-cols-2 p-1 bg-black/60 border border-white/15 rounded-xl gap-1">
                      <button
                        type="button"
                        onClick={() => setCarType("school")}
                        className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          carType === "school"
                            ? "bg-[#ea4043] text-white shadow-[0_0_15px_rgba(234,64,67,0.4)]"
                            : "text-[#a0a0a8] hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        BMW M3 F80
                      </button>
                      <button
                        type="button"
                        onClick={() => setCarType("custom")}
                        className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          carType === "custom"
                            ? "bg-[#ea4043] text-white shadow-[0_0_15px_rgba(234,64,67,0.4)]"
                            : "text-[#a0a0a8] hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        {t.bookingModal.carOptionCustom}
                      </button>
                    </div>

                    {/* Поле в зависимости от режима */}
                    {carType === "school" ? (
                      <div className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 flex items-center justify-between text-sm text-white">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#ea4043] shadow-[0_0_8px_#ea4043]" />
                          <span className="font-bold tracking-tight">BMW M3 F80</span>
                          <span className="text-xs text-[#8e8e93] font-normal">
                            ({t.bookingModal.schoolCarBadge})
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#ea4043] font-bold border border-[#ea4043]/30 px-2 py-0.5 rounded bg-[#ea4043]/10">
                          READY
                        </span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        required
                        maxLength={80}
                        placeholder={t.bookingModal.customCarPlaceholder}
                        value={customCar}
                        onChange={(e) => setCustomCar(e.target.value)}
                        className="w-full bg-white/[0.04] hover:bg-white/[0.07] focus:bg-white/[0.08] border border-white/15 focus:border-[#ea4043] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#55555c] focus:outline-none transition-colors"
                      />
                    )}
                  </div>

                  <CustomDropdown
                    label={t.bookingModal.programLabel}
                    value={selectedTariff}
                    options={t.bookingModal.programs}
                    onChange={(value) => {
                      if (isBookingProgramId(value)) setSelectedTariff(value);
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <span className="block text-sm sm:text-base uppercase tracking-wider text-white font-bold">
                  {isRu ? "2. Контактные данные пилота" : "2. Pilot Contact Details"}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`${titleId}-name`}
                      className="block text-xs uppercase tracking-wider text-[#a0a0a8] font-bold mb-1.5"
                    >
                      {t.bookingModal.nameLabel}
                    </label>
                    <input
                      id={`${titleId}-name`}
                      name="name"
                      autoComplete="name"
                      type="text"
                      required
                      maxLength={100}
                      placeholder={t.bookingModal.namePlaceholder}
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
                      {t.bookingModal.phoneLabel}
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
                      placeholder={t.bookingModal.phonePlaceholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/[0.04] hover:bg-white/[0.07] focus:bg-white/[0.08] border border-white/15 focus:border-[#ea4043] rounded-xl px-4.5 py-3.5 text-white text-sm sm:text-base placeholder:text-[#55555c] focus:outline-none transition-colors"
                    />
                  </div>
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
                  <span>{t.bookingModal.submitBtn}</span>
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
