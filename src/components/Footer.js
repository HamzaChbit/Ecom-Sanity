"use client";
import React from 'react';
import { motion } from 'framer-motion';
// Icons li ghan7tajo

// 1. Import FaInstagram icon
import { FaMapMarkerAlt, FaPhone, FaInstagram } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import Link from 'next/link';

function Footer() {
  return (
    <motion.footer 
      className='bg-gray-50 p-6 md:p-10 mt-16 border-t' 
      initial={{ y: 20, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className='max-w-6xl mx-auto'>
        
        {/* Top Section: Contact Info */}
        <div className='text-center'>
            <h2 className="text-4xl font-bold mb-8 text-[#5B20B6]">Contact Us</h2>

            {/* HAD L'LIGNE LI TBEDDLAT */}
            <div className='inline-flex flex-col items-start gap-8 md:flex-row md:justify-around'>
              
              {/* Address */}
              <div className='flex items-center gap-x-3'>
                <FaMapMarkerAlt size={30} className='text-[#5B20B6]' />
                <div className='text-left'>
                  <h3 className='text-lg font-semibold'>Address</h3>
                  <p className='text-gray-600'>N 37 Rue 972 Hay Salam Agadir </p>
                </div>
              </div>

              {/* Email */}
              {/* <div className='flex items-center gap-x-3'>
                <MdOutlineEmail size={30} className='text-[#5B20B6]' />
                <div className='text-left'>
                  <h3 className='text-lg font-semibold'>Email</h3>
                  <p className='text-gray-600'>store@gmail.com</p>
                </div>
              </div> */}

              {/* Phone */}
              <div className='flex items-center gap-x-3'>
                <FaPhone size={30} className='text-[#5B20B6]' />
                <div className='text-left'>
                  <h3 className='text-lg font-semibold'>Phone</h3>
                  <p className='text-gray-600'>+212 0694977110</p>
                </div>
              </div>

              {/* 2. Add Instagram Link and Icon */}
              <div className='flex items-center gap-x-3'>
                <FaInstagram size={30} className='text-[#5B20B6]' />
                <div className='text-left'>
                  <h3 className='text-lg font-semibold'>Instagram</h3>
                  <a 
                    href="https://www.instagram.com/desktopplus/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='text-gray-600 hover:text-[#5B20B6] hover:underline'
                  >
                    @desktopplus
                  </a>
                </div>
              </div>

            </div>
        </div>

        {/* Credit */}
       <div className='text-center text-gray-500 mt-10 pt-6 border-t'>
            Made By <Link href="https://www.linkedin.com/in/hamzachbit" target="_blank" className='text-[#5B20B6] font-semibold hover:underline'>Hamza Chbit</Link>
        </div>

      </div>
    </motion.footer>
  );
}

export default Footer;