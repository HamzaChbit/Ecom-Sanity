"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function Banner() {
  return (
    <div>
      {/* L'Banner daba 3ndo background image, o 3tito chwiya dyal l'3lo (height) b h-[60vh] */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        // === BACKGROUND Jdid HNA ===
        className="relative w-full h-[50vh] md:h-[60vh] bg-[url('/sky-banner.jpg')] bg-cover bg-center bg-no-repeat rounded-lg shadow-xl overflow-hidden"
      >
        {/* Zedt wa7d l'overlay k7el chfaf (transparent) bach l'ktaba tban mzyan foq tasswira */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* L'Content (3onwan o buttons) daba m'centerin f'wast dyal l'banner */}
        <div className="relative z-10 h-full flex flex-col items-center justify-end text-center p-4">
          
          {/* <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            // 3onwan jdid, b'lbyed, o 3ndo shadow bach iban mzyan
            className="max-w-3xl mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl xl:text-6xl drop-shadow-lg"
          >
            Explore Our Best Deals!
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-2xl mb-8 font-light text-gray-200 md:text-lg lg:text-xl drop-shadow-md"
          >
            Find everything you need at unbeatable prices.
          </motion.p> */}
          
          {/* L'Buttons m'groupyin o binathom chwiya d'espace */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/products"
              className="bg-[#5B20B6] inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-white rounded-lg hover:bg-[#4C1D95] transition-colors shadow-md"
            >
              Our Products
            </Link>
            
            {/* <Link
              href="/contact"
              className="bg-white/90 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors shadow-md"
            >
              Speak to Sales
            </Link> */}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default Banner;