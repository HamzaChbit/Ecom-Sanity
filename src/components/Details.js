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
    // Automatically select the color if there's only one option
    if (product?.colors?.length === 1) {
      setSelectedColor(product.colors[0]);
    }
  }, [product?.colors]);

  const handleAddToCart = () => {
    // Check if a color must be selected
    if (product?.colors?.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }
    
    // Calculate the final price after discount
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
    <div className='max-w-7xl mx-auto mt-20 p-4'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

        {/* Left Column: Images */}
        <div>
          {/* Main Image Container */}
          <div className="shadow-md relative h-96 md:h-[500px] overflow-hidden rounded-lg flex items-center justify-center">
            
            {/* Discount Badge */}
            {product?.discount && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-base font-semibold px-3 py-1 rounded-md z-10">
                -{product.discount}%
              </div>
            )}
            
            <Image 
              className='object-contain w-full h-full'
              src={selectedImage || product?.image}
              width={500} 
              height={500}
              alt={product?.name || "Product image"}
            />
          </div>

          {/* Thumbnail Images */}
          <div className="mt-4">
            <ul className="flex gap-4 overflow-x-auto p-1">
              {/* Main product image thumbnail */}
              <li 
                onClick={() => setSelectedImage(product?.image)} 
                className={`w-20 h-20 relative rounded-md overflow-hidden cursor-pointer flex-shrink-0 ${selectedImage === product?.image ? "ring-2 ring-offset-2 ring-[#5b20b6]" : ""}`}
              >
                <Image
                  src={product?.image}
                  layout="fill"
                  objectFit="cover"
                  alt="Product thumbnail"
                />
              </li>
              {/* Extra images thumbnails */}
              {product?.extraImages?.map((image, index) => (
                <li 
                  key={index} 
                  onClick={() => setSelectedImage(image)} 
                  className={`w-20 h-20 relative rounded-md overflow-hidden cursor-pointer flex-shrink-0 ${selectedImage === image ? "ring-2 ring-offset-2 ring-[#5b20b6]" : ""}`}
                >
                  <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    alt={`Product thumbnail ${index + 1}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col p-6 justify-center">
          <h1 className="text-3xl font-semibold text-[#5B20B6]">{product?.name}</h1>
          <p className="text-lg text-gray-500 mt-4">{product?.description}</p>

          {/* Color Selection */}
          {product?.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-700 mb-2">Color:</h2>
              <div className="flex space-x-3">
                {product.colors.map((color) => {
                    // Define a mapping for color names to tailwind classes
                    const colorMap = {
                        'Grey': 'bg-gray-700',
                        'Black': 'bg-black',
                        'White': 'bg-white border',
                        'Blue': 'bg-blue-800',
                        'Red': 'bg-red-600',
                        'Green': 'bg-green-600',
                    };
                    const bgColorClass = colorMap[color] || 'bg-gray-300';
                    return (
                        <div 
                          key={color} 
                          onClick={() => setSelectedColor(color)}
                          title={color}
                          className={`w-8 h-8 rounded-full cursor-pointer ${bgColorClass} ${selectedColor === color ? 'ring-2 ring-offset-2 ring-[#5b20b6]' : ''}`}
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
                <span className="text-[#5B20B6] text-3xl font-bold">
                  ${(product.price - (product.price * product.discount / 100))?.toFixed(2)}
                </span>
                <span className="text-gray-400 line-through text-xl font-semibold">
                  ${product.price?.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-[#5B20B6] text-3xl font-bold">
                ${product.price?.toFixed(2)}
              </span>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div>
              <label htmlFor="qtyInput" className="sr-only">Quantity</label>
              <input
                id="qtyInput"
                type="number"
                value={qty}
                min="1"
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-20 px-3 h-12 text-center border border-gray-300 rounded-md"
              />
            </div>
            <button onClick={handleAddToCart} className="flex-1 bg-[#5B20B6] hover:bg-[#4c1a9c] text-white font-bold px-6 py-3 rounded-md transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;