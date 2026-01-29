"use client";
import { t } from "i18next";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function OffersBanner({ bannerData = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!bannerData.length) return null;
  const image_url = "https://waytoharamain.com/backend/"

  const currentBanner = bannerData[currentIndex];
  console.log("imagesssss" ,currentBanner)
  return (
      <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8 mt-5">
      {/* Banner Image */}
      <div className="h-[400px] lg:h-[450px] rounded-3xl overflow-hidden transition-all duration-700">
  <img
    src={`${image_url}${currentBanner.banner}`}
    alt="Offer"
    className="w-full h-full"
  />
</div>


      {/* Banner Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-8 lg:px-16">
        <p className="text-white text-lg lg:text-xl mb-3">{t(currentBanner.subtitle)}</p>
        <h1 className="text-white text-4xl lg:text-6xl mb-4 font-bold leading-tight">
          {t(currentBanner.title)}
        </h1>
        <p className="text-white text-lg lg:text-xl max-w-xl">{t(currentBanner.description)}</p>
      </div>
    </div>
  );
}

// export default function OffersBanner({ onBookNow }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     if (isPaused) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % offers.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isPaused]);

//   const currentOffer = offers[currentIndex];

//   return (
//    <div
//   className="relative overflow-hidden rounded-3xl shadow-2xl mb-8 mt-5 rounded-lg"
//   onMouseEnter={() => setIsPaused(true)}
//   onMouseLeave={() => setIsPaused(false)}
// >
//   <AnimatePresence mode="wait">
//     <motion.div
//       key={currentOffer.id}
//       initial={{ opacity: 0, scale: 1.1 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ duration: 0.7, ease: "easeInOut" }}
//       className="relative h-[400px] lg:h-[450px]"
//     >
//       {/* Background */}
//       <div
//         className={`absolute inset-0 bg-cover bg-center ${currentOffer.gradient}`}
//         style={{ backgroundImage: `url(${currentOffer.image})` }}
//       ></div>

//       {/* Content */}
//       <div className="relative h-full flex items-center px-8 lg:px-16">
//         <div className="max-w-3xl text-white">
//           <div className="mb-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
//             <Sparkles className="w-4 h-4 animate-pulse" />
//             {currentOffer.badge}
//           </div>

//           <p className="text-lg lg:text-xl mb-3">{currentOffer.subtitle}</p>
//           <h1 className="text-4xl lg:text-6xl mb-4 leading-tight">{currentOffer.title}</h1>
//           <p className="text-lg lg:text-xl mb-6 max-w-xl">{currentOffer.description}</p>

//           {/* Animated Discount Box */}
//           <motion.div
//             className="inline-block mb-6 relative"
//             animate={{ y: [0, -8, 0] }}
//             transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
//           >
//             <div className="bg-white text-[#0E3C2F] px-8 py-2 rounded-2xl shadow-2xl flex items-center gap-3">
//               <Gift className="w-6 h-6" />
//               <div>
//                 <p className="text-sm opacity-80">Save Up To</p>
//                 <p className="text-3xl font-bold">{currentOffer.discount}</p>
//               </div>
//             </div>
//             <motion.div
//               className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
//               animate={{ rotate: [0, 15, -15, 0] }}
//               transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2, ease: "easeInOut" }}
//             >
//               <Star className="w-4 h-4 text-white fill-white" />
//             </motion.div>
//           </motion.div>

//           <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
//             <button
//               onClick={onBookNow}
//               className="bg-white text-[#0E3C2F] px-8 py-2 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
//             >
//               {currentOffer.ctaText} <ArrowRight className="w-5 h-5" />
//             </button>

//             {currentOffer.expiresIn && (
//               <div className="flex items-center gap-2 bg-red-500/90 px-5 py-2 rounded-xl shadow-lg">
//                 <Clock className="w-5 h-5 animate-pulse" />
//                 <span className="font-medium">{currentOffer.expiresIn}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Navigation Dots */}
//       <div className="absolute bottom-6 right-8 flex gap-2">
//         {offers.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`transition-all duration-300 rounded-full ${
//               index === currentIndex ? "w-12 h-3 bg-white" : "w-3 h-3 bg-white/40 hover:bg-white/60"
//             }`}
//           />
//         ))}
//       </div>

//       {/* Progress Bar */}
//       {!isPaused && (
//         <motion.div
//           className="absolute bottom-0 left-0 h-1 bg-white/80"
//           initial={{ width: "0%" }}
//           animate={{ width: "100%" }}
//           transition={{ duration: 5, ease: "linear" }}
//           key={currentIndex}
//         />
//       )}
//     </motion.div>
//   </AnimatePresence>
// </div>
//   );
// }


// import { useState, useEffect } from "react";




// from api

// export default function OffersBanner({ bannerData = [] }) {
//   const offers = bannerData; // rename for internal use
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     if (isPaused) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % offers.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isPaused, offers.length]);

//   const currentOffer = offers[currentIndex] || {};


//   const onBookNow = () => {
//     // tumhara existing onBookNow function
//     console.log("Book Now clicked");
//   };

//   return (
//     <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8 mt-5 rounded-lg">
//       <div className="relative h-[400px] lg:h-[450px]">
        
//         <div
//           className={`absolute inset-0 bg-cover bg-center ${currentOffer.gradient || ""}`}
//           style={{
//             backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_LIVE}${currentOffer.banner || ""})`
//           }}
//         ></div>

//         {/* 
//         <div className="relative h-full flex items-center px-8 lg:px-16">
//           <div className="max-w-3xl text-white">
//             <p className="text-lg lg:text-xl mb-3">{currentOffer.subtitle}</p>
//             <h1 className="text-4xl lg:text-6xl mb-4 leading-tight">{currentOffer.title}</h1>
//             <p className="text-lg lg:text-xl mb-6 max-w-xl">{currentOffer.description}</p>

//             <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
//               <button
//                 onClick={onBookNow}
//                 className="bg-white text-[#0E3C2F] px-8 py-2 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
//               >
//                 {currentOffer.ctaText} <ArrowRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// }



