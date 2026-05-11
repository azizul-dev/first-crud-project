import EditModal from "@/components/EditModal";
import Delete from "@/components/Delete";
import Image from "next/image";
import React from "react";
import { notFound } from "next/navigation";

const DestinationDetailPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/destination/${id}`, {
    cache: "no-store",
  });

  const destination = await res.json();

  // যদি data না থাকে
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
      <div className="flex gap-4 justify-end mb-6">
        <EditModal destination={destination} />
        <Delete destination={destination} />
      </div>

      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold">{destinationName}</h1>
      <p>{description}</p>
      <p>{country}</p>
      <p>${price}</p>
    </div>
  );
};

export default DestinationDetailPage;