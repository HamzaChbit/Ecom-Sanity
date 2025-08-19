"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useCartStore from "../../cartStore";
import { toast } from 'react-hot-toast';

function Details({ product }) {
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [selectedColor, setSelectedColor] = useState(null);
  const [qty, setQty] = useState(1);
  
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    // Reset selected image when the product changes
    setSelectedImage(product?.image);
    // Automatically select the color if there's only one option
    if (product?.colors?.length === 1) {
      setSelectedColor(product.colors[0]);
    } else {
      setSelectedColor(null); // Reset color if multiple options
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product?.colors?.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }
    if (qty < 1) {
      toast.error('Quantity must be at least 1');
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
    toast.success('Added to cart');
  };

  return (
    <div className='mx-auto mt-20 max-w-7xl p-4'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>

        {/* Left Column: Images */}
        <div>
          <div className="relative flex h-96 items-center justify-center overflow-hidden rounded-lg bg-white shadow-md md:h-[500px]">
            {product?.discount && (
              <div className="absolute left-3 top-3 z-10 rounded-md bg-red-500 px-3 py-1 text-base font-semibold text-white">
                -{Math.floor(product.discount)}%
              </div>
            )}
            <Image 
              className='h-full w-full object-contain p-4'
              src={selectedImage || product?.image}
              width={500} 
              height={500}
              alt={product?.name || "Product image"}
              priority // Add priority to the main image for faster loading
            />
          </div>

          <div className="mt-4">
            <ul className="flex gap-4 overflow-x-auto p-1">
              {/* Main product image thumbnail */}
              <li 
                onClick={() => setSelectedImage(product?.image)} 
                className={`relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md ${selectedImage === product?.image ? "ring-2 ring-offset-2 ring-brand-teal" : ""}`}
              >
                <Image src={product?.image} fill style={{objectFit:"cover"}} alt="Product thumbnail" />
              </li>
              {/* Extra images thumbnails */}
              {product?.extraImages?.map((image, index) => (
                <li 
                  key={index} 
                  onClick={() => setSelectedImage(image)} 
                  className={`relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md ${selectedImage === image ? "ring-2 ring-offset-2 ring-brand-teal" : ""}`}
                >
                  <Image src={image} fill style={{objectFit:"cover"}} alt={`Product thumbnail ${index + 1}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col justify-center p-6">
          <h1 className="text-3xl font-semibold text-brand-dark">{product?.name}</h1>
          
          <div className="mt-4 text-brand-dark">
            {product?.specs && product.specs.length > 0 ? (
              <ul className="list-disc space-y-1 pl-5 opacity-90">
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec.value}</li>
                ))}
              </ul>
            ) : (
              <p className="text-lg opacity-90">{product?.description}</p>
            )}
          </div>

          {product?.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-medium text-brand-dark">Color:</h2>
              <div className="flex space-x-3">
                {product.colors.map((color) => {
                    const colorMap = {
                      'Grey': 'bg-gray-700', 'Black': 'bg-black', 'White': 'bg-white border',
                      'Blue': 'bg-blue-800', 'Red': 'bg-red-600', 'Green': 'bg-green-600',
                    };
                    const bgColorClass = colorMap[color] || 'bg-gray-300';
                    return (
                      <div 
                        key={color} 
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        className={`h-8 w-8 cursor-pointer rounded-full ${bgColorClass} ${selectedColor === color ? 'ring-2 ring-offset-2 ring-brand-teal' : ''}`}
                      ></div>
                    );
                })}
              </div>
            </div>
          )}

          {/* Price Section */}
          <div className="mt-5">
            {product?.discount ? (
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-brand-teal">
                  د.م. {Math.floor(product.price - (product.price * product.discount / 100))}
                </span>
                <span className="text-xl font-semibold text-gray-400 line-through">
                  د.م. {Math.floor(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-brand-teal">
                د.م. {Math.floor(product.price)}
              </span>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div>
              <label htmlFor="qtyInput" className="sr-only">Quantity</label>
              <input
                id="qtyInput" type="number" value={qty} min="1"
                onChange={(e) => setQty(Number(e.target.value))}
                className="h-12 w-20 rounded-md border border-gray-300 text-center focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
            <button 
              onClick={handleAddToCart} 
              className="flex-1 rounded-md bg-brand-teal px-6 py-3 font-bold text-white transition-all duration-300 hover:brightness-90"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;