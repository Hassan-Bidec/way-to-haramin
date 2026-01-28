"use client";

import { t } from "i18next";
import { ArrowLeft, MapPin, Car } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// Data arrays (Routes, Cars, Prices) remains the same as before...
const routes = ["Jeddah Airport to Makkah Hotel", "Makkah Hotel to Jeddah Airport", "Makkah Hotel to Madina Hotel", "Madina Hotel to Makkah Hotel", "Madina Airport to Madina Hotel", "Madina Hotel to Madina Airport", "Makkah Ziyarat", "Madina Ziyarat", "Jeddah Airport to Madina Hotel", "Jeddah to Taif & Return", "Makkah to Taif & Return", "Jeddah Airport to Jeddah Hotel", "Hotel to Train Station", "Train Station to Hotel", "Per Hour Rate"];
const cars = [{ name: "Camry, Sonata", sub: "" }, { name: "Hyundai H1", sub: "" }, { name: "GMC", sub: "2016 to 2020" }, { name: "GMC", sub: "2023 Model" }, { name: "Hiace", sub: "" }, { name: "Coaster", sub: "" }, { name: "Bus", sub: "" }];
const prices = [["250", "350", "400", "550", "400", "800", "800"], ["200", "300", "400", "500", "400", "700", "800"], ["450", "550", "800", "1000", "650", "1100", "1400"], ["450", "550", "800", "1000", "650", "1100", "1400"], ["150", "200", "300", "400", "350", "500", "700"], ["120", "150", "250", "300", "300", "500", "700"], ["200", "300", "350", "500", "400", "600", "800"], ["200", "250", "350", "400", "350", "550", "700"], ["500", "600", "900", "1000", "750", "1100", "1400"], ["600", "700", "1200", "1300", "1300", "1500", "1800"], ["450", "600", "700", "900", "700", "1000", "1400"], ["200", "250", "200", "400", "300", "500", "600"], ["100", "150", "300", "300", "200", "400", "500"], ["100", "150", "200", "300", "200", "400", "500"], ["100", "120", "150", "180", "200", "250", "250"]];

const TaxiServices = () => {
  const router = useRouter();

  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto font-sans bg-white">
      {/* Back Button */}
      <button onClick={() => router.push("/dashboard")} className="flex items-center gap-2 text-sm text-gray-500 mb-6 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t("Back")}
      </button>

      {/* --- DESKTOP VIEW (Visible on md and up) --- */}
      <div className="hidden md:block border-t-[3px] border-black">
        <div className="grid grid-cols-[1.8fr_repeat(7,1fr)] items-end py-3 border-b border-gray-200">
          <div className="flex items-center gap-3 pl-4 sticky left-0 bg-white z-30">
              <div className="relative">
                <MapPin className="w-7 h-7 text-gray-800" strokeWidth={2.5} />
                <div className="absolute -top-1 -right-2 w-4 h-4 border-t-2 border-r-2 border-dotted border-gray-500 rounded-full" />
              </div>
              <span className="text-2xl font-[900] tracking-tighter text-gray-800 italic uppercase">ROUT</span>
            </div>
          {cars.map((car, i) => (
            <div key={i} className="text-center px-1">
              <div className="text-[12px] font-bold uppercase">{car.name}</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase">{car.sub}</div>
            </div>
          ))}
        </div>
        {routes.map((route, rowIndex) => (
          <div key={rowIndex} className={`grid grid-cols-[1.8fr_repeat(7,1fr)] items-center ${rowIndex % 2 === 0 ? "bg-[#015131] text-white" : "bg-white text-[#015131] border-b border-gray-100"}`}>
            <div className="py-3 px-5 text-[14px] font-bold border-r border-current/20">{route}</div>
            {prices[rowIndex].map((p, i) => (
              <div key={i} className="py-3 text-center text-[15px] font-black italic border-r border-current/10 last:border-r-0">{p}/-</div>
            ))}
          </div>
        ))}
      </div>

      {/* --- MOBILE VIEW (Visible on small screens) --- */}
      <div className="md:hidden space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-4">
          <MapPin className="w-5 h-5 text-[#015131]" />
          <span className="text-xl font-black italic">ROUTES & FARES</span>
        </div>
        
        {routes.map((route, rowIndex) => (
          <div key={rowIndex} className="border rounded-lg overflow-hidden shadow-sm">
            {/* Route Header */}
            <div className="bg-[#015131] text-white p-3 font-bold text-sm">
              {route}
            </div>
            {/* Price List inside Card */}
            <div className="divide-y divide-gray-100">
              {cars.map((car, colIndex) => (
                <div key={colIndex} className="flex justify-between items-center p-3 bg-white">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-gray-700 uppercase">{car.name}</span>
                    <span className="text-[9px] text-gray-400">{car.sub}</span>
                  </div>
                  <div className="text-[#015131] font-black italic">
                    {prices[rowIndex][colIndex]}/-
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Shared Footer */}
      <div className="mt-8 border-t pt-4 text-center md:flex md:justify-between md:items-center">
        <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-[#015131] mb-4 md:mb-0">
          <span>🟢 +966 59 903 3573</span>
          <span>🟢 +966 59 670 4817</span>
        </div>
        <p className="text-[10px] text-gray-500 font-bold uppercase">All rates in Saudi Riyal</p>
      </div>
    </div>
  );
};

export default TaxiServices;