"use client";

import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/useAuthStore";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../src/lib/i18n";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng") || "en";
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(savedLang);
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = savedLang;
    }
  }, [i18n]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lang);
      localStorage.setItem("i18nextLng", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  const isArabic = i18n.language?.startsWith("ar"); // Arabic check

  return (
    <div
      className="relative min-h-[70vh] md:min-h-[90vh] bg-cover bg-center flex items-center justify-center md:justify-start px-6 md:px-12"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="absolute top-6 right-6 z-20 flex items-center gap-4">
        <div className="relative w-28 md:w-32">
  <select
    value={i18n.language?.split("-")[0] || "en"}
    onChange={handleLanguageChange}
    className="
      w-full h-10
      px-3
      text-sm
      text-gray-700
      bg-white
      border border-gray-300
      rounded-md
      focus:outline-none
      focus:border-[#0E3C2F]
      cursor-pointer
    "
  >
    <option value="en">English</option>
    <option value="ar">Arabic</option>
  </select>
</div>



        {isLoggedIn && (
          <Link
            href={user?.id ? "/dashboard" : "/auth"}
            className="text-white text-3xl hover:text-gray-300 transition"
          >
            <FaUserCircle />
          </Link>
        )}
      </div>

      <div
        className={`relative z-10 text-white flex flex-col items-center md:items-start text-center md:text-left ${isArabic ? "md:items-end md:text-right" : ""
          }`}
      >
        <p className="tracking-widest uppercase text-sm mb-2">{t("~Seamless~")}</p>

        <h1 className="text-4xl md:text-6xl mb-4">
          {isArabic
            ? `${t("Hajj & Umrah")} ${t("Transportation Booking")}`
            : (
              <>
                {t("Hajj & Umrah")}
                <br />
                {t("Transportation Booking")}
              </>
            )}
        </h1>

        <span className="mb-6 max-w-md md:max-w-2xl text-gray-300">
          {isArabic ? (
            `${t("Book verified vehicles between Makkah, Madinah, and")} ${t("Jeddah")} ${t("with trusted service providers")}`
          ) : (
            <>
              {t("Book verified vehicles between Makkah, Madinah, and")} <br />
              <span>{t("Jeddah")}</span> {t("with trusted service providers")}
            </>
          )}
        </span>


        <div className="flex flex-col md:flex-row items-center gap-2 mb-6 mt-5">
          <img
            src="Ellipse.png"
            alt="trusted clients"
            className="w-15 h-8 rounded-full"
          />
          <span className="text-sm text-gray-300">
            {t("Trusted by")}{" "}
            <span className="font-semibold">{t("500+ clients")}</span>{" "}
            {t("all over the world")}
          </span>
        </div>

        <div className="flex flex-row gap-4 justify-center md:justify-start flex-nowrap overflow-x-auto">
  <button
    onClick={() => router.push("/Book")}
    className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition min-w-[100px]"
  >
    {t("Booking")}
  </button>

  {user?.id ? (
    // Agar user authenticated hai
    <Link
      href="/dashboard"
      className="flex text-gray-300 items-center gap-2 border border-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black transition whitespace-nowrap justify-center min-w-[120px]"
    >
      {t("Dashboard")} <LuMoveRight />
    </Link>
  ) : (
    // Agar user unauthenticated hai
    <Link
      href="/auth"
      className="flex text-gray-300 items-center gap-2 border border-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black transition whitespace-nowrap justify-center min-w-[120px]"
    >
      {t("Register as Vendor")} <LuMoveRight />
    </Link>
  )}
</div>

      </div>
    </div>
  );
}
