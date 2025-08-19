'use client'

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Brand colors for consistency
  const brandTeal = "#2DD4BF";
  const brandDarkGray = "#4a4a4a";

  const onSubmit = (data) => {
    setIsLoading(true);
    const templateParams = {
      // 1. Updated recipient name
      to_name: 'Viet technologie', 
      from_name: data.user_name,
      from_email: data.user_email,
      message: data.message,
    };
    
    emailjs.send(
      'service_inskmz7', 
      'template_ma7sv3q', 
      templateParams, 
      'WX2mRq1JN2Qh_5bqh'
    )
    .then((result) => {
        console.log(result.text);
        toast.success("Message sent successfully!");
        reset(); 
    })
    .catch((error) => {
        console.log(error.text);
        toast.error("Failed to send message.");
    })
    .finally(() => {
        setIsLoading(false); 
    });
  };

  return (
    <div className='mx-auto mt-20 max-w-7xl px-4'>
      <div className='flex h-full w-full flex-col items-center'>
        
        <div className='flex w-full flex-col items-start justify-between gap-10 md:flex-row'>
          
          {/* Left Column: Contact Information */}
          <div className='flex w-full flex-col gap-y-4 md:w-2/5' style={{ color: brandDarkGray }}>
            <h1 className='text-4xl font-bold tracking-wide'>
              {/* 2. Updated title color to teal */}
              <span style={{ color: brandTeal }}>Entrer en </span> Contact
            </h1>
            <p className='mb-4 text-lg opacity-90'>
              Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.
            </p>
            <hr />

            <div className='mt-4 flex flex-col gap-y-6'>
              <div className='flex items-center gap-x-5'>
                <FaMapMarkerAlt size={25} style={{ color: brandTeal }} />
                <div>
                  <h2 className='text-xl font-bold'>Address</h2>
                  {/* 3. Updated Address */}
                  <p className='opacity-90'>Notre magasin à Agadir, hay Essalam</p>
                  <p className='opacity-90'>Agadir, Morocco</p>
                </div>
              </div>

              <div className='flex items-center gap-x-3'>
                <FaInstagram size={30} style={{ color: brandTeal }} />
                <div className='text-left'>
                  <h3 className='text-lg font-semibold'>Instagram</h3>
                  {/* 4. Updated Instagram link and handle */}
                  <a 
                    href="https://www.instagram.com/viet_technologie/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='opacity-90 hover:underline'
                    style={{'--hover-color': brandTeal }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--hover-color)'}
                    onMouseOut={e => e.currentTarget.style.color = ''}
                  >
                    @viet.technologie
                  </a>
                </div>
              </div>

              <div className='flex items-center gap-x-5'>
                <FaWhatsapp size={25} style={{ color: brandTeal }} />
                <div>
                  <h2 className='text-xl font-bold'>Phone</h2>
                  {/* 5. Updated Phone Number */}
                  <p className='opacity-90'>+212 0637760241</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col rounded-lg bg-white p-8 shadow-xl md:w-3/5'>
              <div className="mb-5">
                <label className="mb-2 block font-bold" style={{ color: brandDarkGray }}>Your Name</label>
                <input
                  type="text"
                  {...register("user_name", { required: "Your name is required." })}
                  placeholder="Enter your name"
                  // 6. Updated input focus ring color
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                />
                {errors.user_name && <span className="mt-1 text-sm text-red-500">{errors.user_name.message}</span>}
              </div>

              <div className="mb-5">
                <label className="mb-2 block font-bold" style={{ color: brandDarkGray }}>Email</label>
                <input
                  type="email"
                  {...register("user_email", { required: "A valid email is required." })}
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                />
                {errors.user_email && <span className="mt-1 text-sm text-red-500">{errors.user_email.message}</span>}
              </div>

              <div className="mb-6">
                <label className="mb-2 block font-bold" style={{ color: brandDarkGray }}>Message</label>
                <textarea
                  {...register("message", { required: "A message is required." })}
                  placeholder="Enter your message"
                  className="w-full resize-none rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                  rows="5"
                />
                {errors.message && <span className="mt-1 text-sm text-red-500">{errors.message.message}</span>}
              </div>

              {/* 7. Updated button colors */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-teal-500 focus:outline-none disabled:bg-gray-400"
                style={{ backgroundColor: brandTeal }}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
          </form>
        </div>
        
        {/* Map Section */}
        <div className='mt-16 w-full'>
          {/* 8. Updated Map with a more accurate location */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.5196090035247!2d-9.546926299999999!3d30.3996275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b7e975c9f2b5%3A0x3c5cb7978af703c8!2sViet%20technologie!5e1!3m2!1sfr!2sma!4v1755620855089!5m2!1sfr!2sma"
            className='h-80 w-full rounded-lg border-0 shadow-xl'
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;