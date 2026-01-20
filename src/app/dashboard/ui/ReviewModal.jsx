import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { toast } from "sonner";
import { Button } from "./button";
import { Textarea } from "./Textarea";
import { useTranslation } from "react-i18next";

export function ReviewModal({ open, onClose, rideName, onSubmit, loading }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
 const { t } = useTranslation();

  useEffect(() => {
    if (!open) {
      setRating(0);
      setHoveredRating(0);
      setComment("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    onSubmit(rating, comment);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Leave Feedback")}</DialogTitle>
          <DialogDescription>
            {rideName ? `How was your ride ${rideName}?` : "How was your ride?"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="flex flex-col items-center gap-4">
            <p>{t("Rate your experience")}</p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={
                      `w-8 h-8 ` +
                      (star <= (hoveredRating || rating)
                        ? "fill-[#FFD700] text-[#FFD700]"
                        : "text-gray-300")
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Box */}
          <div className="space-y-2">
            <label htmlFor="comment">{t("Additional Comments")}</label>
            <Textarea
              id="comment"
              placeholder={t("Tell us more about your experience...")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              {t("Cancel")}
            </Button>

            <Button
             disabled={loading}
              onClick={handleSubmit}
              className="flex-1 w-full bg-[#0E3C2F] hover:bg-[#0E3C2F]/90 text-white"
            >
               {loading ? (
    "Submitting..."
  ) : (
    "Submit Feedback"
  )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
