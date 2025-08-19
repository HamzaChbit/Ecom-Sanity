import React from 'react';
import Link from 'next/link';
import { CiDeliveryTruck } from "react-icons/ci";
import Image from 'next/image';

function Banner() {
  return (
    <div className="relative w-full overflow-hidden bg-brand-dark shadow-xl">
      <div className="mx-auto grid max-w-7xl items-center justify-between p-8 md:flex md:flex-row md:p-12">

        {/* Text Content Section */}
        <div className="z-20 col-start-1 row-start-1 w-full space-y-4 text-center md:w-1/2 md:text-left">
          <h1 className="flex items-center justify-center gap-3 text-2xl font-bold text-brand-teal md:justify-start md:text-4xl">
            <CiDeliveryTruck className="flex-shrink-0" size={40} />
            <span className='text-white'>Livraisons par tout le Maroc</span>
          </h1>

          <h1 className="flex items-center justify-center gap-3 text-2xl font-bold text-brand-teal md:justify-start md:text-4xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className='text-white'>Garantie 2 mois</span>
          </h1>

          <div className="pt-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-brand-teal px-6 py-3 text-center text-base font-semibold text-white transition-all hover:brightness-90"
            >
              Products
              <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="z-10 col-start-1 row-start-1 flex h-full w-full items-center justify-center opacity-70 md:w-1/2 md:justify-end md:opacity-100">
          <div>
            <Image
              src="/bannerv1.png"
              width={500}
              height={500}
              alt="Laptop"
              className="h-auto w-full max-w-md object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;