"use client"
import { ArrowRight, Calendar, Clock, DollarSign, MapPin, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'
import { RideCard } from '../ui/RideCard'
import { ReviewModal } from '../ui/ReviewModal'
import "../../../lib/i18n";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/sellect'
import { Textarea } from '../ui/Textarea'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/AlertDialogFooter'
import { Label } from '../ui/Label'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { addReviewRating, cancelPackage, confirmRide, getUserPackages, getUserRideView } from '@/lib/api'
import { useAuthStore } from '@/lib/useAuthStore'
import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/badgeVariants'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useTranslation } from "react-i18next";

const MyPackages = () => {
    const router = useRouter();
 const { t } = useTranslation();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState([]);
    const [upcomingRides, setUpcomingRides] = useState([]);
    const [completedRides, setCompletedRides] = useState([]);
const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
const [rideToCancel, setRideToCancel] = useState(null);
const [cancelReason, setCancelReason] = useState('');
const [otherReason, setOtherReason] = useState('');

  // =====================================================
  // 🔥 Fetch Rides from API on mount
  // =====================================================
  useEffect(() => {

const fetchPackage = async () => {
  try {
    const response = await getUserPackages(user?.customer_id);

    // if (!response.status) {
    //   toast.error(response.message || "Failed to fetch packages");
    //   return;
    // }

    const allPackages = response || [];

    // Format Packages According To API
    const formatted = allPackages.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      duration: `${item.duration_days} Days`,
      price: item.price,
      capacity: item.no_of_people,
      transportation: item.type,
      image: item.package_image,
      partnerName: item.full_name,
      // partner_
      status: item.status,
    }));

    // setRides(formatted);
     const upcoming = formatted.filter(r => [1, 2].includes(r.status));
      const completed = formatted.filter(r => r.status == 4);
console.log("Upcoming Rides:", upcoming);
console.log("Completed Rides:", completed);
      setUpcomingRides(upcoming);
      setCompletedRides(completed);
  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


    fetchPackage();
  }, [user?.id]);

const fetchPackage = async () => {
  try {
    const response = await getUserPackages(user?.customer_id);

    if (!response.status) {
      toast.error(response.message || "Failed to fetch packages");
      return;
    }

    const allPackages = response.data.reverse() || [];

    // ================================
    // Format Packages According To API
    // ================================
    const formatted = allPackages.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      duration: `${item.duration_days} Days`,
      price: item.price,
      capacity: item.no_of_people,
      transportation: item.type,
      image: item.package_image,
      partnerName: item.full_name,
    }));

    setRides(formatted);
  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


const navigate = useRouter()

const handleFeedback = (ride, rideName) => {
  setSelectedRideId(ride?.id);
  setSelectedRide(rideName);
  setReviewModalOpen(true);
};

  // =====================================================
  // ⭐ Submit Review & Rating to API
  // =====================================================
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
      setRating(0);
      setReviewText("");


    } catch (err) {
      toast.error("Something went wrong while submitting review");
    } finally {
    setReviewLoading(false);
  }
  };

  const handleCancelClick = (id) => {
  console.log('check',id)
  setRideToCancel(id);
  setCancelReason('');
  setOtherReason('');
  setCancelDialogOpen(true);
};

