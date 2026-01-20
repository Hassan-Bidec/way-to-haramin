"use client";

import React from "react";
import { Calendar, Car, Map, MessageCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next"; // ✅

export default function QuickActions() {
  const router = useRouter();
  const { t } = useTranslation(); // ✅

  const quickActionsData = [
    {
      title: t("Book a Ride"),
      description: t("Schedule your next journey"),
      icon: Car,
      gradient: "bg-gradient-to-br from-[#0E3C2F] to-[#0E3C2F]/80",
      path: "/Book",
    },
    {
      title: t("View My Rides"),
      description: t("Track all your bookings"),
      icon: Calendar,
      gradient: "bg-gradient-to-br from-[#0E3C2F] to-[#0E3C2F]/80",
      path: "/myrides",
    },
    {
      title: t("Services Provider"),
      description: t("Explore tour packages"),
      icon: Map,
      gradient: "bg-gradient-to-br from-[#8B7355] to-[#8B7355]/80",
      path: "/Service",
    },
    // {
    //   title: t("Custom Package"),
    //   description: t("Build your own journey"),
    //   icon: MessageCircle,
    //   gradient: "bg-gradient-to-br from-[#6B9080] to-[#6B9080]/80",
    //   path: "/custom-package",
    // },
  ];

  return (
    <section>
      <h1 className="text-[#0E3C2F] mb-6">{t("Quick Actions")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                   gap-y-6 justify-items-center gap-10">
        {quickActionsData.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              className="group relative overflow-hidden border-none shadow-sm hover:shadow-md 
          transition-all duration-300 cursor-pointer bg-white"
              style={{
                width: "310px",
                height: "150px",
                borderRadius: "16px",
              }}
              onClick={() => router.push(card.path)}
            >
              <div className="p-5">
                <div
                  className={`${card.gradient} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-[#0E3C2F] mb-1">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.description}</p>

                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#C7A76C]/10 to-transparent rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
