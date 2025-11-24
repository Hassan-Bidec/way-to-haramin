"use client";

import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/app/dashboard/ui/sellect";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function TimeSelector({ selectedDate, timeSlot, setTimeSlot }) {
  const [allowedHours, setAllowedHours] = useState([]);
  const [allowedMinutes, setAllowedMinutes] = useState(['00', '15', '30', '45']);
  const [allowedPeriods, setAllowedPeriods] = useState(['AM', 'PM']);

  useEffect(() => {
    updateAllowedTime();
  }, [selectedDate]);

  const updateAllowedTime = () => {
    const saTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" });
    const now = new Date(saTime);

    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);

    const today = new Date(saTime);
    today.setHours(0, 0, 0, 0);

    // If selected date is NOT today — allow all times normally
    if (selected.getTime() !== today.getTime()) {
      setDefaultTimeOptions();
      return;
    }

    // For today → enforce min +6 hours
    const minTime = new Date(now.getTime() + 6 * 60 * 60 * 1000);

    const minHour24 = minTime.getHours(); // 0-23
    const minMinute = minTime.getMinutes();

    let minPeriod = minHour24 >= 12 ? "PM" : "AM";
    let minHour12 = minHour24 % 12 || 12; // convert to 12-hour

    // Generate filtered periods
    const periods = [];
    if (minPeriod === "AM") periods.push("AM", "PM");
    else periods.push("PM");

    // Generate filtered hours
    const hours = [];
    for (let h = 1; h <= 12; h++) {
      const hour24 = (h % 12) + (minPeriod === "PM" && h !== 12 ? 12 : 0);

      if (
        hour24 > minHour24 ||
        (hour24 === minHour24 && minMinute <= 45)
      ) {
        hours.push(h.toString().padStart(2, "0"));
      }
    }

    setAllowedHours(hours);
    setAllowedPeriods(periods);

    // If user selected invalid time → reset
    const [h, mmPeriodRaw] = timeSlot.split(":");
    const minute = mmPeriodRaw?.split(" ")[0];
    const period = mmPeriodRaw?.split(" ")[1];

    if (!hours.includes(h) || !periods.includes(period)) {
      setTimeSlot("");
    }
  };

  const setDefaultTimeOptions = () => {
    setAllowedHours(Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0")));
    setAllowedMinutes(['00', '15', '30', '45']);
    setAllowedPeriods(['AM', 'PM']);
  };

  const handleTimeSelect = (hour, minute, period) => {
    setTimeSlot(`${hour}:${minute} ${period}`);
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm text-[#1B2A3D] font-medium">
        <CalendarIcon className="w-4 h-4 text-[#C7A76C]" />
        Start Time
      </label>

      <div className="grid grid-cols-3 gap-2">
        {/* Hour */}
        <Select
          value={timeSlot.split(":")[0] || ""}
          onValueChange={(hour) => {
            const minute = timeSlot.split(":")[1]?.split(" ")[0] || "00";
            const period = timeSlot.split(" ")[1] || "AM";
            handleTimeSelect(hour, minute, period);
          }}
        >
          <SelectTrigger className="h-12 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C]">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>

          <SelectContent>
            {allowedHours.map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Minute */}
        <Select
          value={timeSlot.split(":")[1]?.split(" ")[0] || ""}
          onValueChange={(minute) => {
            const hour = timeSlot.split(":")[0] || allowedHours[0] || "01";
            const period = timeSlot.split(" ")[1] || allowedPeriods[0] || "AM";
            setTimeSlot(`${hour}:${minute} ${period}`);
          }}
        >
          <SelectTrigger className="h-12 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C]">
            <SelectValue placeholder="Min" />
          </SelectTrigger>

          <SelectContent>
            {allowedMinutes.map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* AM / PM */}
        <Select
          value={timeSlot.split(" ")[1] || ""}
          onValueChange={(period) => {
            const hour = timeSlot.split(":")[0] || allowedHours[0] || "01";
            const minute = timeSlot.split(":")[1]?.split(" ")[0] || "00";
            setTimeSlot(`${hour}:${minute} ${period}`);
          }}
        >
          <SelectTrigger className="h-12 bg-[#F7F7F9] border-gray-200 hover:border-[#C7A76C]">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>

          <SelectContent>
            {allowedPeriods.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
