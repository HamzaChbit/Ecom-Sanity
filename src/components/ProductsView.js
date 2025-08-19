'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@/src/components/Card';


export default function ProductsView({ initialProducts }) {

  const [data, setData] = useState(initialProducts);
  
  // State for all filter controls
  const [minPrice, setMinPrice] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');

  
  // (e.g., when navigating between different category pages that reuse this component)
  useEffect(() => {
    setData(initialProducts);
    // When the products change, it's good practice to reset to the first page
    setCurrentPage(1); 
  }, [initialProducts]);


  // This is the core logic: a pure function that takes the original product list
  // and applies the current filters and sorting, then returns a new array.
  const getFilteredProducts = () => {
    let filtered = [...initialProducts]; // Always start with the original full list

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply min price filter
    if (minPrice) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price) || 0;
        return price >= parseFloat(minPrice);
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b._createdAt) - new Date(a._createdAt);
      }
      if (sortBy === 'oldest') {
        return new Date(a._createdAt) - new Date(b._createdAt);
      }
      if (sortBy === 'highest') {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      if (sortBy === 'lowest') {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      return 0;
    });

    return filtered;
  };

  // On every render, calculate the list of products to display
  const filteredData = getFilteredProducts();

  const resetFilters = () => {
    setMinPrice('');
    setSortBy('latest');
    setCurrentPage(1);
    setSearchQuery('');
  };

  // Pagination logic now uses the dynamically calculated `filteredData`
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* ==== FILTER SIDEBAR ==== */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="w-full md:w-1/4"
        >
          <div className="p-4 border rounded-lg shadow-sm bg-white space-y-4 sticky top-4">
            <h2 className="text-2xl font-semibold text-amber-500 border-b pb-2">
              Filters
            </h2>

            {/* Search Input */}
            <div>
              <label htmlFor="search" className="text-lg font-medium text-gray-700">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on new search
                }}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Min Price Input */}
            <div>
              <label htmlFor="minPrice" className="text-lg font-medium text-gray-700">Min Price</label>
              <input
                id="minPrice"
                type="number"
                placeholder="e.g., 100"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setCurrentPage(1); // Reset to page 1
                }}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Sort By Dropdown */}
            <div>
              <label htmlFor="sort" className="text-lg font-medium text-gray-700">Sort By</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Most Expensive</option>
                <option value="lowest">Lowest Price</option>
              </select>
            </div>

            {/* Products Per Page Dropdown */}
            <div>
              <label htmlFor="perPage" className="text-lg font-medium text-gray-700">Per Page</label>
              <select
                id="perPage"
                value={productsPerPage}
                onChange={(e) => {
                  setProductsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to page 1
                }}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              >
                {[6, 12, 18, 24].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </motion.div>

        {/* ==== PRODUCT GRID & PAGINATION ==== */}
        <div className="flex-1">
          {filteredData.length === 0 ? (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {currentProducts.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {filteredData.length > productsPerPage && (
                <div className="mt-8 flex justify-center space-x-2">
                  {Array.from(
                    { length: Math.ceil(filteredData.length / productsPerPage) },
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                          currentPage === index + 1
                            ? "bg-amber-500 text-black"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}