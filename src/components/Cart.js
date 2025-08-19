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

  // Brand colors for consistency
  const brandTeal = "#2DD4BF";
  const brandDarkGray = "#4a4a4a";

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
        cart, firstName, lastName, phone, email, address,
      });
      if (response.status === 200) {
        cart.forEach(product => removeFromCart(product._id));
        toast.success("Order placed successfully");
        const messageItems = cart.map(p => {
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
    <div className='mx-auto mt-20 max-w-3xl p-4'>
      {/* 1. Updated title colors */}
      <h1 className="mb-6 text-center text-3xl font-semibold">
        <span style={{ color: brandTeal }}>{totalItems}</span>
        <span style={{ color: brandDarkGray }}> Items in Cart</span>
      </h1>

      <table className="w-full border-collapse">
        <thead>
          {/* 2. Updated table header color */}
          <tr className="border-b border-gray-200" style={{ color: brandTeal }}>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Remove</th>
          </tr>
        </thead>
    
        <tbody>
          {cart.map((product) => (
            <tr key={product.id || product._id} className="border-b border-gray-300 text-center hover:bg-gray-50" style={{ color: brandDarkGray }}>
              <td className="flex flex-col items-center px-4 py-2 text-left md:flex-row">
                <Image className='mr-2 rounded' src={product?.image} width={50} height={50} style={{objectFit: 'cover'}} alt={product?.name || 'product'} />
                <h1>{truncateString(product?.name, 35)}</h1> 
              </td>
              <td className="px-4 py-2">{product?.quantity}</td>
              <td className="px-4 py-2">
                د.م. {Math.floor(
                  (product.discount && product.discount > 0
                    ? product.price * (1 - product.discount / 100)
                    : product.price) * product.quantity
                )}
              </td>
              <td className="px-4 py-2">
                <FaTrash onClick={() => handleRemoveFromCart(product?._id)} className="mx-auto cursor-pointer text-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ml-auto mt-4" style={{ color: brandDarkGray }}>
        {/* 3. Updated "Total" text color */}
        <p className="mr-4 text-right text-lg font-semibold">
          <span style={{ color: brandTeal }}>Total:</span> د.م. {Math.floor(cartTotal)}
        </p>
      </div>

      <div className="mt-4">
        {cartTotal > 0 && (
          <form onSubmit={onSubmit}>
            <div className='flex flex-col justify-around md:flex-row'>
              <input className="my-2 w-full rounded bg-gray-100 px-5 py-2" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" required />
              <input className="my-2 w-full rounded bg-gray-100 px-5 py-2 md:mx-2" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" required />
            </div>
            <div className='flex'>
              <input className='my-2 w-full rounded bg-gray-100 px-5 py-2' type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse et ville" required />
            </div>
            <div className='flex'>
              <input className='my-2 w-full rounded bg-gray-100 px-5 py-2' type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numéro de téléphone" required />
            </div>
            <div className='flex'>
              <input className="my-2 w-full rounded bg-gray-100 px-5 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            </div>
      <div className='mx-auto mt-4 max-w-sm space-y-4'>
            {/* "Commander" button now uses custom Tailwind classes */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-brand-teal py-2 px-4 text-center text-lg font-semibold text-white transition-all hover:brightness-90"
            >
              {loading ? "Loading..." : "Commander"}
            </button>
          </div>
        </form>
      )}

      <div className='mx-auto my-2 max-w-sm space-y-4'>
        <Link href="/">
          {/* "Back to Shopping" button now uses custom Tailwind classes */}
          <button 
            className="w-full rounded border border-brand-teal py-2 px-4 text-center text-lg font-semibold text-brand-teal transition-colors hover:bg-brand-teal hover:text-white"
          >
            Back to Shopping
          </button>   
        </Link> 
      </div>
      </div>
    </div>
  );
}

export default Cart;