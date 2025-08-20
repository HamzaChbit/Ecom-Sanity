'use client'
import React, { useState, useEffect } from 'react';
import useCartStore from '@/cartStore';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';

// Fonction utilitaire déplacée à l'extérieur pour de meilleures performances
const truncateString = (str, num) => {
  if (str?.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}

function Cart() {
  const { cart, cartTotal, totalItems, removeFromCart, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    toast.success('Produit retiré du panier');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !address) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    if (!(phone.length >= 8 && phone.length <= 15)) {
      return toast.error('Veuillez entrer un numéro de téléphone valide');
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/order", {
        cart, firstName, lastName, phone, address,
      });
      if (response.status === 200) {
        toast.success("Commande passée avec succès");
        
        const messageItems = cart.map(p => {
          const finalPrice = (p.discount && p.discount > 0)
            ? p.price * (1 - p.discount / 100)
            : p.price;
          const colorInfo = p.color ? `\n   - Couleur: ${p.color}` : "";
          return `*${p.name}*\n   - Quantité: ${p.quantity}${colorInfo}\n   - Prix: د.م. ${Math.floor(finalPrice * p.quantity)}`;
        }).join("\n\n");

        const finalMessage = `🛒 Nouvelle commande:\n\n👤 Client: ${firstName} ${lastName}\n📞 Téléphone: ${phone}\n🏠 Adresse: ${address}\n\n📦 Articles:\n${messageItems}\n\n💰 Total: د.م. ${Math.floor(cartTotal)}`;
        
        // ## 1. MISE À JOUR CRITIQUE : Numéro de téléphone WhatsApp correct ##
        const whatsappURL = `https://wa.me/212694977110?text=${encodeURIComponent(finalMessage)}`;
        
        window.open(whatsappURL, "_blank");
        clearCart();
      } else {
        toast.error("Échec de la commande");
      }
    } catch (error) {
        toast.error("Une erreur s'est produite.");
        console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!hasMounted) {
    return null; // Empêche les erreurs d'hydratation
  }

  // ## 2. VUE PANIER VIDE AMÉLIORÉE ##
  if (cart.length === 0) {
    return (
        <div className="mx-auto mt-20 max-w-xl p-4 text-center">
            <h1 className="mb-4 text-3xl font-bold text-brand-dark">Votre Panier est Vide</h1>
            <p className="mb-8 text-lg text-gray-600">Explorez nos produits et ajoutez vos articles préférés !</p>
            <Link href="/">
                <button className="rounded-lg bg-brand-amber px-8 py-3 text-lg font-semibold text-brand-dark transition-all hover:bg-amber-500">
                    Retour à laccueil
                </button>
            </Link>
        </div>
    );
  }

  return (
    <div className='mx-auto mt-12 max-w-4xl p-4'>
      <h1 className="mb-8 text-center text-4xl font-bold text-brand-dark">
        Votre Panier (<span className="text-brand-amber">{totalItems}</span>)
      </h1>
      
      {/* ## 3. AFFICHAGE MOBILE : LISTE DE CARTES ## */}
      <div className="space-y-4 md:hidden">
        {cart.map((product) => {
          const linePrice = (product.discount && product.discount > 0)
            ? product.price * (1 - product.discount / 100)
            : product.price;
          const lineTotal = linePrice * product.quantity;

          return (
            <div key={product._id} className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <Image className='rounded' src={product.image} width={80} height={80} style={{objectFit: 'cover'}} alt={product.name || 'produit'} />
                <div className="flex-1">
                  <h2 className="font-semibold text-brand-dark">{product.name}</h2>
                  {product.color && <p className="text-sm text-gray-500">Couleur: {product.color}</p>}
                  <p className="text-sm text-gray-500">Quantité: {product.quantity}</p>
                  <p className="mt-2 font-bold text-brand-amber">د.م. {Math.floor(lineTotal)}</p>
                </div>
                <button onClick={() => handleRemoveFromCart(product._id)} aria-label="Retirer le produit">
                  <FaTrash className="cursor-pointer text-red-500 transition-transform hover:scale-110" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ## 4. AFFICHAGE DESKTOP : TABLEAU ## */}
      <div className="hidden overflow-x-auto rounded-lg border bg-white shadow-md md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-sm font-semibold uppercase text-brand-amber">
              <th className="px-6 py-4">Produit</th>
              <th className="px-6 py-4 text-center">Quantité</th>
              <th className="px-6 py-4 text-center">Prix</th>
              <th className="px-6 py-4 text-center">Retirer</th>
            </tr>
          </thead>
          <tbody className='text-brand-dark'>
            {cart.map((product) => {
               const linePrice = (product.discount && product.discount > 0)
                ? product.price * (1 - product.discount / 100)
                : product.price;
              const lineTotal = linePrice * product.quantity;

              return(
                <tr key={product._id} className="border-b text-center hover:bg-gray-50">
                  <td className="flex items-center gap-4 px-6 py-4 text-left">
                    <Image className='rounded' src={product.image} width={60} height={60} style={{objectFit: 'cover'}} alt={product.name || 'produit'} />
                    <div>
                      <h2 className="font-semibold">{truncateString(product.name, 35)}</h2>
                      {product.color && <p className="text-sm text-gray-500">{product.color}</p>}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{product.quantity}</td>
                  <td className="px-6 py-4 font-medium">د.م. {Math.floor(lineTotal)}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleRemoveFromCart(product._id)} aria-label="Retirer le produit">
                      <FaTrash className="mx-auto cursor-pointer text-red-500 transition-transform hover:scale-110" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <p className="text-xl font-semibold text-brand-dark">
          <span className="text-gray-600">Total: </span> 
          <span className="text-brand-amber">د.م. {Math.floor(cartTotal)}</span>
        </p>
      </div>

      <div className="mt-10 border-t pt-8">
        <h2 className="mb-6 text-2xl font-bold text-brand-dark">Informations de Livraison</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <input className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-brand-amber" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" required />
            <input className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-brand-amber" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" required />
          </div>
          <input className='w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-brand-amber' type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse et ville" required />
          <input className='w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-brand-amber' type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numéro de téléphone" required />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-amber py-3 px-4 text-center text-lg font-semibold text-brand-dark transition-all hover:bg-amber-500 disabled:bg-gray-400"
          >
            {loading ? "Chargement..." : "Commandeter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cart;