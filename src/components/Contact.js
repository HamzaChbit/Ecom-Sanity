'use client'

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
// Make sure you have react-icons installed: npm install react-icons
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);

    const templateParams = {
      to_name: 'Hôtel Sindibad Agadir', // Or any recipient name you prefer
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
    <div className='max-w-7xl  mb:mx-1  mt-20 mx-auto px-4'>
      <div className='flex flex-col h-full w-full items-center'>
        
        {/* Main Content: Info + Form */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-10 w-full'>
          
          {/* Left Column: Contact Information */}
          <div className='flex flex-col gap-y-4 w-full md:w-2/5'>
            <h1 className='text-4xl font-bold tracking-wide'>
              <span className='text-[#5B20B6]'>Entrer en </span> Contact
            </h1>
            <p className='text-lg text-gray-600 mb-4'>
              Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.
            </p>
            <hr />

            <div className='flex flex-col gap-y-6 mt-4'>
              <div className='flex items-center gap-x-5'>
                <FaMapMarkerAlt size={25} className='text-[#5B20B6]' />
                <div>
                  <h2 className='text-xl font-bold'>Address</h2>
                  <p className='text-gray-700'>DESKTOPPLUS
</p>
                  <p className='text-gray-700'> Rue 972, Agadir 80000</p>
                </div>
              </div>

              <div className='flex items-center gap-x-5'>
                <MdOutlineEmail size={25} className='text-[#5B20B6]' />
                <div>
                  <h2 className='text-xl font-bold'>Email</h2>
                  <p className='text-gray-700'>store@gmail.com</p>
                </div>
              </div>

              <div className='flex items-center gap-x-5'>
                <FaPhone size={25} className='text-[#5B20B6]' />
                <div>
                  <h2 className='text-xl font-bold'>Phone</h2>
                  <p className='text-gray-700'>+212 0694977110</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full md:w-3/5 p-8 bg-white shadow-xl rounded-lg'>
             <div className="mb-5">
               <label className="block text-gray-700 font-bold mb-2">Your Name</label>
               <input
                 type="text"
                 {...register("user_name", { required: "Your name is required." })}
                 placeholder="Enter your name"
                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5B20B6]"
               />
               {errors.user_name && <span className="text-red-500 text-sm mt-1">{errors.user_name.message}</span>}
             </div>

             <div className="mb-5">
               <label className="block text-gray-700 font-bold mb-2">Email</label>
               <input
                 type="email"
                 {...register("user_email", { required: "A valid email is required." })}
                 placeholder="Enter your email"
                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5B20B6]"
               />
               {errors.user_email && <span className="text-red-500 text-sm mt-1">{errors.user_email.message}</span>}
             </div>

             <div className="mb-6">
               <label className="block text-gray-700 font-bold mb-2">Message</label>
               <textarea
                 {...register("message", { required: "A message is required." })}
                 placeholder="Enter your message"
                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5B20B6] resize-none"
                 rows="5"
               />
               {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>}
             </div>

             <button
               type="submit"
               disabled={isLoading}
               className="w-full bg-[#5B20B6] text-white font-bold px-6 py-3 rounded-md hover:bg-[#4C1D95] focus:outline-none transition-colors duration-300 disabled:bg-gray-400"
             >
               {isLoading ? 'Sending...' : 'Send Message'}
             </button>
          </form>
        </div>
        
        {/* Map Section */}
        <div className='mt-16 w-full'>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4146.980182511458!2d-9.550451341060736!3d30.40129128356989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b72e80b70497%3A0xa5089c3f3f62ecee!2sDESKTOPPLUS!5e1!3m2!1sen!2sma!4v1755461733018!5m2!1sen!2sma"
            className='h-80 w-full border-0 rounded-lg shadow-xl'
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