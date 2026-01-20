"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../../lib/i18n";

// Icons
import {
  MdDashboard,
  MdDirectionsCar,
  MdListAlt,
  MdSupportAgent,
  MdPerson,
  MdLogout,
  MdMenu,
  MdClose
} from "react-icons/md";
import { useAuthStore } from "@/lib/useAuthStore";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
   const { logout } = useAuthStore();
 const { t } = useTranslation();

  const menu = [
    { label: "Dashboard", href: "/dashboard", icon: <MdDashboard size={20} /> },
    { label: "Book a Ride", href: "/Book", icon: <MdDirectionsCar size={20} /> },
    { label: "Service Providers", href: "/Service", icon: <MdDirectionsCar size={20} /> },
    { label: "My Rides", href: "/myrides", icon: <MdListAlt size={20} /> },
    { label: "My Packages", href: "/my-packages", icon: <MdListAlt size={20} /> },
    { label: "Support", href: "/support", icon: <MdSupportAgent size={20} /> },
    { label: "Profile", href: "/profile", icon: <MdPerson size={20} /> },
  ];

    const handleLogout = () => {
    logout(); 
    router.push("/auth"); 
    setOpen(false); 
  };

  return (
    <>
      {!open && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={() => setOpen(true)}
          style={{ background: "transparent" }}
        >
          <MdMenu size={22} />
        </button>
      )}



      {/* Sidebar */}
      <div
        className={`
    w-64 bg-gray-50 h-screen p-6 flex flex-col justify-between 
    fixed top-0 left-0 z-40
    transition-transform duration-300
    md:translate-x-0
    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
      >




        {/* Close Button (Mobile Only) */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-600 bg-transparent hover:bg-transparent shadow-none outline-none"
          onClick={() => setOpen(false)}
        >
          <MdClose size={22} />
        </button>


        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-300">
            <img
              src="/logo11.png"
              alt="Way To Haramain"
              className="w-full h-full rounded-lg object-cover"
            />
            {/* <h2 className="text-xl font-semibold text-[#206D69]">Way To Haramain</h2> */}
          </div>

          {/* Menu */}
          <nav className="flex flex-col space-y-2">
            {menu.map((item, i) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setOpen(false)} // close drawer on mobile
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all
                    ${isActive
                      ? "bg-white shadow text-[#206D69]"
                      : "text-gray-600 hover:bg-white hover:shadow hover:text-[#206D69]"
                    }`}
                >
                  <span>{t(item.icon)}</span>
                  <p>{t(item.label)}</p>
                </Link>
              );
            })}
          </nav>
        </div>

        <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm cursor-pointer">
          <MdLogout size={20} />
          {t("Logout")}
        </button>
      </div>

      {/* Overlay for Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
