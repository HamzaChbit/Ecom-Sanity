"use client";
import React from 'react';
import { FaMapMarkerAlt, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

// ## 1. Les informations de contact sont extraites dans un tableau pour un code plus propre ##
const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: "Adresse",
    value: "N 37 Rue 972 Hay Salam, Agadir",
    // Lien Google Maps pour l'adresse
    href: "http://googleusercontent.com/maps.google.com/5"
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+212 648-730359",
    // Lien direct pour ouvrir une discussion WhatsApp
    href: "https://wa.me/212648730359"
  },
  {
    icon: FaInstagram,
    title: "Instagram",
    value: "@desktopplus",
    href: "https://www.instagram.com/desktopplus/"
  }
];

function Footer() {
  return (
    <footer className='mt-16 border-t border-gray-700 bg-brand-dark p-6 md:p-10'>
      <div className='mx-auto max-w-6xl'>
        
        <div className='text-center'>
            <h2 className="mb-12 text-4xl font-bold text-brand-amber">Contactez-Nous</h2>

            {/* ## 2. Utilisation de .map() pour afficher les informations de manière dynamique ## */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a 
                    key={index}
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='flex items-center gap-x-4 p-4 rounded-lg transition-colors hover:bg-gray-800'
                  >
                    <Icon size={30} className='text-brand-amber flex-shrink-0' />
                    <div className='text-left'>
                      <h3 className='text-lg font-semibold text-white'>{item.title}</h3>
                      <p className='text-gray-300 hover:underline'>{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
        </div>

        {/* Credit avec l'année du copyright et le nom de la marque */}
       <div className='mt-12 border-t border-gray-700 pt-8 text-center text-gray-400'>
            © {new Date().getFullYear()} DESKTOP PLUS | Créé par <Link href="https://www.linkedin.com/in/hamzachbit" target="_blank" className='font-semibold text-brand-amber hover:underline'>Hamza Chbit</Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;