"use client"
import { Button } from '@/app/dashboard/ui/button';
import { Calendar } from '@/app/dashboard/ui/Calendar';
import { Card, CardContent } from '@/app/dashboard/ui/Card';
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/app/dashboard/ui/sellect';
// import { SelectContent } from '@radix-ui/react-select';
import { ArrowRight, Building2, CalendarIcon, Check, Filter, MapPin, Repeat, Search, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css"
import { Input } from '@/app/dashboard/ui/Input';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/dashboard/ui/popover';
import { VehicleCard } from '@/app/dashboard/ui/VehicleCard';
import { Badge } from '@/app/dashboard/ui/badgeVariants';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getBookingParams, rideBooking } from '@/lib/api';
import { useAuthStore } from '@/lib/useAuthStore';
import TimeSelector from '../TimeSelector';

const BookRide = () => {
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const router = useRouter()
  const [step, setStep] = useState(1);
  const [tripType, setTripType] = useState('one-way');
  const [from, setFrom] = useState(searchParams.get('from') || '');
  const [to, setTo] = useState(searchParams.get('to') || '');
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');

  const [date, setDate] = useState(() =>
    searchParams.get("date")
      ? new Date(searchParams.get("date") + "T00:00:00")
      : null
  );
  const [returnDate, setReturnDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [returnTimeSlot, setReturnTimeSlot] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [selectedVehicleForVendors, setSelectedVehicleForVendors] = useState('');
  const [vehicleSearchQuery, setVehicleSearchQuery] = useState('');
  const [vehicleRatingFilter, setVehicleRatingFilter] = useState('all');
  const [selectedHotelId, setSelectedHotelId] = useState('');
const [selectedVehicleImage, setSelectedVehicleImage] = useState("");
  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [places, setPlaces] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // const cities = ['Makkah', 'Madinah', 'Jeddah', 'Jeddah Airport', 'Madinah Airport'];
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookride, setBookride] = useState([]);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const tomorrow = new Date();
  if(date == null){
tomorrow.setDate(tomorrow.getDate() + 1);
} else {
  tomorrow.setDate(date.getDate() + 1);
}
  useEffect(() => {
    console.log("vehicles", vehicles);

    const BookingParams = async () => {
      try {
        const data = await getBookingParams();

        const _cities = data?.data?.cities || [];
        const _hotels = data?.data?.hotels || [];
        const _places = data?.data?.places || [];
        const _vehicle = data?.data?.vehicles || [];

        // Set States
        setCities(_cities);
        setHotels(_hotels);
        setPlaces(_places);
        setVehicles(_vehicle);

        console.log("Booking _vehicle Response:", _vehicle);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    BookingParams();
  }, []);




  const vendorsByVehicle = {
    sedan: [
      { id: 'alsafa-sedan', name: 'Al-Safa Transport', rating: 4.9, reviews: 523, price: 'SAR 850', priceRoundTrip: 'SAR 1,600', responseTime: '< 10 min', badge: 'top-rated' },
      { id: 'alharamain-sedan', name: 'Al-Haramain Express', rating: 4.7, reviews: 412, price: 'SAR 820', priceRoundTrip: 'SAR 1,550', responseTime: '< 15 min', badge: 'best-value' },
      { id: 'makkahtrans-sedan', name: 'Makkah Transport Co', rating: 4.6, reviews: 298, price: 'SAR 880', priceRoundTrip: 'SAR 1,650', responseTime: '< 20 min' },
    ],
    suv: [
      { id: 'alsafa-suv', name: 'Al-Safa Transport', rating: 4.9, reviews: 456, price: 'SAR 1,100', priceRoundTrip: 'SAR 2,100', responseTime: '< 10 min', badge: 'top-rated' },
      { id: 'premium-suv', name: 'Premium Fleet Services', rating: 4.8, reviews: 387, price: 'SAR 1,050', priceRoundTrip: 'SAR 2,000', responseTime: '< 12 min', badge: 'best-value' },
      { id: 'royalride-suv', name: 'Royal Ride Transport', rating: 4.7, reviews: 324, price: 'SAR 1,150', priceRoundTrip: 'SAR 2,200', responseTime: '< 8 min', badge: 'fastest' },
    ],
    van: [
      { id: 'familyfleet-van', name: 'Family Fleet Services', rating: 4.8, reviews: 267, price: 'SAR 1,450', priceRoundTrip: 'SAR 2,750', responseTime: '< 15 min', badge: 'top-rated' },
      { id: 'grouptravel-van', name: 'Group Travel Solutions', rating: 4.6, reviews: 198, price: 'SAR 1,380', priceRoundTrip: 'SAR 2,600', responseTime: '< 20 min', badge: 'best-value' },
    ],
    luxury: [
      { id: 'alsafa-luxury', name: 'Al-Safa Transport', rating: 4.9, reviews: 612, price: 'SAR 1,800', priceRoundTrip: 'SAR 3,400', responseTime: '< 10 min', badge: 'top-rated' },
      { id: 'vipexclusive-luxury', name: 'VIP Exclusive Transport', rating: 4.9, reviews: 445, price: 'SAR 1,900', priceRoundTrip: 'SAR 3,600', responseTime: '< 5 min', badge: 'fastest' },
      { id: 'royalride-luxury', name: 'Royal Ride Transport', rating: 4.8, reviews: 389, price: 'SAR 1,750', priceRoundTrip: 'SAR 3,300', responseTime: '< 12 min', badge: 'best-value' },
    ],
  };
  const ratingOptions = [
    { value: "all", label: "All Vehicles" },
    { value: "4", label: "4.0+ Stars" },
    { value: "4.5", label: "4.5+ Stars" },
    { value: "4.7", label: "4.7+ Stars" },
    { value: "4.8", label: "4.8+ Stars" },
  ];


  // Filter vehicles based on search and rating
  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.vehicle_title
          .toLowerCase()
          .includes(vehicleSearchQuery.toLowerCase());

      const matchesRating =
        vehicleRatingFilter === "all" ||
        (vehicleRatingFilter === "4" && vehicle.reviews >= 4) ||
        (vehicleRatingFilter === "4.5" && vehicle.reviews >= 4.5) ||
        (vehicleRatingFilter === "4.7" && vehicle.reviews >= 4.7) ||
        (vehicleRatingFilter === "4.8" && vehicle.reviews >= 4.8);

      return matchesSearch && matchesRating;
    });

    return result;
  }, [vehicles, vehicleSearchQuery, vehicleRatingFilter]);

  // const handleNext = () => {
  //   if (step === 1 && (!from || !to)) {
  //     toast.error('Please select both departure and destination');
  //     return;
  //   }
  //   if (step === 1 && !date) {
  //     toast.error('Please select travel date');
  //     return;
  //   }
  //   if (step === 1 && !timeSlot) {
  //     toast.error('Please select departure time');
  //     return;
  //   }
  //   if (step === 1 && tripType === 'round-trip' && !returnDate) {
  //     toast.error('Please select return date');
  //     return;
  //   }
  //   if (step === 1 && tripType === 'round-trip' && !returnTimeSlot) {
  //     toast.error('Please select return time');
  //     return;
  //   }
  //   if (step === 2 && !selectedVehicle) {
  //     toast.error('Please select a vehicle');
  //     return;
  //   }
  //   if (step === 1 && tripType === 'round-trip' && !returnTimeSlot) {
  //     toast.error('Please select return time');
  //     return;
  //   }
  //   setStep(step + 1);

  // };

  // Saudi Time helpers
