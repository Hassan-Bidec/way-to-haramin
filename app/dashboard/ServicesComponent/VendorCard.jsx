"use client";

import { Star, Phone, Building2 } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/badgeVariants";
import { ImageWithFallback } from "./ImageWithFallback";


export default function VendorCard({
  name,
  logo,
  rating,
  reviews,
  phone,
  badges = [],
  onClick,
}) {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border border-gray-200 -mb-2"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">

          {/* Vendor Logo */}
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F7F7F9] flex-shrink-0 border border-gray-200">
            <ImageWithFallback
              src={logo}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <Building2 className="w-4 h-4 text-[#0E3C2F] flex-shrink-0" />
                <h3 className="text-[#1B2A3D] font-medium truncate">
                  {name}
                </h3>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 bg-[#F2EDE3] px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-[#C7A76C] text-[#C7A76C]" />
                <span className="text-sm font-medium text-[#1B2A3D]">
                  {rating.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ({reviews} reviews)
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Phone className="w-3.5 h-3.5 text-[#0E3C2F]" />
              <span className="font-mono">{phone}</span>
            </div>

            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs border-[#C7A76C] text-[#C7A76C] bg-[#C7A76C]/5"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
