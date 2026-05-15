import EditModal from "@/components/EditModal";
import Delete from "@/components/Delete";
import Image from "next/image";
import React from "react";
import { notFound } from "next/navigation";
import BookingCart from "@/components/BookingCart";
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Languages,
  CheckCircle2,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DestinationDetailPage = async ({ params }) => {
  const { id } = await params;

  const tokenData = await auth.api.getToken({ headers: await headers() });
  const token = tokenData?.token;

  const res = await fetch(`http://localhost:8000/destination/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const destination = await res.json();

  if (!destination) {
    notFound();
  }

  const {
    imageUrl,
    destinationName,
    country,
    price,
    duration,
    description,
    groupSize,
    bestTime,
    language,
    features = [],
    tags = [],
  } = destination;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Hero Image */}
      <div className="relative w-full h-[360px] rounded-3xl overflow-hidden mb-8 shadow-2xl">
        <Image
          src={imageUrl || "/placeholder.jpg"}
          alt={destinationName || "Destination Image"}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* Top buttons */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            <MapPin size={12} />
            {country}
          </span>
          <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            <Star size={11} fill="currentColor" className="text-yellow-400" />
            4.9
          </span>
        </div>
        <div className="absolute top-3.5 right-4 flex gap-2">
          <EditModal destination={destination} />
          <Delete destination={destination} />
        </div>

        {/* Title */}
        <div className="absolute bottom-5 left-6 right-6">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
            {destinationName}
          </h1>
          <p className="text-white/70 text-sm">
            {duration} · Tropical Experience
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Left column */}
        <div className="space-y-5">
          {/* Description */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-3">
              About this destination
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-[15px]">
              {description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                {
                  icon: <Users size={18} />,
                  value: groupSize,
                  label: "Group size",
                },
                {
                  icon: <Calendar size={18} />,
                  value: bestTime,
                  label: "Best time",
                },
                {
                  icon: <Languages size={18} />,
                  value: language,
                  label: "Language",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 text-center"
                >
                  <div className="flex justify-center mb-2 text-emerald-600">
                    {item.icon}
                  </div>
                  <span className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {item.value}
                  </span>
                  <span className="text-xs text-neutral-400 mt-0.5 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Tags */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-3">
              Features included
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {features.map((f, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <CheckCircle2 size={11} />
                  {f}
                </span>
              ))}
            </div>

            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-3">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Booking Cart */}
        <div>
          <BookingCart destination={destination} />
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;
