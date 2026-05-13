import React from "react";
import { Card } from "@heroui/react";

const BookingCart = ({ destination }) => {
  const {
    destinationName,
    country,
    price,
    duration,
  } = destination;

  return (
    <Card className="overflow-hidden border-0 shadow-xl rounded-2xl">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a3a4a] to-[#1d6b5a] px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-lg font-semibold tracking-tight">
            Your Booking
          </h2>
          <span className="bg-white/15 border border-white/20 text-white/90 text-xs px-3 py-1 rounded-full">
            {country}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/65 text-xs">{duration}</span>
          <span className="text-white/65 text-xs">⭐ 4.9 rating</span>
          <span className="text-white/65 text-xs">✓ Free cancellation</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5">

        {/* Dates */}
        <p className="text-[10px] font-semibold tracking-[0.1em] text-neutral-400 uppercase mb-3">
          Travel dates
        </p>
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl px-4 py-3 border border-neutral-100 dark:border-neutral-700">
            <p className="text-[11px] text-neutral-400 mb-1">Check-in</p>
            <p className="text-[15px] font-medium text-neutral-800 dark:text-neutral-100">
              Select date
            </p>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl px-4 py-3 border border-neutral-100 dark:border-neutral-700">
            <p className="text-[11px] text-neutral-400 mb-1">Check-out</p>
            <p className="text-[15px] font-medium text-neutral-800 dark:text-neutral-100">
              Select date
            </p>
          </div>
        </div>

        {/* Guests */}
        <p className="text-[10px] font-semibold tracking-[0.1em] text-neutral-400 uppercase mb-3">
          Guests
        </p>
        <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-xl px-4 py-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-50 dark:bg-emerald-950 rounded-xl flex items-center justify-center text-emerald-600 text-lg">
              👥
            </div>
            <div>
              <span className="block text-[12px] text-neutral-400">Travelers</span>
              <span className="text-[16px] font-medium text-neutral-800 dark:text-neutral-100">
                2 guests
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 transition-colors text-lg font-medium">
              −
            </button>
            <span className="w-5 text-center text-[17px] font-medium text-neutral-800 dark:text-neutral-100">
              2
            </span>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 transition-colors text-lg font-medium">
              +
            </button>
          </div>
        </div>

        {/* Price Summary */}
        <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4">
          <p className="text-[10px] font-semibold tracking-[0.1em] text-neutral-400 uppercase mb-3">
            Price summary
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">${price} × 2 guests</span>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                ${price * 2}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Service fee</span>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">—</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Taxes</span>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">—</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800 rounded-xl px-4 py-3.5 mt-4">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Total</span>
            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 tracking-tight">
              ${price * 2}
            </span>
          </div>
        </div>

        {/* Notice */}
        <div className="flex items-start gap-2.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl px-4 py-3 mt-4">
          <span className="text-emerald-600 text-sm mt-0.5 flex-shrink-0">ℹ</span>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
            Free cancellation available up to 48 hours before your arrival date.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 space-y-2.5">
        <button className="w-full flex items-center justify-center gap-2 bg-[#1a5c4e] hover:bg-[#144d41] text-white text-[15px] font-medium py-3.5 rounded-xl transition-colors">
          💳 Confirm &amp; Pay
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-500 text-sm py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 transition-colors">
          🤍 Save to wishlist
        </button>
        <p className="text-center text-[11px] text-neutral-400 pt-1">
          🔒 Secure checkout · SSL encrypted
        </p>
      </div>

    </Card>
  );
};

export default BookingCart;