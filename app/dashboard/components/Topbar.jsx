"use client";

import { ArrowRight, Bell, Menu, User } from 'lucide-react';
import Image from 'next/image';
import OffersBanner from './OffersBanner';

import { FeatureCard } from './FeatureCard';
import QuickActions from './QuickActionCard';
import { UpcomingRideCard } from './UpcomingRideCard';
import { Button } from '../ui/button';
import { Card } from '../ui/Card';
import { PackageCard } from './PackageCard';

import { Award } from 'lucide-react';
import { DashboardQuickBooking } from './DashboardQuickBooking';

import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSubContent, DropdownMenuTrigger } from '../ui/DropdownMenuTrigger';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/useAuthStore';
import { addReviewRating, Dashboard } from '@/lib/api';
import { ReviewModal } from '../ui/ReviewModal';
import { toast } from 'react-toastify';
// import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18n from '@/lib/i18n';

export default function Topbar() {
  const { logout, user } = useAuthStore();
  // const router = useRouter()
  const { t } = useTranslation();
  const [banner, setBanner] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [getRecentRides, setGetRecentRides] = useState([]);
  const [packages, setPackages] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
const [selectedRide, setSelectedRide] = useState('');
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);

const statusText = {
  1: "Pending",
  2: "Confirmed",
  3: "Ongoing",
  4: "Cancelled",
  5: "Completed",
};

  useEffect(() => {
    const loadDashboardData = async () => {
      const res = await Dashboard();

      if (res.status) {
        const data = res.data;

        setBanner(data.banner || []);

        // upcoming se null hatado
        const cleanUpcoming = (data.upcoming || []).filter(item => item !== null);

        setUpcoming(cleanUpcoming);

        setGetRecentRides(data.recent_rides || []);
        setPackages(data.packages || []);
      }
    };

    loadDashboardData();
  }, []);


  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const navigate = useRouter();


  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const handleFeedback = (ride, rideName) => {
  setSelectedRideId(ride?.id);
  setSelectedRide(rideName);
  setReviewModalOpen(true);
};

    const handleSubmitReview = async (rating, comment) => {
    if (!rating) {
      toast.error("Please give a rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    const payload = {
      ride_id: selectedRideId,
      rating,
      reviews: comment,
    };

    try {
       setReviewLoading(true); 
      const res = await addReviewRating(payload);

      if (!res.status) {
        toast.error(res.message || "Unable to submit review");
        return;
      }

      toast.success("Review submitted successfully!");
      setReviewModalOpen(false);


    } catch (err) {
      toast.error("Something went wrong while submitting review");
    } finally {
    setReviewLoading(false);
  }
  };

  const isRTL = i18n.language?.startsWith("ar");


  return (
    <>
     <div className={`${isRTL ? "md:mr-64 ml-0" : "md:ml-64 ml-0"}`} dir={isRTL ? "rtl" : "ltr"}>

        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
<div className={`flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 ${isRTL ? "flex-row-reverse" : ""} gap-3 sm:gap-4`}>
            {/* Left Side - Menu Button + Welcome Text */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              {/* Hamburger Menu Button (Mobile Only) */}
              <button
                onClick={openSidebar}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                {/* <Menu className="w-5 h-5 text-gray-600" /> */}
              </button>


              {/* Welcome Text */}
<div className={`min-w-0 ${isRTL ? "text-right ml-0 mr-2" : "text-left ml-2"}`}>
                <h1 className="text-lg sm:text-xl lg:text-2xl text-[#0E3C2F] truncate">
{t("Welcome back")}, {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : t("User")}

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
<button className={`flex items-center gap-2 sm:gap-3 hover:bg-gray-50 rounded-full p-1 pr-2 sm:pr-3 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}>                    {/* <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-[#C7A76C]">
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
<div className={`text-left hidden md:block ${isRTL ? "text-right" : ""}`}>
                      <p className="text-xs sm:text-sm text-[#0E3C2F]">{user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "User"}</p>
                      <p className="text-xs text-gray-500">Premium Member</p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                {/* <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => navigate.push("/profile")}
                    className="cursor-pointer"
                  >
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate.push("/support")}
                    className="cursor-pointer"
                  >Support</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
                </DropdownMenuContent> */}
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className='px-4 md:px-10'>
          <OffersBanner bannerData={banner} />

          <QuickActions />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {upcoming && upcoming.filter(item => item !== null && item.length !== 0).length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-[#0E3C2F] font-bold mt-5">Upcoming Journey</h1>
                  {/* <h2 className="text-[#1B2A3D] font-bold"></h2> */}
                </div>
                <UpcomingRideCard upcomingData={upcoming} />

              </section>
            )}
            
            {getRecentRides && getRecentRides.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#0E3C2F]">Recent Rides</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#0E3C2F] hover:bg-[#F2EDE3]/30"
                    onClick={() => navigate.push('/myrides')}
                  >
                    View All
                    {/* <ArrowRight className="ml-2 w-4 h-4" /> */}
                    <ArrowRight className={isRTL ? "mr-2 ml-0" : "ml-2"} />

                  </Button>
                </div>
                <div className="space-y-4">
               {getRecentRides.map((item) => {
  const ride = item.ride;
  const detail = item.details[0] || {}; // first detail if exists

  const isCancelled = ride.status === 0; // ya jo cancelled condition ho

  return (
    <Card key={ride.id} className="p-4 shadow-sm rounded-2xl bg-white">
      <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}>
        <p className="text-[#0E3C2F] font-semibold text-base">
          {detail.departure_city_name || "N/A"} → {detail.destination_city_name || "N/A"}
        </p>

        <span
          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${isCancelled
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 6v6h4.5M12 22a10 10 0 110-20 10 10 0 010 20z" />
          </svg>
          {statusText[ride?.status]}
        </span>
      </div>

      {/* Date Row */}
      <div className="flex items-center gap-1 mt-0.5 text-gray-600 text-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 19.5h15a2.25 
2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 
0 002.25 8.25v9A2.25 2.25 0 004.5 19.5z" />
        </svg>
        <p>{detail.date || ride.booking_date}</p>
      </div>

      {/* Vehicle + Price Row */}
      <div className="flex justify-between items-center text-gray-700">
        <p className="text-xs">
          <span className="font-medium text-gray-600">Vehicle:</span> {ride.vehicle_name}
        </p>

        <p className="text-[#0E3C2F] text-sm font-medium">SAR {ride.charges || "N/A"}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200"></div>

      {/* Leave Review */}
      <div onClick={() =>  handleFeedback(ride, `${ride.from} to ${ride.to}`)} className="flex justify-center items-center gap-1 text-[#C7A76C] font-medium text-sm cursor-pointer mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#C7A76C"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 
0l2.122 6.564h6.908c.969 0 1.371 1.24.588 
1.81l-5.59 4.06 2.122 6.564c.3.921-.755 
1.688-1.54 1.118l-5.59-4.06-5.59 4.06c-.784.57-1.838-.197-1.539-1.118l2.122-6.564-5.59-4.06c-.783-.57-.38-1.81.588-1.81h6.908l2.122-6.564z" />
        </svg>
        Leave Review
      </div>
    </Card>
  );
})}


                </div>


              </section>
            )}
             {packages && packages.length > 0 && (
              <section>
                <div className="flex items-center justify-between mt-2 mb-6">
                  <h2 className="text-[#0E3C2F]">{t("Recommended Packages")}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#0E3C2F] hover:bg-[#F2EDE3]/30"
                    onClick={() => navigate.push('/Service')}
                  >
                    {t("View All")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {packages.map((pkgObj) => (
                    <PackageCard
                      key={pkgObj.package.id}
                      package={pkgObj.package}
                      details={pkgObj.details}
                      onViewDetails={() => navigate.push(`/ServiceProvider/${pkgObj.package.id}`)}
                    />
                  ))}

                </div>
              </section>
                )}
            </div>

            <div className="space-y-6">
              <section className='mt-12'>
                <DashboardQuickBooking />
              </section>

              <Card className="border-none shadow-sm bg-gradient-to-br from-[#0E3C2F] to-[#0E3C2F]/90 text-white ">
                <div className="p-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <h3 className="text-white mb-2">Need Help?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    {t("Chat with us on WhatsApp for instant support")}
                  </p>
                  <Button
                    className="w-full bg-white text-[#0E3C2F] hover:bg-white/90"
                    // onClick={() => navigate.push('/support')}
                    onClick={() => {
    const phone = "966500000000"; // <-- Saudi number
    const msg = encodeURIComponent("Hello, I need support.");
    window.location.href = `https://wa.me/${phone}?text=${msg}`;
  }}
                  >
                    {t("Open WhatsApp")}
                  </Button>
                </div>
              </Card>

              <Card className="border-none shadow-sm overflow-hidden relative bg-gradient-to-br from-[#F2EDE3] to-white">
                <div className="p-6 relative z-10">
                  <div className="inline-flex items-center gap-2 bg-[#0E3C2F] text-white px-3 py-1 rounded-full text-xs mb-3">
                    <Award className="w-3 h-3" />
                    {t("Special Offer")}
                  </div>
                  <h3 className="text-[#0E3C2F] mb-2">{t("Winter Package Sale")}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t("Get up to 25% off on selected tour packages this month")}
                  </p>
                  <Button
                    size="sm"
                    className="bg-[#0E3C2F] text-white hover:bg-[#0E3C2F]/90"
                    onClick={() => navigate.push('/Service')}
                  >
                    {t("View Offers")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C7A76C]/10 rounded-full"></div>
              </Card>
            </div>
          </div>
        </div>
        
                <ReviewModal
                  open={reviewModalOpen}
                  onClose={() => { setReviewModalOpen(false); setSelectedRide(''); setSelectedRideId(null); setRating(0); setReviewText('') }}
                  rideName={selectedRide}
                  onSubmit={handleSubmitReview}
                   loading={reviewLoading} 
                />
      </div>
    </>
  );
}
