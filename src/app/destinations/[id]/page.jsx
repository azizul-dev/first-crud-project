import EditModal from "@/components/EditModal";

import Image from "next/image";

import React from "react";


const DestinationDetailPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:8000/destination/${id}`);
  const destination = await res.json();

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
      <EditModal destination={destination}/>

      <div className="relative w-full h-100 rounded-2xl overflow-hidden mb-8">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover"
          sizes="900px"
          priority
        />
        <span className="absolute top-4 left-4 bg-white text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
          📍 {country}
        </span>
        <div className="absolute bottom-4 right-4 bg-white rounded-xl px-4 py-2 text-right">
          <p className="text-xs text-gray-400">from</p>
          <p className="text-2xl font-semibold text-gray-800">${price}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-3">
            {destinationName}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {description}
          </p>

          {features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
                Whats included
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-500"
                  >
                    <span className="text-green-500">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tags.length > 0 && (
            <div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 sticky top-6">
          {[
            { icon: "🕐", label: "Duration", value: duration },
            { icon: "👥", label: "Group size", value: groupSize },
            { icon: "📅", label: "Best time", value: bestTime },
            { icon: "🗣️", label: "Language", value: language },
            { icon: "💵", label: "Price per person", value: `$${price}` },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
            >
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-sm font-medium text-gray-800">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
          <button className="mt-4 w-full py-3 bg-blue-700 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors">
            Book now
          </button>
          <button className="mt-2 w-full py-2.5 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            ♡ Save to wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;
