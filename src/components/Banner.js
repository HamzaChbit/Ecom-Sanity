"use client";
import React from 'react';
import Link from 'next/link';


import { motion } from 'framer-motion'
function Banner() {


  return (
    <div>
      <motion.section  initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.3,delay:0.5}}     className="bg-white dark:bg-gray-900 w-full">
        <div className="flex max-w-screen-xl py-8 mx-auto px-16 lg:py-16 lg:flex-row justify-between items-center ">
          <div className="mx-auto place-self-center lg:col-span-7 pr-9  ">
            <motion.h1  initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.4,delay:0.7}}    className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Uncover Innovation at TechTrove 
            </motion.h1>
            <motion.p initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.4,delay:0.7}}  className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Experience the Future Today - Connect with Our Expert Tech Team!
            </motion.p>
            <Link
              href="/products"
              className="bg-[#5B20B6]  inline-flex items-center justify-center md:px-5 px-2 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-[#b78cf7]"
            >
              Products
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>


   <Link
    href="/contact"
    className="inline-flex items-center justify-center md:px-5 md:my-0 my-2 px-1 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
  >
    Speak to Sales
  </Link>





          </div>
          <div className="hidden md:flex flex-row w-full">
            <img className=''
            src="/ba45.png"
   
              alt="mockup" 
            />
          
        </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Banner;