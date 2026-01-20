"use client";

import React from "react";
import { Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badgeVariants";
import { useTranslation } from "react-i18next";
import "../../../lib/i18n";

export function PackageCard({ package: pkg = {}, details = [], onViewDetails }) {
  const { t } = useTranslation();

  const {
    title,
    package_image,
    description,
    duration_days,
    price,
    cities = [],
  } = pkg;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-56 overflow-hidden bg-muted">
        <img
          src={package_image ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_LIVE}${package_image}` : "/fallback-image.png"}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = "/fallback-image.png"; }}
        />
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4" style={{ color: "rgba(198, 166, 103, 1)" }} />
          <span className="text-sm text-muted-foreground">
            {duration_days} {t("days")}
          </span>
        </div>

        <h3 className="mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {cities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {cities.map((city, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <MapPin className="w-3 h-3 mr-1" />
                {city}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{t("From")}</p>
            <p
              className="px-2 py-1 inline-block"
              style={{
                color: "rgba(198, 166, 103, 1)",
                fontWeight: 600,
                borderRadius: "4px",
              }}
            >
              {price ? `${price}` : t("N/A")}
            </p>
          </div>

          <Button
            onClick={onViewDetails}
            className="bg-[#0E3C2F] text-white hover:bg-[#0E3C2F]/90"
          >
            {t("View Details")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
