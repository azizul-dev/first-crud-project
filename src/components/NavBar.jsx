"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleSignOut = async () =>{
    await authClient.signOut();
  }

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

          <ul className=" flex gap-3 items-center">
            <li>
              <Link href={"/profile"}>Profile</Link>
            </li>

            {user ? (
              <div className=" flex items-center gap-2.5">
                <li>
                  <Avatar>
                    <Avatar.Image
                    referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full"
                      alt={user.name}
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </li>
                <li>
                  <Button onClick={handleSignOut} className={'bg-red-400 p-2 text-white rounded-md cursor-pointer'} color="danger" variant="solid">
                    LogOut
                  </Button>
                  
                </li>
              </div>
            ) : (
              <>
                <li>
                  <Link href={"/login"}>Login</Link>
                </li>
                <li>
                  <Link href={"/signup"}>SignUp</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
