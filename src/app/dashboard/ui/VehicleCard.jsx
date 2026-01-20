"use client";

import React from "react";
import { Check, Star, Building2, Users } from "lucide-react";

import { Button } from "./button";
import { Badge } from "./badgeVariants";
import { Card, CardContent } from "./Card";
import { ImageWithFallback } from "../ServicesComponent/ImageWithFallback";
import { useTranslation } from "react-i18next";

export function VehicleCard({
  Type,
  avg_rating,
  color,
  company,
  model,
  partner_name,
  seating_capacity,
  vehicle_title,
  description,
  partner_id,
  onSelect,
  selected,
  onViewVendors,
  image,
  continueButton // ← parent se aane wala Continue Button
}) {
  const isVIP = true;

  const { t } = useTranslation();
  return (
    <Card
      className={`overflow-hidden transition-all cursor-pointer ${
        selected ? "ring-2 ring-[#0E3C2F] shadow-lg" : "hover:shadow-lg"
      }`}
      onClick={onSelect} // ← vehicle card click se select hoga
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        {/* Vehicle Image */}
        <ImageWithFallback
          src={
            image
              ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_LIVE}${image}`
              : "/car1.jfif"
          }
          alt="Car Image"
          className="w-full h-full object-cover"
        />

        {/* VIP Badge */}
        {/* {isVIP && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-[#C7A76C] to-[#C7A76C]/90 text-white border-none">
            VIP
          </Badge>
        )} */}

        {/* Vendors Count Badge */}
        {/* {partner_id && avg_rating?.length > 1 && (
          <Badge className="absolute top-3 left-3 bg-white/95 text-[#0E3C2F] border-none shadow-md">
            <Users className="w-3 h-3 mr-1" />
            {avg_rating.length} Vendors
          </Badge>
        )} */}

        {/* Selected Tick Badge */}
        {selected && (
          <div className="absolute bottom-3 left-3 w-8 h-8 bg-[#0E3C2F] rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Title + Rating */}
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-[#1B2A3D] -mt-5">{vehicle_title}</h1>

          <div className="flex items-center gap-1 bg-[#F2EDE3] px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 fill-[#C7A76C] text-[#C7A76C]" />
            <span className="text-sm font-medium text-[#1B2A3D]">
              {avg_rating ? avg_rating : "0"}
            </span>
          </div>
        </div>

        {/* Seating */}
        <p className="text-gray-500 text-sm mb-3">{seating_capacity} {t("passenger")}</p>

        {/* Description */}
        <div className="flex flex-wrap gap-2 mb-4">
          <p className="text-sm text-gray-600">
            {description ? description : "Smooth and comfortable ride"}
          </p>
        </div>

        {/* Vendor Information */}
        {partner_name && (
          <div className="mb-4 p-3 bg-gradient-to-br from-[#0E3C2F]/5 to-white rounded-xl border border-[#0E3C2F]/10">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-3 h-3 text-[#0E3C2F]" />
              <p className="text-xs text-gray-500">{t("Vendor")}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#1B2A3D]">
                {partner_name || "Hassan"}
              </p>

              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-[#C7A76C] text-[#C7A76C]" />
                <span className="text-xs font-medium text-[#1B2A3D]">
                  {avg_rating ? avg_rating.length : "0"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Section */}
        <div className="mb-4 p-3 bg-gradient-to-br from-[#F2EDE3] to-white rounded-xl border border-[#C7A76C]/20">
          <p className="text-xs text-gray-500 mb-1">{t("Starting from")}</p>
          <p className="text-sm text-gray-600">{t("payment will be decide by vendor")}</p>
        </div>

        {/* Select / Selected Button */}
   <div className="flex items-center gap-3 mt-4">
  {/* Select Button */}
  <Button
    className={`flex-1 ${
      selected
        ? "bg-gradient-to-r from-[#0E3C2F] to-[#0E3C2F]/90 text-white hover:shadow-lg"
        : "border-2 border-gray-200 hover:border-[#0E3C2F] hover:bg-[#F2EDE3]/30"
    }`}
    variant={selected ? "default" : "outline"}
    onClick={(e) => {
      e.stopPropagation(); 
      onSelect?.(); 
    }}
  >
    {selected ? (
      <>
        <Check className="mr-2 w-4 h-4" />
        {t("Selected")}
      </>
    ) : (
      "Select Vehicle"
    )}
  </Button>

  {/* Continue Button */}
  {continueButton && (
    <div className="flex-1">
      {continueButton}
    </div>
  )}
</div>

      </CardContent>
    </Card>
  );
}
