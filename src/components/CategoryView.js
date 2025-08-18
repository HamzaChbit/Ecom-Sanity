"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/src/components/Card";
// No need to import getProductsByCategorySlug here anymore

// The component now accepts `initialProducts` as a prop
export default function CategoryView({ initialProducts }) {
  // Initialize state directly from the prop passed by the server
  const [data, setData] = useState(initialProducts);
  
  const [minPrice, setMinPrice] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  // This useEffect is no longer needed because the data is already fetched
  // useEffect(() => {
  //   fetchData();
  // }, [slug]);

  // Update data state if the initial products prop changes (when navigating between categories)
  useEffect(() => {
    setData(initialProducts);
  }, [initialProducts]);

  const applyFilters = () => {
    // Make sure to filter from the original `initialProducts` to avoid losing data
    const filteredProducts = initialProducts.filter((product) => {
      const price = parseFloat(product.price) || 0;
      const isMinPriceValid = !minPrice || price >= parseFloat(minPrice);
      const matchesSearchQuery =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return isMinPriceValid && matchesSearchQuery;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b._createdAt) - new Date(a._createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a._createdAt) - new Date(b._createdAt);
      } else if (sortBy === "highest") {
        return parseFloat(b.price) - parseFloat(a.price);
      } else if (sortBy === "lowest") {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      return 0;
    });
    return sortedProducts;
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
  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* The rest of your JSX remains exactly the same */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="w-full md:w-1/4"
          >
             <div className="p-4 border rounded-lg shadow-sm bg-white space-y-4">
              <h2 className="text-2xl font-semibold text-amber-500 border-b pb-2">
                Filters
              </h2>

              <div>
                <label htmlFor="search" className="text-lg font-medium text-gray-700">Search</label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label htmlFor="minPrice" className="text-lg font-medium text-gray-700">Min Price</label>
                <input
                  id="minPrice"
                  type="number"
                  placeholder="e.g., 100"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

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

              <div>
                <label htmlFor="perPage" className="text-lg font-medium text-gray-700">Per Page</label>
                <select
                  id="perPage"
                  value={productsPerPage}
                  onChange={(e) => {
                    setProductsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                >
                  {[6, 12, 18, 24].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>

          <div className="flex-1">
            {currentProducts.length === 0 ? (
               <p className="text-center text-gray-500 text-lg">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {currentProducts.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
              </div>
            )}
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
          </div>
        </div>
      </div>
    </div>
  );
}