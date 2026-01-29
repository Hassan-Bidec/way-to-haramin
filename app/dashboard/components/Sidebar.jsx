"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../../src/lib/i18n"; // Ensure path correct

import {
  MdDashboard,
  MdDirectionsCar,
  MdListAlt,
  MdSupportAgent,
  MdPerson,
  MdLogout,
  MdMenu,
  MdClose,
  MdLocalTaxi
} from "react-icons/md";
import { useAuthStore } from "@/lib/useAuthStore";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { logout } = useAuthStore();
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language?.startsWith("ar"); // 🔹 Check if Arabic

  const menu = [
    { label: t("Dashboard"), href: "/dashboard", icon: <MdDashboard size={20} /> },
    { label: t("Book a Ride"), href: "/Book", icon: <MdDirectionsCar size={20} /> },
    { label: t("Service Providers"), href: "/Service", icon: <MdDirectionsCar size={20} /> },
    { label: t("Packages"), href: "/TaxiServices", icon: <MdLocalTaxi size={20} /> },
    { label: t("My Rides"), href: "/myrides", icon: <MdListAlt size={20} /> },
    { label: t("My Packages"), href: "/my-packages", icon: <MdListAlt size={20} /> },
    { label: t("Support"), href: "/support", icon: <MdSupportAgent size={20} /> },
    { label: t("Profile"), href: "/profile", icon: <MdPerson size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    router.push("/auth");
    setOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      {!open && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={() => setOpen(true)}
        >
          <MdMenu size={22} />
        </button>
      )}

      {/* Sidebar */}
     <div
  dir={isRTL ? "rtl" : "ltr"}
  className={`w-64 bg-gray-50 h-screen p-6 flex flex-col justify-between fixed top-0 ${isRTL ? "right-0" : "left-0"} z-40 transition-transform duration-300 ${
    open ? "translate-x-0" : isRTL ? "translate-x-full md:translate-x-0" : "-translate-x-full md:translate-x-0"
  }`}
>

        {/* Close Button */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-600 bg-transparent hover:bg-transparent shadow-none outline-none"
          onClick={() => setOpen(false)}
        >
          <MdClose size={22} />
        </button>

        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-300">
            <Link href="/">
              <img
                src="/logo11.png"
                alt="Way To Haramain"
                className="w-full h-full rounded-lg object-cover cursor-pointer"
              />
            </Link>
          </div>

          {/* Menu */}
          <nav className={`flex flex-col space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
            {menu.map((item, i) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-white shadow text-[#206D69]"
                      : "text-gray-600 hover:bg-white hover:shadow hover:text-[#206D69]"
                  }`}
                >
                  <span>{item.icon}</span>
                  <p>{item.label}</p>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <button
  onClick={handleLogout}
  className={`flex items-center gap-2 text-red-500 hover:text-red-700 text-sm cursor-pointer ${
    isRTL ? "flex-row-reverse ml-auto" : ""
  }`}
>
  <MdLogout size={20} />
  {t("Logout")}
</button>

      </div>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/30 md:hidden z-30" onClick={() => setOpen(false)} />}
    </>
  );
}
