"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Simple() {
  const { t } = useTranslation();

  const vehicles = [
    {
      id: 1,
      name: t("Search Your Route"),
      img: "/kaba1.png",
      description: t("Find your ideal route between Makkah, Madinah, and Jeddah in a few clicks."),
    },
    {
      id: 2,
      name: t("Select Vehicle"),
      img: "/kaba2.png",
      description: t("Choose the vehicle that suits your comfort and group size."),
    },
    {
      id: 3,
      name: t("Travel Comfortably"),
      img: "/kaba3.png",
      description: t("Enjoy reliable travel with trusted drivers and instant WhatsApp updates."),
    },
    {
      id: 4,
      name: t("Book & Pay"),
      img: "/kaba4.png",
      description: t("Instant ride confirmation with secure Mada, Visa, and Apple Pay payments."),
    },
  ];

  return (
    <section
      className="relative py-20 bg-gray-50 bg-cover bg-center"
      style={{
        backgroundImage: "url('/s-1.png')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white"></div>
      <div className="absolute inset-0 bg-white/90"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <span className="uppercase font-semibold tracking-widest text-sm text-gray-800 mb-2">
          {t("~ Travel with Ease ~")}
        </span>
        <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
          {t("Makkah & Madinah in 4 Simple Steps")}
        </h1>
        <p className="text-gray-600 text-[14px] mb-12 max-w-2xl mx-auto">
          {t("From searching your Car comfortably, we make your sacred journey seamless and stress-free.")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 md:px-15">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="rounded-xl overflow-hidden w-full mx-auto">
              <div className="w-full h-44 sm:h-52 md:h-70">
                <Image
                  src={vehicle.img}
                  alt={vehicle.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                  {vehicle.name}
                </h3>
                <span className="text-xs sm:text-sm md:text-base w-full line-clamp-4 text-gray-700">
                  {vehicle.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
