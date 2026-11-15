"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/shared/lib/i18n/LanguageContext";

const CertificateModal = dynamic(() => import("./CertificateModal").then((module) => module.CertificateModal));

export function CertificateOrderButton() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-7 rounded-lg bg-[#c32e3a] px-6 py-4 font-semibold text-white hover:bg-[#a82430]"
      >
        {lang === "ru" ? "Оформить сертификат" : "Order a gift certificate"}
      </button>
      {open && createPortal(<CertificateModal onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}
