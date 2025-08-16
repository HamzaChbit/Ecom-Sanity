'use client'
import useCartStore from '@/cartStore';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

import Link from 'next/link';
import axios from 'axios';



import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';


function Cart() {
  const cartTotal = useCartStore((state) => state.cartTotal);
  const cart = useCartStore((state) => state.cart);
  const totalItems = useCartStore((state) => state.totalItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
 const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };
 

  

const onSubmit = async (e) => {
  e.preventDefault();

  if (!email || !address || !city || !zipCode || !country) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    setLoading(true);

    // بعث البيانات مباشرة لل API order
    const response = await axios.post("/api/order", {
     
      cart,
      address,
      city,
      email,
      zipCode,
      country,
    });

    if (response.status === 200) {
      cart.forEach(product => removeFromCart(product._id));

        const message = cart.map(p => `${p.name} x ${p.quantity} = $${(p.price * p.quantity).toFixed(2)}`).join("\n");
      const finalMessage = `New Order:\nEmail: ${email}\nAddress: ${address}, ${city}, ${zipCode}, ${country}\n\nItems:\n${message}\nTotal: $${cartTotal.toFixed(2)}`;

      // 4️⃣ Send WhatsApp
      await axios.post('/api/send-whatsapp', {
        message: finalMessage,
        phoneNumber: '+21269477110' // Your WhatsApp number
      });


      toast.success("Order placed successfully");
       router.push("/");
    } else {
      toast.error("Failed to place order 1");
    }
  } finally {
    setLoading(false);
  }
};


  const truncateString = (str,num ) =>{
    if(str?.length > num) {
      return str.slice(8,num) 
    }else{
      return str
    }
  }



  useEffect(() => {
    if (!cart || cart.length === 0) {
      router.push("/products");
    }
  }, [cart, router]);
  return (
    <div className='max-w-3xl mx-auto mt-20'>
      <h1 className="text-3xl text-center font-semibold text-[#5B20B6] mb-6"> {totalItems} Items in Cart</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-[#5B20B6] border-b border-gray-200">
            <th className="py-2 px-4">Product</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Remove</th>
          </tr>
        </thead>
        {/* <tbody>
          {cart.map((product) => (
            
            <tr key={product.id} className="hover:bg-gray-50 text-center border-b border-gray-300 text-[#5B20B6] ">
              <td className="py-2 px-4 flex items-center md:flex-row flex-col">
                <img className='mr-2' src={product?.image} width={50} height={30} alt="art" />
   <h1>{truncateString(product?.name,35)}</h1> 
              </td>
              <td className="py-2 px-4">{product?.quantity}</td>
              <td className="py-2 px-4">${(product?.price * product?.quantity).toFixed(2)}</td>
              <td className="py-2 px-4">
                <FaTrash onClick={() => { handleRemoveFromCart(product?._id) }} className="text-[#5B20B6] mx-auto cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody> */}
        <tbody>
  {cart.map((product) => {
    const finalPrice = product.discount 
      ? product.price - (product.price * product.discount / 100)
      : product.price;

    return (
      <tr key={product.id} className="hover:bg-gray-50 text-center border-b border-gray-300 text-[#5B20B6] ">
        <td className="py-2 px-4 flex items-center md:flex-row flex-col">
          <img className='mr-2' src={product?.image} width={50} height={30} alt="art" />
          <h1>{truncateString(product?.name,35)}</h1> 
        </td>
        <td className="py-2 px-4">{product?.quantity}</td>
        <td className="py-2 px-4">${(finalPrice * product?.quantity).toFixed(2)}</td>
        <td className="py-2 px-4">
          <FaTrash onClick={() => { handleRemoveFromCart(product?._id) }} className="text-[#5B20B6] mx-auto cursor-pointer" />
        </td>
      </tr>
    )
  })}
</tbody>

      </table>

      <div className="mt-4 text-[#5B20B6] ml-auto">
        <p className="text-lg font-semibold text-right mr-4">Total: ${cartTotal.toFixed(2)}</p>
      </div>

 

<div className="mt-4 text-[#5B20B6]  ">

{cartTotal > 0 && (


        <form  onSubmit={onSubmit} className='' >
             <div className='flex md:flex-row flex-col justify-around' >
          <input
            className="px-5 py-2 my-2 w-full bg-gray-100"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          /></div>
          <div className='flex md:flex-row flex-col justify-around' >
                   <input className='px-5 py-2 my-2 w-full  mx-2 bg-gray-100' 
                    type="text"
                     value={address} 
                     onChange={(e) => setAddress(e.target.value)} 
                     placeholder="Address" 
                     required />
          <input className='px-5  py-2 my-2 mx-2 w-full bg-gray-100' type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
          </div>
          <div className='flex md:flex-row flex-col  justify-around ' >
<input className='px-5 my-2  py-2 mx-2 bg-gray-100 w-full' type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Zip Code" required />
          <input className='px-5  py-2 my-2 mx-2 bg-gray-100 w-full' type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required />
          </div>
         
   
          <div  className='max-w-sm mx-auto space-y-4' >

           <button type="submit" disabled={loading}   className="text-lg w-full font-semibold text-center mr-4 bg-[#5B20B6]  text-white py-2 px-4 rounded hover:text-[#5B20B6] hover:bg-white border border-[#5B20B6]">
          {
                  loading ? "Loading..." : "Pay"
                }
          </button>
          </div>

    
       
        </form>
      )}



        <div className='max-w-sm mx-auto space-y-4 my-2' >
                 <button className="text-lg w-full font-semibold text-center mr-4 bg-white hover:bg-[#5B20B6] hover:text-white text-[#5B20B6] border border-[#5B20B6] py-2 px-4 rounded">
          <Link className='' href="/">
            Back to Shopping
            </Link>  
          </button>  
        </div>
         
   
         
     </div>
    </div>
  );
}

export default Cart;

