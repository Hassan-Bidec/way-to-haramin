"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function TrustWayToHaramain() {
  const { t } = useTranslation();

  return (
    <section
      dir="ltr" // <-- force LTR so Arabic layout stays like English
      id="why-choose-us"
      className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-20 -mt-35 grid md:grid-cols-2 items-center"
    >
      <div className="rounded-2xl overflow-hidden flex justify-center md:justify-start mb-8 md:mb-0">
        <Image
          src="/Rectangle 19670.png"
          alt={t("Pilgrims in front of hotel")}
          width={600}
          height={500}
          className="w-full max-w-sm sm:max-w-md md:w-[400px] md:h-[400px] h-auto md:ml-38 object-cover rounded-2xl"
        />
      </div>

      {/* Right Side - Content */}
      <div className="text-center md:text-left px-2 sm:px-0">
        <span className="text-sm tracking-[2px] font-semibold uppercase text-gray-800 mb-2 inline-block">
          {t("~ Why Haramain ~")}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-normal mb-6 text-gray-900">
          {t("Trust Way To Haramain")}
        </h1>

        <span className="block text-gray-600 leading-relaxed mb-4 text-sm sm:text-base md:text-base max-w-lg md:max-w-[450px]">
          {t(
            "At Way To Haramain, every journey is treated with the respect and care it deserves. We combine technology, verified service providers, and human support to ensure pilgrims experience peace of mind from the moment they book to the moment they arrive."
          )}
        </span>

        <span className="block text-gray-600 leading-relaxed text-sm sm:text-base md:text-base max-w-lg md:max-w-[450px]">
          {t(
            "From carefully vetted drivers to secure online booking and 24/7 support, every detail is designed to make your sacred travel stress-free and seamless."
          )}
        </span>
      </div>
    </section>
  );
}
