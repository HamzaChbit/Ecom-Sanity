"use client";

import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link';
import { useEffect, useState } from "react";
import useCartStore from "@/cartStore";
import { getParentCategories, getSubcategories } from "../sanity/category-util";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function Header() {
  const totalItems = useCartStore((state) => state.totalItems);
  const [parents, setParents] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [subcategories, setSubcategories] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ## 1. FIX : Ajout de l'état "hasMounted" pour éviter les erreurs d'hydratation ##
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getParentCategories();
      setParents(categories);
    };
    fetchData();
  }, []);

  const handleToggle = (parentSlug) => {
    if (openMenu === parentSlug) {
      setOpenMenu(null);
    } else {
      setOpenMenu(parentSlug);
      if (!subcategories[parentSlug]) {
        const parent = parents.find(p => p.slug === parentSlug);
        if (parent) {
          getSubcategories(parent.title).then((subs) => {
            setSubcategories((prev) => ({ ...prev, [parentSlug]: subs }));
          });
        }
      }
    }
  };
  
  const closeAllMenus = () => {
    setOpenMenu(null);
    setIsMobileMenuOpen(false);
  }

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15, ease: "easeIn" } },
  };

  const NavLinks = ({ isMobile = false }) => (
    <nav className={isMobile ? "flex flex-col space-y-2 w-full" : "hidden md:flex items-center space-x-2"}>
      {parents.map((cat) => (
        <div key={cat.slug} className="relative">
          <button
            type="button"
            onClick={() => handleToggle(cat.slug)}
            // ## 2. FIX : Utilisation de brand-amber pour la couleur ##
            className="flex w-full items-center justify-between gap-1.5 rounded-md px-3 py-2 text-base font-medium text-gray-800 transition-colors hover:bg-gray-100 hover:text-brand-amber"
          >
            {cat.title}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
              animate={{ rotate: openMenu === cat.slug ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {openMenu === cat.slug && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                className={isMobile ? 'relative mt-2' : 'absolute top-full mt-2 w-56 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg z-50'}
              >
                  <div className={isMobile ? "pl-4 pt-2 flex flex-col space-y-1" : "p-1"}>
                    <Link
                      href={`/category/${cat.slug}`}
                      onClick={closeAllMenus}
                      className="block rounded-md px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-brand-amber"
                    >
                      {/* ## 3. FIX : Traduction ## */}
                      Tous les {cat.title}
                    </Link>
                    
                    {subcategories[cat.slug]?.length > 0 && <hr className="my-1 border-gray-100" />}
                    
                    {subcategories[cat.slug]?.map((sub) => (
                      <Link
                        key={sub._id}
                        href={`/brand/${sub.slug}`}
                        onClick={closeAllMenus}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-brand-amber"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm" >
      <div className="p-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" onClick={closeAllMenus} className="flex items-center flex-shrink-0">
            <Image
              src="/logo-v1.png" // Assurez-vous que le nom de votre logo est correct
              alt="DESKTOP PLUS Homepage"
              width={60}
              height={60}
              className='object-contain'
            />
          </Link>

          <div className="flex-grow flex justify-center items-center">
            <NavLinks />
            <Link
              href="/contact"
              onClick={closeAllMenus}
              className="hidden md:block rounded-md px-3 py-2 text-base font-medium text-gray-800 transition-colors hover:bg-gray-100 hover:text-brand-amber"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/cart" 
              onClick={closeAllMenus} 
              className="relative" 
              aria-label={`Voir le panier, ${totalItems} articles`}
            >
              <FaShoppingCart className="text-3xl text-brand-amber cursor-pointer transition-transform duration-300 hover:scale-110" aria-hidden="true" />
              
              {/* ## 1. FIX : Le compteur du panier ne s'affiche qu'après le montage côté client ## */}
              {hasMounted && totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMobileMenuOpen}
                className="p-2"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="text-2xl text-gray-700" aria-hidden="true" />
                ) : (
                  <FaBars className="text-2xl text-gray-700" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-b border-gray-100 bg-white"
          >
            {/* ## 4. FIX : Correction de la classe "gap-" ## */}
            <div className="p-4 flex flex-col gap-2">
              <NavLinks isMobile={true}/>
              <Link
                href="/contact"
                onClick={closeAllMenus}
                className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-800 transition-colors hover:bg-gray-100 hover:text-brand-amber"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;