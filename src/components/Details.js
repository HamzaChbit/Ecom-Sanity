"use client"
import Image from 'next/image';
import React,{useEffect, useState} from 'react';
import useCartStore from "../../cartStore"
import { toast } from 'react-hot-toast';
import { UserButton, useUser } from "@clerk/nextjs";
import Link from 'next/link';
function Details({product}) {
  const [selectedImage, setSelectedImage] = useState(product?.image);
//  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
const [selectedColor, setSelectedColor] = useState(null);
;

useEffect(() => {
  if (product?.colors?.length === 1) {
    setSelectedColor(product.colors[0]);
  }
}, [product?.colors]);

  //const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const[qty,setQty] = useState(1);


const handleAddToCart = () => {
  if (!selectedColor) {
    toast.error('Please select a color');
    return;
  }


  addToCart({ product, quantity: qty, color: selectedColor  });
  toast.success('Added to cart');
};


  return (
    <div className='max-w-7xl mx-auto mt-20'>
      <div className='grid grid-cols-1 lg:grid-cols-2'>

        {/* Left - Main Image */}
        <div className="shadow-md relative md:min-h-[500px]  h-52 overflow-hidden aspect-ratio-1 flex items-center justify-center">
        <Image className='md:min-w-[250px] md:min-h-[450px]    min-w-[100px] max-h-[150px]'
             src={selectedImage || product?.image}
           width={150} height={150}
            alt="art"
          />
        </div>

        {/* Right - Details */}
        <div className="flex flex-col p-6 justify-between">
          <h1 className="text-3xl font-semibold text-[#5B20B6]">{product?.name}</h1>
          <p className="text-lg text-gray-500 mt-4">{product?.description}</p>

          {/* Color Selection Circles */}
          <div className="flex mt-6 space-x-3">
            {product?.colors?.map((color) => {
              switch (color) {
                case 'Grey':
                  return <div onClick={()=>{setSelectedColor(color)}} key={color} className={`${color == selectedColor ? "border-4 border-[#5b20b6]":""} w-8 h-8 rounded-full bg-gray-700 cursor-pointer hover:border-4 border-[#5b20b6]`}></div>;
                case 'Black':
                  return <div onClick={()=>{setSelectedColor(color)}} key={color} className={`${color == selectedColor ? "border-4 border-[#5b20b6]":""} w-8 h-8 rounded-full bg-black cursor-pointer hover:border-4 border-[#5b20b6]`}></div>;
                  case 'White':
                    return <div onClick={()=>{setSelectedColor(color)}} key={color} className={`${color == selectedColor ? "border-4 border-[#5b20b6]":""} w-8 h-8 rounded-full bg-white cursor-pointer hover:border-4 border-[#5b20b6]`}></div>;
                case 'Blue':
                  return <div onClick={()=>{setSelectedColor(color)}} key={color} className={`${color == selectedColor ? "border-4 border-[#5b20b6]":""} w-8 h-8 rounded-full bg-blue-800 cursor-pointer hover:border-4 border-[#5b20b6]`}></div>;
                default:
                  return <div onClick={()=>{setSelectedColor(color)}} key={color} className={`${color == selectedColor ? "border-4 border-[#5b20b6]":""} w-8 h-8 rounded-full bg-gray-300 cursor-pointer hover:border-4 border-[#5b20b6]`}></div>;
              }
            })}

          </div>
        






          <div className="mt-5">
       
            <span className="text-[#5B20B6] text-xl font-semibold">${product?.price}</span>
          </div>
  

          <div className="mt-6 flex flex-col text-gray-500">
  <label className="ml-2" htmlFor="qtyInput">
    Qty
  </label>
  <input
    id="qtyInput"
    type="number"
    value={qty}
    onChange={(e) => {
      const inputQty = parseInt(e.target.value);
      if (!isNaN(inputQty) && inputQty >= 1) {
        setQty(inputQty);
      }
    }}
    className="w-20 px-4 h-10 border border-gray-300 rounded-md"
  />
</div>


          
<div className="mt-5">
    <button onClick={handleAddToCart} className="bg-[#5B20B6] text-white px-6 py-3 rounded-md">
      Add to Cart
    </button>
</div>

        </div>
      </div>

      {/* Below Main Image - Small Image List */}
      <div className="mt-2">
      <ul className="flex gap-4 overflow-x-auto">
            <li onClick={()=>{setSelectedImage(product?.image)}} className={`${selectedImage == product?.image? "border-4 border-[#5b20b6]":""} w-20 relative overflow-hidden aspect-ratio-1 cursor-pointer hover:border-4 border-[#5b20b6] `}>
                <Image
                  src={product?.image}
                  width={150} height={150}
                  alt="small_art122"
                />
              </li>
          {
            product?.extraImages?.map((image)=>(
              <li key={image} onClick={()=>{setSelectedImage(image)}} className={`${selectedImage == image? "border-4 border-[#5b20b6]":""} w-20 relative overflow-hidden aspect-ratio-1 cursor-pointer hover:border-4 border-[#5b20b6]`}>
                <Image
                  src={image}
                
                  fill
                  alt="small_art12"
                />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Details;