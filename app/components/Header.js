"use client"

import { FaShoppingCart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

import { UserButton, useUser } from "@clerk/nextjs";
import useCartStore from "../../cartStore";
import Link from 'next/link';


function Header() {

  const totalItems = useCartStore((state) => state.totalItems);
  
  const { user } = useUser();
  const userId = user?.id;
  return (
    <div className="p-3 border-b-2 border-[#F5F3FF]">
        <div className="max-w-7xl mx-auto flex justify-between">
         
        <Link href="/">
        <div className="flex items-center">
        <img src="/logo.png" alt="logo" width={50} height={50} />
        <h1 className="ml-2 text-2xl lg:text-3xl font-bold ">TechTrove</h1>
        </div>
        </Link>

        <div className="flex items-center relative">
            <Link href="/cart">
             <FaShoppingCart className="text-3xl text-[#5B20B6] cursor-pointer hover:scale-125 transition-transform duration-300" />
            </Link>
             {
                  totalItems > 0 && (
                      <div className="ml-2 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-semibold">
                          {totalItems}
                      </div>
                  )
             }
{userId && (
             <Link className="ml-4" href="/order">
              <MdLocalShipping className="text-3xl text-[#5B20B6] cursor-pointer hover:scale-125 transition-transform duration-300" />
              </Link>
 )}

{userId && (
            <div className="ml-4">
            <UserButton  afterSignOutUrl="/"/>
            </div>  )}
            {!userId && (
            <Link href="/sign-in"  className="inline-flex items-center justify-center px-2 py-2 text-base font-light mx-5 text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
   
   Sign In

</Link> )}

           




        </div>

        </div>
    </div>
  )
}

export default Header