"use client";

import React from "react";
import { Shield } from "lucide-react"; // Fixed dummy icon
import { useTranslation } from "react-i18next";
import "../../../lib/i18n";

export function FeatureCard() {
      const { t } = useTranslation();
  
  return (
    <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-secondary/10 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-500">
        <svg viewBox="0 0 100 100" className="w-full h-full text-secondary">
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
      </div>

      {/* Fixed Icon */}
      <div className="relative mb-6 inline-flex">
        <div className="absolute inset-0 bg-secondary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-gradient-to-br from-primary to-primary/80 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
          <Shield className="w-8 h-8 text-secondary" />
        </div>
      </div>

      {/* Fixed Title */}
      <h3 className="text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
        {t("Secure Booking")}
      </h3>

      {/* Fixed Description */}
      <p className="text-muted-foreground leading-relaxed">
        {t("Your bookings are protected with advanced security.")}
      </p>

      {/* Accent Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-500"></div>
    </div>
  );
}
