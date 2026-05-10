import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div>
        <div className=" container mx-auto py-10">
      <nav className=" flex justify-between items-center">
        <ul className=" flex gap-3">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/destinations"}>Destinations</Link>
          </li>
          <li>
            <Link href={"/my-bookings"}>My Bookings</Link>
          </li>
          <li>
            <Link href={"/add-destination"}>Add Destination</Link>
          </li>
        </ul>

        <div>
          <Image
            src={"/assets/Wanderlast.png"}
            alt="Wanderlat"
            height={200}
            width={200}
          />
        </div>

        <ul className=" flex gap-3">
          <li>
            <Link href={"/profile"}>Profile</Link>
          </li>
          <li>
            <Link href={"/login"}>Login</Link>
          </li>
          <li>
            <Link href={"/signup"}>SignUp</Link>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  );
};

export default NavBar;
