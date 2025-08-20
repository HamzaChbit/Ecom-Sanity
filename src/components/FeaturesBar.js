import React from 'react';
import { FaThumbsUp, FaTruck, FaHeadset, FaCheck } from 'react-icons/fa';

// ## 1. Les données sont définies à l'extérieur pour de meilleures performances ##
const features = [
  {
    icon: FaThumbsUp,
    title: "EXPÉRIENCE SOLIDE",
    description: "Plus de 10 ans d'expertises",
  },
  {
    icon: FaTruck,
    title: "LIVRAISON GRATUITE",
    description: "Partout au Maroc",
  },
  {
    icon: FaHeadset,
    title: "SERVICE APRÈS VENTE",
    description: "Service après vente disponible",
  },
  {
    icon: FaCheck,
    title: "GARANTIE",
    description: "2 mois de Garantie",
  },
];

function FeaturesBar() {
  return (
    // ## 2. Section avec un arrière-plan léger pour le contraste ##
    <div className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre de la section */}
        <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">
                Pourquoi Nous Choisir ?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
                Nous nous engageons à fournir qualité et confiance.
            </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon; // On récupère la référence du composant icône
            return (
              // ## 3. Carte améliorée avec des effets de survol ##
              <div key={index} className="text-center rounded-xl bg-gray-50 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                
                {/* ## 4. Icône stylisée avec la couleur de la marque ## */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-amber/10 text-brand-amber">
                  <IconComponent className="h-8 w-8" aria-hidden="true" />
                </div>
                
                <div className='mt-4'>
                  <h3 className="text-base font-bold uppercase text-brand-dark">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FeaturesBar;