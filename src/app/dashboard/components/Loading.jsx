// components/Loading.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import "../../../lib/i18n";

export default function Loading({ text = "Loading..." }) {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="w-10 h-10 relative animate-spinLoader mx-auto">
      <div className="w-4 h-4 bg-gray-800 rounded-full absolute top-0 left-0"></div>
      <div className="w-4 h-4 bg-gray-800 rounded-full absolute top-0 right-0"></div>
      <div className="w-4 h-4 bg-gray-800 rounded-full absolute bottom-0 left-0"></div>
      <div className="w-4 h-4 bg-gray-800 rounded-full absolute bottom-0 right-0"></div>

      {/* Add keyframes in Tailwind via style tag */}
      <style jsx>{`
        @keyframes spinLoader {
          0% {
            transform: scale(1) rotate(0deg);
          }
          20%, 25% {
            transform: scale(1.3) rotate(90deg);
          }
          45%, 50% {
            transform: scale(1) rotate(180deg);
          }
          70%, 75% {
            transform: scale(1.3) rotate(270deg);
          }
          95%, 100% {
            transform: scale(1) rotate(360deg);
          }
        }
        .animate-spinLoader {
          animation: spinLoader 2s linear infinite;
        }
      `}</style>
    </div>
      <div className="flex flex-col items-center">
        <p className="mt-4 text-gray-500 text-lg">{t(text)}</p>
      </div>
    </div>
  );
}
