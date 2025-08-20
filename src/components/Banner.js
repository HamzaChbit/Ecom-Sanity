"use client";
import React from 'react';
import Link from 'next/link';
import { CiDeliveryTruck } from "react-icons/ci";
import { HiCheckCircle } from "react-icons/hi";
import Image from 'next/image';
import { motion } from 'framer-motion';

function Banner() {
  return (
    // ## 1. L'BACKGROUND Jdid b' Pattern o Glows ##
    <div className="relative w-full overflow-hidden bg-brand-dark shadow-xl ">
      
      {/* Background Pattern (subtle dots) */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(theme(colors.brand.amber)/10%_1px,transparent_1px)] [background-size:24px_24px] opacity-50"
      ></div>

      {/* Glows (Adwaa) */}
      <div className="absolute -right-60 -top-60 h-[400px] w-[400px] rounded-full bg-brand-amber/10 blur-3xl"></div>
      <div className="absolute -bottom-60 -left-60 h-[400px] w-[400px] rounded-full bg-brand-amber/10 blur-3xl"></div>

      <div className="mx-auto grid max-w-7xl items-center p-8 md:grid-cols-2 md:p-12 gap-8">

        {/* Text Content Section (Baqi nafsso) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 w-full space-y-6 text-center md:text-left"
        >
          
          <h1 className="text-4xl font-extrabold text-white md:text-5xl drop-shadow-lg">
            La Qualité au Meilleur Prix
          </h1>

          <div className="space-y-3">
              <p className="flex items-center justify-center gap-3 text-lg font-semibold text-white md:justify-start">
                <CiDeliveryTruck className="flex-shrink-0 text-brand-amber" size={30} />
                Livraisons par tout le Maroc
              </p>
              <p className="flex items-center justify-center gap-3 text-lg font-semibold text-white md:justify-start">
                <HiCheckCircle className="flex-shrink-0 text-brand-amber" size={30} />
                Garantie 90 jours
              </p>
          </div>

          <div className="pt-6">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-brand-amber px-8 py-3 text-center text-base font-bold text-brand-dark shadow-lg transition-transform hover:scale-105"
            >
              Voir les Produits
              <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Image Section (Baqi nafsso) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative flex h-full w-full items-center justify-center md:justify-end"
        >
            <Image
                src="/pngwing.png"
                width={500}
                height={500}
                alt="Laptop et produits technologiques"
                className="relative z-0 h-auto w-full max-w-md object-contain drop-shadow-2xl"
                priority
            />
        </motion.div>
      </div>
    </div>
  );
}

export default Banner;