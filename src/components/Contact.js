'use client'

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp, FaFacebook } from 'react-icons/fa';

// ## 1. Les informations de contact sont extraites dans un tableau ##
const contactDetails = [
  {
    icon: FaMapMarkerAlt,
    title: "Adresse",
    value: "N 37 Rue 972 Hay Salam, Agadir",
    href: "http://googleusercontent.com/maps.google.com/5"
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+212 648-730359",
    href: "https://wa.me/212648730359"
  },
  {
    icon: FaInstagram,
    title: "Instagram",
    value: "@desktopplus",
    href: "https://www.instagram.com/desktopplus/"
  },
  //   {
  //   icon: FaFacebook,
  //   title: "Facebook",
  //   value: "DESKTOP PLUS",
  //   href: "https://www.facebook.com/desktopplus.ma" // Assurez-vous que c'est le bon lien
  // }
];

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    const templateParams = {
      // ## 2. MISE À JOUR CRITIQUE : Nom du destinataire corrigé ##
      to_name: 'DESKTOP PLUS', 
      from_name: data.user_name,
      from_email: data.user_email,
      message: data.message,
    };
    
    emailjs.send(
      'service_inskmz7', // Remplacez par votre Service ID si nécessaire
      'template_ma7sv3q', // Remplacez par votre Template ID si nécessaire
      templateParams, 
      'WX2mRq1JN2Qh_5bqh' // Remplacez par votre Public Key si nécessaire
    )
    .then((result) => {
        toast.success("Message envoyé avec succès !");
        reset(); 
    })
    .catch((error) => {
        toast.error("Échec de l'envoi du message.");
    })
    .finally(() => {
        setIsLoading(false); 
    });
  };

  return (
    <div className='mx-auto mt-20 max-w-7xl px-4'>
      <div className='flex h-full w-full flex-col items-center'>
        
        <div className='flex w-full flex-col items-start justify-between gap-12 md:flex-row'>
          
          {/* Colonne Gauche: Informations de Contact */}
          <div className='flex w-full flex-col gap-y-4 md:w-2/5 text-brand-dark'>
            <h1 className='text-4xl font-bold tracking-wide'>
              <span className='text-brand-amber'>Entrer en </span> Contact
            </h1>
            <p className='mb-4 text-lg text-gray-600'>
              Avez-vous des questions ? Nhésitez pas à nous contacter directement.
            </p>
            <hr />

            <div className='mt-4 flex flex-col gap-y-8'>
              {contactDetails.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-5 group">
                    <Icon size={25} className="text-brand-amber" />
                    <div>
                      <h2 className='text-xl font-bold'>{item.title}</h2>
                      <p className='text-gray-700 transition-colors group-hover:text-brand-amber group-hover:underline'>{item.value}</p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Colonne Droite: Formulaire de Contact */}
          <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col rounded-lg bg-white p-8 shadow-xl md:w-3/5'>
              <div className="mb-5">
                <label htmlFor='user_name' className="mb-2 block font-bold text-brand-dark">Votre Nom</label>
                <input
                  id='user_name'
                  type="text"
                  {...register("user_name", { required: "Votre nom est requis." })}
                  placeholder="Entrez votre nom"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-amber"
                />
                {errors.user_name && <span className="mt-1 text-sm text-red-500">{errors.user_name.message}</span>}
              </div>

              <div className="mb-5">
                <label htmlFor='user_email' className="mb-2 block font-bold text-brand-dark">Email</label>
                <input
                  id='user_email'
                  type="email"
                  {...register("user_email", { required: "Une adresse e-mail valide est requise." })}
                  placeholder="Entrez votre e-mail"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-amber"
                />
                {errors.user_email && <span className="mt-1 text-sm text-red-500">{errors.user_email.message}</span>}
              </div>

              <div className="mb-6">
                <label htmlFor='message' className="mb-2 block font-bold text-brand-dark">Message</label>
                <textarea
                  id='message'
                  {...register("message", { required: "Un message est requis." })}
                  placeholder="Entrez votre message"
                  className="w-full resize-none rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-amber"
                  rows="5"
                />
                {errors.message && <span className="mt-1 text-sm text-red-500">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-brand-amber px-6 py-3 font-bold text-brand-dark transition-colors duration-300 hover:bg-amber-500 focus:outline-none disabled:bg-gray-400"
              >
                {isLoading ? 'Envoi en cours...' : 'Envoyer le Message'}
              </button>
          </form>
        </div>
        
        {/* Section de la Carte */}
        <div className='mt-16 w-full'>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.387794359616!2d-9.549525424235688!3d30.403182874744854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b72e80b70497%3A0xa5089c3f3f62ecee!2sDESKTOPPLUS!5e1!3m2!1sfr!2sma!4v1755707583286!5m2!1sfr!2sma"
            className='h-80 w-full border-0 rounded-lg shadow-xl'
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Emplacement de DESKTOP PLUS"
          >
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;