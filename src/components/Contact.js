'use client'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

function Contact() {
  const form = useRef();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const sendEmail = (data) => {
    emailjs.send(
      'service_yoorful',       // ton service EmailJS
      'template_xoit2ck',      // ton template EmailJS
      data,
      'EGW9Iy57TjlDfnomu'      // ta clé publique
    )
    .then((result) => {
      console.log(result.text);
      toast.success("Message sent!");
      reset();
    })
    .catch((error) => {
      console.error(error.text);
      toast.error("Failed to send message");
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-[#5B20B6]">Contact Us</h2>
      
      <form ref={form} onSubmit={handleSubmit(sendEmail)}>
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">First Name:</label>
          <input
            type="text"
            {...register("user_name", { required: true })}
            placeholder="Enter your first name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5B20B6]"
          />
          {errors.user_name && <span className="text-red-500">First name is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
          <input
            type="text"
            {...register("user_last_name", { required: true })}
            placeholder="Enter your last name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5B20B6]"
          />
          {errors.user_last_name && <span className="text-red-500">Last name is required</span>}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            {...register("user_email", { required: true })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5B20B6]"
          />
          {errors.user_email && <span className="text-red-500">Email is required</span>}
        </div>

        {/* Issue / Message */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Message:</label>
          <textarea
            {...register("message", { required: true })}
            placeholder="Enter your message"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5B20B6] resize-none"
            rows="4"
          />
          {errors.message && <span className="text-red-500">Message is required</span>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#5B20B6] text-white px-6 py-2 rounded-md hover:bg-[#4C1D95] focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
