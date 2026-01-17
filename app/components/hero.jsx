"use client";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/useAuthStore";
import { useRouter } from "next/navigation";

export default function Hero() {
  const { user } = useAuthStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gtReady, setGtReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setIsLoggedIn(true);

    // Google Translate Initialization
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar",
          autoDisplay: false,
        },
        "google_translate_element"
      );
      setGtReady(true);
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      setGtReady(true);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div
      className="relative min-h-[70vh] md:min-h-[90vh] bg-cover bg-center flex items-center justify-center md:justify-start px-6 md:px-12"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Global CSS to kill Google Branding */}
      <style jsx global>{`
        iframe.goog-te-banner-frame { display: none !important; }
        body { top: 0px !important; }
        .goog-logo-link { display: none !important; }
        .goog-te-gadget { color: transparent !important; font-size: 0 !important; }
        .goog-te-gadget span { display: none !important; }
        #google_translate_element { display: none !important; }
        .skiptranslate { display: none !important; }
        .goog-te-spinner-pos { display: none !important; }
      `}</style>

      <div className="absolute top-6 right-6 z-20 flex items-center gap-4">
        <div className="relative w-32 md:w-40">
          <select
            className="w-full h-10 px-4 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-full shadow-sm cursor-pointer appearance-none transition-all hover:border-green-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={handleLanguageChange}
            disabled={!gtReady}
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
          {/* Custom Arrow for dropdown */}
          <div className="absolute right-3 top-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        {isLoggedIn && (
          <Link href={user?.id ? "/dashboard" : "/auth"} className="text-white text-3xl hover:text-gray-300 transition">
            <FaUserCircle />
          </Link>
        )}
      </div>

      <div className="relative z-10 text-white flex flex-col items-center md:items-start text-center md:text-left">
        <p className="tracking-widest uppercase text-sm mb-2">~Seamless~</p>
        <h1 className="text-4xl md:text-6xl mb-4">
          Hajj & Umrah <br /> Transportation Booking
        </h1>
        <span className="mb-6 max-w-md md:max-w-2xl text-gray-300">
          Book verified vehicles between Makkah, Madinah, and <br />
          <span className="">Jeddah</span> with trusted service providers
        </span>

        <div className="flex flex-col md:flex-row items-center gap-2 mb-6 mt-5">
          <img
            src="Ellipse.png"
            alt="trusted clients"
            className="w-15 h-8 rounded-full"
          />
          <span className="text-sm text-gray-300">
            Trusted by <span className="font-semibold">500+ clients</span> all over the world
          </span>
        </div>
        <div className="flex flex-row gap-4 justify-center md:justify-start flex-nowrap overflow-x-auto">
          <button onClick={() => router.push("/Book")} className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition min-w-[100px]">
            Booking
          </button>
          <Link
            href="/auth"
            className="flex text-gray-300 items-center gap-2 border border-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black transition whitespace-nowrap justify-center min-w-[120px]"
          >
            Register as Vendor
            <LuMoveRight />
          </Link>
        </div>

      </div>

      {/* Actual Google element hidden far away */}
      <div id="google_translate_element" style={{ visibility: 'hidden', position: 'absolute', zIndex: -1 }}></div>
    </div>
  );
}