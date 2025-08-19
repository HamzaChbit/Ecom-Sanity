"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

function Footer() {
  return (
    <footer 
      // 1. تغيير الخلفية إلى الأسود وتغيير لون الخط الفاصل
      className='bg-gray-900 p-6 md:p-10 mt-16 border-t border-gray-700' 
 
    >
      <div className='max-w-6xl mx-auto'>
        
        <div className='text-center'>
            {/* 2. تغيير لون العنوان الرئيسي إلى الذهبي */}
            <h2 className="text-4xl font-bold mb-8 text-amber-400">Contact Us</h2>

            <div className='inline-flex flex-col items-start gap-8 md:flex-row md:justify-around'>
              
              {/* Address */}
              <div className='flex items-center gap-x-3'>
                {/* 3. تغيير لون الأيقونة إلى الذهبي */}
                <FaMapMarkerAlt size={30} className='text-amber-400' />
                <div className='text-left'>
                  <h3 className='text-lg font-semibold text-white'>Address</h3>
                  {/* 4. تغيير لون النص العادي إلى رمادي فاتح */}
                  <p className='text-gray-300'>N 37 Rue 972 Hay Salam Agadir </p>
                </div>
              </div>

              {/* Phone */}
              <div className='flex items-center gap-x-3'>
                <FaWhatsapp size={30} className='text-amber-400' />
                <div className='text-left'>
                  <h3 className='text-lg font-semibold text-white'>Phone</h3>
                  <p className='text-gray-300'>+212 0648730359</p>
                </div>
              </div>

              {/* Instagram */}
              <div className='flex items-center gap-x-3'>
                <FaInstagram size={30} className='text-amber-400' />
                <div className='text-left'>
                  <h3 className='text-lg font-semibold text-white'>Instagram</h3>
                  <a 
                    href="https://www.instagram.com/desktopplus/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='text-gray-300 hover:text-amber-400 hover:underline'
                  >
                    @desktopplus
                  </a>
                </div>
              </div>

            </div>
        </div>

        {/* Credit */}
       <div className='text-center text-gray-400 mt-10 pt-6 border-t border-gray-700'>
            Made By <Link href="https://www.linkedin.com/in/hamzachbit" target="_blank" className='text-amber-400 font-semibold hover:underline'>Hamza Chbit</Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;