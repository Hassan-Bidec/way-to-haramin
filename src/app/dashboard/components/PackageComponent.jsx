"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Clock,
  MapPin,
  Check,
  X,
  ArrowLeft,
  Plane,
  Hotel,
  Utensils,
  MapPinned,
} from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/badgeVariants";
import { ImageWithFallback } from "../ServicesComponent/ImageWithFallback";
import { useEffect, useState } from "react";
import { bookPackage, getPartnersWithPackages } from "@/lib/api";
import Loading from "./Loading";
import { useAuthStore } from "@/lib/useAuthStore";
import { toast } from "react-toastify";

export default function PackageComponent({ packageSlug }) {
  const { user } = useAuthStore();
  const [packageDetail, setPackageDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const router = useRouter();

  useEffect(() => {
    const fetchPackage = async () => {
      setLoading(true);

      try {
        const response = await getPartnersWithPackages();

        // Find vendor that contains this package
        const vendor = response?.data?.find((v) =>
          v.packages?.some((p) => p.package?.id == packageSlug)
        );

        if (!vendor) {
          setPackageDetail(null); // no package found
          setLoading(false);
          return;
        }

        // Extract only the matched package
        const selectedPackage = vendor.packages.find(
          (p) => p.package?.id == packageSlug
        );

        if (!selectedPackage) {
          setPackageDetail(null); // no package found
          setLoading(false);
          return;
        }
        console.log("Selected Package:", selectedPackage);
        const formatted = {
          image: selectedPackage.package?.package_image || "",
          title: selectedPackage.package?.title || "Package",
          description: selectedPackage.package?.description || "No description available",
          duration: selectedPackage.package?.duration_days
            ? `${selectedPackage.package.duration_days} Days / ${Math.max(selectedPackage.package.duration_days - 1, 1)} Nights`
            : "-",
          price: selectedPackage.package?.price
            ? `SAR ${selectedPackage.package.price}`
            : "SAR 0",
          capacity: selectedPackage?.package?.no_of_people
            ? `Up to ${selectedPackage?.package.no_of_people} passengers`
            : `Up to 0 passengers`,
          cities: selectedPackage.stops?.map((s) => s.City_name) || [],
          itinerary: selectedPackage.stops?.map((stop) => ({
            city: stop.City_name,
            services: [
              { type: "pickup", text: "Transport Included" },
              stop.Hotel_name ? { type: "hotel", text: "Hotel Stay at", hotelName: stop.Hotel_name } : null,
              ...(stop.is_meal == 1 ? [{ type: "meal", text: stop.imeal_details || "Meals Included" }] : []),
            ].filter(Boolean),
            historicalPlaces: (stop.Place_name || []).map((place) => ({
              name: place,
              description: stop.description || "No details available",
            })),
          })),
        };

        setPackageDetail(formatted);
      } catch (error) {
        console.error(error);
        setPackageDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [packageSlug]);

  const handleBook = async () => {
    try {
      const payload = {
        package_id: packageSlug,
        user_id: user?.customer_id ?? null,
      };

      console.log(" Booking Payload:", payload);

      const response = await bookPackage(payload);
      console.log(" Booking Response:", response);
      if (response.status == true || response.success == true) {
        toast.success("Package booked successfully!");
        router.push(`/my-packages`);
      } else {
        toast.error(response.message || "Booking failed");
      }

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };


  if (loading) {
    return <Loading text="Fetching package details..." />;
  }

  if (!packageDetail) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 mb-4">Package not found</p>
        <Button onClick={() => router.push("/Service")}>
          Back to Vendors
        </Button>
      </div>
    </div>;
  }


  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <div className="relative h-[500px] overflow-hidden">
        <ImageWithFallback
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_LIVE}${packageDetail.image}`}
          alt={packageDetail.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#1B2A3D]/80 via-[#1B2A3D]/60 to-transparent" />


        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7A76C]/10 rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C7A76C]/10 rounded-full -ml-32 -mb-32" />

        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Packages
            </Button>
          </div>

          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl lg:text-5xl text-white mb-4 drop-shadow-lg">
              {packageDetail.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{packageDetail.duration}</span>
              </div>

              <div className="flex gap-2">
                {packageDetail.cities.map((city) => (
                  <Badge key={city} className="bg-[#C7A76C] text-white px-4 py-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {city}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="mb-4 text-[#1B2A3D]">Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {packageDetail.description}
                </p>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <div className="space-y-4">
              <h2 className="text-[#1B2A3D]">Complete Journey Itinerary</h2>

              {packageDetail.itinerary.map((cityItinerary, index) => (
                <Card
                  key={cityItinerary.city}
                  className="border-2 border-[#C7A76C]/20 shadow-lg"
                >
                  <CardContent className="p-5">
                    {/* City Header */}
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#C7A76C]/30">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C7A76C] to-[#C7A76C]/80 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>

                      <h3 className="flex-1 text-[#1B2A3D]">
                        {cityItinerary.city} Journey
                      </h3>

                      <Badge className="bg-[#0E3C2F] text-white">City {index + 1}</Badge>
                    </div>

                    {/* Services */}
                    <div className="mb-3 space-y-2">
                      {cityItinerary.services.map((service, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-md bg-gradient-to-r from-[#F7F7F7] to-white border border-[#C7A76C]/10"
                        >
                          {service.type === "pickup" && (
                            <div className="w-7 h-7 rounded-full bg-[#0E3C2F]/10 flex items-center justify-center">
                              <Plane className="w-3.5 h-3.5 text-[#0E3C2F]" />
                            </div>
                          )}

                          {service.type === "hotel" && (
                            <div className="w-7 h-7 rounded-full bg-[#C7A76C]/10 flex items-center justify-center">
                              <Hotel className="w-3.5 h-3.5 text-[#C7A76C]" />
                            </div>
                          )}

                          {service.type === "meal" && (
                            <div className="w-7 h-7 rounded-full bg-[#0E3C2F]/10 flex items-center justify-center">
                              <Utensils className="w-3.5 h-3.5 text-[#0E3C2F]" />
                            </div>
                          )}

                          <div className="flex-1 text-sm">
                            {service.text}
                            {service.hotelName && (
                              <span className="ml-1 px-2 py-0.5 bg-[#C7A76C] text-white rounded text-xs">
                                {service.hotelName}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Historical Places */}
                    {cityItinerary.historicalPlaces.length > 0 && (
                      <div>
                        <h4 className="flex items-center gap-2 text-[#0E3C2F] mb-2 text-sm">
                          <MapPinned className="w-4 h-4 text-[#C7A76C]" />
                          Historical Places to Visit
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {cityItinerary.historicalPlaces.map((place, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 p-2.5 rounded-md bg-white border border-[#C7A76C]/20"
                            >
                              <div className="w-6 h-6 rounded-full bg-[#C7A76C]/20 flex items-center justify-center mt-1">
                                <MapPin className="w-3 h-3 text-[#C7A76C]" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="mb-0.5">
                                  <span className="inline-block px-1.5 py-0.5 bg-[#0E3C2F] text-white rounded text-xs">
                                    {place.name}
                                  </span>
                                </p>

                                <p className="text-xs text-gray-600 leading-snug">
                                  {place.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <p className="text-sm mb-2 text-muted-foreground">Starting from</p>

                <p className="text-secondary text-4xl font-semibold">
                  {packageDetail.price}
                </p>

                <p className="text-sm text-muted-foreground">per person</p>

                <Button onClick={handleBook} className="w-full bg-[#0E3C2F] hover:bg-[#0E3C2F]/90 text-white mt-2">Book This Package</Button>

                {/* Details */}
                <div className="border-t pt-4 space-y-3 text-sm mt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{packageDetail.duration}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Group Size</span>
                    <span>{packageDetail?.capacity || "0"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Language</span>
                    <span>English, Arabic</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    Need help? Contact our support team for assistance.
                  </p>

                  <Button
                    variant="outline"
                    className="w-full mt-3"
                    onClick={() => router.push("/support")}
                  >
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
