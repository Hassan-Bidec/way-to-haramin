"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/sellect";
import { getBookingParams } from "@/lib/api";

export function DashboardQuickBooking() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");

  const citie = ["Makkah", "Madinah", "Jeddah", "Jeddah Airport", "Madinah Airport"];
     const [cities, setCities] = useState([]);

  useEffect(() => {
     const BookingParams = async () => {
       try {
         const data = await getBookingParams();
 
         const _cities = data?.data?.cities || [];
     
 
         // Set States
         setCities(_cities);

 
         console.log("Booking hotels Response:", _cities);
       } catch (error) {
         console.error("Error fetching cities:", error);
       }
     };
 
     BookingParams();
   }, []);
 



  const handleContinue = () => {
    if (from && to) {
      router.push(`/Book?from=${from}&to=${to}&date=${date}`);
    }
  };

  const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Card className="border-none shadow-sm ">
      <div className="p-6">
        <h3 className="text-[#0E3C2F] mb-6">Quick Booking</h3>

        <div className="space-y-4">
          {/* From */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-[#C7A76C]" />
              From
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

          {/* To */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-[#C7A76C]" />
              To
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

          {/* Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarIcon className="w-4 h-4 text-[#C7A76C]" />
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-4 bg-[#F7F7F9] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7A76C] focus:border-transparent transition-all"
              min={minDate}
            />
          </div>

          {/* Button */}
          <Button
            className="w-full h-11 bg-[#0E3C2F] text-white hover:bg-[#0E3C2F]/90 shadow-sm"
            onClick={handleContinue}
            disabled={!from || !to}
          >
            Continue Booking
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
