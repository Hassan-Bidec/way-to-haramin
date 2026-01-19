"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const Travelers = () => {
  return (
    <section className="w-[90%] sm:w-[85%] md:w-[75%] mx-auto flex flex-col md:flex-row items-center justify-between py-16 md:py-24 gap-10 relative">
      {/* Left Image */}
      <div className="w-full md:w-1/2 relative z-0">
        <Image
          src="/kaba.png"
          alt="Kaaba"
          width={600}
          height={20}
          className="rounded-2xl object-cover w-full h-auto"
          priority
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 flex flex-col space-y-8 relative z-10">
        {/* Heading */}
        <div className="space-y-3 mt-5 sm:mt-0">
          <p className="text-sm font-semibold tracking-widest text-gray-800 uppercase">
            ~ What Our ~
          </p>
          <h1 className="text-3xl sm:text-4xl font-normal text-gray-900">
            Travelers Say
          </h1>
          <span className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-full sm:max-w-md">
            Trusted by pilgrims for safe, comfortable, and reliable travel
            between Makkah, Madinah, and Jeddah, with verified vehicles and
            instant WhatsApp confirmations.
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 space-y-2 w-full md:w-[130%] md:-left-[23%] relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
              <div>
                <h1 className="font-normal text-gray-900 text-sm">
                  Ahmed R., Jeddah
                </h1>
                <span className="text-gray-500 text-xs">Umrah Traveler</span>
              </div>
            </div>

            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>

          {/* Review Text */}
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Trusted by pilgrims for safe, comfortable, and reliable travel
            between Makkah, Madinah, and Jeddah, with verified vehicles and
            instant WhatsApp confirmations.
          </p>

          {/* Navigation Arrows
          <div className="flex justify-end gap-4 pt-4 text-gray-600">
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <IoArrowBackOutline size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <IoArrowForwardOutline size={18} />
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Travelers;
