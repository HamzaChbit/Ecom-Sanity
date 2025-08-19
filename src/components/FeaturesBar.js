import React from 'react';
import { FaThumbsUp, FaTruck, FaHeadset, FaCheck } from 'react-icons/fa';

const features = [
  {
    icon: <FaThumbsUp />,
    title: "EXPÉRIENCE SOLIDE",
    description: "Plus de 10 ans d'expertises",
  },
  {
    icon: <FaTruck />,
    title: "LIVRAISON GRATUITE",
    description: "Partout au Maroc",
  },
  {
    icon: <FaHeadset />,
    title: "SERVICE APRÈS VENTE",
    description: "Service après vente disponible",
  },
  {
    icon: <FaCheck />,
    title: "GARANTIE",
    description: "2 mois de Garantie",
  },
];

function FeaturesBar() {
  return (
    // Main container with vertical padding
    <div className="w-full  py-16">
      <div className="mx-auto grid  max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          // Each feature is now a card with padding and a border
          <div key={index} className="flex items-center  gap-4 rounded-lg  p-6 shadow-sm">
            {/* Icon is now larger */}
            <div className="text-5xl text-amber-500">
              {feature.icon}
            </div>
            {/* Text content is now larger */}
            <div>
              <h3 className="text-base font-bold uppercase text-brand-dark">{feature.title}</h3>
              <p className="text-base text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesBar;