import { Calendar, MapPin, Car, User as UserIcon, ArrowRight, Repeat } from "lucide-react";
import { Card, CardContent } from "./Card";
import { Badge } from "./badgeVariants";
import { Button } from "./button";
import { useTranslation } from "react-i18next";


export function RideCard({
  from,
  to,
  date,
  time,
  vehicleType,
  driverName,
  price,
  status,
  onFeedback,
  onCancel,
  onConfirm,
  type
}) {
  const { t } = useTranslation();

  // Define mapping for status text
const statusText = {
  1: "Pending",
  2: "Confirmed",
  3: "Ongoing",
  4: "Cancelled",
  5: "Completed",
};

// Optional: Define colors for each status
const statusColors = {
  1: "bg-yellow-500 text-white",
  2: "bg-blue-500 text-white",
  3: "bg-indigo-500 text-white",
  4: "bg-red-500 text-white",
  5: "bg-green-500 text-white",
};


  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Car className="w-6 h-6 text-primary" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{from}</span>
                {type == "Single Trip" ? 
                <ArrowRight className="w-4 h-4" />
                :
                <Repeat className="w-4 h-4" />
                }
                <span>{to}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {date} • {time}
                </span>
              </div>
            </div>
          </div>

        <Badge className={statusColors[status]}>
  {statusText[status]}
</Badge>

        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{t("Vehicle")}</p>
            <p>{vehicleType}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">{t("Driver")}</p>
            <div className="flex items-center gap-1">
              <UserIcon className="w-4 h-4" />
              <span>{driverName || "To be assigned"}</span>
            </div>
          </div>
{ price > 0 &&
          <div>
  <p className="text-sm text-muted-foreground mb-1">{t("Offered Price")}</p>
  <p className="font-semibold text-[#0E3C2F]">
    {price ? `SAR ${price}` : "Not Available"}
  </p>
</div>
}
        </div>

        {status == 5 && onFeedback && (
          <div className="mt-4">
            <Button variant="outline" className="w-full" onClick={onFeedback}>
              {t("Leave Feedback")}
            </Button>
          </div>
        )}

<div className="flex gap-2">
        {status == 1 && onCancel && (
          <div className="mt-4 w-full">
            <Button
              variant="outline"
              className="w-full bg-[#FF0000] text-white textdestructive"
              onClick={onCancel}
            >
              {t("Cancel Ride")}
            </Button>
          </div>
        )}

        {(status == 1 && price > 0 && onConfirm) && (
  <div className="mt-4 w-full">
    <Button
      className="w-full bg-[#0E3C2F] hover:bg-[#0E3C2F]/90 text-white"
      onClick={onConfirm}
    >
      {t("Confirm Ride")}
    </Button>
  </div>
)}

</div>

      </CardContent>
    </Card>
  );
}