const handleNext = () => {
  // === BASIC VALIDATION ===
  if (step === 1 && (!from || !to)) return toast.error('Please select both departure and destination');
  if (step === 1 && !date) return toast.error('Please select travel date');
  if (step === 1 && !timeSlot) return toast.error('Please select departure time');

  if (step === 1 && tripType === 'round-trip' && !returnDate)
    return toast.error('Please select return date');

  if (step === 1 && tripType === 'round-trip' && !returnTimeSlot)
    return toast.error('Please select return time');

  if (step === 2 && !selectedVehicle) return toast.error('Please select a vehicle');


  // ===========================
  // ✅ SAUDI ARABIA VALIDATION
  // ===========================

  // Convert date & times
  const parseTime = (t) => {
    if (!t) return null;
    const [h, mmPeriod] = t.split(":");
    const minute = mmPeriod.split(" ")[0];
    const period = mmPeriod.split(" ")[1];
    let hour = parseInt(h);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return { hour, minute: parseInt(minute) };
  };

  const saNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" }));
  const minAllowedTime = new Date(saNow.getTime() + 6 * 60 * 60 * 1000); // +6 hours

  // Travel date object
  const selectedDateObj = new Date(date);
  selectedDateObj.setHours(0, 0, 0, 0);

  const todaySaudi = new Date(saNow);
  todaySaudi.setHours(0, 0, 0, 0);

  // Build full selected departure time datetime
  const depTime = parseTime(timeSlot);
  const departureDateTime = new Date(selectedDateObj);
  departureDateTime.setHours(depTime.hour, depTime.minute, 0, 0);

  // ===========================
  // ✅ RULE 1: Today → must be >= +6 hours
  // ===========================
  if (selectedDateObj.getTime() === todaySaudi.getTime()) {
    if (departureDateTime < minAllowedTime) {
      return toast.error(
        "Selected Departure time must be at least 6 hours ahead of the current time in Saudi Arabia."
      );
    }
  }


   // ===========================
  // RULE 2: Round-trip same day -> return time must be STRICTLY greater than departure time
  // ===========================
  // if (tripType === "round-trip" && selectedDateObj && retDateObj) {
  //   if (selectedDateObj.getTime() === retDateObj.getTime()) {
  //     const ret = parseTimeTo24(returnTimeSlot);
  //     if (!ret) return toast.error("Invalid return time format.");

  //     const depTotalMinutes = dep.hour24 * 60 + dep.minute;
  //     const retTotalMinutes = ret.hour24 * 60 + ret.minute;

  //     if (retTotalMinutes <= depTotalMinutes) {
  //       return toast.error("Return time must be greater than departure time when both dates are the same.");
  //     }
  //   }
  // }

  // Passed all validations → next step
  setStep(step + 1);
};

  const getSaudiNow = () => {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" }));
};

