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
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  return (
    <div
      className="relative min-h-[70vh] md:min-h-[90vh] bg-cover bg-center flex items-center justify-center md:justify-start px-6 md:px-12"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      {/* Top Right - User Icon */}
      <div className="absolute top-6 right-6 z-20">
        {isLoggedIn && (
          <div className="relative">
            <Link
              href={user?.id ? "/dashboard" : "/auth"}
              className="text-white text-3xl hover:text-gray-300 transition"
            >
              <FaUserCircle />
            </Link>

            {/* {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-32 text-sm">
                <Link
                  href="/dashboard"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>

                 <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )} */}
          </div>
        )}
      </div>

      {/* Hero Text Section */}
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
    </div>
  );
}
