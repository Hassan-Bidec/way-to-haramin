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
          className="w-full max-w-sm sm:max-w-md md:w-[400px] md:h-[500px] h-auto md:ml-38 object-cover rounded-2xl"
        />
      </div>

      {/* Right Side - Content */}
      <div className="text-center md:text-left px-2 sm:px-0">
        <span className="text-sm tracking-[2px] font-semibold uppercase text-gray-800 mb-2 inline-block">
          {t("~ Why Haramain ~")}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-normal mb-6 text-gray-900">
          {t("About Way To Haramain")}
        </h1>

        <span className="block text-gray-600 leading-relaxed mb-4 text-sm sm:text-base md:text-base max-w-lg md:max-w-[450px]">
          {t(
            "Way To Haramain is a next-generation transportation platform built to modernize and simplify travel services for Hajj and Umrah pilgrims. Headquartered in Saudi Arabia, we operate at the heart of the world’s largest pilgrimage ecosystem.With over 15+ years of hands-on experience in Hajj and Umrah transportation services, our founders and leadership team deeply understand the complexities, challenges, and operational realities of this sector."
          )}
        </span>

        <span className="block text-gray-600 leading-relaxed text-sm sm:text-base md:text-base max-w-lg md:max-w-[450px]">
          {t(
            "Our startup is proudly supported by the Ministry of Communications and Information Technology (MCIT) for our innovative technology-driven idea. We also participated in the TGA Hackathon NAQL3 Program, organized by the Transport General Authority, and were honored to be selected among the top 50 startups out of 250 innovative ideas. This recognition highlights our commitment to driving technological innovation and shaping the future of transport in Saudi Arabia."
          )}
        </span>
      </div>
    </section>
  );
}
