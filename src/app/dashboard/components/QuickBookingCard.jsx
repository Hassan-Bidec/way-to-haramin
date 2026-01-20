"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslation } from "react-i18next";
import "../../../lib/i18n";


export default function QuickBookingCard() {
 const { t } = useTranslation();

  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const cities = ["Makkah", "Madinah", "Jeddah", "Jeddah Airport", "Madinah Airport"];

  const handleContinue = () => {
    if (from && to) {
      router.push({
        pathname: "/book-ride",
        query: { from, to, date },
      });
    }
  };

  return (
    <Card className="shadow-premium border-none overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* From Location */}
          <div className="md:col-span-3 space-y-2">
            <label className="flex items-center gap-2 text-sm text-primary">
              <MapPin className="w-4 h-4" />
              {t("From")}
            </label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="h-12 bg-white border-secondary/20 focus:border-secondary">
                <SelectValue placeholder={t("Select departure")} />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {t(city)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Arrow Separator - Hidden on mobile */}
          <div className="hidden md:flex md:col-span-1 items-center justify-center pb-2">
            <ArrowRight className="w-5 h-5 text-secondary" />
          </div>

          {/* To Location */}
          <div className="md:col-span-3 space-y-2">
            <label className="flex items-center gap-2 text-sm text-primary">
              <MapPin className="w-4 h-4" />
              {t("To")}
            </label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="h-12 bg-white border-secondary/20 focus:border-secondary">
                <SelectValue placeholder={t("Select destination")} />
              </SelectTrigger>
              <SelectContent>
                {cities.filter((city) => city !== from).map((city) => (
                  <SelectItem key={city} value={city}>
                    {t(city)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Picker */}
          <div className="md:col-span-3 space-y-2">
            <label className="flex items-center gap-2 text-sm text-primary">
              <CalendarIcon className="w-4 h-4" />
              {t("Date")}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-12 px-4 bg-white border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Continue Button */}
          <div className="md:col-span-2">
            <Button
              className="w-full h-12 bg-secondary text-primary hover:bg-secondary/90 shadow-md hover:shadow-lg transition-all"
              onClick={handleContinue}
              disabled={!from || !to}
            >
              {t("Continue")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
