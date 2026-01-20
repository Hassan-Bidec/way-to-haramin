"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../../lib/i18n";

import {
  ArrowRight,
  ArrowLeft,
  Star,
  Phone,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badgeVariants";
import { Card, CardContent } from "../ui/Card";
import { ImageWithFallback } from "./ImageWithFallback";
import { Separator } from "@radix-ui/react-select";
import Link from "next/link";
import { getBookingParams, getPartnersWithPackages } from "@/lib/api";
import { Image_URL } from "@/config/constants";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";

export default function VendorDetail({ vendorId }) {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [vendorDetail, setVendorDetail] = useState(null);
 const { t } = useTranslation();

  useEffect(() => {
    const fetchPartners = async () => {
         setLoading(true); 
      const response = await getPartnersWithPackages();

      const vendor = response?.data?.find((v) => v.id == vendorId);
      if (vendor) {
        // Provide default/fallbacks for missing fields
        const vendorWithDefaults = {
          id: vendor.id,
          name: vendor.business_name || "Unknown Vendor",
          logo: `${Image_URL}${vendor.image}`,
          description: vendor.description || "",
          phone: vendor.contact_no || "+966500000000",
          rating:  Number(vendor?.rating?.avg_rating ?? 0),
            reviews: vendor?.rating?.total_reviews ? vendor?.rating?.total_reviews : 0, 
          badges: vendor.service_type || ["Umrah"],
          packages:
            vendor.packages?.map((p, idx) => ({
              id: p.package?.id || idx + 1,
              title: p.package?.title || `Package ${idx + 1}`,
              description: p.package?.description || "",
              duration: p.package?.duration_days
                ? `${p.package.duration_days} Days / ${Math.floor(
                    p.package.duration_days / 2
                  )} Nights`
                : `${Math.floor(Math.random() * 7) + 1} Days / ${
                    Math.floor(Math.random() * 6) + 1
                  } Nights`,
              route:
                p.stops?.map((s) => s.City_name).join(" → ") ||
                "",
              price: p.package?.price
                ? `SAR ${p.package.price}`
                : `SAR ${Math.floor(Math.random() * 5000) + 500}`,
              capacity: p.package?.no_of_people
                ? `Up to ${p.package.no_of_people} passengers`
                : `Up to ${Math.floor(Math.random() * 10) + 1} passengers`,
              transportation: p.package?.vehicle_name || "Standard Vehicle",
              package_image:
                p.package?.package_image || "/package-placeholder.png",
            })) || [],
        };

        setVendorDetail(vendorWithDefaults);
        setLoading(false);
      }
      console.log(vendor);
    };

    

    fetchPartners();
  }, [vendorId]);

  if (loading) {
  return <Loading text="Fetching vendor details..." />;
}

  if (!vendorDetail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{t("Vendor not found")}</p>
          <Button onClick={() => router.push("/Service")}>
            {t("Back to Vendors")}
          </Button>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-[#0E3C2F] to-[#0E3C2F]/95 border-b border-[#C7A76C]/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Vendor Logo */}
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 flex-shrink-0 border-2 border-white/20">
              <ImageWithFallback
                src={vendorDetail.logo}
                alt={vendorDetail.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Vendor Info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-[#C7A76C]" />
                <h1 className="text-xl text-white font-medium">
                  {vendorDetail.name}
                </h1>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20">
                  <Star className="w-3.5 h-3.5 fill-[#C7A76C] text-[#C7A76C]" />
                  <span className="text-sm font-medium text-white">
                    {vendorDetail.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-white/70">
                    ({vendorDetail.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/90">
                  <Phone className="w-3.5 h-3.5 text-[#C7A76C]" />
                  <span className="font-mono">{vendorDetail.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {vendorDetail.badges.map((badge, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-[#C7A76C] text-[#C7A76C] bg-[#C7A76C]/10 backdrop-blur-sm"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push("/Service")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#0E3C2F] mb-6 transition-colors group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>{t("Back to Service Providers")}</span>
        </button>

        {/* Vendor Description */}
        <Card className="mb-8 border-none shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium text-[#1B2A3D] mb-3">
              {t("About")} {vendorDetail.name}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {vendorDetail.description}
            </p>
          </CardContent>
        </Card>

        {/* Packages List */}
        <div className="space-y-4">
          {vendorDetail.packages?.map((pkg) => (
            <Card
              key={pkg.id}
              className="border border-gray-200 hover:shadow-lg transition-all"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg font-medium text-[#1B2A3D] mb-2">
                      {pkg.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-[#F2EDE3] flex items-center justify-center">
                          <Clock className="w-4 h-4 text-[#C7A76C]" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="font-medium text-[#1B2A3D]">
                            {pkg.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-[#F2EDE3] flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-[#C7A76C]" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Route</p>
                          <p className="font-medium text-[#1B2A3D]">
                            {pkg.route}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-[#F2EDE3] flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#C7A76C]" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Capacity</p>
                          <p className="font-medium text-[#1B2A3D]">
                            {pkg.capacity}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className="border-[#0E3C2F] text-[#0E3C2F] bg-[#0E3C2F]/5 mt-2"
                    >
                      {pkg.transportation}
                    </Badge>
                  </div>

                  <Separator
                    orientation="vertical"
                    className="hidden lg:block h-32"
                  />

                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:min-w-[200px]">
                    <div className="text-left lg:text-right">
                      <p className="text-sm text-gray-500 mb-1">
                        {t("Starting from")}
                      </p>
                      <div className="flex items-center gap-1 justify-start lg:justify-end">
                        {/* <DollarSign className="w-5 h-5 text-[#C7A76C]" /> */}
                       <p className="text-gray-500 text-lg"> SAR </p>
                        <p className="text-2xl font-semibold text-[#0E3C2F]">
                          {pkg.price.replace("SAR ", "")}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`
                       /PackageDetails/${pkg.id}

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
          ))}
        </div>

        {/* Contact Section */}
        <Card
          className="mt-8 border-none shadow-sm bg-gradient-to-br from-[#F2EDE3] to-white cursor-pointer"
          onClick={() => router.push(`/packages/${vendorDetail.id}`)}
        >
          <CardContent className="p-8 text-center">
            <Phone className="w-12 h-12 mx-auto mb-4 text-[#C7A76C]" />
            <h3 className="text-xl font-medium text-[#1B2A3D] mb-2">
              {t("Need Special Services?")}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("Contact")} {vendorDetail.name} {t("directly for customized arrangements")}
            </p>
            <Button
              variant="outline"
              className="border-2 border-[#0E3C2F] text-[#0E3C2F] hover:bg-[#0E3C2F] hover:text-white transition-all"
              onClick={(e) => {
                e.stopPropagation(); // prevent router push when button clicked
                window.open(`tel:${vendorDetail.phone}`);
              }}
            >
              <Phone className="mr-2 w-4 h-4" />
              {t("Call")} {vendorDetail.phone}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
