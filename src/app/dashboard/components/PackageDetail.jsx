"use client";
import { useRouter } from "next/router";
import { ImageWithFallback } from "../ServicesComponent/ImageWithFallback";
import { Button } from "../ui/button";
import { ArrowLeft, Check, Clock, MapPin } from "lucide-react";
import { Badge } from "../ui/badgeVariants";
import { Card, CardContent } from "../ui/Card";

const PackageDetail = ({slug}) => {
  const router = useRouter();
  const { slug } = router.query; 

  if (!slug) return <p>Loading...</p>;

   const packageData = {
    title: '5-Day Makkah–Madinah Package',
    description:
      'Complete spiritual journey covering all major sites in both holy cities with guided tours and comfortable accommodation.',
    duration: '5 Days / 4 Nights',
    price: 'SAR 2,500',
    image:
      'https://images.unsplash.com/photo-1720549973451-018d3623b55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1ha2thaHxlbnwxfHx8fDE3NjMxMjc2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cities: ['Makkah', 'Madinah'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Makkah',
        activities: [
          'Airport pickup',
          'Hotel check-in',
          'Visit Masjid al-Haram',
          'Orientation tour',
        ],
      },
      {
        day: 2,
        title: 'Makkah Historical Sites',
        activities: [
          'Cave of Hira visit',
          'Jabal al-Nour',
          'Jannat al-Mualla',
          'Evening at the Haram',
        ],
      },
      {
        day: 3,
        title: 'Journey to Madinah',
        activities: [
          'Checkout from Makkah hotel',
          'Comfortable journey to Madinah',
          'Hotel check-in',
          'Visit Masjid an-Nabawi',
        ],
      },
      {
        day: 4,
        title: 'Madinah Ziyarat',
        activities: [
          'Quba Mosque',
          'Masjid al-Qiblatayn',
          'Mount Uhud',
          'Seven Mosques',
        ],
      },
      {
        day: 5,
        title: 'Departure',
        activities: [
          'Morning at the Haram',
          'Hotel checkout',
          'Airport transfer',
          'Safe journey home',
        ],
      },
    ],
    included: [
      'Round-trip transportation',
      '4 nights accommodation',
      'All mentioned site visits',
      'Professional guide',
      'Breakfast daily',
    ],
    notIncluded: ['Lunch and dinner', 'Personal expenses', 'Travel insurance'],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-[500px] overflow-hidden">
        <ImageWithFallback
          src={`${
NEXT_PUBLIC_BASE_IMAGE_URL_LIVE}${packageData.image}`}
          alt={packageData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B2A3D]/80 via-[#1B2A3D]/60 to-transparent" />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7A76C]/10 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C7A76C]/10 rounded-full -ml-32 -mb-32"></div>
        
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 group"
              onClick={() => navigate('/packages')}
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Packages
            </Button>
          </div>
          
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl lg:text-5xl text-white mb-4 drop-shadow-lg">{packageData.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{packageData.duration}</span>
              </div>
              <div className="flex gap-2">
                {packageData.cities.map((city) => (
                  <Badge key={city} className="bg-[#C7A76C] text-white hover:bg-[#C7A76C]/90 px-4 py-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {city}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="mb-4 text-[#1B2A3D]">Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {packageData.description}
                </p>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="mb-6 text-[#1B2A3D]">Day by Day Itinerary</h2>
                <div className="space-y-6">
                  {packageData.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-8 pb-6 border-l-2 border-[#C7A76C]/30 last:border-l-0 last:pb-0">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#C7A76C] to-[#C7A76C]/90 text-white flex items-center justify-center shadow-md">
                        {day.day}
                      </div>
                      <h3 className="mb-3">{day.title}</h3>
                      <ul className="space-y-2">
                        {day.activities.map((activity, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    Included
                  </h3>
                  <ul className="space-y-2">
                    {packageData.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {packageData.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                  <p className="text-secondary" style={{ fontSize: '2rem', fontWeight: 600 }}>
                    {packageData.price}
                  </p>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>

                <Button className="w-full bg-[#0E3C2F] hover:bg-[#0E3C2F]/90 text-white">Book This Package</Button>

                <div className="border-t pt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{packageData.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Group Size</span>
                    <span>Up to 25 people</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Language</span>
                    <span>English, Arabic</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    Need help? Contact our support team for customization or inquiries.
                  </p>
                  <Button variant="outline" className="w-full mt-3" onClick={() => navigate('/support')}>
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
};

export default PackageDetail;
