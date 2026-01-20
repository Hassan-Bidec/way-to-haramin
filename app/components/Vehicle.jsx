"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Vehicle() {
  const { t } = useTranslation();

  const vehicles = [
    { id: 1, name: t("Coaster"), img: "/Coaster.png" },
    { id: 2, name: t("GMC"), img: "/GMC.png" },
    { id: 3, name: t("Lexus"), img: "/Lexus.png" },
    { id: 4, name: t("Staria"), img: "/Staria.png" },
  ];

  return (
    <section
      id="vehicle-categories"
      dir="ltr" // <-- force LTR so Arabic layout stays like English
      className="py-24 md:py-36 relative -mt-40"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Section */}
        <div
          className="relative rounded-2xl overflow-hidden text-white px-6 sm:px-10 md:px-16 py-60 sm:py-36 lg:py-42 flex flex-col md:flex-row justify-between items-start"
          style={{
            backgroundImage: "url('/bgimg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full text-center md:text-left -mt-10">
            <p className="uppercase font-semibold tracking-widest text-xs sm:text-sm mb-2 text-gray-300 -mt-30 sm:-mt-10">
              {t("~ Choose The Right ~")}
            </p>
            <h1 className="text-2xl sm:text-2xl md:text-4xl mb-3 leading-tight">
              {t("Vehicle For Your Journey")}
            </h1>
          </div>

          <div className="max-w-sm z-10 mx-auto md:mx-0 text-center md:text-left flex flex-col justify-start">
            <p className="text-gray-200 text-sm sm:text-base md:text-[15px] leading-relaxed -mt-20 md:py-5">
              {t(
                "From luxury sedans to spacious coasters, select the ride that best suits your comfort and group size."
              )}
            </p>
          </div>
        </div>

        {/* Vehicle Cards */}
        <div className="relative z-20">
          {/* Mobile Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:hidden gap-x-4 -gap-y-10 -mt-60 sm:mt-10 place-items-center px-2 sm:px-6">
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className="rounded-xl overflow-hidden h-auto w-full sm:w-[90%]"
              >
                <Image
                  src={vehicle.img}
                  alt={vehicle.name}
                  width={400}
                  height={400}
                  className="object-cover w-full sm:h-44"
                />
                <div className="p-4 text-center">
                  <h3
                    className={`text-base sm:text-lg font-semibold -mt-3 ${
                      index < 2 ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {vehicle.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 gap-0 md:-mt-25 place-items-center px-4 sm:px-6 md:px-14">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="rounded-xl overflow-hidden bg-white w-full sm:w-[90%] md:w-[90%]"
              >
                <Image
                  src={vehicle.img}
                  alt={vehicle.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-36 sm:h-44 md:h-70"
                />
                <div className="p-4 text-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                    {vehicle.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
