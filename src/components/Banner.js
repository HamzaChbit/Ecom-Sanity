"use client";
import React from 'react';
import Link from 'next/link';
import { CiDeliveryTruck } from "react-icons/ci";
import { motion } from 'framer-motion';
import Image from 'next/image';

function Banner() {
  return (
    <div className="">
      <motion.section
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
  
       className="relative w-full bg-gradient-to-br from-[#5B20B6] to-[#3b1e7c] shadow-xl overflow-hidden"
      >
        {/* Main container: GRID on mobile, FLEX on desktop */}
        <div className="grid md:flex md:flex-row justify-between items-center max-w-7xl mx-auto p-8 md:p-12 min-h-[50vh] md:min-h-0">

          {/* Text Content Section */}
          {/* This now sits in the same grid cell as the image, but with a higher z-index */}
          <div className="col-start-1 row-start-1 z-20 text-center md:text-left md:w-1/2 space-y-4">
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="flex items-center justify-center md:justify-start gap-3 text-2xl font-bold text-white md:text-4xl"
            >
              <CiDeliveryTruck className="flex-shrink-0" size={40} />
              <span>Livraisons par tout le Maroc</span>
            </motion.h1>

            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="flex items-center justify-center md:justify-start gap-3 text-2xl font-bold text-white md:text-4xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Garantie 2 mois</span>
            </motion.h1>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="pt-4"
            >
              <Link
                href="/products"
                className="bg-[#5B20B6] inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-white rounded-lg hover:bg-[#7b4acb] transition-colors"
              >
                Products
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Image Section */}
          {/* Sits in the same cell, but with a lower z-index. Opacity is changed for mobile. */}
          {/* The "hidden" class is removed so it shows up on mobile now. */}
          <div className="col-start-1 row-start-1 z-10 flex justify-center items-center w-full h-full md:w-1/2 opacity-70 md:opacity-100 md:justify-end">
             <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Image
                  src="/pngwing.com.png"
                  width={500}
                  height={500}
                  alt="Laptop"
                  // Object-cover helps the image fill the space better as a background
                  className="w-full h-full object-cover max-w-md"
                  priority={true}
                />
             </motion.div>
          </div>

        </div>
      </motion.section>
    </div>
  );
}

export default Banner;