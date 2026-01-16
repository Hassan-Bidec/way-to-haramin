"use client"
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Building2, TrendingUp, Award, Star, Filter, Sparkles, Users, Shield, Crown, Phone } from 'lucide-react';

import { motion } from "framer-motion";

import DashboardLayout from '../layout';
import { Badge } from '../ui/badgeVariants';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Header from '../components/Header';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import VendorCard from './VendorCard';
import { getPartnersWithPackages } from '@/lib/api';
import { Image_URL } from '@/config/constants';
import { ImageWithFallback } from './ImageWithFallback';
import Loading from '../components/Loading';




export function Packages({ vendorId }) {
  const router = useRouter();
  const navigate = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchPartners = async () => {
      const response = await getPartnersWithPackages();

     
        const formattedVendors = response?.data?.map((vendor) => ({
            id: vendor?.id,
            name: vendor?.business_name,
            logo: `${Image_URL}${vendor.image}`,
           rating:  Number(vendor?.rating?.avg_rating ?? 0),
            reviews: vendor?.rating?.total_reviews ? vendor?.rating?.total_reviews : 0, 
            phone: vendor?.contact_no,
            badges: vendor?.is_contact_number_verified == 1 ? ["Verified", "Trusted"] : [],
            bookings: vendor?.no_of_rides || 0,
          }));
          setVendors(formattedVendors);
          console.log(formattedVendors)
      }

      setLoading(false);
    
    fetchPartners();
  }, []);


  // Filter and sort vendors
  const filteredAndSortedVendors = useMemo(() => {
    let result = vendors.filter((vendor) => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating =
        ratingFilter === 'all' ||
        (ratingFilter === '4' && vendor.rating >= 4) ||
        (ratingFilter === '4.5' && vendor.rating >= 4.5) ||
        (ratingFilter === '5' && vendor.rating === 5);
      return matchesSearch && matchesRating;
    });

    // Sort vendors
    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'most-booked') return b.bookings - a.bookings;
      return 0;
    });

    return result;
  }, [vendors, searchQuery, ratingFilter, sortBy]);

  const topVendors = [...vendors].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const totalVendors = vendors.length;
  const totalBookings = vendors.reduce((sum, v) => sum + v.bookings, 0);
  const avgRating = (vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length || 0).toFixed(1);


    if (loading) {
    return <Loading text="Fetching Partners..." />;
  }
  if (errorMsg) return <div className="flex justify-center items-center h-screen text-red-600 text-xl">{errorMsg}</div>;


  return (
    <div className="md:ml-64 ml-0 ">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen ">
        <Header />
        {/* <main className="p-6">{children}</main> */}
        <div className="space-y-8 mt-5 px-4 md:px-10 ">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E3C2F] via-[#1A5540] to-[#0E3C2F] p-8 md:p-12 shadow-2xl"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7A76C]/10 rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C7A76C]/10 rounded-full -ml-32 -mb-32"></div>

            {/* Animated Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  initial={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: 0
                  }}
                  animate={{
                    y: [null, '-100%'],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            <div className="relative">
              {/* Badge */}
              <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2 mb-4 inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Trusted Partners
              </Badge>

              {/* Title */}
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl text-white mb-2">Service Providers</h1>
                  <p className="text-white/80 text-lg">
                    Choose from our verified transport partners for your spiritual journey
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/70 text-sm">Verified Partners</span>
                  </div>
                  <p className="text-3xl text-white">{totalVendors}+</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/70 text-sm">Happy Customers</span>
                  </div>
                  <p className="text-3xl text-white">{totalBookings.toLocaleString()}+</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="text-white/70 text-sm">Average Rating</span>
                  </div>
                  <p className="text-3xl text-white">{avgRating} / 5.0</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <section>
            <div className="mb-6">
              <h2 className="text-[#0E3C2F] mb-2">Browse All Providers</h2>
              <p className="text-gray-600 text-sm">Search and filter to find the perfect partner for your journey</p>
            </div>

            <Card className="border-none shadow-lg p-6 bg-white">

              <div className="flex gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search vendors by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 bg-[#F7F7F9] border-gray-200 text-base rounded-xl focus:ring-[#0E3C2F] focus:border-[#0E3C2F]"
                  />
                </div>


                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-14 px-6 rounded-xl border-gray-200 hover:border-[#0E3C2F] hover:bg-[#F2EDE3]/30 relative"
                    >
                      <Filter className="w-5 h-5 mr-2" />
                      Filters
                      {ratingFilter !== 'all' && (
                        <Badge className="ml-2 bg-[#C7A76C] hover:bg-[#C7A76C]/90 text-white">1</Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4" align="end">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3">Filter by Rating</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={ratingFilter === 'all' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setRatingFilter('all')}
                          className={`rounded-full ${ratingFilter === 'all'
                              ? 'bg-[#0E3C2F] text-white hover:bg-[#0E3C2F]/90'
                              : 'border-gray-200 hover:border-[#0E3C2F] hover:bg-[#F2EDE3]/30'
                            }`}
                        >
                          All Vendors
                        </Button>
                        <Button
                          variant={ratingFilter === '4' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setRatingFilter('4')}
                          className={`rounded-full ${ratingFilter === '4'
                              ? 'bg-[#0E3C2F] text-white hover:bg-[#0E3C2F]/90'
                              : 'border-gray-200 hover:border-[#0E3C2F] hover:bg-[#F2EDE3]/30'
                            }`}
                        >
                          <Star className="w-3.5 h-3.5 mr-1.5" />
                          4.0+ Stars
                        </Button>
                        <Button
                          variant={ratingFilter === '4.5' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setRatingFilter('4.5')}
                          className={`rounded-full ${ratingFilter === '4.5'
                              ? 'bg-[#0E3C2F] text-white hover:bg-[#0E3C2F]/90'
                              : 'border-gray-200 hover:border-[#0E3C2F] hover:bg-[#F2EDE3]/30'
                            }`}
                        >
                          <Star className="w-3.5 h-3.5 mr-1.5" />
                          4.5+ Stars
                        </Button>
                        <Button
                          variant={ratingFilter === '5' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setRatingFilter('5')}
                          className={`rounded-full ${ratingFilter === '5'
                              ? 'bg-[#0E3C2F] text-white hover:bg-[#0E3C2F]/90'
                              : 'border-gray-200 hover:border-[#0E3C2F] hover:bg-[#F2EDE3]/30'
                            }`}
                        >
                          <Star className="w-3.5 h-3.5 mr-1.5" />
                          5.0 Stars
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-[#0E3C2F]">{filteredAndSortedVendors.length}</span> service provider{filteredAndSortedVendors.length !== 1 ? 's' : ''}
                </p>
              </div>
            </Card>
          </section>


         <section>
  {searchQuery || ratingFilter !== 'all' ? (
    // Agar search/filter active ho to filtered vendors dikhayein
    <div className="space-y-4">
      {filteredAndSortedVendors.map((vendor, index) => (
        <motion.div
          key={vendor.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div
            onClick={() => router.push(`/ServiceProvider/${vendor.id}`)}
            className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border border-gray-100"
          >
            {/* Left Image */}
            <div className="w-35 h-35 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
              <ImageWithFallback
                src={vendor.logo}
                alt={vendor.name}
                className="w-full h-full"
              />
            </div>

            {/* Right Side Info */}
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-[#0E3C2F] text-lg font-semibold truncate">
                {vendor.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#C7A76C]/10 px-2 py-0.5 rounded-lg">
                  <Star className="w-4 h-4 text-[#C7A76C] fill-[#C7A76C]" />
                  <span className="text-sm text-[#0E3C2F]">
                    {vendor.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  ({vendor.reviews} reviews)
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 mt-1">
                {vendor.badges.slice(0, 3).map((badge, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#0E3C2F]/10 text-[#0E3C2F] px-2 py-1 rounded-md"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Bookings + Phone */}
              <span className="text-sm text-gray-600 mt-1">
                {vendor.bookings.toLocaleString()} bookings completed
              </span>
              <span className="text-sm text-gray-600 mt-1 flex gap-2">
                <Phone className='w-3.5 h-3.5 text-[#0E3C2F]'/>
                {vendor.phone}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  ) : (
    // Agar search/filter active nahi hai to Top Rated dikhayein
    <div className="space-y-4">
      {topVendors.map((vendor) => (
        <motion.div
          key={vendor.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => router.push(`/ServiceProvider/${vendor.id}`)}
          >
            {/* Image Left */}
            <div className="w-30 h-30 rounded-lg overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={vendor?.logo}
                alt={vendor?.name}
                className="w-full h-full"
              />
            </div>

            {/* Right Side Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#0E3C2F] truncate">
                {vendor.name}
              </h3>

              {/* Rating + Reviews */}
              <div className="flex items-center gap-2 my-1">
                <div className="flex items-center gap-1 bg-[#C7A76C]/10 px-2 py-1 rounded-md">
                  <Star className="w-4 h-4 text-[#C7A76C] fill-[#C7A76C]" />
                  <span className="text-sm">{vendor.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-gray-500">
                  ({vendor.reviews} reviews)
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 mb-2">
                {vendor.badges.slice(0, 3).map((badge, index) => (
                  <Badge
                    key={index}
                    className="text-xs bg-[#0E3C2F]/10 text-[#0E3C2F]"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>

              {/* Bookings + Button */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {vendor.bookings.toLocaleString()} bookings
                </span>

                <Button
                  size="sm"
                  className="bg-[#0E3C2F] text-white px-4 py-1 rounded-md hover:bg-[#124f3d]"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )}
</section>


          {/* <section>
            {filteredAndSortedVendors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedVendors.map((vendor, index) => (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <VendorCard
                      {...vendor}
                      onClick={() => router.push(`/ServiceProvider/${vendor.id}`)}

                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-none shadow-lg">
                <div className="text-center py-16 bg-gradient-to-br from-[#F2EDE3] to-white rounded-2xl">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#C7A76C]/20 to-[#C7A76C]/10 rounded-full flex items-center justify-center"
                  >
                    <Building2 className="w-10 h-10 text-[#C7A76C]" />
                  </motion.div>
                  <h3 className="text-[#0E3C2F] mb-2">No vendors found</h3>
                  <p className="text-gray-500 text-sm mb-6">Try adjusting your search or filters</p>
                  <Button
                    className="bg-gradient-to-r from-[#0E3C2F] to-[#1A5540] text-white hover:shadow-lg transition-all"
                    onClick={() => {
                      setSearchQuery('');
                      setRatingFilter('all');
                      setSortBy('rating');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            )}
          </section> */}
          {/* All Filtered Vendors Section */}
        <section>
  {filteredAndSortedVendors.length > 0 ? (
    <div className="space-y-4">
      {filteredAndSortedVendors.map((vendor, index) => (
        <motion.div
          key={vendor.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div
            onClick={() => router.push(`/ServiceProvider/${vendor.id}`)}
            className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border border-gray-100"
          >
            {/* Left Image */}
            <div className="w-35 h-35 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
              <ImageWithFallback
                src={vendor.logo}
                alt={vendor.name}
                className="w-full h-full"
              />
            </div>

            {/* Right Side Info */}
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-[#0E3C2F] text-lg font-semibold truncate">
                {vendor.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#C7A76C]/10 px-2 py-0.5 rounded-lg">
                  <Star className="w-4 h-4 text-[#C7A76C] fill-[#C7A76C]" />
                  <span className="text-sm text-[#0E3C2F]">
                    {vendor.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  ({vendor.reviews} reviews)
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 mt-1">
                {vendor.badges.slice(0, 3).map((badge, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#0E3C2F]/10 text-[#0E3C2F] px-2 py-1 rounded-md"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Bookings */}
              <span className="text-sm text-gray-600 mt-1">
                {vendor.bookings.toLocaleString()} bookings completed
              </span>
              <span className="text-sm text-gray-600 mt-1 flex gap-2  ">
                <Phone className='w-3.5 h-3.5 text-[#0E3C2F] '/>
                {vendor.phone}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  ) : (
    <Card className="border-none shadow-lg">
      <div className="text-center py-16 bg-gradient-to-br from-[#F2EDE3] to-white rounded-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#C7A76C]/20 to-[#C7A76C]/10 rounded-full flex items-center justify-center"
        >
          <Building2 className="w-10 h-10 text-[#C7A76C]" />
        </motion.div>
        <h3 className="text-[#0E3C2F] mb-2">No vendors found</h3>
        <p className="text-gray-500 text-sm mb-6">Try adjusting your search or filters</p>
        <Button
          className="bg-gradient-to-r from-[#0E3C2F] to-[#1A5540] text-white hover:shadow-lg transition-all"
          onClick={() => {
            setSearchQuery('');
            setRatingFilter('all');
            setSortBy('rating');
          }}
        >
          Clear All Filters
        </Button>
      </div>
    </Card>
  )}
</section>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='mt-10 pb-10'
          >
            <Card className="border-none shadow-lg overflow-hidden relative bg-gradient-to-br from-[#0E3C2F] to-[#0E3C2F]/90 text-white ">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A76C]/10 rounded-full -mr-32 -mt-32"></div>
              <div className="relative p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-2">Can't find the right provider?</h3>
                    <p className="text-white/80 text-sm mb-4">
                      Our support team is here to help you find the perfect transport partner for your journey
                    </p>
                    <Button
                      size="lg"
                      className="bg-white text-[#0E3C2F] hover:bg-white/90 shadow-xl"
                      onClick={() => navigate('/support')}
                    >
                      Contact Support
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

            </Card>
          </motion.div>
        </div>

      </div>

    </div>

  );
}
