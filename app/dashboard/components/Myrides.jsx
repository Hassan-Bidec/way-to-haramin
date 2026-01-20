"use client"
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'
import { RideCard } from '../ui/RideCard'
import { ReviewModal } from '../ui/ReviewModal'
import "../../../src/lib/i18n";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/sellect'
import { Textarea } from '../ui/Textarea'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/AlertDialogFooter'
import { Label } from '../ui/Label'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { addReviewRating, cancelRide, confirmRide, getUserRideView } from '@/lib/api'
import { useAuthStore } from '@/lib/useAuthStore'
import { useTranslation } from "react-i18next";


const Myrides = () => {
    const router = useRouter();
 const { t } = useTranslation();

  const { user } = useAuthStore();   
const [reviewLoading, setReviewLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
const [selectedRide, setSelectedRide] = useState('');
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
const [rideToCancel, setRideToCancel] = useState(null);
const [cancelReason, setCancelReason] = useState('');
const [otherReason, setOtherReason] = useState('');


  // =====================================================
  // 🔥 Fetch Rides from API on mount
  // =====================================================
  useEffect(() => {

    const fetchRides = async () => {
      try {
        const response = await getUserRideView(user?.customer_id);

        if (!response.status) {
          toast.error(response.message || "Failed to fetch rides");
          return;
        }

        const allRides = response.data.reverse() || [];

// Format rides for UI
      const formattedRides = allRides.map(ride => {
        // Pick first detail as main trip info
        const mainDetail = ride.details?.[0] || {};
        return {
          ...ride,
          from: mainDetail.departure_city,
          to: mainDetail.destination_city,
          date: mainDetail.date,
          time: mainDetail.time,
          vehicleType: ride.vehicle_name,
          driverName: ride.driver_name,
          status: ride.status, 
          price: ride?.charges || 0,
          type: ride?.booking_type || '',
        };
      });

      // Divide by status
      const upcoming = formattedRides.filter(r => [1, 2, 3].includes(r.status));
      const completed = formattedRides.filter(r => r.status === 7);

      setUpcomingRides(upcoming);
      setCompletedRides(completed);
      const cancelled = allRides.filter(ride => ride.status == 4);

      // setUpcomingRides(upcoming);
      // setCompletedRides(completed);
      // setCancelledRides(cancelled);
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [user?.id]);

   const fetchRides = async () => {
      try {
        const response = await getUserRideView(user?.customer_id);

        if (!response.status) {
          toast.error(response.message || "Failed to fetch rides");
          return;
        }

        const allRides = response.data || [];

// Format rides for UI
      const formattedRides = allRides.map(ride => {
        // Pick first detail as main trip info
        const mainDetail = ride.details?.[0] || {};
        return {
          ...ride,
          from: mainDetail.departure_city,
          to: mainDetail.destination_city,
          date: mainDetail.date,
          time: mainDetail.time,
          vehicleType: ride.vehicle_name,
          driverName: ride.driver_name,
          status: ride.status, 
          price: ride?.charges || 0,
        };
      });

      // Divide by status
      const upcoming = formattedRides.filter(r => [1, 2, 3].includes(r.status));
      const completed = formattedRides.filter(r => r.status === 7);

      setUpcomingRides(upcoming);
      setCompletedRides(completed);
      const cancelled = allRides.filter(ride => ride.status == 4);

      // setUpcomingRides(upcoming);
      // setCompletedRides(completed);
      // setCancelledRides(cancelled);
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
    const res = await cancelRide(rideToCancel);

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


const handleConfirmRide = async (ride_id) => {
  try {
    const res = await confirmRide(ride_id);

    if (!res.status) {
      toast.error(res.message || "Unable to confirm ride");
      return;
    }

    toast.success("Ride confirmed successfully!");

    // After confirm, refresh the rides list
    fetchRides();

    // if (updated.status) {
    //   setUpcomingRides(updated.upcoming || []);
    //   setCompletedRides(updated.completed || []);
    // }

  } catch (err) {
    toast.error("Something went wrong while confirming the ride");
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
            <h1 className="text-3xl text-white mb-2">{t("My Rides")}</h1>
            <p className="text-white/70">{t("View and manage your ride bookings")}</p>
          </div>
        </div>

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
                <RideCard
                  key={index}
                  {...ride}
                  onCancel={() => handleCancelClick(ride.id)}
                  onConfirm={() => handleConfirmRide(ride.id)} 
                />
              ))
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-[#F2EDE3] to-white rounded-2xl border-2 border-dashed border-[#C7A76C]/30">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#C7A76C]/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-[#C7A76C]" />
                </div>
                <p className="text-[#1B2A3D] font-medium mb-1">{t("No upcoming rides")}</p>
                <p className="text-gray-500 text-sm">{t("Book your next journey to see it here")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedRides.length > 0 ? (
              completedRides.map((ride, index) => (
                <RideCard
                  key={index}
                  {...ride}
                  onFeedback={() => handleFeedback(ride, `${ride.from} to ${ride.to}`)}
                />
              ))
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-[#F2EDE3] to-white rounded-2xl border-2 border-dashed border-[#C7A76C]/30">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#C7A76C]/10 rounded-full flex items-center justify-center">
                  <Clock className="w-10 h-10 text-[#C7A76C]" />
                </div>
                <p className="text-[#1B2A3D] font-medium mb-1">{t("No completed rides")}</p>
                <p className="text-gray-500 text-sm">{t("Your ride history will appear here")}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <ReviewModal
          open={reviewModalOpen}
          onClose={() => { setReviewModalOpen(false); setSelectedRide(''); setSelectedRideId(null); setRating(0); setReviewText('') }}
          rideName={selectedRide}
          rating={rating}
          setRating={setRating}
          reviewText={reviewText}
          setReviewText={setReviewText}
          onSubmit={handleSubmitReview}
           loading={reviewLoading} 
        />

        <AlertDialog open={cancelDialogOpen} 
        // onOpenChange={setCancelDialogOpen}
        >
          <AlertDialogContent className="bg-white max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#0E3C2F]">{t("Cancel This Ride?")}</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                {rideToCancel !== null && upcomingRides[rideToCancel] && (
                  <>
                    {t("Are you sure you want to cancel your ride from")}{' '}
                
                    <span className="font-medium text-[#0E3C2F]">
                      {upcomingRides[rideToCancel].from}
                    </span>{' '}
                    {t("to")}{' '}
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
                Keep Ride
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
    </div>
  )
}

export default Myrides