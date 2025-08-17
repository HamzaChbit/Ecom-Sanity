"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/src/components/Card";
import { getProductsByBrandSlug } from "@/src/sanity/product-util";

export default function BrandPage({ params }) {
  const { slug } = params;

  const [data, setData] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    const products = await getProductsByBrandSlug(slug);
    setData(products);
  };

  const applyFilters = () => {
    const filteredProducts = data.filter((product) => {
      const price = parseFloat(product.price) || 0;
      const isMinPriceValid = !minPrice || price >= parseFloat(minPrice);

      const matchesSearchQuery =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return isMinPriceValid && matchesSearchQuery;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
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
    setProductsPerPage(6);
    setSearchQuery("");
    fetchData();
  };

  // Pagination logic
  const filteredData = applyFilters();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Title */}
      {/* <h1 className="text-3xl font-bold mb-6 capitalize">
        Brand: {slug.replace("-", " ")}
      </h1> */}

      <div className="flex flex-col md:flex-row">
        {/* Filters */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mr-8 w-full md:w-1/4"
        >
          <h1 className="text-2xl font-semibold text-[#5B20B6] mb-4">Filters</h1>

          {/* Search */}
          <div className="mb-4">
            <h2 className="text-lg font-medium">Search</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>

          {/* Min Price */}
          <div className="mb-4">
            <h2 className="text-lg font-medium">Price Min</h2>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>

          {/* Sort */}
          <div className="mb-4">
            <h2 className="text-lg font-medium">Sort</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Most Expensive</option>
              <option value="lowest">Lowest Price</option>
            </select>
          </div>

          {/* Products per page */}
          <div className="mb-4">
            <h2 className="text-lg font-medium">Products Per Page</h2>
            <select
              value={productsPerPage}
              onChange={(e) => setProductsPerPage(Number(e.target.value))}
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
            >
              {[1, 3, 5, 10, 15, 20, 25].map((num) => (
                <option key={num} value={num}>
                  {num} per page
                </option>
              ))}
            </select>
          </div>

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="bg-[#5B20B6] text-white px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </motion.div>

        {/* Products */}
        <div className="flex-1 my-2">
          {currentProducts.length === 0 ? (
            <p>No products found for this brand.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {currentProducts.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredData.length > productsPerPage && (
            <div className="mt-4 flex justify-center space-x-2">
              {Array.from(
                { length: Math.ceil(filteredData.length / productsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-2 rounded-md ${
                      currentPage === index + 1
                        ? "bg-[#5B20B6] text-white"
                        : "bg-gray-200 hover:bg-gray-300"
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
  );
}
