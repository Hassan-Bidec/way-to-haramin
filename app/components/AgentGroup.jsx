"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const AgentGroup = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <section
      dir="ltr" // <-- force LTR so Arabic doesn't break layout
      className="relative w-[90%] mx-auto h-[90vh] md:h-[90vh] flex flex-col md:flex-row items-center justify-between overflow-hidden bg-white"
    >
      {/* 🔹 Background Image */}
      <Image
        src="/bnr.png"
        alt={t("Background Banner")}
        fill
        className="object-cover object-center"
      />

      {/* 🔹 Text Section */}
     <div className="relative z-10 flex-1 pl-4 sm:pl-8 md:pl-16 text-gray-900 mb-6 md:mb-0">
  <p className="text-sm font-semibold tracking-wider text-gray-600 uppercase mb-2">
    {t("~ For Travel ~")}
  </p>

  <h1 className="text-3xl md:text-4xl leading-tight mb-4">
    {t("Agents Group")} <br /> {t("Organizers")}
  </h1>

  <span className="text-gray-700 text-sm md:text-base leading-relaxed block max-w-[20rem] md:max-w-md">
    {t(
      "To create a unified digital ecosystem that connects transport vendors, hotels, airlines, travel agents, and pilgrims into one seamless booking and management platform."
    )}
  </span>

  {/* What We Do */}
  <h2 className="text-lg font-medium text-gray-900 mt-4 mb-2">
    {t("What We Do")}
  </h2>

  <span className="text-gray-700 text-sm md:text-base leading-relaxed block max-w-[20rem] md:max-w-md mb-2">
    {t("We provide a centralized digital marketplace that allows:")}
  </span>

  <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base leading-relaxed max-w-[20rem] md:max-w-md space-y-1">
    <li>{t("Pilgrims to easily search, compare, and book transportation")}</li>
    <li>{t("Travel agents to manage bookings, generate vouchers, and track operations")}</li>
    <li>{t("Transport vendors to list vehicles, manage inventory, and receive bookings")}</li>
  </ul>

  <span className="text-gray-700 text-sm md:text-base leading-relaxed block max-w-[20rem] md:max-w-md mt-2">
    {t(
      "Our platform supports real-time pricing, availability-based discounts, smart routing, and vendor management, enabling transparency, speed, and efficiency."
    )}
  </span>

  <button
    onClick={() => router.push("/dashboard")}
    className="bg-white mt-5 text-gray-800 border border-gray-300 text-sm font-medium px-6 py-2 rounded-md hover:bg-gray-200 transition"
  >
    {t("Join an Agent")}
  </button>
</div>


      <div className="relative flex-1 flex justify-center md:justify-end items-end">
        <Image
          src="/cpl.png"
          alt={t("Agent")}
          width={550}
          height={350}
          className="object-contain translate-y-2 translate-x-2 md:translate-x-10"
        />
      </div>
    </section>
  );
};

export default AgentGroup;
