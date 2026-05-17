"use client";

import React, { useState } from "react";
import { Card, Button, Chip, NumberField, DatePicker } from "@heroui/react";
import {
  DateField,
  DateInput,
  DateSegment,
  Label,
} from "react-aria-components";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const BookingCart = ({ destination }) => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);

  const {_id, country, price, duration, destinationName,imageUrl } = destination;

  const handleBooking = async () =>{
     if (!user) {
    toast.error("Please login first");
    return;
  }

  if (!departureDate) {
     toast.error("Please select a departure date");
    return;
  }
    const bookingDate = {
      userId: user.id,
      userImage: user.image,
      userName: user.name,
      destinationId: _id,
      destinationName,
      price,
      imageUrl,
      country,
      departureDate: new Date(departureDate)
    };

    const {data:tokenData} = await authClient.token()


    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`,{
      method: "POST",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(bookingDate)
    })
    const data = await res.json();

    toast.success("Your Booking Successful");
    redirect('/destinations')
  }




  return (
    <Card className="overflow-hidden border-0 shadow-xl rounded-2xl p-0">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a3a4a] to-[#1d6b5a] px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-lg font-semibold tracking-tight">
            Your Booking
          </h2>
          <Chip
            size="sm"
            className="bg-white/15 border border-white/20 text-white/90"
          >
            {country}
          </Chip>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Chip size="sm" className="bg-white/10 text-white/70 text-xs">
            {duration}
          </Chip>
          <Chip size="sm" className="bg-white/10 text-white/70 text-xs">
            ⭐ 4.9 rating
          </Chip>
          <Chip size="sm" className="bg-white/10 text-white/70 text-xs">
            ✓ Free cancellation
          </Chip>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5 space-y-5">
        {/* Date Picker */}
        <div className="space-y-3">
          <DateField onChange={setDepartureDate} className="w-full" name="date">
            <Label className="text-sm font-medium">Travel Date</Label>

            <DateInput className="border p-2 rounded-lg w-full mt-2">
              {(segment) => <DateSegment segment={segment} className="px-1" />}
            </DateInput>
          </DateField>

          <div className="grid grid-cols-2 gap-2">
            <DatePicker label="Check-in" />
            <DatePicker label="Check-out" />
          </div>
        </div>

        {/* Guests */}
        <div className="space-y-3">
          <p className="text-[10px] font-semibold tracking-[0.1em] text-neutral-400 uppercase">
            Guests
          </p>

          <NumberField
            label="Travelers"
            defaultValue={2}
            minValue={1}
            maxValue={12}
          />
        </div>

        {/* Divider fix */}
        <hr className="border-neutral-200 dark:border-neutral-700" />

        {/* Price Summary */}
        <div className="space-y-3">
          <p className="text-[10px] font-semibold tracking-[0.1em] text-neutral-400 uppercase">
            Price summary
          </p>

          <div className="flex justify-between">
            <span>${price} × 2 guests</span>
            <span>${price * 2}</span>
          </div>

          <div className="flex justify-between">
            <span>Service fee</span>
            <span>—</span>
          </div>

          <div className="flex justify-between">
            <span>Taxes</span>
            <span>—</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5">
        <Button onClick={handleBooking} fullWidth className="bg-green-700 p-2 w-full cursor-pointer text-white">
          Booking Now
        </Button>
      </div>
    </Card>
  );
};

export default BookingCart;