const getSaudiDate = (date) => {
  return new Date(new Date(date).toLocaleString("en-US", { timeZone: "Asia/Riyadh" }));
};

// Departure Time validation
useEffect(() => {
  if (!date || !timeSlot) return;

  const now = getSaudiNow();

  let [hour, minute] = timeSlot.split(/[: ]/).map((v, i) => (i === 2 ? v : Number(v)));
  const period = timeSlot.split(" ")[1];

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const selectedDateTime = new Date(`${date}T${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}:00`);
  
  if (selectedDateTime <= now) {
    toast.error("You can only book after the current time!");
    setTimeSlot("");
  }
}, [date, timeSlot]);

// Return Time validation
useEffect(() => {
  if (!returnDate || !returnTimeSlot || !date || !timeSlot) return;

  const now = getSaudiNow();

  // Parse departure time
  let [depHour, depMinute] = timeSlot.split(/[: ]/).map((v, i) => (i === 2 ? v : Number(v)));
  if (timeSlot.includes("PM") && depHour !== 12) depHour += 12;
  if (timeSlot.includes("AM") && depHour === 12) depHour = 0;
  const depDateTime = new Date(date);
  depDateTime.setHours(depHour, depMinute, 0, 0);

  // Parse return time
  let [retHour, retMinute] = returnTimeSlot.split(/[: ]/).map((v, i) => (i === 2 ? v : Number(v)));
  if (returnTimeSlot.includes("PM") && retHour !== 12) retHour += 12;
  if (returnTimeSlot.includes("AM") && retHour === 12) retHour = 0;
  const retDateTime = new Date(returnDate);
  retDateTime.setHours(retHour, retMinute, 0, 0);

  // Check if return time is after departure and current Saudi time
  if (returnDate.toDateString() === date.toDateString() && retDateTime <= depDateTime) {
    toast.error("Return time must be after departure time!");
    setReturnTimeSlot("");
  }
  if (retDateTime <= now) {
    toast.error("You can only select a return time after current Saudi time!");
    setReturnTimeSlot("");
  }
}, [
  date ? date.toISOString() : null,
  returnDate ? returnDate.toISOString() : null,
  timeSlot,
  returnTimeSlot
]);

