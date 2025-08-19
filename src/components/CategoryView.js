"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/src/components/Card";

export default function CategoryView({ initialProducts }) {
  const [minPrice, setMinPrice] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    // FIX: Safely access the category title to prevent errors
    if (initialProducts && initialProducts.length > 0 && initialProducts[0].category) {
      setCategoryName(initialProducts[0].category.title);
    } else {
      setCategoryName("Products"); // Set a default title if no category is found
    }
    setCurrentPage(1);
  }, [initialProducts]);

  const applyFilters = () => {
    // ... (Filter and sort logic remains the same) ...
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
  };

  const resetFilters = () => {
    setMinPrice("");
    setSortBy("latest");
    setCurrentPage(1);
    setSearchQuery("");
  };

  const filteredData = applyFilters();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto max-w-7xl p-4">

      {/* <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-brand-teal">
          {categoryName}
        </h1>
      </div> */}
      
      <div className="flex flex-col gap-8 md:flex-row">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="w-full md:w-1/4"
        >
          <div className="sticky top-20 space-y-4 rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="border-b pb-2 text-2xl font-semibold text-brand-teal">
              Filters
            </h2>

            {/* All filter inputs refactored to use brand colors */}
            <div>
              <label htmlFor="search" className="text-lg font-medium text-brand-dark">Search</label>
              <input
                id="search" type="text" placeholder="Search..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
              />
            </div>

            <div>
              <label htmlFor="minPrice" className="text-lg font-medium text-brand-dark">Min Price</label>
              <input
                id="minPrice" type="number" placeholder="e.g., 100" value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
              />
            </div>

            <div>
              <label htmlFor="sort" className="text-lg font-medium text-brand-dark">Sort By</label>
              <select
                id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Most Expensive</option>
                <option value="lowest">Lowest Price</option>
              </select>
            </div>

            <div>
              <label htmlFor="perPage" className="text-lg font-medium text-brand-dark">Per Page</label>
              <select
                id="perPage" value={productsPerPage}
                onChange={(e) => {
                  setProductsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
              >
                {[6, 12, 18, 24].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="w-full rounded-md bg-brand-teal px-4 py-2 font-bold text-white transition-all hover:brightness-90"
            >
              Reset Filters
            </button>
          </div>
        </motion.div>

        <div className="flex-1">
          {currentProducts.length === 0 ? (
            <p className="text-center text-lg text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
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
                      ? "bg-brand-teal text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}