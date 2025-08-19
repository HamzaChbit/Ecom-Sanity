'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@/src/components/Card';

export default function ProductsView({ initialProducts }) {
  const [minPrice, setMinPrice] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');

  // Brand colors for consistency
  const brandTeal = "#2DD4BF";
  const brandDarkGray = "#4a4a4a";

  useEffect(() => {
    setCurrentPage(1); 
  }, [initialProducts]);

  const getFilteredProducts = () => {
    let filtered = [...initialProducts];

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price) || 0;
        return price >= parseFloat(minPrice);
      });
    }

    filtered.sort((a, b) => {
      if (sortBy === 'latest') return new Date(b._createdAt) - new Date(a._createdAt);
      if (sortBy === 'oldest') return new Date(a._createdAt) - new Date(b._createdAt);
      if (sortBy === 'highest') return parseFloat(b.price) - parseFloat(a.price);
      if (sortBy === 'lowest') return parseFloat(a.price) - parseFloat(b.price);
      return 0;
    });

    return filtered;
  };

  const filteredData = getFilteredProducts();

  const resetFilters = () => {
    setMinPrice('');
    setSortBy('latest');
    setCurrentPage(1);
    setSearchQuery('');
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-8 md:flex-row">
        
        {/* ==== FILTER SIDEBAR ==== */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="w-full md:w-1/4"
        >
          <div className="sticky top-20 space-y-4 rounded-lg border bg-white p-4 shadow-sm">
            {/* 1. Updated filter title color */}
            <h2 className="border-b pb-2 text-2xl font-semibold" style={{ color: brandTeal }}>
              Filters
            </h2>

            {/* Search Input */}
            <div>
              <label htmlFor="search" className="text-lg font-medium" style={{ color: brandDarkGray }}>Search</label>
              <input
                id="search" type="text" placeholder="Search..." value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                // 2. Updated input focus ring color
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
              />
            </div>

            {/* Min Price Input */}
            <div>
              <label htmlFor="minPrice" className="text-lg font-medium" style={{ color: brandDarkGray }}>Min Price</label>
              <input
                id="minPrice" type="number" placeholder="e.g., 100" value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setCurrentPage(1);
                }}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
              />
            </div>

            {/* Sort By Dropdown */}
            <div>
              <label htmlFor="sort" className="text-lg font-medium" style={{ color: brandDarkGray }}>Sort By</label>
              <select
                id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Most Expensive</option>
                <option value="lowest">Lowest Price</option>
              </select>
            </div>

            {/* Products Per Page Dropdown */}
            <div>
              <label htmlFor="perPage" className="text-lg font-medium" style={{ color: brandDarkGray }}>Per Page</label>
              <select
                id="perPage" value={productsPerPage}
                onChange={(e) => {
                  setProductsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
              >
                {[6, 12, 18, 24].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* 3. Updated Reset Button colors */}
            <button
              onClick={resetFilters}
              className="w-full rounded-md px-4 py-2 font-bold text-white transition-colors hover:bg-teal-500"
              style={{ backgroundColor: brandTeal }}
            >
              Reset Filters
            </button>
          </div>
        </motion.div>

        {/* ==== PRODUCT GRID & PAGINATION ==== */}
        <div className="flex-1">
          {filteredData.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-500">No products found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {currentProducts.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
              </div>

              {filteredData.length > productsPerPage && (
                <div className="mt-8 flex justify-center space-x-2">
                  {Array.from(
                    { length: Math.ceil(filteredData.length / productsPerPage) },
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        // 4. Updated active pagination button colors
                        className={`rounded-md px-4 py-2 font-semibold transition-colors ${
                          currentPage === index + 1
                            ? "text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        style={currentPage === index + 1 ? { backgroundColor: brandTeal } : {}}
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