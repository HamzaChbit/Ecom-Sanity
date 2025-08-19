"use client";
import React from 'react';
import { FaMapMarkerAlt, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

function Footer() {
  return (
    <footer className='mt-16 border-t border-slate-600 bg-brand-dark p-6 md:p-10'>
      <div className='mx-auto max-w-6xl'>
        
        <div className='text-center'>
            <h2 className="mb-8 text-4xl font-bold text-brand-teal">Contact Us</h2>

            <div className='inline-flex flex-col items-start gap-8 md:flex-row md:justify-around'>
              
              {/* Address */}
              <div className='flex items-center gap-x-3'>
                <FaMapMarkerAlt size={30} className='text-brand-teal' />
                <div className='text-left'>
                  <h3 className='text-lg font-semibold text-white'>Address</h3>
                  <p className='text-gray-300'>Notre magasin à Agadir, hay Essalam</p>
                </div>
              </div>

              {/* Phone */}
              <div className='flex items-center gap-x-3'>
                <FaWhatsapp size={30} className='text-brand-teal' />
                <div className='text-left'>
                  <h3 className='text-lg font-semibold text-white'>Phone</h3>
                  <p className='text-gray-300'>+212 637-760241</p>
                </div>
              </div>

              {/* Instagram */}
              <div className='flex items-center gap-x-3'>
                <FaInstagram size={30} className='text-brand-teal' />
                <div className='text-left'>
                  <h3 className='text-lg font-semibold text-white'>Instagram</h3>
                  <a 
                    href="https://www.instagram.com/viet_technologie/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='text-gray-300 transition-colors hover:text-brand-teal hover:underline'
                  >
                    @viet.technologie
                  </a>
                </div>
              </div>

            </div>
        </div>

        {/* Credit */}
       <div className='mt-10 border-t border-slate-600 pt-6 text-center text-gray-400'>
            Made By <Link href="https://www.linkedin.com/in/hamzachbit" target="_blank" className='font-semibold text-brand-teal hover:underline'>Hamza Chbit</Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;