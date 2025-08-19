'use client'
import useCartStore from '@/cartStore';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import 'react-international-phone/style.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Cart() {
  const cartTotal = useCartStore((state) => state.cartTotal);
  const cart = useCartStore((state) => state.cart);
  const totalItems = useCartStore((state) => state.totalItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !email || !address) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (!(phone.length >= 8 && phone.length <= 15)) {
      return toast.error('Please enter a valid telephone number');
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/order", {
        cart,
        firstName,
        lastName,
        phone,
        email,
        address,
      });

      if (response.status === 200) {
        cart.forEach(product => removeFromCart(product._id));
        toast.success("Order placed successfully");

        const messageItems = cart.map(p => {
          // CORRECT CALCULATION for the final price
          const finalPrice = (p.discount && p.discount > 0)
            ? p.price * (1 - p.discount / 100)
            : p.price;
          
          const colorInfo = p.color ? `\n   - Color: ${p.color}` : "";
          const urlInfo = p.url ? `\n   - URL: ${p.url}` : "";
          const imageInfo = p.image ? `\n   - Image: ${p.image}` : "";
          return `*${p.name}*\n   - Quantity: ${p.quantity}\n   - Price: د.م. ${Math.floor(finalPrice * p.quantity)}${colorInfo}${urlInfo}${imageInfo}`;
        }).join("\n\n");

        const finalMessage = `🛒 Nouvelle commande: 
👤 Client: ${firstName} ${lastName}
📞 Téléphone: ${phone}
📧 Email: ${email}
🏠 Adresse: ${address}

📦 Articles:
${messageItems}

💰 Total: د.م. ${Math.floor(cartTotal)}`;

        const whatsappURL = `https://wa.me/212694977110?text=${encodeURIComponent(finalMessage)}`;
        window.open(whatsappURL, "_blank");

      } else {
        toast.error("Failed to place order");
      }
    } finally {
      setLoading(false);
    }
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  }

  return (
    <div className='max-w-3xl mx-auto mt-20 p-4'>
      <h1 className="text-3xl text-center font-semibold text-amber-500 mb-6"> {totalItems} <span className='text-black'>Items in Cart</span> </h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-amber-500 border-b border-gray-200">
            <th className="py-2 px-4">Product</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Remove</th>
          </tr>
        </thead>
    
        <tbody>
          {cart.map((product) => (
            <tr key={product.id || product._id} className="hover:bg-gray-50 text-center border-b border-gray-300 text-black ">
              <td className="py-2 px-4 flex items-center md:flex-row flex-col text-left">
                <Image className='mr-2 rounded' src={product?.image} width={50} height={50} style={{objectFit: 'cover'}} alt={product?.name || 'product'} />
                <h1>{truncateString(product?.name, 35)}</h1> 
              </td>
              <td className="py-2 px-4">{product?.quantity}</td>
              
              {/* === FINAL CORRECTED LINE === */}
              <td className="py-2 px-4">
                د.م. {Math.floor(
                  (product.discount && product.discount > 0
                    ? product.price * (1 - product.discount / 100)
                    : product.price) * product.quantity
                )}
              </td>
              {/* ============================= */}

              <td className="py-2 px-4">
                <FaTrash onClick={() => handleRemoveFromCart(product?._id)} className="text-red-500 mx-auto cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-black ml-auto">
        <p className="text-lg font-semibold text-right mr-4"> <span className='text-amber-500'>Total:</span> د.م. {Math.floor(cartTotal)}</p>
      </div>

      <div className="mt-4 text-black ">
        {cartTotal > 0 && (
          <form onSubmit={onSubmit} className=''>
            {/* Form inputs remain the same */}
            <div className='flex md:flex-row flex-col justify-around'>
              <input className="px-5 py-2 my-2 w-full bg-gray-100 rounded" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" required />
              <input className="px-5 py-2 my-2 w-full bg-gray-100 mx-0 md:mx-2 rounded" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" required />
            </div>
            <div className='flex'>
              <input className='px-5 py-2 my-2 w-full bg-gray-100 rounded' type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse et ville" required />
            </div>
            <div className='flex'>
              <input className='px-5 py-2 my-2 w-full bg-gray-100 rounded' type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numéro de téléphone" required />
            </div>
            <div className='flex'>
              <input className="px-5 py-2 my-2 w-full bg-gray-100 rounded" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            </div>
            <div className='max-w-sm mx-auto space-y-4 mt-4'>
              <button type="submit" disabled={loading} className="text-lg w-full font-semibold text-center bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded transition-colors">
                {loading ? "Loading..." : "Commander"}
              </button>
            </div>
          </form>
        )}

        <div className='max-w-sm mx-auto space-y-4 my-2' >
          <Link className='' href="/">
            <button className="text-lg w-full font-semibold text-center bg-white hover:bg-amber-500 hover:text-white text-amber-500 border border-amber-500 py-2 px-4 rounded transition-colors">
              Back to Shopping
            </button>  
          </Link> 
        </div>
      </div>
    </div>
  );
}

export default Cart;
