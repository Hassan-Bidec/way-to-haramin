"use client"; // make this layout a client component to handle i18n changes

import React, { useEffect, useState } from "react";
import AuthProvider from "./components/AuthProvider";
import "./globals.css";
import "../lib/i18n"; // initialize i18next
import { useTranslation } from "react-i18next";

export default function RootLayout({ children }) {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  useEffect(() => {
    // update document language and direction on language change
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    // listen for i18n language change event
    const handleChange = (lng) => setLang(lng);
    i18n.on("languageChanged", handleChange);
    return () => {
      i18n.off("languageChanged", handleChange);
    };
  }, [i18n]);

  return (
    <html lang={lang}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
