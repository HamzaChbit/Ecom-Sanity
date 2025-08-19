import React from 'react';
import Link from 'next/link';
import { CiDeliveryTruck } from "react-icons/ci";
import Image from 'next/image';

function Banner() {
  return (
    <div className="relative w-full bg-gray-900 shadow-xl overflow-hidden">
      {/* ✅ FIX: Removed `min-h-[50vh]` and `md:min-h-0`.
        This allows the container's height to be determined by its content, 
        preventing a conflict between a fixed height and the image's aspect ratio.
      */}
      <div className="grid md:flex md:flex-row justify-between items-center max-w-7xl mx-auto p-8 md:p-12">

        {/* Text Content Section */}
        <div className="col-start-1 row-start-1 z-20 text-center md:text-left md:w-1/2 space-y-4">
          <h1 className="flex items-center justify-center md:justify-start gap-3 text-2xl font-bold text-amber-400 md:text-4xl">
            <CiDeliveryTruck className="flex-shrink-0" size={40} />
            <span className='text-white'>Livraisons par tout le Maroc</span>
          </h1>

          <h1 className="flex items-center justify-center md:justify-start gap-3 text-2xl font-bold text-amber-400 md:text-4xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className='text-white'>Garantie 2 mois</span>
          </h1>

          <div className="pt-4">
            <Link
              href="/products"
              className="bg-amber-500 inline-flex items-center text-black justify-center px-6 py-3 text-base font-semibold text-center rounded-lg hover:bg-amber-600 transition-colors"
            >
              Products
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-start-1 row-start-1 z-10 flex justify-center items-center w-full h-full md:w-1/2 opacity-70 md:opacity-100 md:justify-end">
          <div>
            <Image
              src="/pngwing.png"
              width={500}
              height={500}
              alt="Laptop"
        
              className="w-full h-auto object-cover max-w-md"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;