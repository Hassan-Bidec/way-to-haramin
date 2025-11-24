"use client"
import { Bell, Menu, User } from 'lucide-react'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/DropdownMenuTrigger';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { useAuthStore } from '@/lib/useAuthStore';
import { useRouter } from 'next/navigation';

const Header = () => {
  // const {user} = useAuthStore()
  const router = useRouter();
   const { logout, user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);
      const handleLogout = () => {
    logout(); 
    router.push("/auth"); 
    setOpen(false); 
  };
  
     const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
       <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Left Side - Menu Button + Welcome Text */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Hamburger Menu Button (Mobile Only) */}
        <button
  onClick={openSidebar}
  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
>
  {/* <Menu className="w-5 h-5 text-gray-600" /> */}
</button>


          
          <div className="min-w-0 ml-2">
            <h1 className="text-lg sm:text-xl lg:text-2xl text-[#0E3C2F] truncate">
              Welcome back,  {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "User"}!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 hidden sm:block truncate">{currentDate}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Notifications */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-gray-100 w-9 h-9 sm:w-10 sm:h-10"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#C7A76C] rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 sm:w-80">
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base text-[#0E3C2F] mb-3">Notifications</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="p-2 sm:p-3 bg-[#F2EDE3]/30 rounded-lg">
                    <p className="text-xs sm:text-sm">Your ride to Madinah is confirmed for tomorrow</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <div className="p-2 sm:p-3 bg-white rounded-lg border border-gray-100">
                    <p className="text-xs sm:text-sm">New package deals available!</p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 sm:gap-3 hover:bg-gray-50 rounded-full p-1 pr-2 sm:pr-3 transition-colors">
                {/* <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-[#C7A76C]">
                  <AvatarImage src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMxMjEyNzJ8MA&ixlib=rb-4.1.0&q=80&w=400" />
                  <AvatarFallback className="bg-[#C7A76C] text-white text-xs sm:text-sm">
                    A
                  </AvatarFallback>
                </Avatar> */}
                 <Avatar className="w-8 h-8 bg-gray-300 text-lg text-center flex items-center justify-center">
                  {user?.name
                  ? user?.name.charAt(0).toUpperCase()
                  : ""
                }
                  {/* Remove dicebear & keep empty if you want fallback always */}
                  <AvatarFallback><AvatarImage src="/dummy.png" /> </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-xs sm:text-sm text-[#0E3C2F]">{user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "User"}</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onSelect={handleLogout} className="text-red-600">Logout</DropdownMenuItem>
            </DropdownMenuContent> */}
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header