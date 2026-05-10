import DestinationCart from "@/components/DestinationCart";
import React from "react";

const DestinationPage = async () => {
  const res = await fetch("http://localhost:8000/destination");
  const destinations = await res.json();

  return (
    <div className="px-10 py-8">
      <h2 className="text-3xl font-semibold mb-6">All Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <DestinationCart key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;