import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { Button } from "@heroui/react";
import React from "react";
import { Eye } from "@gravity-ui/icons";
import BookingDelete from "@/components/BookingDelete";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

   const tokenData = await auth.api.getToken({ headers: await headers() });
    const token = tokenData?.token;
  

  const user = session?.user;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`, {
    headers: {
      authorization: `Bearer ${token}`
    },
  });

  const data = await res.json();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500 mt-1">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {data.length === 0 ? (
        <p className="text-center text-gray-400 py-20">No bookings found</p>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((booking) => (
            <div
              key={booking._id}
              className="flex border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-56 shrink-0">
                <Image
                  src={booking.imageUrl}
                  alt={booking.destinationName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 p-5">
                <div className="space-y-2">
                  {/* Status Badge */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Confirmed
                  </span>

                  <h2 className="text-xl font-bold text-gray-900">
                    {booking.destinationName}
                  </h2>

                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    Departure:{" "}
                    {new Date(booking.departureDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </p>

                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    Booking ID: {booking._id}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-cyan-600">
                    ৳{booking.price.toLocaleString()}
                  </span>

                  <div className="flex gap-2">
                   <BookingDelete bookingId={booking._id}/>
                   
                    <Button
                      color="primary"
                      className="cursor-pointer"
                      size="sm"
                      startContent={<Eye />}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;
