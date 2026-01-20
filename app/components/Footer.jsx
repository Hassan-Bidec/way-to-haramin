"use client";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "../../src/lib/i18n";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0D3C34] text-white py-6 md:py-8 px-6 md:px-16">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-0">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          {/* 🔹 Logo Image */}
          <img
            src="/logo11.png"
            alt={t("Way To Haramain Logo")}
            className="h-10 md:h-12 object-contain"
          />

          <div className="hidden md:block h-6 w-px bg-gray-400"></div>

          {/* Links + Copyright Container */}
          <div className="flex flex-col gap-1 md:gap-0">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 text-sm">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:underline"
              >
                {t("How It Works")}
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("vehicle-categories")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:underline"
              >
                {t("Vehicle Categories")}
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("why-choose-us")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:underline"
              >
                {t("Why Choose Us")}
              </a>
            </div>

            <p className="text-xs text-gray-300 mt-2 md:mt-1">
              {t("Copyright")} © 2025 {t("Way To Haramain")}
            </p>
          </div>
        </div>

        {/* Right Section (Social + Email) */}
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="flex items-center gap-4 text-white">
            <Link href="https://www.instagram.com/" target="_blank" className="hover:text-gray-300">
              <FaInstagram size={18} />
            </Link>

            <Link href="https://www.facebook.com/" target="_blank" className="hover:text-gray-300">
              <FaFacebookF size={18} />
            </Link>

            <Link href="https://www.whatsapp.com/?lang=en" target="_blank" className="hover:text-gray-300">
              <FaWhatsapp size={18} />
            </Link>
          </div>
          <p className="text-xs text-gray-300">{t("support_email")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