// Return time dropdown filter (hour example)
const returnHours = Array.from({ length: 12 }, (_, i) => i + 1)
  .filter((hour) => {
    if (!timeSlot || !date || !returnDate) return true;

    let [depHour] = timeSlot.split(/[: ]/).map(Number);
    if (timeSlot.includes("PM") && depHour !== 12) depHour += 12;
    if (timeSlot.includes("AM") && depHour === 12) depHour = 0;

    if (returnDate.toDateString() === date.toDateString()) {
      let h24 = hour;
      if (returnTimeSlot.includes("PM") && h24 !== 12) h24 += 12;
      if (returnTimeSlot.includes("AM") && h24 === 12) h24 = 0;
      return h24 > depHour;
    }
    return true;
  });




  // const handleConfirm = () => {
  //   toast.success('Your booking is confirmed! Details will be sent to your WhatsApp.');
  //   router.push('/myrides');
  // };
  const handleConfirm = async () => {
    // if (!selectedVehicle || !selectedVendor) {
    //   toast.error("Please select a vehicle and vendor");
    //   return;
    // }

    const formatDate = (d) => {
      if (!d) return null;
      if (typeof d === "string") return d; // already a string
      return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
    };

    const customer_id = Number(localStorage.getItem("customer_id")) || 1; // dummy fallback
    const fromCity = cities.find(city => city.name.toLowerCase() === from?.toLowerCase());
    const toCity = cities.find(city => city.name.toLowerCase() === to?.toLowerCase());

const addOneDay = (date) => {
  if (!date) return null;
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d;
};
// console.log("selectedVehicle", selectedVehicle);
// return;
    // Prepare payload based on trip type
    const payload =
      tripType === "one-way"
        ? {
          booking_type: 1,
          booking_date: formatDate(date) || "2025-11-20",
          customer_id: user?.id,
          hotel_id: selectedHotelId ? Number(selectedHotelId) : null,
          vehicle_id: selectedVehicle || 1,
          partner_id: selectedVendor,
          pickup_address: fromAddress || "Dummy Address",
          departure_city_id: fromCity?.id || 1,
          destination_city_id: toCity?.id || 3,

          // hotel_id: 2,
          time: timeSlot || "10:00",
        }
        : {
          booking_type: 2,
          booking_date: formatDate(addOneDay(date)) || "2025-11-20",
return_date: formatDate(addOneDay(returnDate)) || "2025-11-22",
          customer_id: user?.id,
          vehicle_id: selectedVehicle || "",
          partner_id: selectedVendor?.id || 1,
          pickup_address: fromAddress || "Dummy Address",
          departure_city_id: fromCity?.id || 1,
          destination_city_id: toCity?.id || 3,
          hotel_id: selectedHotelId ? Number(selectedHotelId) : null,
          time: timeSlot || "10:00",
          return_time: returnTimeSlot || "16:00",
        };

    console.log("Submitting Payload:", payload, "check vender id:", selectedVendor);

    // Submit API call
    const res = await rideBooking(payload);

    if (!res.status) {
      toast.error(res.message || "Booking failed");
      return;
    }

    toast.success("Your booking is confirmed! Details will be sent to WhatsApp.");

    router.push("/myrides");
  };

  const handleTimeSelect = (selectedHour, selectedMinute, period) => {
    if (!date) {
      toast.error("Please select a date first!");
      return;
    }



    const now = getSaudiNow();

    const selectedDate = getSaudiDate(date);


    // Convert selected time to 24-hour
    let userHour = parseInt(selectedHour);
    if (period === "PM" && userHour !== 12) userHour += 12;
    if (period === "AM" && userHour === 12) userHour = 0;

    const currentHour = now.getHours();

    // 👉 Check ONLY if selected date is today
    const isToday =
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate();

    if (isToday && userHour < currentHour) {
      toast.error("You can only book after the current time!");
      return;
    }

    // Set time if valid
    setTimeSlot(`${selectedHour}:${selectedMinute} ${period}`);
  };


  return (
    <div className="min-h-screen bg-background py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#0E3C2F] mb-6 sm:mb-8 transition-colors group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base">Back to Dashboard</span>
        </button>

        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
            {['Trip Details', 'Select Vehicle', 'Confirm'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${step > index + 1
                      ? 'bg-[#0E3C2F] text-white shadow-lg'
                      : step === index + 1
                        ? 'bg-gradient-to-br from-[#0E3C2F] to-[#0E3C2F]/80 text-white shadow-xl scale-110'
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                      }`}
                  >
                    {step > index + 1 ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    ) : (
                      <span className="text-xs sm:text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-medium whitespace-nowrap ${step >= index + 1 ? 'text-[#0E3C2F]' : 'text-gray-400'
                      }`}
                  >
                    {label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`w-8 sm:w-16 lg:w-24 h-0.5 sm:h-1 mx-2 sm:mx-3 lg:mx-4 rounded-full transition-all duration-300 ${step > index + 1 ? 'bg-[#0E3C2F]' : 'bg-gray-200'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Trip Details (Route + Date & Time) */}
        {step === 1 && (
          <Card className="border-none shadow-lg bg-white">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl text-[#1B2A3D] mb-2">Plan Your Journey</h2>
                <p className="text-sm sm:text-base text-gray-500">Select your route and preferred travel time</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-[#1B2A3D] font-medium">
                      Trip Type
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setTripType('one-way')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-lg transition-all font-medium ${tripType === 'one-way'
                          ? 'bg-white text-[#0E3C2F] shadow-sm'
                          : 'text-gray-600 hover:text-[#0E3C2F]'
                          }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                        One Way
                      </button>
                      <button
                        type="button"
                        onClick={() => setTripType('round-trip')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-lg transition-all font-medium ${tripType === 'round-trip'
                          ? 'bg-white text-[#0E3C2F] shadow-sm'
                          : 'text-gray-600 hover:text-[#0E3C2F]'
                          }`}
                      >
                        <Repeat className="w-4 h-4" />
                        Round Trip
                      </button>
                    </div>
                  </div>

                  {/* From */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#C7A76C]" />
                      Departure
                    </label>
                     <label className="block text-sm text-gray-600 mb-1.5">
                        Departure City
                      </label>
                    <Select value={from} onValueChange={setFrom}>
                      <SelectTrigger className="h-11 bg-[#F7F7F9] border-gray-200">
                        <SelectValue placeholder="Select departure city" />
                      </SelectTrigger>
                      <SelectContent className="bg-white p-2">
                        {/* Search bar inside dropdown */}
                        <input
                          type="text"
                          placeholder="Search city..."
                          value={fromSearch}
                          onChange={(e) => setFromSearch(e.target.value)}
                          className="w-full mb-2 h-9 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C7A76C]"
                        />
                        {cities
                          .filter(city => city.name.toLowerCase().includes(fromSearch.toLowerCase()))
                          .map(city => (
                            <SelectItem key={city.id} value={city.name}>
                              {city.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {from && (
                    <div className="mt-3">
                      <label className="block text-sm text-gray-600 mb-1.5">
                        Departure Full Address
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter full address"
                        value={fromAddress}
                        onChange={(e) => setFromAddress(e.target.value)}
                        className="h-10 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C]"
                      />
                    </div>
                  )}

                  {/* To */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#C7A76C]" />
                      Destination
                    </label>
                     <label className="block text-sm text-gray-600 mb-1.5">
                      Destination City
                      </label>
                    <Select value={to} onValueChange={setTo}>
                      <SelectTrigger className="h-11 bg-[#F7F7F9] border-gray-200">
                        <SelectValue placeholder="Select destination city" />
                      </SelectTrigger>
                      <SelectContent className="bg-white p-2">
                        {/* Search bar inside dropdown */}
                        <input
                          type="text"
                          placeholder="Search city..."
                          value={toSearch}
                          onChange={(e) => setToSearch(e.target.value)}
                          className="w-full mb-2 h-9 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C7A76C]"
                        />
                        {cities
                          .filter(city => city !== from)
                          .filter(city => city.name.toLowerCase().includes(toSearch.toLowerCase()))
                          .map(city => (
                            <SelectItem key={city.id} value={city.name}>
                              {city.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {to && (
                    <div className="mt-3">
                      <label className="block text-sm text-gray-600 mb-1.5">
                        Destination Full Address
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter full address"
                        value={toAddress}
                        onChange={(e) => setToAddress(e.target.value)}
                        className="h-10 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C]"
                      />
                    </div>
                  )}



                  {/* <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-[#1B2A3D] font-medium">
                      <MapPin className="w-4 h-4 text-[#C7A76C]" />
                      Select Hotel
                    </label>

                    <Select
                      value={selectedHotelId}
                      onValueChange={(value) => {
                        setSelectedHotelId(value);
                      }}
                    >
                      <SelectTrigger className="h-12 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C]">
                        <SelectValue placeholder="Select Hotel" />
                      </SelectTrigger>

                      <SelectContent>
                        {hotels.map((hotel) => (
                          <SelectItem key={hotel.id} value={hotel?.id.toString()}>
                            {hotel?.hotel_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>


                  </div> */}


                  {/* <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-[#1B2A3D] font-medium">
                      <CalendarIcon className="w-4 h-4 text-[#C7A76C]" />
                      Preferred Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <Select
                        value={timeSlot.split(':')[0] || ''}
                        onValueChange={(hour) => {
                          const minute = timeSlot.split(':')[1]?.split(' ')[0] || '00';
                          const period = timeSlot.split(' ')[1] || 'AM';

                          handleTimeSelect(hour, minute, period);
                        }}

                      >
                        <SelectTrigger className="h-12 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C] transition-colors">
                          <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                            <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                              {hour.toString().padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={timeSlot.split(':')[1]?.split(' ')[0] || ''}
                        onValueChange={(minute) => {
                          const hour = timeSlot.split(':')[0] || '01';
                          const period = timeSlot.split(' ')[1] || 'AM';
                          setTimeSlot(`${hour}:${minute} ${period}`);
                        }}
                      >
                        <SelectTrigger className="h-12 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C] transition-colors">
                          <SelectValue placeholder="Min" />
                        </SelectTrigger>
                        <SelectContent>
                          {['00', '15', '30', '45'].map((minute) => (
                            <SelectItem key={minute} value={minute}>
                              {minute}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={timeSlot.split(' ')[1] || ''}
                        onValueChange={(period) => {
                          const hour = timeSlot.split(':')[0] || '01';
                          const minute = timeSlot.split(':')[1]?.split(' ')[0] || '00';
                          setTimeSlot(`${hour}:${minute} ${period}`);
                        }}
                      >
                        <SelectTrigger className="h-12 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C] transition-colors">
                          <SelectValue placeholder="AM/PM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div> */}
<TimeSelector
  selectedDate={date}
  timeSlot={timeSlot}
  setTimeSlot={setTimeSlot}
/>
  {tripType === 'round-trip' && (
  <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-[#1B2A3D] font-medium">
                          <CalendarIcon className="w-4 h-4 text-[#C7A76C]" />
                          Return Time
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <Select
                            value={returnTimeSlot.split(':')[0] || ''}
                            onValueChange={(hour) => {
                              const minute = returnTimeSlot.split(':')[1]?.split(' ')[0] || '00';
                              const period = returnTimeSlot.split(' ')[1] || 'AM';
                              setReturnTimeSlot(`${hour}:${minute} ${period}`);
                            }}
                          >
                            <SelectTrigger className="h-12 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C] transition-colors">
                              <SelectValue placeholder="Hour" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                                  {hour.toString().padStart(2, '0')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            value={returnTimeSlot.split(':')[1]?.split(' ')[0] || ''}
                            onValueChange={(minute) => {
                              const hour = returnTimeSlot.split(':')[0] || '01';
                              const period = returnTimeSlot.split(' ')[1] || 'AM';
                              setReturnTimeSlot(`${hour}:${minute} ${period}`);
                            }}
                          >
                            <SelectTrigger className="h-12 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C] transition-colors">
                              <SelectValue placeholder="Min" />
                            </SelectTrigger>
                            <SelectContent>
                              {['00', '15', '30', '45'].map((minute) => (
                                <SelectItem key={minute} value={minute}>
                                  {minute}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            value={returnTimeSlot.split(' ')[1] || ''}
                            onValueChange={(period) => {
                              const hour = returnTimeSlot.split(':')[0] || '01';
                              const minute = returnTimeSlot.split(':')[1]?.split(' ')[0] || '00';
                              setReturnTimeSlot(`${hour}:${minute} ${period}`);
                            }}
                          >
                            <SelectTrigger className="h-12 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C] transition-colors">
                              <SelectValue placeholder="AM/PM" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AM">AM</SelectItem>
                              <SelectItem value="PM">PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
  )}
                  {/* Route error */}
                  {from && to && (
                    <div className="p-6 bg-gradient-to-br from-[#F2EDE3] to-[#F7F7F9] rounded-2xl border border-[#C7A76C]/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-[#C7A76C] rounded-full"></div>
                          <span className="text-[#1B2A3D] font-medium">{from}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-[#C7A76C]" />
                        <div className="flex items-center gap-3">
                          <span className="text-[#1B2A3D] font-medium">{to}</span>
                          <div className="w-3 h-3 bg-[#C7A76C] rounded-full"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">From</p>
                          <p className="text-[#1B2A3D] font-medium">{fromAddress}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">to</p>
                          <p className="text-[#1B2A3D] font-medium">{toAddress}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Date */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-[#1B2A3D] font-medium">
                      <CalendarIcon className="w-4 h-4 text-[#C7A76C]" />
                      {tripType === 'round-trip' ? 'Departure Date' : 'Travel Date'}
                    </label>
                    <div className="bg-[#F7F7F9] p-4 rounded-2xl max-w-[320px]">
                      <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                        inline
                        calendarClassName="custom-datepicker"
                        dayClassName={() => "custom-day"}
                        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
                          <div className="flex justify-between items-center px-2 mb-2">
                            <button
                              onClick={decreaseMonth}
                              className="text-gray-500 hover:text-gray-700 mt-1" // <-- arrow slightly lower
                            >
                              {"<"}
                            </button>
                            <span className="text-gray-700 font-medium">
                              {monthDate.toLocaleString("default", {
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            <button
                              onClick={increaseMonth}
                              className="text-gray-500 hover:text-gray-700 mt-1" // <-- arrow slightly lower
                            >
                              {">"}
                            </button>
                          </div>
                        )}
                      />
                    </div>

                  </div>

                  {tripType === 'round-trip' && (
                    <>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-[#1B2A3D] font-medium">
                          <CalendarIcon className="w-4 h-4 text-[#C7A76C]" />
                          Return Date
                        </label>
                        <div className="bg-[#F7F7F9] p-4 rounded-2xl max-w-[320px]">
                          <DatePicker
                            selected={returnDate}
                            onChange={(date) => setReturnDate(date)}
                            minDate={returnDate || tomorrow}
                            inline
                            calendarClassName="custom-datepicker"
                            dayClassName={(day) => {
                              // disable color check
                              if (day < (date || new Date(new Date().setHours(0, 0, 0, 0)))) {
                                return "custom-day disabled-day";
                              }
                              return "custom-day";
                            }}
                            renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
                              <div className="flex justify-between items-center px-2 mb-2">
                                <button
                                  onClick={decreaseMonth}
                                  className="text-gray-500 hover:text-gray-700 mt-1"
                                >
                                  {"<"}
                                </button>
                                <span className="text-gray-700 font-medium">
                                  {monthDate.toLocaleString("default", {
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </span>
                                <button
                                  onClick={increaseMonth}
                                  className="text-gray-500 hover:text-gray-700 mt-1"
                                >
                                  {">"}
                                </button>
                              </div>
                            )}
                          />

                        </div>

                      </div>

                    
                    </>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <Button
                  className="w-full h-12 bg-gradient-to-r from-[#0E3C2F] to-[#0E3C2F]/90 text-white hover:shadow-lg transition-all"
                  onClick={handleNext}
                  disabled={
                    !from ||
                    !to ||
                    !date ||
                    !timeSlot ||
                    (tripType === 'round-trip' && (!returnDate || !returnTimeSlot))
                  }
                >
                  Continue to Vehicle Selection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Vehicle */}
        {step === 2 && (
          <div className="space-y-4 sm:space-y-6">
            <Card className="border-none shadow-sm bg-white p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl text-[#1B2A3D] mb-2">Choose Your Vehicle</h2>
                <p className="text-sm sm:text-base text-gray-500">Select a comfortable vehicle for your journey</p>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search vehicles by name"
                    value={vehicleSearchQuery}
                    onChange={(e) => setVehicleSearchQuery(e.target.value)}
                    className="pl-10 sm:pl-12 h-11 sm:h-12 bg-[#F7F7F9] border-gray-200 text-sm sm:text-base rounded-xl focus:ring-[#0E3C2F] focus:border-[#0E3C2F]"
                  />
                </div>

                {/* Filter Dropdown */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-11 sm:h-12 px-4 sm:px-6 rounded-xl border-gray-200 hover:border-[#0E3C2F] hover:bg-[#F2EDE3]/30 relative"
                    >
                      <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-sm sm:text-base">Filters</span>
                      {vehicleRatingFilter !== 'all' && (
                        <Badge className="ml-2 bg-[#C7A76C] hover:bg-[#C7A76C]/90 text-white">1</Badge>
                      )}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[280px] sm:w-80 p-3 sm:p-4" align="end">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                        Filter by Rating
                      </p>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2  ">
                        {ratingOptions.map((rate) => (
                          <Button
                            key={rate.value}
                            size="sm"
                            onClick={() => setVehicleRatingFilter(rate.value)}
                            variant={vehicleRatingFilter === rate.value ? "default" : "outline"}
                            className={`rounded-full ${vehicleRatingFilter === rate.value
                              ? "bg-[#0E3C2F] text-white hover:bg-[#0E3C2F]/90"
                              : "border-gray-200 hover:border-[#0E3C2F] hover:bg-[#F2EDE3]/30 "
                              }`}
                          >
                            {rate.value === "all" ? (
                              rate.label
                            ) : (
                              <>
                                <Star className="w-3.5 h-3.5 mr-1.5" />
                                {rate.label}
                              </>
                            )}
                          </Button>
                        ))}

                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Results count */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-[#0E3C2F]">{filteredVehicles.length}</span> vehicle
                  {filteredVehicles.length !== 1 ? "s" : ""}
                </p>
              </div>
            </Card>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}

                  // ✔ Spread se saara data VehicleCard ko pass ho raha hai
                  {...vehicle}

                  // ✔ Vehicle title separately pass (agar kahin specifically use ho)
                  vehicle_title={vehicle?.vehicle_title}

                  // ✔ Check kar raha hai ki yeh vehicle selected hai ya nahi
                  selected={selectedVehicle === vehicle.id}

                  // ✔ Jab koi vehicle select ho → state update ho jayegi
                   onSelect={() => {
                    setSelectedVehicle(vehicle.id);
                    setSelectedVendor(vehicle.partner_id);
                    setSelectedVehicleImage(vehicle.image || vehicle.thumbnail || vehicle.vehicle_image);
                  }}

                  // ✔ Vendors modal open karne wala function
                  onViewVendors={() => {
                    setSelectedVehicleForVendors(vehicle.id); // ← kis vehicle ke vendors dekhne hain
                    setShowVendorModal(true);                 // ← modal open
                  }}


                  continueButton={
                    selectedVehicle === vehicle.id ? (
                      <Button onClick={handleNext} className="w-full bg-gradient-to-r from-[#0E3C2F] to-[#0E3C2F]/90 text-white hover:shadow-lg cursor-pointer">
                        Continue
                      </Button>

                    ) : null
                  }
                />
              ))}
            </div>


            {/* {selectedVehicleForVendors && (
              <VendorComparisonModal
                isOpen={showVendorModal}
                onClose={() => setShowVendorModal(false)}
                vehicleName={vehicles.find(v => v.id === selectedVehicleForVendors)?.vehicle_title || ""}
                vendors={vendorsByVehicle[selectedVehicleForVendors] || []}
                onSelectVendor={(vendorId) => {
                  setSelectedVendor(vendorId);
                  setSelectedVehicle(selectedVehicleForVendors);
                }}
                selectedVendorId={selectedVendor}
                tripType={tripType}
              />
            )} */}

            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 h-12 border-2 border-gray-200 hover:border-[#0E3C2F] hover:bg-[#F2EDE3]/30"
              >
                <ArrowRight className="mr-2 w-5 h-5 rotate-180" />
                Back
              </Button>

              {/* <Button
                onClick={handleNext}
                className="flex-1 h-12 bg-gradient-to-r from-[#0E3C2F] to-[#0E3C2F]/90 text-white hover:shadow-lg transition-all"
                disabled={!selectedVehicle}
              >
                Continue to Review
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button> */}
            </div>
          </div>

        )}

        {step === 3 && (
          <Card className="border-none shadow-lg bg-white">
            <CardContent className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl text-[#1B2A3D] mb-2">Review Your Booking</h2>
                <p className="text-gray-500">Please verify all details before confirming</p>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C7A76C] to-[#C7A76C]/90 text-white rounded-full">
                  {tripType === 'round-trip' ? <Repeat className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  <span className="font-medium capitalize">{tripType === 'round-trip' ? 'Round Trip' : 'One Way'}</span>
                </div>

                <div className="p-6 bg-gradient-to-br from-[#F2EDE3] to-white rounded-2xl border border-[#C7A76C]/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Journey Route</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[#1B2A3D] font-medium">{from}</span>
                        {tripType === 'round-trip' ? (
                          <Repeat className="w-4 h-4 text-[#C7A76C]" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-[#C7A76C]" />
                        )}
                        <span className="text-[#1B2A3D] font-medium">{to}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{fromAddress}  • {toAddress}  {tripType === 'round-trip' && '(each way)'}</p>
                    </div>
                    <MapPin className="w-8 h-8 text-[#C7A76C]" />
                  </div>
                </div>

                <div className="p-6 bg-[#F7F7F9] rounded-2xl border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">{tripType === 'round-trip' ? 'Departure Schedule' : 'Travel Schedule'}</p>
                      <p className="text-[#1B2A3D] font-medium">
                        {date?.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{timeSlot}</p>
                    </div>
                    <CalendarIcon className="w-8 h-8 text-[#C7A76C]" />
                  </div>
                </div>

                {/* Date & Time Card - Return (for round trip) */}
                {tripType === 'round-trip' && (
                  <div className="p-6 bg-[#F7F7F9] rounded-2xl border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Return Schedule</p>
                        <p className="text-[#1B2A3D] font-medium">
                          {returnDate?.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{returnTimeSlot}</p>
                      </div>
                      <CalendarIcon className="w-8 h-8 text-[#C7A76C]" />
                    </div>
                  </div>
                )}

                {/* Vehicle Card */}
                <div className="p-6 bg-[#F7F7F9] rounded-2xl border border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Selected Vehicle</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center">
                         {selectedVehicleImage ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_LIVE}${selectedVehicleImage}`}
                            className="h-20 w-20  rounded-lg"
                          />
                        ) : (
                          <span className="text-2xl">🚗</span>
                        )}
                      </div>
                      <div>
                        <p className="text-[#1B2A3D] font-medium">
                          {vehicles.find((v) => v.id === selectedVehicle)?.vehicle_title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {vehicles.find((v) => v.id === selectedVehicle)?.seating_capacity}
                        </p>
                      </div>
                    </div>
                    {vehicles.find((v) => v.id === selectedVehicle)?.avg_rating && (
                      <div className="flex items-center gap-1 bg-[#F2EDE3] px-3 py-2 rounded-lg">
                        <Star className="w-4 h-4 fill-[#C7A76C] text-[#C7A76C]" />
                        <span className="font-medium text-[#1B2A3D]">
                          {vehicles.find((v) => v.id === selectedVehicle)?.avg_rating}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Vendor error */}
                  {selectedVendor && (() => {
                    const vendor = Object.values(vendorsByVehicle).flat().find(v => v.id === selectedVendor);
                    return vendor ? (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-4 h-4 text-[#0E3C2F]" />
                          <p className="text-xs text-gray-500">Service Provider</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[#0E3C2F]">{vendor.name}</p>
                          <div className="flex items-center gap-1 bg-[#F2EDE3] px-2 py-1 rounded-lg">
                            <Star className="w-3 h-3 fill-[#C7A76C] text-[#C7A76C]" />
                            <span className="text-xs font-medium text-[#1B2A3D]">
                              {vendor.rating} ({vendor.reviews})
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Driver error */}
                <div className="p-6 bg-gradient-to-br from-[#0E3C2F] to-[#0E3C2F]/90 rounded-2xl text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm text-white/80">Driver Assignment</p>
                  </div>
                  <p className="font-medium">Professional driver will be assigned 24 hours before your trip</p>
                </div>

                {/* Payment error */}
                {/* <div className="p-6 bg-gradient-to-br from-[#C7A76C]/10 to-white rounded-2xl border-2 border-[#C7A76C]/30">
                  <p className="text-sm text-gray-500 mb-2">Payment Method</p>
                  <p className="text-[#0E3C2F] font-medium">Pay after your ride • No upfront payment required</p>
                  <p className="text-lg font-semibold text-[#0E3C2F] mt-3">
                    Estimated fare: {(() => {
                      const vendor = Object.values(vendorsByVehicle).flat().find(v => v.id === selectedVendor);
                      if (vendor) {
                        return tripType === 'round-trip' ? vendor.priceRoundTrip : vendor.price;
                      }
                      return tripType === 'round-trip'
                        ? vehicles.find((v) => v.id === selectedVehicle)?.priceRoundTrip
                        : vehicles.find((v) => v.id === selectedVehicle)?.price;
                    })()}
                    {tripType === 'round-trip' && <span className="text-sm text-gray-500 ml-2">(Round trip)</span>}
                  </p>
                </div> */}
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 h-12 border-2 border-gray-200 hover:border-[#0E3C2F] hover:bg-[#F2EDE3]/30"
                >
                  <ArrowRight className="mr-2 w-5 h-5 rotate-180" />
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 h-12 bg-gradient-to-r from-[#0E3C2F] to-[#0E3C2F]/90 text-white hover:shadow-xl transition-all cursor-pointer"
                >
                  <Check className="mr-2 w-5 h-5" />
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default BookRide