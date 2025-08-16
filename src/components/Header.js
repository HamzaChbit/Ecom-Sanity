"use client"

import { FaShoppingCart } from "react-icons/fa";


import Link from 'next/link';
import { useEffect, useState } from "react";

import useCartStore from "@/cartStore";
import { getCategories } from "../sanity/category-util";



function Header() {

  const totalItems = useCartStore((state) => state.totalItems);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const Categories = await getCategories();
      setData(Categories);
    };
    fetchData();
  }, []);

  return (
    <div className="p-3 border-b-2 border-[#F5F3FF]">
        <div className="max-w-7xl mx-auto flex justify-between">
         
        <Link href="/">
        <div className="flex items-center">
        <img src="/logo.png" alt="logo" width={50} height={50} />
        <h1 className="ml-2 text-2xl lg:text-3xl font-bold ">TechTrove</h1>
        </div>
        </Link>

<div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
  {data.map((cat) => (
    <Link
      key={cat.slug}
      href={`/category/${cat?.slug}`}
      className="text-gray-700 font-medium hover:text-[#5B20B6] transition-colors duration-300"
    >
      {cat.title}
    </Link>
  ))}
</div>








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


           




        </div>

        </div>
    </div>
  )
}

export default Header