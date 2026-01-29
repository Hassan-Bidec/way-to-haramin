import React from "react";
import { LuArrowUpRight } from "react-icons/lu";

const newsItems = [
  {
    id: 1,
    title: "AI Integration",
    description: "Future of web architecture with neural networks.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 2,
    title: "Remote Culture",
    description: "New standards for digital workspace productivity.",
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 3,
    title: "Design Systems",
    description: "Scalable UI patterns for modern enterprise apps.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 4,
    title: "Market Shift",
    description: "Understanding economic trends of 2026.",
    image: "https://images.unsplash.com/photo-1611974714652-76047a05b057?auto=format&fit=crop&q=80&w=300",
  }
];

export default function Newsfeed() {
  return (
    <div className="w-full flex justify-center py-10 bg-gray-50/50">
      {/* Container with Max Width for centering */}
      <div className="max-w-6xl w-full px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl font-light tracking-tight text-gray-900 sm:text-3xl">
            Featured <span className="font-bold">Updates</span>
          </h2>
          <div className="h-1 w-12 bg-blue-600 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Responsive Grid - Controlled Card Width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
          {newsItems.map((item) => (
            <div 
              key={item.id} 
              className="group w-full max-w-[240px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out flex flex-col overflow-hidden"
            >
              {/* Image with subtle Overlay */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Minimalist Content */}
              <div className="p-4 bg-white flex flex-col items-start">
                <h3 className="text-md font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-600 transition-all">
                  Read More <LuArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}