"use client"
import { Bell, Menu, User } from 'lucide-react'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/DropdownMenuTrigger';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { useAuthStore } from '@/lib/useAuthStore';
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";
import "../../../lib/i18n";

const Header = () => {
  const { t } = useTranslation(); 
  const router = useRouter();
  const isArabic = i18n.language === "ar";
  const { logout, user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const handleLogout = () => {
    logout(); 
    router.push("/auth"); 
    setSidebarOpen(false); 
  };
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
<div className={`flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 ${isArabic ? 'flex-row-reverse' : ''}`}>        {/* Left Side */}
        <div className={`flex items-center gap-3 sm:gap-4 flex-1 min-w-0 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={openSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
          </button>
          
          <div className={`min-w-0 ${isArabic ? 'text-right mr-2 ml-0' : 'ml-2 text-left'}`}>
            <h1 className="text-lg sm:text-xl lg:text-2xl text-[#0E3C2F] truncate">
              {t("Welcome back")}, {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : t("User")}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 hidden sm:block truncate">{currentDate}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-2 sm:gap-3 hover:bg-gray-50 rounded-full p-1 pr-2 sm:pr-3 transition-colors ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Avatar className="w-8 h-8 bg-gray-300 text-lg text-center flex items-center justify-center">
                  {user?.name ? user?.name.charAt(0).toUpperCase() : ""}
                  <AvatarFallback><AvatarImage src="/dummy.png" /> </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-xs sm:text-sm text-[#0E3C2F]">{user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : t("User")}</p>
                  <p className="text-xs text-gray-500">{t("Premium Member")}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header