const handleConfirmCancel = async () => {
  const finalReason = cancelReason === "Other" ? otherReason : cancelReason;

  // 🔥 Validation (modal MUST stay open)
  if (!finalReason.trim()) {
    toast.error("Please provide a reason for cancelling this ride.");
    return; // ⛔ DO NOT CLOSE MODAL
  }

  try {
    const res = await cancelPackage(rideToCancel);

    if (!res.status) {
      toast.error(res.message || "Unable to cancel ride");
      return; // ⛔ DO NOT CLOSE MODAL
    }

    toast.success("Ride cancelled successfully!");
    fetchRides();

    // 🎉 Close modal only when cancel is successful
    setCancelDialogOpen(false);
    setRideToCancel(null);
    setCancelReason("");
    setOtherReason("");

  } catch (err) {
    toast.error("Something went wrong");
  }
};


  return (
  <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
  
        <button
          onClick={() => navigate.push('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#C7A76C] mb-8 transition-colors group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>{t("Back to Dashboard")}</span>
        </button>

        {/* Header */}
        <div className="mb-8 bg-gradient-to-br from-[#0E3C2F] to-[#0E3C2F]/90 rounded-2xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A76C]/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C7A76C]/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative">
            <h1 className="text-3xl text-white mb-2">{t("My Packages")}</h1>
            <p className="text-white/70">{t("View and manage your packages bookings")}</p>
          </div>
        </div>

        <div className="w-full">
           <Tabs defaultValue="upcoming" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2 bg-white shadow-md p-1 rounded-xl h-auto">
                      <TabsTrigger 
                        value="upcoming" 
                        className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C7A76C] data-[state=active]:to-[#C7A76C]/90 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 transition-all"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {t("Upcoming")}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="completed"
                        className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C7A76C] data-[state=active]:to-[#C7A76C]/90 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 transition-all"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {t("Completed")}
                      </TabsTrigger>
                    </TabsList>
          
                    <TabsContent value="upcoming" className="space-y-4 mt-6">
                      {upcomingRides.length > 0 ? (
              upcomingRides.map((ride, index) => (
                <Card
                             key={ride.id}
                             className="border border-gray-200 hover:shadow-lg transition-all"
                           >
                             <CardContent className="p-6">
                               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                 <div className="flex-1 space-y-3">
                                   <h3 className="text-lg font-medium text-[#1B2A3D] mb-2">
                                     {t(ride.title)}
                                   </h3>
                                   <p className="text-sm text-gray-600 leading-relaxed">
                                     {t(ride.description)}
                                   </p>
               
                                   <div className="flex flex-wrap gap-4 mt-2">
                                     <div className="flex items-center gap-2 text-sm">
                                       <div className="w-8 h-8 rounded-lg bg-[#F2EDE3] flex items-center justify-center">
                                         <Clock className="w-4 h-4 text-[#C7A76C]" />
                                       </div>
                                       <div>
                                         <p className="text-xs text-gray-500">{t("Duration")}</p>
                                         <p className="font-medium text-[#1B2A3D]">
                                           {t(ride.duration)}
                                         </p>
                                       </div>
                                     </div>
                                     {/* <div className="flex items-center gap-2 text-sm">
  <div className="w-8 h-8 rounded-lg bg-[#F2EDE3] flex items-center justify-center">
    <MapPin className="w-4 h-4 text-[#C7A76C]" />
  </div>
  <div>
    <p className="text-xs text-gray-500">Route</p>
    <p className="font-medium text-[#1B2A3D]">{ride.route}</p>
  </div>
</div> */}
                                     <div className="flex items-center gap-2 text-sm">
  <div className="w-8 h-8 rounded-lg bg-[#F2EDE3] flex items-center justify-center">
    <Users className="w-4 h-4 text-[#C7A76C]" />
  </div>
  <div>
    <p className="text-xs text-gray-500">{t("Capacity")}</p>
    <p className="font-medium text-[#1B2A3D]">
      {ride.capacity} {t("People")}
    </p>
  </div>
</div>
                                   </div>
               <div className='flex gap-2'>
                                  <Badge variant="outline" className="border-[#0E3C2F] text-[#0E3C2F] bg-[#0E3C2F]/5 mt-2">
  {ride.transportation}
</Badge>

         <Badge variant="outline" className="border-[#0E3C2F] text-[#0E3C2F] bg-[#0E3C2F]/5 mt-2">
  {ride.status === 1 ? "Pending" : ride.status === 2 ? "Confirmed" : ""}
</Badge>
</div>
                                 </div>
            
               
                                 <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:min-w-[200px]">
                                   <div className="text-left lg:text-right">
                                     <p className="text-sm text-gray-500 mb-1">
                                       {t("Starting from")}
                                     </p>
                                     <div className="flex items-center gap-1 justify-start lg:justify-end">
                                       {/* <DollarSign className="w-5 h-5 text-[#C7A76C]" /> */}
                                       {t(SAR)}
                                       <p className="text-2xl font-semibold text-[#0E3C2F]">
                                         {t(ride.price.replace("SAR ", ""))}
                                       </p>
                                     </div>
                                   </div>
                                             {/* Actions */}
          <div className="flex gap-3">
            {/* <Button variant="outline" onClick={() => 
              handleCancelClick(ride.id)
              } className="flex-1">
              Cancel
            </Button> */}

                                   <Link
                                     href={`
                                      /PackageDetails/${ride.id}
               
                                                           `}
                                   >
                                     <Button className="bg-gradient-to-r from-[#0E3C2F] to-[#0E3C2F]/90 text-white hover:shadow-lg transition-all whitespace-nowrap">
                                       {t("View Details")}
                                       <ArrowRight className="ml-2 w-4 h-4" />
                                     </Button>
                                   </Link>
                                   </div>
                                 </div>
                               </div>
                             </CardContent>
                           </Card>
              ))
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-[#F2EDE3] to-white rounded-2xl border-2 border-dashed border-[#C7A76C]/30">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#C7A76C]/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-[#C7A76C]" />
                </div>
                <p className="text-[#1B2A3D] font-medium mb-1">{t("No packages booked")}</p>
                <p className="text-gray-500 text-sm">{t("Book your next journey to see it here")}</p>
              </div>
            )}
                    </TabsContent>
          
                    <TabsContent value="completed" className="space-y-4 mt-6">
                      {completedRides.length > 0 ? (
              completedRides.map((ride, index) => (
                <Card
                             key={ride.id}
                             className="border border-gray-200 hover:shadow-lg transition-all"
                           >
                             <CardContent className="p-6">
                               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                 <div className="flex-1 space-y-3">
                                   <h3 className="text-lg font-medium text-[#1B2A3D] mb-2">
                                     {t(ride.title)}
                                   </h3>
                                   <p className="text-sm text-gray-600 leading-relaxed">
                                     {t(ride.description)}
                                   </p>
               
                                   <div className="flex flex-wrap gap-4 mt-2">
                                     <div className="flex items-center gap-2 text-sm">
                                       <div className="w-8 h-8 rounded-lg bg-[#F2EDE3] flex items-center justify-center">
                                         <Clock className="w-4 h-4 text-[#C7A76C]" />
                                       </div>
                                       <div>
                                         <p className="text-xs text-gray-500">{t("Duration")}</p>
                                         <p className="font-medium text-[#1B2A3D]">
                                           {t(ride.duration)}
                                         </p>
                                       </div>
                                     </div>
                                     {/* <div className="flex items-center gap-2 text-sm">
  <div className="w-8 h-8 rounded-lg bg-[#F2EDE3] flex items-center justify-center">
    <MapPin className="w-4 h-4 text-[#C7A76C]" />
  </div>
  <div>
    <p className="text-xs text-gray-500">Route</p>
    <p className="font-medium text-[#1B2A3D]">{ride.route}</p>
  </div>
</div> */}
                                     <div className="flex items-center gap-2 text-sm">
  <div className="w-8 h-8 rounded-lg bg-[#F2EDE3] flex items-center justify-center">
    <Users className="w-4 h-4 text-[#C7A76C]" />
  </div>
  <div>
    <p className="text-xs text-gray-500">{t("Capacity")}</p>
    <p className="font-medium text-[#1B2A3D]">
      {ride.capacity} {t("People")}
    </p>
  </div>
</div>
                                   </div>
               
                                  <Badge variant="outline" className="border-[#0E3C2F] text-[#0E3C2F] bg-[#0E3C2F]/5 mt-2">
  {t(ride.transportation)}
</Badge>

                                 </div>
            
               
                                 <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:min-w-[200px]">
                                   <div className="text-left lg:text-right">
                                     <p className="text-sm text-gray-500 mb-1">
                                       {t("Starting from")}
                                     </p>
                                     <div className="flex items-center gap-1 justify-start lg:justify-end">
                                       {/* <DollarSign className="w-5 h-5 text-[#C7A76C]" /> */}
                                       {t("SAR")}
                                       <p className="text-2xl font-semibold text-[#0E3C2F]">
                                         {ride.price.replace("SAR ", "")}
                                       </p>
                                     </div>
                                   </div>
                                   <Link
                                     href={`
                                      /PackageDetails/${ride.id}
               
                                                           `}
                                   >
                                     <Button className="bg-gradient-to-r from-[#0E3C2F] to-[#0E3C2F]/90 text-white hover:shadow-lg transition-all whitespace-nowrap">
                                       {t("View Details")}
                                       <ArrowRight className="ml-2 w-4 h-4" />
                                     </Button>
                                   </Link>
                                 </div>
                               </div>
                             </CardContent>
                           </Card>
              ))
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-[#F2EDE3] to-white rounded-2xl border-2 border-dashed border-[#C7A76C]/30">
                          <div className="w-20 h-20 mx-auto mb-4 bg-[#C7A76C]/10 rounded-full flex items-center justify-center">
                            <Clock className="w-10 h-10 text-[#C7A76C]" />
                          </div>
                          <p className="text-[#1B2A3D] font-medium mb-1">{t("No completed packages")}</p>
                          <p className="text-gray-500 text-sm">{t("Your packages history will appear here")}</p>
                        </div>
            )}
                    </TabsContent>
                  </Tabs>

          <div className="space-y-4 mt-6">
           
          </div>
        </div>

      </div>
      <AlertDialog open={cancelDialogOpen} 
              // onOpenChange={setCancelDialogOpen}
              >
                <AlertDialogContent className="bg-white max-w-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-[#0E3C2F]">{t("Cancel This Package?")}</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600">
                      {rideToCancel !== null && upcomingRides[rideToCancel] && (
                        <>
                          {t("Are you sure you want to cancel your package from")} {' '}
                          <span className="font-medium text-[#0E3C2F]">
                            {upcomingRides[rideToCancel].from}
                          </span>{' '}
                          {t("to")} {' '}
                          <span className="font-medium text-[#0E3C2F]">
                            {upcomingRides[rideToCancel].to}
                          </span>{' '}
                          {t("on")} {upcomingRides[rideToCancel].date} {t("at")} {upcomingRides[rideToCancel].time}.
                        </>
                      )}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
      
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="cancel-reason" className="text-[#0E3C2F]">
                        {t("Reason for Cancellation")} <span className="text-red-500">*</span>
                      </Label>
                      <Select value={cancelReason} onValueChange={setCancelReason}>
                        <SelectTrigger id="cancel-reason" className="bg-white border-gray-300">
                          <SelectValue placeholder={t("Select a reason")} />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Change of plans">{t("Change of plans")}</SelectItem>
                          <SelectItem value="Found alternative transport">
                            {t("Found alternative transport")}
                          </SelectItem>
                          <SelectItem value="Emergency">{t("Emergency")}</SelectItem>
                          <SelectItem value="Weather conditions">{t("Weather conditions")}</SelectItem>
                          <SelectItem value="Price concerns">{t("Price concerns")}</SelectItem>
                          <SelectItem value="Schedule conflict">{t("Schedule conflict")}</SelectItem>
                          <SelectItem value="Other">{t("Other (please specify)")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
      
                    {cancelReason === 'Other' && (
                      <div className="space-y-2">
                        <Label htmlFor="other-reason" className="text-[#0E3C2F]">
                          {t("Please specify")} <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="other-reason"
                          placeholder={t("Enter your reason...")}
                          value={otherReason}
                          onChange={(e) => setOtherReason(e.target.value)}
                          className="resize-none bg-white border-gray-300"
                          rows={3}
                        />
                      </div>
                    )}
                  </div>
      
                  <AlertDialogFooter>
                    <AlertDialogCancel 
                     onClick={() => {
          setCancelDialogOpen(false);  
          setCancelReason("");
          setOtherReason("");
          setRideToCancel(null);
        }}
         className="border-gray-300 hover:bg-gray-50">
                      {t("Keep Ride")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleConfirmCancel}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {t("Confirm Cancellation")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
    </div>
  )
}

export default MyPackages