"use client";

import React from "react";
import { ArrowRight, Calendar, Car, Clock, MapPin, User } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../../lib/i18n";


export function UpcomingRideCard({ upcomingData = [] }) {
  const router = useRouter();
  const { t } = useTranslation();

  // cleanup: agar first item null ho to skip karo
  const rideInfo = upcomingData[0] || {};
  const routes = Array.isArray(upcomingData[1]) ? upcomingData[1] : [];

  return (
    <Card className="border-none shadow-sm bg-gradient-to-br from-[#0E3C2F] to-[#0E3C2F]/80 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1" fill="white" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm mb-1">{t("Your Next Journey")}</p>
            <h3 className="text-white text-xl">{t("Upcoming Ride")}</h3>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Route */}
        {routes.length > 0 && (
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-white/80" />
                <p className="text-white">{t(routes[0].departure_city_name)}</p>
              </div>
              <p className="text-sm text-white/60">{t(rideInfo.pickup_address)}</p>
            </div>

            <div className="flex-shrink-0">
              <ArrowRight className="w-6 h-6 text-white/60" />
            </div>

            <div className="flex-1 text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                <p className="text-white">{t(routes[0].destination_city_name)}</p>
                <MapPin className="w-4 h-4 text-white/80" />
              </div>
              <p className="text-sm text-white/60">{t(rideInfo.pickup_address)}</p>
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-white/80" />
            <div>
              <p className="text-xs text-white/60">{t("Date")}</p>
              <p className="text-sm text-white">{t(rideInfo.booking_date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-white/80" />
            <div>
              <p className="text-xs text-white/60">{t("Time")}</p>
              <p className="text-sm text-white">{routes[0]?.time || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-white/80" />
            <div>
              <p className="text-xs text-white/60">{t("Vehicle")}</p>
              <p className="text-sm text-white">{rideInfo.vehicle_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-white/80" />
            <div>
              <p className="text-xs text-white/60">{t("Driver")}</p>
              <p className="text-sm text-white">{rideInfo.driver_name || "Not Assigned"}</p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-white/90">{t("Confirmed & Ready")}</span>
        </div>

        {/* Action Button */}
        <Button
          className="w-full bg-white text-[#0E3C2F] hover:bg-white/90 shadow-sm"
          onClick={() => {
            router.push("/myrides");
          }}
        >
          {t("View Details")}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
