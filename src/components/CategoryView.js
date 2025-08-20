"use client";

import React, { useState, useEffect, useCallback } from "react";
import Card from "@/src/components/Card";
import { motion } from "framer-motion";

export default function CategoryView({ initialProducts }) {
  const [minPrice, setMinPrice] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    // Récupère le nom de la catégorie depuis le premier produit
    if (initialProducts && initialProducts.length > 0 && initialProducts[0]?.category?.title) {
      setCategoryName(initialProducts[0].category.title);
    } else {
      setCategoryName("Produits");
    }
    setCurrentPage(1);
  }, [initialProducts]);

  const applyFilters = useCallback(() => {
    let filtered = [...initialProducts];
    
    if (searchQuery) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (minPrice) {
        filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
    }

    return filtered.sort((a, b) => {
        if (sortBy === 'latest') return new Date(b._createdAt) - new Date(a._createdAt);
        if (sortBy === 'oldest') return new Date(a._createdAt) - new Date(b._createdAt);
        if (sortBy === 'highest') return b.price - a.price;
        if (sortBy === 'lowest') return a.price - b.price;
        return 0;
    });
  }, [initialProducts, searchQuery, minPrice, sortBy]);
  
  const resetFilters = useCallback(() => {
    setMinPrice("");
    setSortBy("latest");
    setCurrentPage(1);
    setSearchQuery("");
  }, []);

  const filteredData = applyFilters();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto max-w-7xl p-4">
      


      <div className="flex flex-col gap-8 md:flex-row">
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/4"
        >
          <div className="sticky top-24 space-y-4 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="border-b pb-2 text-2xl font-semibold text-brand-amber">
              Filtres
            </h2>
            
            <div>
              <label htmlFor="search" className="text-lg font-medium text-brand-dark">Rechercher</label>
              <input
                id="search" type="text" placeholder="Rechercher..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
              />
            </div>

            <div>
              <label htmlFor="minPrice" className="text-lg font-medium text-brand-dark">Prix Minimum</label>
              <input
                id="minPrice" type="number" placeholder="ex: 100" value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
              />
            </div>

            <div>
              <label htmlFor="sort" className="text-lg font-medium text-brand-dark">Trier par</label>
              <select
                id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
              >
                <option value="latest">Plus récent</option>
                <option value="oldest">Plus ancien</option>
                <option value="highest">Prix (élevé)</option>
                <option value="lowest">Prix (bas)</option>
              </select>
            </div>

            <div>
              <label htmlFor="perPage" className="text-lg font-medium text-brand-dark">Par Page</label>
              <select
                id="perPage" value={productsPerPage}
                onChange={(e) => {
                  setProductsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
              >
                {[6, 12, 18, 24].map((num) => (<option key={num} value={num}>{num}</option>))}
              </select>
            </div>
            
            <button
              onClick={resetFilters}
              className="w-full rounded-md bg-brand-amber px-4 py-2 font-bold text-brand-dark transition-all hover:bg-amber-500"
            >
              Réinitialiser
            </button>
          </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
        >
          {currentProducts.length === 0 ? (
            <p className="text-center text-lg text-gray-500">Aucun produit trouvé.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {currentProducts.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          )}
          {filteredData.length > productsPerPage && (
            <div className="mt-8 flex justify-center space-x-2">
              {Array.from({ length: Math.ceil(filteredData.length / productsPerPage) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`rounded-md px-4 py-2 font-semibold transition-colors ${
                    currentPage === index + 1
                      ? "bg-brand-amber text-brand-dark"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}