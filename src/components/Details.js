"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import useCartStore from "../../cartStore";
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const QuantitySelector = ({ qty, setQty }) => (
  <div className="flex items-center">
    <button
      type="button"
      onClick={() => setQty(prev => Math.max(1, prev - 1))}
      className="h-12 w-12 flex items-center justify-center rounded-l-md border border-gray-300 text-gray-700 transition hover:bg-gray-100"
      aria-label="Decrease quantity"
    >
      <FaMinus />
    </button>
    <input
      type="number"
      value={qty}
      min="1"
      onChange={(e) => setQty(Number(e.target.value))}
      className="h-12 w-20 border-y border-gray-300 text-center text-lg font-semibold focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
    />
    <button
      type="button"
      onClick={() => setQty(prev => prev + 1)}
      className="h-12 w-12 flex items-center justify-center rounded-r-md border border-gray-300 text-gray-700 transition hover:bg-gray-100"
      aria-label="Increase quantity"
    >
      <FaPlus />
    </button>
  </div>
);

const colorMap = {
  'Grey': 'bg-gray-700', 'Black': 'bg-black', 'White': 'bg-white border',
  'Blue': 'bg-blue-800', 'Red': 'bg-red-600', 'Green': 'bg-green-600',
  'Gold': 'bg-yellow-500', 'Silver': 'bg-gray-300', 'Purple': 'bg-purple-600',
};

function Details({ product }) {
  // ## FIX 1 : La vérification se fait AVANT d'appeler les Hooks pour éviter les erreurs ##
 

  // Tous les Hooks sont appelés ici, au plus haut niveau et sans condition.
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setSelectedImage(product.image);
    if (product.colors?.length === 1) {
      setSelectedColor(product.colors[0]);
    } else {
      setSelectedColor(null);
    }
    setAdded(false); 
  }, [product]);

  const handleAddToCart = () => {
    if (product.colors?.length > 0 && !selectedColor) {
      toast.error('Veuillez sélectionner une couleur');
      return;
    }
    if (qty < 1) {
      toast.error('La quantité doit être au moins de 1');
      return;
    }
    
    const finalPrice = product.discount
      ? product.price - (product.price * product.discount / 100)
      : product.price;

    addToCart({ 
      product, 
      quantity: qty, 
      color: selectedColor, 
      price: finalPrice 
    });
    toast.success('Ajouté au panier');
    setAdded(true);
  };
  
  const discountedPrice = product.discount
    ? Math.floor(product.price - (product.price * product.discount / 100))
    : Math.floor(product.price);
    
  const allImages = [product.image, ...(product.extraImages || [])];

  return (
    <div className='mx-auto mt-5 max-w-7xl p-4'>
      <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center'>

        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative flex h-96 items-center justify-center overflow-hidden rounded-lg bg-gray-50 shadow-lg md:h-[500px]">
            {product.discount && (
              <div className="absolute left-3 top-3 z-10 rounded-md bg-red-600 px-3 py-1 text-base font-semibold text-white">
                -{Math.floor(product.discount)}%
              </div>
            )}
            <Image 
              className='h-full w-full object-contain p-4'
              src={selectedImage}
              width={500} 
              height={500}
              alt={product.name}
              priority
            />
          </div>

          <div className="mt-4">
            <ul className="flex gap-4 overflow-x-auto p-1">
              {allImages.map((image, index) => (
                <li 
                  key={index} 
                  onClick={() => setSelectedImage(image)} 
                  className={`relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md transition-all ${selectedImage === image ? "ring-2 ring-offset-2 ring-brand-amber" : "hover:opacity-80"}`}
                >
                  <Image src={image} fill className="object-cover" alt={`Miniature ${index + 1}`} />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col p-2">
          <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">{product.name}</h1>
          
          <div className="my-6 text-brand-dark">
            {product.specs && product.specs.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5 text-lg text-gray-600">
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec.value}</li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-600">{product.description}</p>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-2">
              <h2 className="mb-3 text-lg font-semibold text-brand-dark">Couleur : <span className='text-gray-600 font-medium'>{selectedColor}</span></h2>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const bgColorClass = colorMap[color] || 'bg-gray-300';
                  return (
                    <div 
                      key={color} 
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      className={`h-8 w-8 cursor-pointer rounded-full transition-all ${bgColorClass} ${selectedColor === color ? 'ring-2 ring-offset-2 ring-brand-amber' : 'hover:scale-110'}`}
                    ></div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8">
            {product.discount ? (
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-brand-amber">
                  د.م. {discountedPrice}
                </span>
                <span className="text-2xl font-semibold text-gray-400 line-through">
                  د.م. {Math.floor(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-4xl font-bold text-brand-amber">
                د.م. {Math.floor(product.price)}
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <QuantitySelector qty={qty} setQty={setQty} />
            {!added ? (
              <button
                onClick={handleAddToCart}
                // ## FIX 2 : Zedt "text-brand-dark" bach l'ktaba tban mzyan ##
                className="flex-1 bg-brand-amber hover:bg-amber-500 text-brand-dark font-bold px-6 py-3 rounded-md transition-colors duration-300 text-lg"
              >
                Ajouter au Panier
              </button>
            ) : (
              <Link
                href="/cart"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-md transition-colors duration-300 text-center text-lg flex items-center justify-center"
              >
                🛒 Voir le Panier
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Details;