// src/i18n.js
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // load translations from /public folder
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // integrate with React
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "localStorage", "htmlTag", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/{{lng}}/translation.json", // note: matches your public folder
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
