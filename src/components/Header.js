"use client";

import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link';
import { useEffect, useState } from "react";
import useCartStore from "@/cartStore";
import { getParentCategories, getSubcategories } from "../sanity/category-util";

function Header() {
  const totalItems = useCartStore((state) => state.totalItems);
  const [parents, setParents] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [subcategories, setSubcategories] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const NavLinks = ({ isMobile = false }) => (
    <nav className={isMobile ? "flex flex-col space-y-4" : "hidden md:flex items-center space-x-2"}>
      {parents.map((cat) => (
        <div key={cat.slug} className="relative">
          <button
            type="button"
            onClick={() => handleToggle(cat.slug)}
            className="flex w-full items-center justify-between gap-1.5 rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#5B20B6]"
          >
            {cat.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`size-5 transition-transform duration-300 ${openMenu === cat.slug ? 'rotate-180' : ''}`}
            >
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>

          <div
            className={`transition-all duration-200 ease-out ${isMobile ? 'relative mt-2' : 'absolute top-full mt-2 w-56 origin-top-right rounded-md border border-gray-200 bg-white shadow-xl z-50'} ${openMenu === cat.slug ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}
          >
            {openMenu === cat.slug && (
              <div className={isMobile ? "pl-4 pt-2 flex flex-col space-y-1" : "p-1"}>
                {/* === PARENT CATEGORY LINK ADDED HERE === */}
                <Link
                  href={`/category/${cat.slug}`}
                  onClick={closeAllMenus}
                  className="block rounded-md px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#5B20B6]"
                >
                  All {cat.title}
                </Link>
                
                {subcategories[cat.slug]?.length > 0 && <hr className="my-1 border-gray-100" />}
                
                {subcategories[cat.slug]?.map((sub) => (
                  <Link
                    key={sub._id}
                    href={`/brand/${sub.slug}`}
                    onClick={closeAllMenus}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-[#5B20B6]"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm" >
      <div className="p-4 border-b-2 border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" onClick={closeAllMenus} className="flex items-center flex-shrink-0">
            {/* <img src="/logo.png" alt="logo" width={40} height={40} /> */}
            <h1 className="ml-2 text-xl lg:text-3xl font-bold text-gray-800">DESKTOPPLUS</h1>
          </Link>

          <div className="flex-grow flex justify-center">
            <NavLinks />
                   <Link
              href="/contact"
              onClick={closeAllMenus}
              className="hidden md:block rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#5B20B6]"
            >
                Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart" onClick={closeAllMenus} className="relative">
              <FaShoppingCart className="text-3xl text-[#5B20B6] cursor-pointer transition-transform duration-300 hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (
                  <FaTimes className="text-2xl text-gray-700" />
                ) : (
                  <FaBars className="text-2xl text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden p-4 border-b-2 border-gray-100 bg-white">
          <NavLinks isMobile={true}/>
                  <Link
            href="/contact"
            onClick={closeAllMenus}
            className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#5B20B6]"
          >
              Contact
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;