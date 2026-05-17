import { Button } from "@heroui/react";
import React from "react";
import DestinationCart from "./DestinationCart";
import Link from "next/link";

const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
  const destinations = await res.json();
  console.log(destinations);
  return (
    <div className=" max-w-7xl mx-auto">
      <div className=" flex items-center justify-between m-10">
        <div >
          <h2 className=" font-bold text-2xl">Featured Destination</h2>
        </div>

        <Link href={'/destinations'}><Button
          variant="outline"
          className={
            " rounded-none border-2 border-cyan-500 p-2 cursor-pointer text-cyan-500"
          }
        >
          All Destination
        </Button></Link>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {destinations.map(destination => <DestinationCart key={destination._id} destination={destination}/>)}
      </div>
    </div>
  );
};

export default Featured;
